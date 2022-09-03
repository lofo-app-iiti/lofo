import Navbar from './components/Navbar';
import Body from './Body';
import Footer from './components/Footer';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ScrollToTop from './components/ScrollToTop';
import { connect } from 'react-redux';
import io from 'socket.io-client';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { baseURL, fetchItems, fetchLofoItems } from './apis';
import Spinner from './components/Spinner';
import { Route, Switch, useHistory } from 'react-router-dom';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import LoginWidget from './components/LoginWidget';

function App(props) {
    const history = useHistory()

    const { user, Update, auth, authLoading, accessToken, setItems, setLofoItems } = props;
    const { notifications } = props.user
    const [pageLoading, setPageLoading] = useState(null)

    console.log("In app")
    console.log("app.js ",auth,accessToken)

    axios.interceptors.response.use((response) => {
        return response
        }, async function (error) {
        if (error.response.status === 403) {
            console.log("Interceptor")
            localStorage.setItem('accessToken',null)
            props.Logout();
            history.push('/')
        }
        return Promise.reject(error);
    });
    

    const socket = useRef(null);
    const notifs = useRef(notifications);
    const addNotif = useRef(null);

    useEffect(() => {
        const ENDPOINT = baseURL;
        socket.current = io(ENDPOINT, { transports: ['websocket', 'polling'] })
    }, [auth]);

    useEffect(() => {
        if (auth) {
            socket.current.emit('join', user.email);

            socket.current.on('notification', (notif) => {
                addNotif.current(notif)
                toast.success(notif.userName + ' ' + notif.message + ' ' + notif.itemTitle)
            });
        }
    }, [auth, user.email, addNotif]);

    useEffect(() => {
        notifs.current = notifications;
    }, [authLoading, notifications, auth])

    useEffect(() => {
        setPageLoading(authLoading);
        setPageLoading(true)
        fetchItems.then(res => setItems(res.data))
            .catch(e => console.log(e));
        fetchLofoItems.then(res => setLofoItems(res.data))
            .catch(e => console.log(e));
        setPageLoading(false)

    }, [auth, authLoading, setItems, setLofoItems])

    useEffect(() => {
        addNotif.current = notif => {
            Update({
                ...user,
                notifications: [...notifs.current, notif]
            })
        }
    }, [user, Update])

    return (
        <>
            <Navbar />
            <div style={{ minHeight: '82vh' }}>
                <Switch>
                    <Route path='/about' exact component={AboutUs} />
                    <Route path='/contact' exact component={ContactUs} />
                    {
                        pageLoading ? <Spinner /> : auth ? <Body /> : <LoginWidget />
                    }
                </Switch>
            </div>
            <ScrollToTop />
            <Footer />
            <ToastContainer
                position="bottom-right"
                autoClose={3000}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                draggable
                pauseOnHover
            />
        </>
    );
}

let mapStateToProps = (state) => {
    return {
        user: state.user,
        auth: state.authorised,
        authLoading: state.authLoading,
        accessToken: state.accessToken
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        Update: (user) => {
            dispatch({ type: 'UPDATE_USER', payload: user })
        },
        setItems: (items) => {
            dispatch({ type: "SET_ITEMS", payload: items })
        },
        setLofoItems: (lofoItems) => {
            dispatch({ type: "SET_LOFOITEMS", payload: lofoItems })
        },
        Logout: () => {
            dispatch({ type: 'CLEAR_USER' })
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
