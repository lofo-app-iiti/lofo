import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import NOT_FOUND from './Not_Found';
import Spinner from '../components/Spinner';
import NotifBlock from '../components/NotifBlock';

function Notifications(props) {
    const { auth } = props
    const { notifications } = props.user;
    const [notifs, setNotifs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (props.auth) {
            const raw = notifications.reverse()
            setNotifs(raw);
            setLoading(false)
        }
    }, [notifications, props.loading, notifs, props.auth])

    return (
        loading ? <Spinner /> :
            <>
                <section className="section">
                    <div className="container p-0">
                        {auth ? notifications.length > 0 ? notifs.map((n, i) => <NotifBlock content={n} key={i} />) :
                            <div className="text-center mt-5 text-secondary">No Notifications!</div> :
                            <NOT_FOUND />}
                    </div>
                </section>
            </>

    )
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

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
