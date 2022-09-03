import React, { useEffect } from 'react'
import { Card } from 'react-bootstrap';
import "./contactUs.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhone, faHandshake } from '@fortawesome/free-solid-svg-icons'

export default function ContactUs() {

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <section className='contact py-3'>
            <div className="container text-dark">
                <div className="row cards">
                    <div className="col-12 col-md-6 p-3 cardbox" data-aos="fade-up">
                        <Card style={{ width: '30rem' }} className="text-center">
                            <Card.Body>
                                <FontAwesomeIcon className='icon' icon={faPhone} size="3x" />
                                <Card.Title>Talk To Us
                                </Card.Title>
                                <Card.Text>
                                    Want to know more about LoFo's working?
                                </Card.Text>
                                <Card.Text>
                                    Suman Jaiswal: <span>+919798843855</span>
                                </Card.Text>

                            </Card.Body>
                        </Card>
                    </div>
                    <div className="col-12 col-md-6 p-3 cardbox" data-aos="fade-up">
                        <Card style={{ width: '30rem' }} className="text-center">
                            <Card.Body>
                                <FontAwesomeIcon className='icon' icon={faHandshake} size="3x" />
                                <Card.Title>Contact The Team
                                </Card.Title>
                                <Card.Text>
                                    Feel free to give feedback on the following mail.
                                </Card.Text>
                                <Card.Text>
                                    Email: <span><a href="mailto:4sale@iiti.ac.in">lofo@iiti.ac.in</a></span>
                                </Card.Text>

                            </Card.Body>
                        </Card>
                    </div>
                    <div className="col-12 p-3" data-aos="fade-up">
                        <div className="row justify-content-center">
                            <div className=" col-12 mt-3 col-md-5 text-center">
                                <div className="text-success mb-2 h5">Location</div>
                                <div className="p mb-1">
                                    In the campus of IIT Indore, Khandwa road, Simrol
                                </div>

                                <iframe title="map" className="w-100 m-0 mt-1"
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d44173.68003234819!2d75.89840349008908!3d22.530456862910512!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3962efcccbce7145%3A0x784e8cb69818596b!2sIndian%20Institute%20Of%20Technology%E2%80%93Indore%20(IIT%E2%80%93Indore)!5e0!3m2!1sen!2sin!4v1646406923144!5m2!1sen!2sin"
                                    height={200} allowFullScreen loading="lazy" />
                            </div>
                            <div className=" col-12 mt-3 mb-2 col-md-6 text-center">
                                <div className="text-success mb-3 h5">Developers</div>
                                <div className="row mt-4">
                                    <div className="col">
                                        <img src="Suman-Jaiswal.webp" alt=""
                                            style={{
                                                width: 120,
                                                borderRadius: "100%"
                                            }}
                                        />
                                        <div className="p fw-bold mt-2">Suman Jaiswal</div>
                                        <div style={{ fontSize: 14 }}>B. Tech, Electrical Engineering</div>
                                        <div style={{ fontSize: 14 }}>IIT Indore'2024</div>
                                    </div>
                                    <div className="col">
                                        <img src="jaisurya.png" alt=""
                                            style={{
                                                width: 120,
                                                borderRadius: "100%"
                                            }}
                                        />
                                        <div className="p fw-bold mt-2">Jaisurya Katla</div>
                                        <div style={{ fontSize: 14 }}>B. Tech, Mechanical Engineering</div>
                                        <div style={{ fontSize: 14 }}>IIT Indore'2024</div>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </section>
    )
}