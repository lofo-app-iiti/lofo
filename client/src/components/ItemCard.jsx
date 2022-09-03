import { faCartPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Button, Card } from 'react-bootstrap'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { admin } from '../apis'
import DeleteBtn from './DeleteBtn'
import WishBtn from './WishBtn'
import { themeColor } from '../styles'

function ItemCard(props) {
    const { item, user, auth } = props
    return (<>
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
                {
                    item.sold ? <span className='text-danger'>Sold out!</span> :
                        <Button size='sm' as={Link} to={`/product/${item._id}`}
                            style={{
                                backgroundColor: '#' + themeColor,
                                border: "none",
                            }}
                        ><FontAwesomeIcon className='me-1' icon={faCartPlus} /> View </Button>
                }

                {
                    auth ? user.ads.filter(item1 => { return item1._id === item._id }).length > 0 || admin.includes(user.email) ?
                        <DeleteBtn update={props.update} removeSold={props.removeSold} id={item._id} /> : !item.sold ?
                            <WishBtn item={item} /> : null : null
                }
            </Card.Footer>
        </Card>

    </>

    )
}


const mapStateToProps = (state) => {
    return {
        user: state.user,
        auth: state.authorised
    }
}

export default connect(mapStateToProps)(ItemCard);
