import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
            console.log("cek:", resp);
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
        <div>home</div>
    )
}

export default Home