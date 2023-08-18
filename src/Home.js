import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as React from 'react';
import Box from '../node_modules/@mui/material/Box';
import Rating from '../node_modules/@mui/material/Rating';
import Header from './Header';

function Home() {
    let [val, setval] = useState([])
    let [cat, setcat] = useState([])
    let [search, setsearch] = useState("");

    useEffect(() => {
        Promise.all([
            axios.get('https://dummyjson.com/products'),
            axios.get('https://dummyjson.com/products/categories')
        ])
            .then(function (response) {
                console.log(response[0].data.products);
                setval(response[0].data.products);
                setcat(response[1].data);
            })
            .catch(function (error) {
                console.log(error);
            })
    }, [])

    const handleclick = (item) => {
        console.log(item);
        axios.get(`https://dummyjson.com/products/category/${item}`)
            .then(function (response) {
                console.log(response.data);
                setval(response.data.products)
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    return (
        <>
            <h1 className='text-center display-2 spacer fw-bold text-uppercase text-dark'>product list</h1>

            <div className="bg-dark">
                <div className="container spacer">
                    <div  className='row'>
                    <span className='text-light text-uppercase col-11'> search :
                        <input type="search" className='mb-5 w-75' onChange={(e) => { setsearch(e.target.value) }} value={search} />
                    </span>
                    <div className="col-1">
                    <Header />
                    </div>
                    </div>

                    <div className="row">
                        <div className="col-3">
                            {
                                cat.map((item, i) => {
                                    return (
                                        <>
                                            <Link value={item} onClick={() => { handleclick(item) }} className='text-light'>{item}</Link><br />
                                        </>
                                    )
                                })
                            }
                        </div>

                        <div className="col-9">
                            {
                                val.filter((el) => {
                                    if (search) {
                                        return el.title.includes(search);
                                    } else {
                                        return el;
                                    }
                                }).map((item) => {
                                    return (
                                        <>
                                            <div className="item_sec bg-secondary bg-opacity-10 rounded row mb-5">

                                                <div className="item_img col-4 ps-0">
                                                    <img src={item.thumbnail} alt="" />
                                                    <div className="dis text-center">{item.discountPercentage}%<br /><span>off</span></div>
                                                    <div className="brand text-center">{item.brand}<br /></div>
                                                </div>

                                                <div className="item_detail p-3 col-8">
                                                    <h3 className='text-light text-center my-3'>{item.title}</h3>
                                                    <p className='text-secondary'>{item.description}</p>
                                                    <hr className='text-secondary' />

                                                    <Box
                                                        sx={{
                                                            width: 200,
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                        }}
                                                    >
                                                        <Rating
                                                            name="text-feedback"
                                                            value={item.rating}
                                                            readOnly
                                                            precision={0.2}
                                                        />
                                                        <span className='text-light'>{item.rating}</span>
                                                    </Box>

                                                    <div className="price d-flex justify-content-between">
                                                        <span className='text-light my-2 fs-3'><span className='fs-6 align-top'>&#8377;</span>{item.price}<span className='fs-6 align-bottom fw-light'>({item.discountPercentage}% off)</span></span>
                                                        <span className='text-light align-self-center small'>{item.stock} in stock</span>
                                                    </div>

                                                    <div className="button">
                                                        <Link to={`/product/${item.id}`} className='button' >click</Link>
                                                    </div>

                                                </div>
                                            </div>
                                        </>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home