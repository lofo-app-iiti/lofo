//Route module for handeling queries regarding items
const mongoose = require('mongoose')
const express = require('express');
const route = express.Router();
const fileUpload = require('express-fileupload');
const Item = require('../models/item')
const User = require('../models/user')
const { authToken } = require('../middleware/auth')
const { uploadToCloudinary, parseImage, removeFromCloudinary } = require('../../config/cloudinary-config')

const admin = ["technicals.tedx@iiti.ac.in"]

//API handlers
//GET Handlers:      
//GET all items:
route.get('/', (req, res, next) => {
    Item.find()
        .sort({ date: 'desc' })
        .select('title price images sold categories')
        .then((item) => {
            res.status(200).send(item);
        })
        .catch(err => {
            next();
        });
});



//----------------------------------------------------//


//GET Item details:                             
route.get('/:id', (req, res, next) => {
    Item.findById(req.params.id)
        .then((item) => {
            res.status(200).send(item)
        })
        .catch(next);
});



//---------------------------------------------------------------------------//

//POST AN ITEM
//Middleware:
route.use(fileUpload());
//POST Handler:
route.post('/', authToken, parseImage, (req, res, next) => {
    User.findOne({ email: req.auth.email })
        .select('name')
        .then(async user => {
            const { body } = req;
            let setCategories = [];
            let index = 0;
            for (let key of Object.keys(body)) {
                var value = body[key];
                if (value == 'on') {
                    setCategories[index] = key;
                    index++;
                }
            }
            let imageLinks = [];

            for (let encoded of req.files.encodedUri) {
                let uploadedUrl = await uploadToCloudinary(encoded)
                imageLinks.push({
                    url: uploadedUrl.url,
                    public_id: uploadedUrl.public_id
                });
            }

            const itemBody = {
                title: req.body.title,
                description: req.body.description,
                price: req.body.price,
                userName: user.name,
                userEmail: req.auth.email,
                mobile: req.body.mobile,
                categories: setCategories,
                images: imageLinks
            }
            Item.create(itemBody)
                .then((item) => {
                    User.updateOne({ _id: req.auth.id },
                        { "$push": { "ads": item._id } }
                    )
                        .catch(next);

                    res.status(201).send(item);
                })
                .catch(next);
        })
        .catch(next);
});

//--------------------------------------------------------------------------//
//Send a Buy-Sell Notification 
route.put('/buy/:id', authToken, (req, res, next) => {
    Item.findById(req.params.id)
        .select('userEmail userName title')
        .then((item) => {
            User.findOne({
                email: item.userEmail,
                notifications: {
                    $elemMatch: {
                        message: req.body.notification.message,
                        userEmail: req.auth.email,
                        itemId: item.itemId
                    }
                }
            })
                .then(user => {
                    if (user != null) {
                        res.status(200).send(`Already notified ${item.userName}`);
                    } else {
                        User.findById(req.auth.id)
                            .then(user1 => {
                                req.body.notification['userName'] = user1.name;
                                req.body.notification['userEmail'] = req.auth.email;
                                req.body.notification.read = false;
                                req.body.notification._id = new mongoose.Types.ObjectId();

                                const io = require('../../config/socket').get();
                                io.to(item.userEmail).emit('notification', req.body.notification)

                                User.updateOne({ email: item.userEmail },
                                    { "$push": { "notifications": req.body.notification } },
                                )
                                    .then(() => {
                                        User.updateOne({ _id: req.auth.id },
                                            { "$push": { "orders": { _id: req.params.id } } }
                                        )
                                            .then(() => {
                                                res.status(200).send(`Notified ${item.userName}`);
                                            })
                                    })
                            })
                    }
                })
                .catch(next);
        })
        .catch(next);
})


//Edit a posted item                               
route.put('/:id', authToken, (req, res, next) => {
    Item.findById(req.params.id)
        .then((item) => {
            if (req.auth.email === item.userEmail) {
                Item.updateOne({ _id: req.params.id }, req.body)
                    .then(() => {
                        res.status(200).send(`Your Ad, ${item.name} has been updated`);
                    })
                    .catch(next);
            } else {
                res.status(403).end();
            }
        })
});

//-------------------------------------------------------------------------//


//Delete a posted item                              
route.delete('/:id', authToken, (req, res, next) => {
    Item.findById(req.params.id)
        .select('userEmail')
        .then(async item => {
            if (req.auth.email === item.userEmail || admin.includes(req.auth.email)) {
                await Item.findById(req.params.id)
                    .select('images')
                    .then(item => {
                        for (let image of item.images) {
                            removeFromCloudinary(image.public_id)
                                .catch(err => {
                                    console.log(err);
                                    next();
                                });
                        }
                    })
                    .catch(next);

                Item.deleteOne({ _id: req.params.id })
                    .then(() => {
                        User.updateOne({ _id: req.auth.id },
                            {
                                "$pull": { notifications: { itemId: req.params.id } },
                                "$pull": { ads: req.params.id }
                            }
                        )
                            .then(() => {
                                User.findById(req.auth.id)
                                    .select('notifications')
                                    .then(user => {
                                        res.status(200).send(user.notifications);
                                    })
                                    .catch(next);
                            })
                            .catch(next);
                    })
                    .catch(next);
            } else {
                res.status(403).end();
            }
        })
        .catch(next);
});



module.exports = route;