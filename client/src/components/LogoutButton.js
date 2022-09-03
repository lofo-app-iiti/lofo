import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPowerOff } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router';

function LogoutButton(props) {
    const history = useHistory()
    const Logout = () => {
        localStorage.setItem('accessToken',null)
        props.Logout();
        history.push('/')
        window.location.reload()
    };

    return (
        <span className='text-center'>
            <Button size='sm' className="btn-danger py-1 px-4 mt-2" onClick={()=>{Logout()}}>
                        <FontAwesomeIcon icon={faPowerOff} />{' '} Logout
            </Button>
        </span>
    )
};

const mapDispatchToProps = (dispatch) => {
    return {
        Logout: () => {
            dispatch({ type: 'CLEAR_USER' })
        }
    }
};

export default connect(null, mapDispatchToProps)(LogoutButton);