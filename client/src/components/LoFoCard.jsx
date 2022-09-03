import { faCheckCircle, faEnvelope, faPhoneAlt, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { toast } from 'react-toastify'
import { admin, deleteLofoItem, notify } from '../apis'
import { themeColor } from '../styles'
import { SendMail } from './SendMail'

function LoFoCard(props) {

    const { user, item, setFound, setLost, auth } = props
    const [load, setLoad] = useState(false)
    const [open, setOpen] = useState(false)
    const [sending, setSending] = useState(false)

    const Delete = (id, status) => {
        setLoad(true)
        deleteLofoItem(id)
            .then(res => {
                setLoad(false)
                if (status === 'lost') {
                    setLost(prev => [...prev.filter(item => { return item._id !== id })])
                } else {
                    setFound(prev => [...prev.filter(item => { return item._id !== id })])
                }
                toast.success("Deleted");
            })
            .catch(err => {
                setLoad(false)
                console.log(err);
                toast.error("Couldn't delete");
            })
    }

    const handleClaim = ({ _id, status, title, userEmail, userName }) => {
        setSending(true)
        if (auth) {
            let notification = {
                itemTitle: title,
                mobile: user.mobile,
                dp: user.imageUrl
            }
            if (status === 'lost') {
                notification['message'] = `found your`
            } else {
                notification['message'] = `wants to claim`
            }
            notify(_id, notification)
                .then(res => {
                    const updated = {
                        ...item,
                        claimed: true
                    }
                    if (status === 'lost') {
                        setLost(prev => [...prev.filter(item => item._id !== _id), updated])
                    }
                    else {
                        setFound(prev => [...prev.filter(item => item._id !== _id), updated])
                    }
                    toast.success(res.data.message);
                })
                .catch(err => {
                    console.log(err);
                    toast.error("Failed to notify");
                })

            const data = {
                message: status === 'lost' ? "found your" : "wants to claim",
                name: user.name,
                email: user.email,
                to_email: userEmail,
                to_name: userName,
                object: title,
            }
            SendMail(data)
                .then(res => {
                    setSending(false);
                })
                .catch(err => toast.error("couldn't send mail!"))
        }
        else {
            setSending(false);
            toast.error("Please Login first");
            return;
        }
    }

    return (
        <div className='p-3 rounded' style={{ border: "1px solid #ccc" }}>

            <div className="d-flex gap-2" >
                <div className='mb-3'>
                    {
                        <img
                            style={{
                                filter: item.claimed ? "grayscale(1)" : "none"
                            }}
                            src={item.images ? item.images.url : `${item.status}.jpg`} alt="Item" className='l-f-img rounded' />
                    }
                </div>

                <div className="ms-3  w-100"
                    style={{
                        color: item.claimed && "gray"
                    }}
                >
                    <div className="d-flex justify-content-between">


                        <div className="p fw-bold">{item.title} </div>
                        <div className='d-flex'>

                            <span className="me-2">
                                {item.claimed ?
                                    <span disabled >
                                        <FontAwesomeIcon size='lg' icon={faCheckCircle} className='ms-1' />
                                    </span> :
                                    item.userEmail !== user.email ?
                                        <div className='rounded' size='sm' role={'button'} onClick={() => setOpen(true)}
                                            style={{
                                                fontSize: 13,
                                                backgroundColor: '#' + themeColor,
                                                color: "#fff",
                                                padding: "3px 8px",

                                            }}
                                        >
                                            {item.status === 'lost' ? 'I found' : "It's mine"}
                                        </div> : null
                                }
                            </span>
                            {
                                item.userEmail === user.email || admin.includes(user.email) ?
                                    <span onClick={() => Delete(item._id, item.status)} className='text-danger ms-3' role={'button'} >
                                        {
                                            load ? <i>deleting...</i> :
                                                <FontAwesomeIcon size='sm' icon={faTrash} />
                                        }
                                    </span> : null
                            }

                        </div>

                    </div>

                    <div style={{ fontSize: 13 }} >{item.date.slice(0, 10)}</div>
                    <div className="row">
                        <div className="col-12 col-md-9">
                            <div style={{ fontSize: '13px' }} > {item.userName}</div>
                            <div className="d-flex">
                                <div style={{ fontSize: '13px' }} className='me-3' >
                                    <a href={`mailto:${item.userEmail}`}>
                                        <FontAwesomeIcon icon={faEnvelope} />
                                    </a>
                                </div>
                                {
                                    item.mobile ? <div style={{ fontSize: '13px' }}  >
                                        <a href={`tel:${item.mobile}`}>
                                            <FontAwesomeIcon size='sm' icon={faPhoneAlt} />
                                        </a>

                                    </div> : null
                                }
                            </div>


                        </div>

                        <div className='col-12 col-md-2 text-center'>

                        </div>
                    </div>
                </div>
            </div>

            <div className='pt-2' style={{
                fontSize: '15px',
                color: item.claimed && "gray"
            }}>
                {item.description}
            </div>

            <Modal show={open} onHide={() => setOpen(false)}>
                <Modal.Header>Do you want to claim it?</Modal.Header>
                <Modal.Body>
                    Note: An official mail will be sent to the {item.userName} that you {item.status === 'lost' ? "found" : "own"} it.
                </Modal.Body>
                <Modal.Footer>
                    <Button size='sm' variant='danger' onClick={() => setOpen(false)} >
                        Cancel
                    </Button>
                    <Button disabled={sending} size='sm' onClick={() => handleClaim(item)} >
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
        lofoItems: state.lofoItems
    }
};

export default withRouter(connect(mapStateToProps)(LoFoCard));