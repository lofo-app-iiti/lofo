import React, { useState, useEffect } from 'react';
import { Link, useParams, withRouter } from 'react-router-dom';
import "./BuyStyle.css"
import Spinner from '../components/Spinner';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBasketballBall, faBook, faGamepad, faShoppingCart, faSplotch, faStore } from '@fortawesome/free-solid-svg-icons';
import ItemCard from '../components/ItemCard';
import { connect } from 'react-redux';
import { themeColor } from '../styles';

function Buy(props) {
    const [search, setSearch] = useState('')
    const { category } = useParams()
    const [items, setItems] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true)
        setItems(props.items);
        setLoading(false);
    }, [props.items])

    useEffect(() => {
        category === 'All' ? setItems(props.items.filter(i => i.title.includes(search))) :
            setItems(prevState => prevState.filter(i => i.categories.includes(category) && i.title.includes(search)));
    }, [category, props.items, search])

    const handleChange = (e) => {
        setSearch(e.target.value)
    };
    const handleSubmit = (e) => {
        e.preventDefault()
        setSearch(e.target.value)
    };

    return (
        <>
            <section>
                <div className="container-fluid px-4">
                    <div className="row">
                        <div className="col-12 p-0 p-md-2 d-flex flex-column-reverse flex-md-column col-md-3 col-lg-2">

                            <Form onSubmit={handleSubmit} className='my-3 px-md-2' >
                                <InputGroup>
                                    <Form.Control placeholder="Search items..." className='non-outlined-btn' onChange={handleChange} />
                                    {/* <Button type='submit' ><FontAwesomeIcon icon={faSearch} /></Button> */}
                                </InputGroup>

                            </Form>
                            <div className="row px-0 px-md-4">

                                <div style={{ borderBottom: '1px solid #cccccc' }} className="col-2 px-0 col-md-12 text-center text-md-start">
                                    <Button as={Link} to='/buy/All' className='non-outlined-btn w-100 text-md-start category-btn' variant='transparent'
                                        style={{
                                            color: category === "All" ? '#' + themeColor : "#212529",
                                            fontWeight: category === "All" ? "bold" : "normal"
                                        }}
                                    >
                                        <FontAwesomeIcon icon={faStore} />
                                        <span className='ms-2 d-none d-md-inline'
                                        >All</span>
                                    </Button>
                                </div>

                                <div style={{ borderBottom: '1px solid #cccccc' }} className="col-2 px-0 col-md-12 text-center text-md-start">
                                    <Button as={Link} to='/buy/Sports' className='non-outlined-btn w-100 text-md-start category-btn' variant='transparent'
                                        style={{
                                            color: category === "Sports" ? '#' + themeColor : "#212529",
                                            fontWeight: category === "Sports" ? "bold" : "normal"
                                        }}
                                    >
                                        <FontAwesomeIcon icon={faBasketballBall} />
                                        <span className='ms-2 d-none d-md-inline'
                                        >Sports</span>
                                    </Button>
                                </div>

                                <div style={{ borderBottom: '1px solid #cccccc' }} className="col-2 px-0 col-md-12 text-center text-md-start">
                                    <Button as={Link} to='/buy/Books' className='non-outlined-btn w-100 text-md-start category-btn' variant='transparent'
                                        style={{
                                            color: category === "Books" ? '#' + themeColor : "#212529",
                                            fontWeight: category === "Books" ? "bold" : "normal"
                                        }}
                                    >
                                        <FontAwesomeIcon icon={faBook} />
                                        <span className='ms-2 d-none d-md-inline'
                                        >Books</span>
                                    </Button>
                                </div>

                                <div style={{ borderBottom: '1px solid #cccccc' }} className="col-2 px-0 col-md-12 text-center text-md-start">
                                    <Button as={Link} to='/buy/Games' className='non-outlined-btn w-100 text-md-start category-btn' variant='transparent'
                                        style={{
                                            color: category === "Games" ? '#' + themeColor : "#212529",
                                            fontWeight: category === "Games" ? "bold" : "normal"
                                        }}
                                    >
                                        <FontAwesomeIcon icon={faGamepad} />
                                        <span className='ms-2 d-none d-md-inline'
                                        >Games</span>
                                    </Button>
                                </div>

                                <div style={{ borderBottom: '1px solid #cccccc' }} className="col-2 px-0 col-md-12 text-center text-md-start">
                                    <Button as={Link} to='/buy/Utilities' className='non-outlined-btn w-100 text-md-start category-btn' variant='transparent'
                                        style={{
                                            color: category === "Utilities" ? '#' + themeColor : "#212529",
                                            fontWeight: category === "Utilities" ? "bold" : "normal"
                                        }}
                                    >
                                        <FontAwesomeIcon icon={faSplotch} />
                                        <span className='ms-2 d-none d-md-inline'
                                        >Utilities</span>
                                    </Button>
                                </div>

                                <div style={{ borderBottom: '1px solid #cccccc' }} className="col-2 px-0 col-md-12 text-center text-md-start">
                                    <Button as={Link} to='/buy/Other' className='non-outlined-btn w-100 text-md-start category-btn' variant='transparent'
                                        style={{
                                            color: category === "Other" ? '#' + themeColor : "#212529",
                                            fontWeight: category === "Other" ? "bold" : "normal"
                                        }}
                                    >
                                        <FontAwesomeIcon icon={faShoppingCart} />
                                        <span className='ms-2 d-none d-md-inline'
                                        >Other</span>
                                    </Button>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-md-9 col-lg-10" style={{ borderLeft: '1px solid #cccccc' }}>

                            <div className="row">

                                <div className="col-12 py-3" style={{ height: '80vh', overflowY: 'scroll' }} >
                                    {
                                        loading ? <Spinner /> :
                                            <div className="row px-md-3">
                                                <div className="text-center d-md-none">{category}</div>
                                                {items.length === 0 ?
                                                    <h6 className='text-center text-secondary mt-5' >No Items!</h6> :
                                                    items.map((item, i) => (
                                                        <div key={i} className='col-6 col-md-4 col-lg-3 p-2'>
                                                            <ItemCard item={item} />
                                                        </div>
                                                    ))}
                                            </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )


}
const mapStateToProps = (state) => {
    return {
        user: state.user,
        auth: state.authorised,
        items: state.items
    }
};
export default withRouter(connect(mapStateToProps)(Buy));

