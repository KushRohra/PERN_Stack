import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./routes/Home";
import UpdatePage from "./routes/UpdatePage";
import RestaurantDetailsPage from "./routes/RestaurantDetailsPage";
import { RestaurantsConextProvider } from "./context/RestaurantsContext";

const App = () => {
    return (
        <RestaurantsConextProvider>
            <div className="container">
                <Router>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/restaurants/:id/update" component={UpdatePage} />
                        <Route exact path="/restaurants/:id" component={RestaurantDetailsPage} />
                    </Switch>
                </Router>
            </div>
        </RestaurantsConextProvider>
        
    )
};

export default App;