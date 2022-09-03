import React from 'react';
import './Footer.css'

const Footer = () => {

    return (
        <>
            <div className=" footer container-fluid p-3 px-4" >
                <div className="row text-secondary" >

                    <div className="col-12 col-md-6 text-center text-md-start">
                        <div style={{ fontSize: 14 }}>
                            LoFo | IIT Indore &copy; 2022
                        </div>
                    </div>
                    <div className="col-12 col-md-6 text-center text-md-end">
                        <div style={{ fontSize: 14 }} >
                            An initiative by Students of IIT Indore
                        </div>
                    </div>
                </div>

            </div>

        </>
    )
}

export default Footer;
