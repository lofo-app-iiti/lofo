import React from 'react'
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';
import LoginButton from './LoginButton'

function LoginWidget(props) {
    const { auth } = props
    const history = useHistory();
    useEffect(() => {
        auth && history.push('/')
    })

    console.log("In login widget",auth)

    return (
        <div className="row h-100 m-0">
            <div className="col-9 d-flex align-items-center m-auto p-0 hero">
                <img src="lofo.jpg" className='my-auto w-50' alt="" />
                <img src="buy-sell.webp" className='my-auto w-50' alt="" />
            </div>
            <div className="col-12">
                <div className="d-flex px-2 gap-3 h-100 flex-column bg-light justify-content-center align-items-center"
                    style={{
                        // backgroundColor: "#01268f",
                        borderRadius: 20,
                        padding: 40

                    }}>
                    <img src="logo2.png" alt="" width={70} height={60} />
                    <div className='text-center'>
                        <div className="login">
                            <LoginButton text={'Login with Institude Id'} />
                        </div>
                        <p className='text-secondary my-2'>(iiti.ac.in)</p>
                    </div>

                </div>
            </div>
        </div>

    )
}

const mapStateToProps = (state) => {
    return {
        auth: state.authorised,
    }
};

export default (connect(mapStateToProps)(LoginWidget));