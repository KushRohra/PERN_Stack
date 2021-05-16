require("dotenv").config()
const express = require("express");
const db = require("./db");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Get all restaurants
app.get('/api/v1/restaurants', async (req, res) => {
    try {
        const restaurantRatingsData = await db.query("select * from pern.restaurants left join (select restaurant_id, COUNT(*), TRUNC(AVG(rating),1) as average_rating from pern.reviews group by restaurant_id) reviews on restaurants.id = reviews.restaurant_id");
        res.status(200).json({
            "status": "success",
            "results": restaurantRatingsData.rows.length,
            "data": {
                "restaurants": restaurantRatingsData.rows
            }
        });
    } catch (error) {
        console.log(error);
    }
})

// Get A Resturant
app.get('/api/v1/restaurants/:restaurant_id', async (req, res) => {
    try {
        const restaurant = await db.query("select * from pern.restaurants left join (select restaurant_id, COUNT(*), TRUNC(AVG(rating),1) as average_rating from pern.reviews group by restaurant_id) reviews on restaurants.id = reviews.restaurant_id where id = $1", [req.params.restaurant_id]);
        const reviews = await db.query("select * from pern.reviews where restaurant_id = $1", [req.params.restaurant_id]);
        res.status(200).json({
            "status": "success",
            "data": {
                "restaurants": restaurant.rows[0],
                "reviews": reviews.rows
            }
        });
    } catch (error) {
        console.log(error);
    }
});

// Create a Resturant
app.post('/api/v1/restaurants', async (req, res) => {
    try {
        const result = await db.query("INSERT INTO pern. restaurants(name, location, price_range) VALUES($1, $2, $3) returning *", [req.body.name, req.body.location, req.body.price_range])
        res.status(201).json({
            "status": "sucess",
            "data": {
                "restaurants": result.rows[0]
            }
        });
    } catch (error) {
        console.log(error);
    }
});

// Update a Resturant
app.put('/api/v1/restaurants/:resturant_id', async (req, res) => {
    try {
        const result = await db.query("UPDATE pern.restaurants SET name = $1, location = $2, price_range = $3 where id = $4 returning *", [req.body.name, req.body.location, req.body.price_range, req.params.resturant_id]);
        res.status(200).json({
            "status": "sucess",
            "data": {
                "restaurants": result.rows[0]
            }
        });
    } catch (error) {
        console.log(error);
    }
    
});

app.delete('/api/v1/restaurants/:resturant_id', async (req, res) => {
    try {
        const result = await db.query("DELETE FROM pern.restaurants WHERE id = $1", [req.params.resturant_id]);
        res.status(204).json({
            "status": "sucess"
        });
    } catch (error) {
        console.log(error);
    }
});

app.post('/api/v1/restaurants/:restaurant_id/addReview', async (req, res) => {
    try {  
        const newReview = await db.query("INSERT INTO pern.reviews(restaurant_id, name, review, rating) values($1, $2, $3, $4) returning *", [req.params.restaurant_id, req.body.name, req.body.review, req.body.rating]);
        res.status(201).json({
            "status": "success",
            "data": {
                "review": newReview.rows[0]
            }
        })        
    } catch (error) {
        console.log(error);
    }
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Server is up and running on port ${port}`);
});
