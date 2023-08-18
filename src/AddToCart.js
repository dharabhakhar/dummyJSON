import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { decrement, increment, removeItem } from './App/Counter/Counter';

export default function AddToCart() {
    const dispatch = useDispatch()
    const cart = useSelector((state) => state.counter.cart)

    let totalQuantity = 0
    let totalPrice = 0
    cart.forEach(item => {
        totalQuantity += item.quantity
        totalPrice += item.price * item.quantity
    })
    return (
        <>
            <div className="cart__left">
                <div>
                    <h3>Shopping Cart</h3>
                    <div className=" container row">
                        <div className="cartItem col-8">
                            <table style={{ width: '100%' }}>
                                <tr>
                                    <th style={{ width: '10%' }}>Image</th>
                                    <th style={{ width: '20%' }}>Title</th>
                                    <th style={{ width: '20%' }}>Price</th>
                                    <th style={{ width: '10%' }}>Quantity</th>
                                    <th style={{ width: '10%' }}>Add</th>
                                    <th style={{ width: '10%' }}>Dec</th>
                                    <th style={{ width: '10%' }}>Remove</th>
                                </tr>
                                {cart?.map((item) => (
                                    <tr>
                                        <td>
                                            <img className="cartItem__image" src={item.image} alt='item' />
                                        </td>
                                        <td>
                                            <p className="cartItem__title">{item.title}</p>
                                        </td>
                                        <td>
                                            <p className="cartItem__price">
                                                <small>$</small>
                                                <strong>{item.price}</strong>
                                            </p>
                                        </td>
                                        <td>
                                            <span>{item.quantity}</span>
                                        </td>
                                        <th>
                                            <button onClick={() => dispatch(increment(item.id))} className='btn-1'>+</button>
                                        </th>
                                        <th>
                                            <button onClick={() => dispatch(decrement(item.id))} className='btn-1'>-</button>
                                        </th>
                                        <th>
                                            <button
                                                className='cartItem__removeButton btn-1'
                                                onClick={() => dispatch(removeItem(item.id))} >
                                                X
                                            </button>
                                        </th>
                                    </tr>
                                ))}
                            </table>
                        </div>
                        <div className="cartItem__total col-4">
                            <table>
                                <tr>
                                    <th>Total Items</th>
                                    <th>Total Price</th>
                                </tr>
                                <tr>
                                    <th>{totalQuantity}</th>
                                    <th><strong>${totalPrice}</strong></th>
                                </tr>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
