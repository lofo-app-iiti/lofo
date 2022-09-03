import React, { useEffect, useState } from 'react';
import Sell from './pages/Sell';
import Profile from './pages/ProfilePage';
import { Route, useHistory} from 'react-router-dom';
import Favourites from './pages/WishList';
import Ads from './pages/Ads';
import Notifications from './pages/Notifications';
import Orders from './pages/Orders';
import Home from './pages/Home';
import LostPage from './pages/LostPage';
import FoundPage from './pages/FoundPage';
import Buy from './pages/Buy';
import ProductPage from './pages/ProductPage';
import { connect } from 'react-redux';
import {getUser} from './apis/index'

function Body(props) {

    console.log("In body")
    const history = useHistory();

    const {Logout,setUser,auth,user} = props;
    const [pageLoading, setPageLoading] = useState(null)

    useEffect(() => {

        setPageLoading(true);

        const getUserHelper = async () => {
            
            let user = null
            console.log("In admin user fetch action redux")
            try{
                const {data} = await getUser()
                console.log("Fetch data",data)
                user = data.user
                
                if(!user){
                    console.log("User not found")
                    localStorage.setItem('accessToken',null)
                    Logout()
                }
                else{
                    console.log("User found")
                    const {
                        _id,
                        // imageUrl,
                        mobile,
                        program,
                        department,
                        graduationYear,
                        notifications,
                        orders,
                        ads,
                        favourites,  //will be changed to wishlist
                    } = user
                
                    user._id = _id;
                    user.mobile = mobile
                    user.program = program
                    user.imageUrl = localStorage.getItem('imageUrl')
                    user.department = department
                    user.graduationYear = graduationYear
                    user.notifications = notifications;
                    user.orders = orders
                    user.ads = ads;
                    user.favourites = favourites;

                    console.log("returning ",user)
        
                    setUser({user:user});
                }
            }
            catch(error){
                console.log("error ",error)
                localStorage.setItem('accessToken',null)
                Logout();
                history.push('/')
            }

            setPageLoading(false);
        };

        getUserHelper(); 

        return () => {
            // this now gets called when the component unmounts
        };
    },[Logout,setUser,history]);


    return (
        <>
        {
            (auth && user._id!=='' && !pageLoading)?
            <>
            <Route key={0} path='/notifications' exact component={Notifications} />
            <Route key={1} path='/profile' exact component={Profile} />
            <Route key={2} path='/wishlist' exact component={Favourites} />
            <Route key={3} path='/your-ads' exact component={Ads} />
            <Route key={4} path='/orders' exact component={Orders} />
            <Route path='/' exact component={Home} />
            <Route path='/buy/:category' exact component={Buy} />
            <Route path='/product/:id' exact component={ProductPage} />
            <Route path='/sell' exact component={Sell} />
            <Route path='/lost' exact component={LostPage} />
            <Route path='/found' exact component={FoundPage} />
            </>:""
        }
        
        </>
    )
}


const mapStateToProps = (state) => {
    return {
        user : state.user,
        auth: state.authorised,
        loading: state.loading
    }
};


const mapDispatchToProps = (dispatch) => {
    return {
        setUser : (data) => {
            console.log("set user action ",data)
            dispatch({ type: 'SET_USER', payload: data })
        },
        Logout: () => {
            dispatch({ type: 'CLEAR_USER' })
        }
    }
};

export default connect(mapStateToProps,mapDispatchToProps)(Body);