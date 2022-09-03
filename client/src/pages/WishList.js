import React, { useEffect, useState } from 'react';
import ItemList from '../components/ItemList';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import Spinner from '../components/Spinner';

function WishList(props) {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = props;

    useEffect(() => {
        if (!props.loading) {
            setItems(user.favourites);
            setLoading(false);
        }
    }, [user.favourites, props.loading]);

    return (
        loading ? <Spinner /> :
            <>
                <div className="results">
                    <h4 className='text-center py-3' >Wishlist</h4>
                </div>
                <div className='pb-5'>
                    <ItemList items={items} removeSold={false} />
                </div>
            </>
    );
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        auth: state.authorised,
        loading: state.loading
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        Update: (user) => {
            dispatch({ type: 'UPDATE_USER', payload: user })
        }
    }
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(WishList));

