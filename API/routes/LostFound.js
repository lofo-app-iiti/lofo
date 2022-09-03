//Route module for handeling queries regarding Lost/Found Items
const mongoose = require('mongoose')
const express = require('express');
const route = express.Router();
const fileUpload = require('express-fileupload');
const LostFound = require('../models/lost_found');
const User = require('../models/user')
const { authToken } = require('../middleware/auth')
const { uploadToCloudinary, parseImage, removeFromCloudinary } = require('../../config/cloudinary-config')

//API handlers
//GET Handlers:      
//GET all found/lost items:
route.get('/', (req, res, next) => {
    LostFound.find({})
        .sort({ date: 'desc' })
        .then((item) => {
            res.status(200).send(item);
        })
        .catch(next);
});


//GET Items from Search Bar(name):                  
route.get('/search', (req, res, next) => {
    const { name } = req.query;
    Item.find({
        $or: [
            { title: { $regex: name, $options: 'i' } },
            { categories: { $regex: name, $options: 'i' } },
            { description: { $regex: name, $options: 'i' } }
        ]
    })
        .select('title price images')
        .then((item) => {
            res.send(item);
        })
        .catch(next);

});

//---------------------------------------------------------------------------//

//POST AN ITEM
//Middleware:
route.use(fileUpload());
//POST Handler:
route.post('/', authToken, parseImage, (req, res, next) => {

    User.findById(req.auth.id)
        .select('name mobile')
        .then(async user => {

            let itemBody = {
                title: req.body.title,
                description: req.body.description,
                userName: user.name,
                userEmail: req.auth.email,
                mobile: user.mobile ? user.mobile : null,
                status: req.body.status
            }

            if (req.files) {
                let imageLinks = {};
                let uploadedUrl = await uploadToCloudinary(req.files.encodedUri[0])
                imageLinks = {
                    url: uploadedUrl.url,
                    public_id: uploadedUrl.public_id
                };
                itemBody['images'] = imageLinks
            }

            LostFound.create(itemBody)
                .then(item => {
                    res.status(201).send(item);
                })
                .catch(err => console.log(err));
        })
});


//--------------------------------------------------------------------------//
//Send a Claim Notification 
route.put('/notify/:id', authToken, (req, res, next) => {
    LostFound.findById(req.params.id)
        .then((item) => {
            User.findOne({
                email: item.userEmail,
                notifications: {
                    $elemMatch: {
                        message: req.body.notification.message,
                        userEmail: req.auth.email
                    }
                }
            })
                .then(user => {

                    User.findById(req.auth.id)
                        .select('name')
                        .then(user => {
                            req.body.notification['userName'] = user.name
                            req.body.notification['userEmail'] = req.auth.email
                            req.body.notification.read = false;
                            req.body.notification._id = new mongoose.Types.ObjectId();

                            const io = require('../../config/socket').get();
                            io.to(item.userEmail).emit('notification', req.body.notification)

                            User.updateOne({ email: item.userEmail },
                                { "$push": { "notifications": req.body.notification } },
                            )
                                .then(() => {
                                    LostFound.updateOne({ _id: req.params.id },
                                        { $set: { claimed: true } }
                                    )
                                        .then(() => {
                                            res.status(200).send({
                                                item,
                                                message: `Notified ${item.userName}`
                                            });
                                        })
                                        .catch(next);
                                })
                                .catch(next);
                        })
                        .catch(next);

                })
                .catch(next);
        })
        .catch(e => {
            res.send({ message: e })
        });
})



//Edit a posted item                               
// route.put('/:id', (req, res, next) => {
//     Item.updateOne({ _id: req.params.id }, req.body)
//         .then(
//             Item.findById(req.params.id)
//                 .then((item) => {
//                     res.header("Access-Control-Allow-Origin", "*");
//                     res.status(200).send(`Your Ad, ${item.name} has been updated`);
//                 })
//         )
//         .catch(next);
// });

//-------------------------------------------------------------------------//
const admin = "technicals.tedx@iiti.ac.in";

//Delete a posted item                              
route.delete('/:id', authToken, (req, res, next) => {
    LostFound.findById(req.params.id)
        .select('images userEmail')
        .then(async item => {
            if (item.userEmail === req.auth.email || req.auth.email === admin) {
                if (item.images.public_id) {
                    await removeFromCloudinary(item.images.public_id);
                }
                LostFound.deleteOne({ _id: req.params.id })
                    .then(() => {
                        res.status(200).send(`Your Ad has been removed`);
                    })
                    .catch(next);
            } else {
                res.status(403).end();
            }
        })
        .catch(next);

});



module.exports = route;