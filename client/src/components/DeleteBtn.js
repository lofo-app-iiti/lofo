import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { toast } from 'react-toastify';
import { deleteItem } from '../apis';

function DeleteBtn(props) {
    const { id, toHome } = props;
    const { user } = props;
    const [load, setLoad] = useState(false)
    const Delete = () => {
        setLoad(true)
        deleteItem(id)
            .then(res => {
                toast.success("Ad deleted successfully")
                setLoad(false)
                props.removeItem(id);

                if (toHome) {
                    props.history.push('/buy/All');
                }

                if (props.removeSold) {
                    props.update(id);
                }

                const newUser = {
                    ...user,
                    ads: user.ads.filter(item => { return item._id !== id }),
                    notifications: [...res.data]
                }
                props.Update(newUser);
            })
            .catch(err => {
                setLoad(false)
                console.log(err.message);
                toast.error("Couldn't delete Ad!")
            })
    };
    return (
        <span onClick={Delete} className='text-danger ms-3' role={'button'} >
            {
                load ? <i>deleting...</i> :
                    <FontAwesomeIcon icon={faTrash} />
            }
        </span>

    )
};
const mapStateToProps = (state) => {
    return {
        user: state.user,
        auth: state.authorised
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        Update: (user) => {
            dispatch({ type: 'UPDATE_USER', payload: user })
        },
        removeItem: (id) => {
            dispatch({ type: 'DELETE_ITEM', payload: id })
        }
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DeleteBtn));