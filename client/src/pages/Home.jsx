import React from 'react'
import { Link} from 'react-router-dom'

export default function Home() {
    return (
        <div className="container-lg py-5">
            <div className="row">
                <div className="col-6  p-3">
                    <div className="card p-4 home-card-lost">
                        <h2>Lost Items</h2>
                        <p>'Lost Items' page contains all lost items of IITI community. People can add a lost Item there with required details.</p>
                        <Link className='non-outlined-btn text-decoration-none' to={'/lost'}>
                            <button class="button-template lost-btn">View &#8594;</button>
                        </Link>
                    </div>
                </div>
                <div className="col-6  p-3">
                    <div className="card p-4 home-card-found">
                        <h2>Found Items</h2>
                        <p>'Found Items' page contains all found items of IITI community. People can add a found Item there with required details.</p>
                        <Link className='non-outlined-btn text-decoration-none' to={'/found'}>
                            <button class="button-template found-btn">View &#8594;</button>
                        </Link>
                    </div>
                </div>
                <div className="col-6  p-3">
                    <div className="card p-4 home-card-buy">
                        <h2>Buy Items</h2>
                        <p>'Buy' page contains various items with categories, so that people can buy items with ease.</p>
                        <Link className='non-outlined-btn text-decoration-none' to={'/buy/All'}>
                            <button class="button-template buy-btn">View &#8594;</button>
                        </Link>
                    </div>
                </div>
                <div className="col-6  p-3">
                    <div className="card p-4 home-card-sell">
                        <h2>Sell Items</h2>
                        <p>One can sell their stuff to others if it’s not useful to them further or they are passing out of college.</p>
                        <Link className='non-outlined-btn text-decoration-none' to={'/buy/All'}>
                            <button class="button-template sell-btn">View &#8594;</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
