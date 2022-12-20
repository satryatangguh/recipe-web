import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../Home/Home.css"

const Home = () => {
    const [food, setFood] = useState([]);

    const getFoodData = () => {
        const headers = localStorage.getItem("token")
        ? {
            apiKey: "w05KkI9AWhKxzvPFtXotUva-",
            Authorization: `Bearer ${localStorage.getItem(`token`)}`,
            }
            : { apiKey: "w05KkI9AWhKxzvPFtXotUva-" };
        axios({
            method: "get",
            url: "https://api-bootcamp.do.dibimbing.id/api/v1/foods",
            headers: headers,
    
        }).then((resp) => {
            console.log(resp);
            setFood(resp.data.data);
        
        }).catch((error) => {
            console.error(error);
            alert("Error, try reloading the page");
        });
    };

    useEffect(() => {
        getFoodData();
    }, []);
        
    return (
        <>
            <div className='container-fluid'>
                <h1 className='title text-center'>Our Recipes</h1>
                <div className='row row-cols-2 row-cols-md-3 row-cols-lg-5 g-4 mx-3'>
                    {food && food.map((r) => {
                        return (
                            <div className='card-group' key={r.id}>
                                <div className='card h-100 shadow mt-3'>
                                    <img
                                        src={r.imageUrl}
                                        className='card-img-top mx-auto'
                                        style={{ objectFit: "cover", width: "100%", height: "200px"}}
                                        alt={r.name}
                                    />
                                    <div className='card-body'>
                                        <h5 className='card-title text-center text-capitalize fs-5 mb-4'>{r.name}</h5>
                                        <p className='card-text fs-6 mb-1 fw-bold'>Desc: <span className='fw-normal'>{r.description}</span></p>
                                        <p className='card-text fs-6 mb-1 fw-bold'>Ingredients: {r.ingredients.map((m, index) => {
                                            return (
                                                <span className='fw-normal' key={index}>
                                                    {(index ? ", " : " ") + m}
                                                </span>
                                            );
                                        })}</p>
                                        
                                    </div>

                                </div>


                            </div>
                        )
                    })}
                </div>

            </div>
        
        </>
    )
}

export default Home