import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';
import { Button } from 'react-bootstrap';
import { addToWishlist, removeFromWishlist } from '../apis';


const WishBtn = (props) => {
    const { Auth } = props;
    const { user } = props;
    console.log("in wish btn ",Auth,user)
    if (Auth) {
        const favourite = (item) => {
            const newUser = {
                ...user
            };
            newUser.favourites.push(item)
            props.Update(newUser);
            addToWishlist(item._id)
                .catch(err => {
                    console.log(err);
                })
        };

        const removeFavourite = (item) => {
            const newUser = {
                ...user,
                favourites: user.favourites.filter(item1 => item1._id !== item._id)
            };
            props.Update(newUser);
            removeFromWishlist(item._id)
                .catch(err => {
                    console.log(err)
                })
        }

        function Contains(_id) {
            let i;
            for (i = 0; i < user.favourites.length; i++) {
                if (_id === user.favourites[i]._id) {
                    return true;
                }
            }
            return false;
        };

        //Main Function
        if (Contains(props.item._id)) {
            return <Button size='sm' onClick={() => removeFavourite(props.item)} variant='transparent' className="non-outlined-btn text-success" ><FontAwesomeIcon size='lg' icon={faHeart} /></Button>
        } else {
            return <Button size='sm' onClick={() => favourite(props.item)} variant='transparent' className="non-outlined-btn text-success" ><FontAwesomeIcon size='lg' icon={farHeart} /></Button>
        }
    } else {
        return null;
    }
};


const mapStateToProps = (state) => {
    return {
        user: state.user,
        Auth: state.authorised
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        Update: (user) => {
            dispatch({ type: 'UPDATE_USER', payload: user })
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(WishBtn);