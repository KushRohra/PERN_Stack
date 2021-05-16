import React, { useContext, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import RestaurantFinder from "../apis/RestaurantFinder";
import { RestaurantsConext } from '../context/RestaurantsContext';
import StarRating from './StarRating';

const RestaurantList = (props) => {
    const {restaurants, setRestaurants} = useContext(RestaurantsConext);
    let history = useHistory();
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await RestaurantFinder.get("/");
                setRestaurants(response.data.data.restaurants);
                console.log(response);
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, []);

    const deleteRestaurant = async (e, restaurant_id) => {
        e.stopPropagation();
        try {
            const response = await RestaurantFinder.delete(`/${restaurant_id}`);
            setRestaurants(restaurants.filter(restaurant => {
                return restaurant.id !== restaurant_id
            }));
        } catch (error) {
            console.log(error);
        }
    };

    const updateRestaurant = (e, id) => {
        e.stopPropagation();
        history.push(`/restaurants/${id}/update`);
    };

    const handleRestaurantSelect = (restaurant_id) => {
        history.push(`/restaurants/${restaurant_id}`);
    }

    const renderRating = (restaurant) => {
        if (!restaurant.count) {
            return <span className="text-warning">0 reviews</span>
        }
        return (
            <>
                <StarRating rating={restaurant.average_rating} />
                <span className="text-warning ml-1">({restaurant.count})</span>
            </>
        )
    }   

    return (
        <div className="list-group">
            <table className="table table-hover table-dark">
                <thead>
                    <tr className="bg-primary">
                        <th scope="col">Restaurant</th>
                        <th scope="col">Location</th>
                        <th scope="col">Price Range</th>
                        <th scope="col">Rating</th>
                        <th scope="col">Edit</th>
                        <th scope="col">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {restaurants && restaurants.map(restaurant => {
                        return (
                            <tr onClick={() => handleRestaurantSelect(restaurant.id)} key={restaurant.id}>
                                <td>{restaurant.name}</td>
                                <td>{restaurant.location}</td>
                                <td>{"$".repeat(restaurant.price_range)}</td>
                                <td>{renderRating(restaurant)}</td>
                                <td><button onClick={(e) => updateRestaurant(e, restaurant.id)} className="btn btn-warning">Update</button></td>
                                <td><button onClick={(e) => deleteRestaurant(e, restaurant.id)} className="btn btn-danger">Delete</button></td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default RestaurantList;
