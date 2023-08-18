import React from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaCartShopping } from "react-icons/fa6";

export default function Header() {
    const navigate = useNavigate();
    const cart = useSelector((state) => state.counter.cart)

    const getTotalQuantity = () => {
        let total = 0
        cart.forEach(item => {
            total += item.quantity
        })
        return total
    }
    return (
        <div>
            <div className='shopping-cart text-white fs-3 align-self-center' onClick={() => navigate('/cart')}>
                <FaCartShopping id='cartIcon' />
                <span className='ms-2'>{getTotalQuantity() || 0}</span>
            </div>
        </div>
    )
}
