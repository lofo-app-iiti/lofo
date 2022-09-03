import { faArrowAltCircleRight, faEnvelope, faPhone, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { approve, deleteNotif } from '../apis';
import { SendMail } from './SendMail';

function NotifBlock(props) {
    const { user, Update, items } = props
    const [deleting, setDeleting] = useState(false);
    const [open, setOpen] = useState(false)
    const [sending, setSending] = useState(false)

    const { itemTitle, _id, message, userName, userEmail, mobile, dp, itemId } = props.content

    function ApproveButton(props) {
        if (props.message === "wants to buy") {
            const item = items.filter(i => i._id === props.itemId)[0];

            if (item) {
                return <button
                    disabled={item.sold}
                    type="button"
                    style={{ fontSize: '12px' }}
                    className="btn p-0 non-outlined-btn btn-transparent"
                    onClick={() => setOpen(true)}>
                    <FontAwesomeIcon icon={faArrowAltCircleRight} className='text-success me-2' />
                    {item.sold ? "Approved" : "Approve"}
                </button>
            }
            else return null;

        }
    }
    const handleApprove = (buyerEmail, itemTitle, itemId, buyerName) => {
        setSending(true)
        approve(user, buyerEmail, itemId, itemTitle, _id)
            .then(res => {
                const newItem = items.filter(i => i._id === itemId)[0]
                newItem.sold = true;
                Update({
                    ...user,
                    notifications: res.data.notifications
                },
                    itemId,
                    newItem
                )
                toast.success(`${res.data.msg} ${buyerName}`)
            })
            .catch(err => {
                toast.error("Couldn't notify")
                console.log(err)

            })

        const data = {
            message: "approved you buy request for",
            name: user.name,
            email: user.email,
            to_email: buyerEmail,
            to_name: buyerName,
            object: itemTitle,
        }
        SendMail(data)
            .then(res => {
                setSending(false);
                setOpen(false)
            })
            .catch(err => {
                setSending(false)
                setOpen(false)
                toast.error("couldn't send mail!")
                console.log(err)
            })
    }

    const handleDelete = (_id) => {
        setDeleting(true)
        const newUser = {
            ...user,
            notifications: user.notifications.filter(notif => notif._id !== _id)
        }
        deleteNotif(_id)
            .then(() => {
                toast.success('Deleted')
                setDeleting(false)
                Update(newUser);
            })
            .catch(() => {
                toast.error('Something went wrong')
            })
    };

    return (
        <div className="d-flex p-3 bg-light" key={_id}
            style={{
                borderBottom: "1px solid #ccc"
            }} >
            <div className="me-3">
                <img src={dp} alt="" style={{ width: '40px', height: '40px', borderRadius: "100%" }} />
            </div>
            <div className="w-100">
                <div className='d-flex justify-content-between'>
                    <div style={{
                        fontSize: 14,
                        marginRight: 10
                    }}>{userName}{' '} {message}{' '}{itemTitle}</div>
                    <div role={'button'} className='text-danger'>
                        {deleting ? <i>deleting...</i> :
                            <FontAwesomeIcon icon={faTrash} size='sm' onClick={() => handleDelete(_id)} />
                        }
                    </div>
                </div>
                <div className="contacts d-flex flex-column flex-md-row">
                    <span>
                        {
                            userEmail && <a href={`mailto:${userEmail}`}>
                                <FontAwesomeIcon size='sm' icon={faEnvelope} /> <span style={{ fontSize: 13 }} className="text-primary ms-1 me-3">
                                    {userEmail}
                                </span>
                            </a>
                        }
                    </span>

                    <span>
                        {
                            mobile && <a href={`tel:${mobile}`}>
                                <FontAwesomeIcon size='sm' icon={faPhone} /><span style={{ fontSize: 13 }} className="mobile text-primary ms-1 me-3">
                                    {mobile}
                                </span>
                            </a>
                        }
                    </span>
                </div>


                <div>
                    {
                        message === "wants to buy" ?
                            <ApproveButton
                                itemTitle={itemTitle}
                                message={message}
                                buyerEmail={userEmail}
                                itemId={itemId}
                                buyerName={userName}

                            /> : null
                    }
                </div>
            </div>
            <Modal show={open} onHide={() => setOpen(false)}>
                <Modal.Header>Do you want to claim it?</Modal.Header>
                <Modal.Body>
                    Note: An official mail will be sent to the {userName} that you approved his/her buy request for {itemTitle}.
                </Modal.Body>
                <Modal.Footer>
                    <Button size='sm' variant='danger' onClick={() => setOpen(false)} >
                        Cancel
                    </Button>
                    <Button disabled={sending} size='sm'
                        onClick={() => handleApprove(userEmail, itemTitle, itemId, userName)} >
                        {sending ? <i>Sending...</i> : "Send"}
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        auth: state.authorised,
        loading: state.loading,
        items: state.items
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        Update: (user, itemId, doc) => {
            dispatch({ type: 'UPDATE_USER', payload: user })
            dispatch({ type: 'UPDATE_ITEM', payload: { id: itemId, doc } })
        },
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(NotifBlock);