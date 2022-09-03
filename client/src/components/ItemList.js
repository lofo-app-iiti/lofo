import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Card } from 'react-bootstrap';
import WishBtn from './WishBtn';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import DeleteBtn from './DeleteBtn';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

function ItemList(props) {
    const { user, items, auth } = props;

    if (items.length === 0) {
        return <h6 className='text-secondary text-center mt-5'>No items!</h6>;
    } else {
        return (
            <div className="container">
                <div className="row">
                    {
                        items.map((item, i) => (
                            <div key={i} className='col-6 col-md-4 col-lg-2 p-2'>

                                <Card style={{
                                    minwidth: '180px', maxWidth: 250,
                                    margin: "auto"
                                }} key={item._id} >
                                    <Link to={`/product/${item._id}`}>
                                        <Card.Img src={item.images[0].url} alt="item-img" style={{ cursor: "pointer", height: '120px' }} />
                                    </Link>
                                    <Card.Body>
                                        <div className='h6 fw-bold'>{item.title}</div>
                                        <div style={{ fontSize: '13px' }}>  &#8377; {item.price}</div>
                                    </Card.Body>
                                    <Card.Footer>
                                        <Button variant="warning" size='sm' as={Link} to={`/product/${item._id}`} ><FontAwesomeIcon icon={faCartPlus} /> View </Button>
                                        {
                                            auth ? user.ads.filter(item1 => { return item1._id === item._id }).length > 0 ?
                                                <DeleteBtn update={props.update} removeSold={props.removeSold} id={item._id} /> : !item.sold ?
                                                    <WishBtn item={item} /> : null : null
                                        }
                                    </Card.Footer>
                                </Card>
                            </div>
                        ))}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        auth: state.authorised
    }
}

export default connect(mapStateToProps)(ItemList);