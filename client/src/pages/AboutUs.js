import { faHeart } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { themeColor } from '../styles'
import './AboutUs.css'

export default function AboutUs() {
    return (
        <>
            {/* about lofo */}
            <div className="container-fluid mt-2 py-5 px-3">
                <div className="container">
                    <div className="row p-0">
                        <div className='col-8 my-auto'>
                            <h2 className="display-6 fw-bold ">The LoFo App</h2>
                            <p className="">LoFo is a network developed by a group of undergraduate students from IIT Indore.It is an app which resolves the problem of lost/found and buying/selling in college life of students and residents.
                            </p>
                            <br />
                        </div>
                        <div className='col-4 box'>
                            <img className=" ms-5 w-75" alt="" src="logo.webp" />
                        </div>

                        <div className='col-12'>

                            <h6 className='fw-bold'>Future Plans</h6>
                            <p>
                                Future plans are to make customization and  modifications by extending the backend to be compatible for web clients and to make a convenient and easily operated mobile app.
                            </p>
                            <br />

                        </div>

                    </div>
                </div>

            </div>


            {/* lost found */}
            <div className="container-fluid deep mt-2 py-5 px-3">
                <div className="container">
                    <div className="row p-0">
                        <div className='col-8 my-auto'>
                            <h2 className="display-6 fw-bold">Lost and Found</h2>
                            <p className="">Students in their restless schedule are likely expected to misplace or forget some of their stuff.
                                This creates crucial concerns for the students.
                            </p>
                            <br />
                        </div>
                        <div className='col-4 box'>
                            <img className="w-100 " alt="" src="lofo.jpg" />
                        </div>

                        <div className='col-12'>

                            <h5 className='fw-bold'>Instructions:</h5>
                            <p>To register yourself on the site, login with your institute email id (@iiti.ac.in).</p>
                            <p>
                                <span style={{ fontWeight: 'bold' }}>If you found something:</span> Navigate to the <span style={{ fontWeight: 'bold' }}>Lost</span> section and check if the item you found has been listed by the owner or not.
                                <ul>
                                    <li>
                                        If the item is present, you can click/tap the <span style={{ fontWeight: 'bold' }}>
                                            <span className='rounded' size='sm'
                                                style={{
                                                    fontSize: 13,
                                                    backgroundColor: '#' + themeColor,
                                                    color: "#fff",
                                                    padding: "3px 8px",

                                                }}
                                            >
                                                I found
                                            </span>
                                        </span> button which would then send and automated email to the owner.
                                    </li>
                                    <li>
                                        If the item is not present, tap on the <span style={{ fontWeight: 'bold' }}>
                                            <span className='rounded' size='sm'
                                                style={{
                                                    fontSize: 13,
                                                    backgroundColor: '#' + themeColor,
                                                    color: "#fff",
                                                    padding: "3px 8px",

                                                }}
                                            >
                                                Add +
                                            </span>
                                        </span> button and enter the item details accordingly. Select the <span style={{ fontWeight: 'bold' }}>found</span> option for the item status.
                                    </li>
                                </ul>
                            </p>
                            <br />
                            <p>
                                <span style={{ fontWeight: 'bold' }}>If you lost something: </span>Navigate to the <span style={{ fontWeight: 'bold' }}>Found</span> section and check if your belonging has been listed as found by any resident of the institute or not.
                                <ul>
                                    <li>
                                        If the item has been listed tap/click on the <span style={{ fontWeight: 'bold' }}>
                                            <span className='rounded' size='sm'
                                                style={{
                                                    fontSize: 13,
                                                    backgroundColor: '#' + themeColor,
                                                    color: "#fff",
                                                    padding: "3px 8px",

                                                }}
                                            >
                                                It's mine
                                            </span>
                                        </span> button to claim it. An automated email would be sent to the the person who found it.
                                    </li>
                                    <li>
                                        If the item has not been listed, tap on the <span style={{ fontWeight: 'bold' }}>
                                            <span className='rounded' size='sm'
                                                style={{
                                                    fontSize: 13,
                                                    backgroundColor: '#' + themeColor,
                                                    color: "#fff",
                                                    padding: "3px 8px",

                                                }}
                                            >
                                                Add +
                                            </span>
                                        </span> button and fill in the item's details. Select the status to be <span style={{ fontWeight: 'bold' }}>lost</span>. You'd get an email once anyone find it.
                                    </li>
                                </ul>
                            </p>

                        </div>

                    </div>
                </div>

            </div>


            {/* buy sell */}
            <div className="container-fluid mt-2 py-5 px-3">
                <div className="container">
                    <div className="row p-0">
                        <div className='col-8 my-auto'>
                            <h2 className="display-6 fw-bold">Buying and Selling</h2>
                            <p className="">Students can sell their stuff to new students and residents if it’s not useful to them further or they are passing out of college. This will help students to get products at a budget price without having any inconvenience.
                            </p>
                            <br />
                        </div>
                        <div className='col-4 box'>
                            <img className="w-100 " alt="" src="buy-sell.webp" />
                        </div>

                        <div className='col-12'>

                            <h5 className='fw-bold'>Instructions:</h5>
                            <p>To register yourself on the site, login with your institute email id (@iiti.ac.in).</p>
                            <p>
                                {/* edit of buying and selling */}
                                <span style={{ fontWeight: 'bold' }}>Buy:</span> There is a buy section where you can find items with categories.
                                <ul>
                                    <li>
                                        You can send buy request to the owner of item by clicking the <span style={{ fontWeight: 'bold' }}>
                                            <span className='rounded' size='sm'
                                                style={{
                                                    fontSize: 13,
                                                    backgroundColor: "#ffca2c",
                                                    color: "#000",
                                                    padding: "3px 8px",

                                                }}
                                            >
                                                Buy Now
                                            </span>
                                        </span> button which would then send and automated email to the owner.
                                    </li>
                                    <li>
                                        You can wishlist the item by clicking the <span style={{ fontWeight: 'bold' }}>
                                            <span className='rounded' size='sm'
                                                style={{
                                                    fontSize: 13,
                                                    color: '#' + themeColor,
                                                    padding: "3px 8px",

                                                }}
                                            >
                                                <FontAwesomeIcon size='lg' icon={faHeart} />
                                            </span>
                                        </span> button.
                                    </li>
                                </ul>
                            </p>
                            <br />
                            <p>
                                <span style={{ fontWeight: 'bold' }}>Sell: </span>There is a section where you can post for selling you spares or giveaway.
                                <ul>
                                    <li>
                                        Fill the required details in the form and post.
                                    </li>
                                    <li>
                                        When someone send the buy request for your item, you will recieve notification and automated mail. You can approve it in the notification section and contact the buyer with the given details.
                                    </li>
                                </ul>
                            </p>

                        </div>

                    </div>
                </div>

            </div>


            {/* join team */}
            <div className="container-fluid deep mt-2 py-5 px-3">
                <div className="container">
                    <div className="row p-0">
                        <div className='col-8 my-auto'>
                            <h2 className="display-6 fw-bold">Contributions</h2>
                            {/* edit of join team */}
                            <p className=""><b>Contributers are welcome!</b><br />
                                If you are interested to contribute in LoFo, you can create issues on github and make the changes followed by pull request. Better code will be merged to the main code. Give Feedback on  <a href="mailto:lofo@iiti.ac.in">lofo@iiti.ac.in</a>
                            </p>
                            <br />
                        </div>
                        <div className='col-4 box'>
                            <img className="w-100 " alt="" src="join-our-team.jpg" />
                        </div>
                        <div className='col-12'>
                            <h5 className='fw-bold'>Join our Team</h5>
                            <br />
                            <div className="d-flex">
                                <div className="" style={{
                                    width: 90,
                                    borderRadius: "100%"
                                }}>
                                    <img src="Suman-Jaiswal.webp" alt=""
                                        style={{
                                            width: 100,
                                            borderRadius: "100%"
                                        }}
                                    />
                                    <div className="p text-center mt-2 ms-2">Suman</div>
                                </div>
                                <div className="" style={{
                                    width: 90,
                                    borderRadius: "100%"
                                }}>
                                    <img src="jaisurya.png" alt=""
                                        style={{
                                            width: 100,
                                            borderRadius: "100%"
                                        }}
                                    />
                                    <div className="p text-center mt-2 ms-2">Jaisurya</div>

                                </div>
                            </div>
                        </div>

                    </div>
                </div>

            </div>


        </>
    )
}
