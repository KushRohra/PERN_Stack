import React, {useState, useEffect} from 'react'
import { useHistory, useParams } from 'react-router-dom'
import RestaurantFinder from '../apis/RestaurantFinder';

const UpdateRestaurant = (props) => {
    const {id} = useParams();

    let history = useHistory();

    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [priceRange, setPriceRange] = useState("");

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await RestaurantFinder.get(`/${id}`);
                const restaurant_details = response.data.data.restaurants;
                setName(restaurant_details.name);
                setLocation(restaurant_details.location);
                setPriceRange(restaurant_details.price_range)
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, []);

    const updateRestaurantDetails = async (e) => {
        e.preventDefault();
        const updatedRestaurant = await RestaurantFinder.put(`/${id}`,{
            name,
            location,
            price_range: priceRange > 5 ? 5 : priceRange
        });
        history.push("/")
    }

    return (
        <div>
            <form action="">
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input value={name} onChange={(e) => setName(e.target.value)} type="text" id="name" className="form-control" placeholder="Restaurant Name" />
                </div>
                <div className="form-group">
                    <label htmlFor="location">Location:</label>
                    <input value={location} onChange={(e) => setLocation(e.target.value)} type="text" id="location" className="form-control" placeholder="Restaurant Location" />
                </div>
                <div className="form-group">
                    <label htmlFor="price_range">Price Range:</label>
                    <input value={priceRange} onChange={(e) => setPriceRange(e.target.value)} type="number" id="price_range" className="form-control" min={1} max={5} />
                </div>
                <button onClick={updateRestaurantDetails} type="submit" className="btn btn-primary">Update</button>
            </form>
        </div>
    )
}

export default UpdateRestaurant
