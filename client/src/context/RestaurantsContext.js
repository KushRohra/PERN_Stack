import { React, useState, createContext } from "react";

export const RestaurantsConext = createContext();
export const RestaurantsConextProvider = props => {
    const [restaurants, setRestaurants] = useState([]);
    const [selectedRestaurant, setSelectedRestaurant] = useState(null);

    const addRestaurants = (restaurant) => {
        setRestaurants([...restaurants, restaurant ])
    }

    return (
        <RestaurantsConext.Provider value={{restaurants, setRestaurants, addRestaurants, selectedRestaurant, setSelectedRestaurant}}>
            {props.children}
        </RestaurantsConext.Provider>
    )
};