import React, { useEffect, useRef } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './ProfilePage.css';
import { connect } from 'react-redux';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import LogoutButton from '../components/LogoutButton';
import { Button } from 'react-bootstrap';
import { setMobileNumber } from '../apis';

function EditProfile(props) {
    const { name, email, imageUrl, mobile } = props.user
    const { user, items } = props
    const [mobileInput, setMobileInput] = useState('')
    const [visibility, setVisibility] = useState(false)
    const inputRef = useRef()

    const [orders, setOrders] = useState([])
    const [loadin, setLoading] = useState(true)

    function validatePhoneNumber(input_str) {
        var re = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;

        return re.test(input_str);
    }

    const handleChange = (e) => {
        setMobileInput(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validatePhoneNumber(mobileInput)) {
            toast.warning('Please enter a valide mobile number!')
            return
        }
        setVisibility(!visibility)
        setMobileNumber(mobileInput)
            .then(res => {
                const newUser = {
                    ...props.user,
                    mobile: mobileInput
                }
                props.Update(newUser);
                toast.success("Your mobile number is updated :)")
            })
            .catch(err => {
                toast.error('Something went wrong!')
                console.log(err)
            })
    }
    useEffect(() => {
        if (!props.loading) {
            var arr = []
            for (let index = 0; index < user.orders.length; index++) {
                let element = user.orders[index];
                if (items.filter(i => i._id === element._id).length > 0) {
                    element = { ...element, ...items.filter(i => i._id === element._id)[0] }
                    arr.push(element)
                }
            }
            setOrders(arr);
            setLoading(false)
        }

    }, [items, user.orders, props.loading])

    return (
        <div className="container my-4">
            <div className="main-body">
                <div className="row">
                    <div className="col-md-4 mb-3">
                        <div className="card-wrapper p-0 p-md-3">
                            <div className="profile-card">
                                <div className="card-body">
                                    <div className="d-flex flex-column align-items-center text-center">
                                        <img src={imageUrl} alt="Admin" className="rounded-circle" width={100} />
                                        <div className="mt-3">
                                            <h4>{name}</h4>
                                            <p className="text-secondary mb-1">IIT Indore</p>
                                            <p className="text-muted font-size-sm">{email}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="col-md-8">
                        <div className="card-wrapper p-0 p-md-3">
                            <div className="card mb-3">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <h6 className="mb-0">Full Name</h6>
                                        </div>
                                        <div className="col-sm-9 text-secondary">
                                            {name}
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <h6 className="mb-0">Email</h6>
                                        </div>
                                        <div className="col-sm-9 text-secondary">
                                            {email}
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <h6 className="mb-0">Mobile</h6>
                                        </div>
                                        <div className="col-sm-9 text-secondary">
                                            {mobile}
                                        </div>
                                    </div>
                                    <hr />

                                    {
                                        visibility ?
                                            <div className="row" style={{ display: visibility ? 'block' : 'none' }} >
                                                <form >
                                                    <label htmlFor="tel">Edit your Mobile number</label>
                                                    <input ref={inputRef} className='form-control' type="tel" maxLength='10' id='tel' placeholder={'0123456789'} onChange={handleChange} />
                                                    <hr />
                                                    <>
                                                        <Button type='submit' size='sm' className="btn btn-primary non-outlined-btn " onClick={handleSubmit} >Save</Button>
                                                        <Button type='reset' size='sm' className="btn btn-danger non-outlined-btn ms-3 " onClick={() => setVisibility(!visibility)} >Cancel</Button>
                                                    </>
                                                </form>
                                            </div> : <button className="btn btn-sm btn-primary non-outlined-btn " onClick={() => {
                                                setVisibility(!visibility)
                                                setTimeout(() => {
                                                    inputRef.current.focus()
                                                }, 100);

                                            }
                                            } >Edit</button>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="card-wrapper py-2 px-md-3">
                            <div className="card">
                                <div className="card-header">Wishlist</div>
                                <div className="card-body"
                                    style={{
                                        display: "flex",
                                        overflowX: "auto"
                                    }}
                                >
                                    {/* images of orders */}
                                    {
                                        props.loading ? <div>Loading...</div> : props.user.favourites.length > 0 ? props.user.favourites.map(f =>
                                            <img key={f.images[0].url} className='pe-1' alt='' src={f.images[0].url}
                                                width={80}
                                            />
                                        ) :
                                            <div className="w-100 text-secondary text-center p">Nothing!</div>
                                    }
                                </div>
                                <div className="card-footer">
                                    <div className="link text-end">
                                        <Link to='/wishlist'>
                                            View Wishlist
                                        </Link>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="card-wrapper py-2 px-md-3">
                            <div className="card">
                                <div className="card-header">Orders</div>
                                <div className="card-body"
                                    style={{
                                        display: "flex",
                                        overflowX: "auto"
                                    }}
                                >
                                    {/* images of orders */}
                                    {
                                        loadin ? <div>Loading...</div> : orders.length > 0 ? orders.map(f =>
                                            <img key={f.images[0].url} className='pe-1' alt='' src={f.images[0].url}
                                                width={80}
                                            />
                                        ) :
                                            <div className="w-100 text-secondary text-center p">Nothing!</div>
                                    }
                                </div>
                                <div className="card-footer">
                                    <div className="link text-end">
                                        <Link to='/orders'>
                                            View Orders
                                        </Link>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="card-wrapper py-2 px-md-3">
                            <div className="card">
                                <div className="card-header">Ads</div>
                                <div className="card-body"
                                    style={{
                                        display: "flex",
                                        overflowX: "auto"
                                    }}
                                >
                                    {/* images of orders */}
                                    {
                                        props.loading ? <div>Loading...</div> : props.user.ads.length > 0 ? props.user.ads.map(f =>
                                            <img key={f.images[0].url} className='pe-1' alt='' src={f.images[0].url}
                                                width={80}
                                            />
                                        ) :
                                            <div className="w-100 text-secondary text-center p">Nothing!</div>
                                    }

                                </div>
                                <div className="card-footer">
                                    <div className="link text-end">
                                        <Link to='/your-ads'>
                                            View Ads
                                        </Link>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-6 mt-auto">
                        <div className="text-center text-md-end my-2 mx-3">
                            <LogoutButton />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        loading: state.loading,
        items: state.items
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        Update: (user) => {
            dispatch({ type: 'UPDATE_USER', payload: user })
        }
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);