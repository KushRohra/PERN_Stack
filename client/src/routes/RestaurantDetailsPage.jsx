import React, {useEffect, useContext} from "react";
import { useParams } from "react-router-dom";
import RestaurantFinder from "../apis/RestaurantFinder";
import StarRating from "../components/StarRating";
import Reviews from "../components/Reviews";
import { RestaurantsConext } from "../context/RestaurantsContext";
import AddReview from "../components/AddReview";

const RestaurantdetailsPage = () => {
    const {id} = useParams();
    const {selectedRestaurant, setSelectedRestaurant} = useContext(RestaurantsConext)
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await RestaurantFinder.get(`/${id}`);
                setSelectedRestaurant(response.data.data);
            } catch (error) {
                console.log(error);
            }
        } 
        fetchData();
    }, [])

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

    if (selectedRestaurant) {
        return (
            <div>
                <>
                    <h1 className="text-center display-1">{selectedRestaurant.restaurants.name}</h1>
                    <div className="text-center">
                        {renderRating(selectedRestaurant.restaurants)}
                    </div>
                    <AddReview />
                    <div className="mt-3">
                        <Reviews reviews={selectedRestaurant.reviews}/>
                    </div>
                </>
            </div>
        );
    }
    else {
        return <div>Error in fetching Data</div>
    }
};

export default RestaurantdetailsPage;
