import axios from 'axios';
import React from 'react';
import { useEffect, useState } from 'react';

function Category(){

    let [val, setval] = useState([])
    let [cat, setcat] = useState("")

    useEffect(() => {
        axios.get(`https://dummyjson.com/products/categories`)
            .then(function (response) {
                console.log(response.data);
                setval(response.data);
            })
            .catch(function (error) {
                console.log(error);
            })
    }, [])

    return(
        <>
        {
             val.filter((el) => {
                if (cat) {
                    return el.category.includes(cat);
                } else {
                    return el;
                }
            }).map((item) => {
                return(
                    <>
                        <button className='text-light bg-transparent' value={item} onClick={(e)=>{setcat(e.target.value)}}>{item}</button><br />
                    </>
                )
            })
        }
        
        </>
    )
}

export default Category;