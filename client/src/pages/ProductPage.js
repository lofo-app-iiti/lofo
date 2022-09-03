import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams, withRouter } from 'react-router-dom';
import WishBtn from '../components/WishBtn';
import { connect } from 'react-redux';
import NOT_FOUND from './Not_Found';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import Spinner from '../components/Spinner';
import BuyBtn from '../components/BuyBtn';
import DeleteBtn from '../components/DeleteBtn';
import Deck from '../components/Deck';
import { toast } from 'react-toastify';
import { Button } from 'react-bootstrap';
import { fetchItemById } from '../apis';

//MAIN FUNCTION
function ProductPage(props) {
    const { user, auth } = props;
    const { id } = useParams()
    const [productDetails, setProductDetails] = useState({})
    const [images, setImages] = useState([{ url: null }])
    const [loading, setLoading] = useState(true)
    const [err, setErr] = useState(false)
    const [num, setNum] = useState(0)
    const [date, setDate] = useState('')
    const [similarItems, setSimilarItems] = useState([])
    const [orderStatus, setStatus] = useState(null)

    useEffect(() => {
        for (const elem of user.orders) {
            if (elem._id === id) {
                setStatus(elem);
            }
        }
    }, [id, user.orders])

    useEffect(() => {
        fetchItemById(id)
            .then(res => {
                setProductDetails(res.data)
                setLoading(false)
                //date
                setDate(new Date(res.data.date))

                //images
                setImages(res.data.images)

            })
            .catch(err => {
                console.log(err);
                toast.error("Failed to load product")
                setErr(true)
                setLoading(false)
            })
    }, [id])

    useEffect(() => {
        if (!productDetails.title) return
        setSimilarItems(props.items.filter(i => i.categories.includes(productDetails.categories[0] && i._id !== id)))
    }, [productDetails.categories, props.items, productDetails.title, id])

    if (loading) {
        return (
            <Spinner />
        )
    }
    else if (err) return <h2 className='text-center mt-5 text-secondary'>There is an error while loading product details.</h2>
    else {
        return (
            <> {
                !productDetails.title ? <NOT_FOUND /> :
                    <section className=" py-3 container-fluid">
                        <div className="my-3 row ">
                            <div className="col-md-6 mb-4 mb-md-0">
                                <div id="mdb-lightbox-ui" />
                                <div className="mdb-lightbox">
                                    <div className="row product-gallery mx-1">
                                        <div className="col-1 d-flex m-auto" onClick={() => setNum(prevNum => prevNum > 0 ? prevNum - 1 : prevNum)} >
                                            <FontAwesomeIcon size='lg' icon={faAngleLeft} />
                                        </div>

                                        <div className="col-10 mb-0">
                                            <figure className="text-center view overlay rounded z-depth-1 main-img">
                                                <a href={images[num].url} data-size="710x823"  >
                                                    <img alt='' src={images[num].url} className="img-fluid z-depth-1" />
                                                </a>
                                            </figure>
                                        </div>
                                        <div className="col-1 d-flex m-auto" onClick={() => setNum(prevNum => prevNum < images.length - 1 ? prevNum + 1 : prevNum)} >
                                            <FontAwesomeIcon size='lg' icon={faAngleRight} />
                                        </div>
                                        <div className="col-12 text-center">{num + 1} / {images.length}</div>

                                    </div>
                                </div>
                            </div>
                            <div className="bg-light p-3 col-md-6 bordered" >
                                <div className="d-flex justify-content-between">
                                    <h5 className='fw-bold'>{productDetails.title}</h5>
                                    <p className="mb-2 text-muted text-uppercase small">
                                        {productDetails.categories.map((cat, i) => <span key={i} className='me-3' >{cat}</span>)}
                                    </p>
                                </div>
                                <div className="my-1">
                                    {productDetails.description}
                                </div>
                                <div className="my-1 fw-bold">
                                    &#8377; {productDetails.price}
                                </div>
                                <div className="table-responsive">
                                    <div className='my-1'>
                                        Seller: {productDetails.userName}
                                    </div>
                                    <div className='my-1'>
                                        Email:
                                        <a className='ms-2' href={`mailto:${productDetails.userEmail}`}>
                                            {productDetails.userEmail}
                                        </a>

                                    </div>
                                    {
                                        productDetails.mobile &&
                                        <div className='my-1'>
                                            Mobile:
                                            <a className='ms-2' href={`tel:${productDetails.mobile}`}>
                                                {productDetails.mobile}
                                            </a>
                                        </div>
                                    }

                                    <div className='my-1'>
                                        Date:
                                        <span> {
                                            date.toString().split(' ')[0] + ', ' +
                                            date.toString().split(' ')[2] + ' ' +
                                            date.toString().split(' ')[1] + ' ' +
                                            date.toString().split(' ')[3]
                                        } </span>
                                    </div>

                                </div>
                                <hr />{
                                    props.auth ? user.ads.filter(item1 => { return item1._id === productDetails._id }).length > 0 ? <DeleteBtn toHome={true} id={id} /> :
                                        <>
                                            {
                                                orderStatus !== null ?
                                                    orderStatus.success ?
                                                        <Button size='sm' className="btn-success non-outlined-btn btn-md mr-1 mb-2" disabled  >Approved</Button>
                                                        : productDetails.sold ?
                                                            <Button size='sm' className="btn-danger non-outlined-btn btn-md mr-1 mb-2" disabled  >Sold out!</Button>
                                                            : <Button size='sm' className="btn-warning non-outlined-btn btn-md mr-1 mb-2" disabled  >Notified</Button>
                                                    : productDetails.sold ?
                                                        <Button size='sm' className="btn-danger non-outlined-btn btn-md mr-1 mb-2" disabled  >Sold out!</Button>
                                                        : auth ? <BuyBtn id={id} product={productDetails} /> : <div className="text-danger">Login to buy</div>

                                            }
                                            {!productDetails.sold && <span className='ms-2' > <WishBtn item={productDetails} />Add to wishlist </span>}
                                        </> : auth ? <BuyBtn id={id} product={productDetails} /> : <div className="text-danger">Login to buy</div>
                                }
                            </div>
                        </div>
                        <br />
                        <div className="container my-3">
                            <h6 className="mb-3">Similar Items {'>>'}</h6>
                            <Deck items={similarItems} removeSold={true} removeFav={false} />
                        </div>
                        <br />
                    </section>
            }


            </>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        user: state.user,
        auth: state.authorised,
        items: state.items
    }
}

export default withRouter(connect(mapStateToProps)(ProductPage));
