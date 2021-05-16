import React, {useState, useContext} from 'react';
import RestaurantFinder from "../apis/RestaurantFinder";
import { RestaurantsConext } from '../context/RestaurantsContext';

const AddResturant = () => {
    const {addRestaurants} = useContext(RestaurantsConext)
    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [priceRange, setPriceRange] = useState("Price Range");

    const addRestaurant = async (e) => {
        e.preventDefault();
        try {
            const response = await RestaurantFinder.post("/", {
                name,
                location,
                price_range: priceRange > 5 ? 5 : priceRange
            });
            addRestaurants(response.data.data.restaurants);
            setName("");
            setLocation("");
            setPriceRange("");
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="mb-4">
            <form action="">
                <div className="form-row">
                    <div className="col">
                        <input value={name} onChange={e => setName(e.target.value)} type="text" className="form-control" placeholder="Restaurant Name" />
                    </div>
                    <div className="col">
                        <input value={location} onChange={e => setLocation(e.target.value)} type="text" className="form-control" placeholder="Location" />
                    </div>
                    <div className="col">
                        <select value={priceRange} onChange={e => setPriceRange(e.target.value)} className="custom-select my-1 mr-sm-2">
                            <option disabled>Price Range</option>
                            <option value="1">$</option>
                            <option value="2">$$</option>
                            <option value="3">$$$</option>
                            <option value="4">$$$$</option>
                            <option value="5">$$$$$</option>
                        </select>
                    </div>
                    <button onClick={addRestaurant} type="submit" className="btn btn-primary">Add</button>
                </div>
            </form>
        </div>
    );
};

export default AddResturant;