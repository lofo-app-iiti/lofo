import { getUser} from "../apis";

export const getUserAction = () => async (dispatch) => {
    
    let user = null
    console.log("In admin user fetch action redux")
    try{
        const {data} = await getUser()
        console.log("Fetch data",data)
        user = data.user
        
        if(!user){
            localStorage.setItem('accessToken',null)
            dispatch({ type: 'CLEAR_USER' })
        }
        else{

            const {
                _id,
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
            user.department = department
            user.graduationYear = graduationYear
            user.notifications = notifications;
            user.orders = orders
            user.ads = ads;
            user.favourites = favourites;

            dispatch({ type: 'SET_USER', payload: user })
        }
    }
    catch(error){
        localStorage.setItem('accessToken',null)
        dispatch({ type: 'CLEAR_USER' })
    }
};