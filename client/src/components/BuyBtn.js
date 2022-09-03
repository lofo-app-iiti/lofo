import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { buyItem } from '../apis';
import { SendMail } from './SendMail';

function BuyBtn(props) {
    const { user, auth, id, product } = props;
    const [open, setOpen] = useState(false)
    const [sending, setSending] = useState(false)

    const handleBuy = () => {
        setSending(true)
        if (auth) {
            buyItem(id, product.title, user.mobile, user.imageUrl)
                .then(res => {
                    const newUser = {
                        ...user,
                        orders: [
                            { success: false, _id: id },
                            ...user.orders
                        ]
                    };
                    props.Update(newUser);
                    toast.success(res.data);
                })
                .catch(err => {
                    toast.error("Failed to notify seller");
                    console.log(err.message)
                })

            const data = {
                message: "wants to buy",
                name: user.name,
                email: user.email,
                to_email: product.userEmail,
                to_name: product.userName,
                object: product.title,
            }
            SendMail(data)
                .then(res => {
                    setSending(false);
                    setOpen(false)
                })
                .catch(err => toast.error("couldn't send mail!"))
        }
        else {
            toast.error("Please Login first ");
        }
    };
    return (
        <>

            <Button onClick={() => setOpen(true)} size='sm' type="button" className="btn-warning non-outlined-btn btn-md mr-1 mb-2">
                Buy now
            </Button>

            <Modal show={open} onHide={() => setOpen(false)}>
                <Modal.Header>Do you want to claim it?</Modal.Header>
                <Modal.Body>
                    Note: An official mail will be sent to the {product.userName} that you want to buy it.
                </Modal.Body>
                <Modal.Footer>
                    <Button size='sm' variant='danger' onClick={() => setOpen(false)} >
                        Cancel
                    </Button>
                    <Button disabled={sending} size='sm' onClick={handleBuy} >
                        {sending ? <i>Sending...</i> : "Send"}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        auth: state.authorised
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        Update: (user) => {
            dispatch({ type: 'UPDATE_USER', payload: user })
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(BuyBtn);