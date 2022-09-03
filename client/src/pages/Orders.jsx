import React, { useEffect, useState } from 'react';
import ItemList from '../components/ItemList';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import Spinner from '../components/Spinner';

function Orders(props) {

    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)
    const { user, items } = props

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
        <>
            {
                loading ? <Spinner /> :
                    <>
                        <div className="results">
                            <h4 className='text-center py-3' >Orders</h4>
                        </div>
                        {
                            orders.length > 0 ?
                                <>
                                    <div className='pb-5 container'>
                                        <h6>Pending Orders {'>>'}</h6>
                                        <ItemList items={orders.filter(o => o.sold === false)} removeSold={false} />
                                    </div>
                                    <div className='pb-5 container'>
                                        <h6>Approved Orders {'>>'}</h6>
                                        <ItemList items={orders.filter(o => o.sold === true)} removeSold={false} />
                                    </div>
                                </> :
                                <div className='text-secondary text-center mt-5'>Nothing to show!</div>
                        }
                    </>
            }
        </>
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
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Orders));

