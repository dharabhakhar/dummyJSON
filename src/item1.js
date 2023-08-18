import axios from 'axios';
import React from 'react';
import { useEffect, useState } from 'react';
import Box from '../node_modules/@mui/material/Box';
import Rating from '../node_modules/@mui/material/Rating';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from './App/Counter/Counter';
import { useNavigate } from 'react-router-dom';

function Item1() {
    let { id } = useParams();
    let [val, setval] = useState(null)
    const count = useSelector((state) => state.counter.value);
    const dispatch = useDispatch()
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`https://dummyjson.com/products/${id}`)
            .then(function (response) {
                console.log(response.data);
                setval(response.data);
                var title = response.data.title;
                localStorage.setItem('title', title);
                const image = response.data.thumbnail;
                localStorage.setItem('image', image)
                const price = response.data.price;
                localStorage.setItem('price', price)
            })
            .catch(function (error) {
                console.log(error);
            })
    }, [id])
    if (!val) {
        return (
            <>
                <div>Loading...</div>
            </>
        )
    }
    const handleClick = (image) => {
        setval({ ...val, thumbnail: image });
    }

    const title = localStorage.getItem('title');
    const image = localStorage.getItem('image');
    const price = localStorage.getItem('price');

    return (
        <>
            <div className="">
                <div className="container">
                    <div className="spacer">
                        <h1 className='text-center mb-5'>Product Detail</h1>

                        <div className="row pt-5">
                            <div className="col-auto">
                                <div className="thumb-img">
                                    {
                                        val.images.map((image) => {
                                            return (
                                                <>
                                                    <div class="item">
                                                        <img src={image} alt="" onClick={() => handleClick(image)} />
                                                    </div>
                                                </>
                                            )
                                        })}
                                </div>
                            </div>
                            <div className="col-5">
                                <div className="product_img">
                                    <img src={val.thumbnail} alt="" />
                                </div>

                            </div>
                            <div className="col-5 ps-5">
                                <h1 className='display-3 fw-bold'>{val.title}</h1>
                                <p className='fs-3'>{val.description}</p>
                                <hr />
                                <Box
                                    sx={{
                                        width: 200,
                                        display: 'flex',
                                        alignItems: 'center',
                                    }}
                                >
                                    <span className='mb-1'>{val.rating}</span>
                                    <Rating
                                        name="text-feedback"
                                        value={val.rating}
                                        readOnly
                                        precision={0.2}
                                    />
                                </Box>

                                <span>1,490 rating | </span>
                                <span className=''>104 answered questions</span><br /><br />
                                <span className='bg-dark text-light px-3 py-1'>customer`s choice</span>
                                {/* <span className=''>{val.stock} in stock</span> */}
                                <hr />
                                <span className="text-danger fs-4">-{val.discountPercentage}% </span>
                                <span className=' my-2 fs-2'><span className='fs-4 align-top'>&#8377;</span>{val.price}</span>
                                <p>Inclusive of all taxes</p>
                                <span>{val.stock} in stock</span>
                                <p><span className='fw-bold'>EMI</span> starts at ₹200. No Cost EMI available</p>

                                <button className='button' onClick={() => dispatch(addToCart({ id, title, image, price }))
                                }>Add To Cart</button>
                                <button className='button' onClick={() => navigate('/cart')}>Go To Cart</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>

    )
}

export default Item1;