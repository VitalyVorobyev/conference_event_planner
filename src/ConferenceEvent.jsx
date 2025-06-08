import { useState } from "react";
import "./ConferenceEvent.css";
import TotalCost from "./TotalCost";

import { useSelector, useDispatch } from "react-redux";
import { incrementQuantity, decrementQuantity } from "./venueSlice";

const NavigationBar = (props) => {
    return (
        <navbar className="navbar_event_conference">
            <div className="company_logo">Conference Expense Planner</div>
            <div className="left_navbar">
                <div className="nav_links">
                    <a href="#venue" onClick={() => props.navigateToProducts("#venue")} >
                        Venue
                    </a>
                    <a href="#addons" onClick={() => props.navigateToProducts('#addons')}>
                        Add-ons
                    </a>
                    <a href="#meals" onClick={() => props.navigateToProducts('#meals')}>
                        Meals
                    </a>
                </div>
                <button className="details_button" onClick={() => props.setShowItems(!showItems)}>
                    Show Details
                </button>
            </div>
        </navbar>
    );
};

const ButtonContainer = (props) => {
    return (
        <div className="button_container">
            {props.venueItems[index].name === "Auditorium Hall (Capacity:200)" ? (
                <>
                    <button
                        className={props.venueItems[index].quantity === 0 ? "btn-warning btn-disabled" : "btn-minus btn-warning"}
                        onClick={() => props.handleRemoveFromCart(index)}
                    >
                        &#8211;
                    </button>
                    <span className="selected_count">
                        {props.venueItems[index].quantity > 0 ? ` ${props.venueItems[index].quantity}` : "0"}
                    </span>
                    <button
                        className={props.remainingAuditoriumQuantity === 0? "btn-success btn-disabled" : "btn-success btn-plus"}
                        onClick={() => props.handleAddToCart(index)}
                    >
                        &#43;
                    </button>
                </>
            ) : (
                <div className="button_container">
                    <button
                        className={props.venueItems[index].quantity ===0 ? " btn-warning btn-disabled" : "btn-warning btn-plus"}
                        onClick={() => props.handleRemoveFromCart(index)}
                    >
                        &#8211;
                    </button>
                    <span className="selected_count">
                        {props.venueItems[index].quantity > 0 ? ` ${props.venueItems[index].quantity}` : "0"}
                    </span>
                    <button
                        className={props.venueItems[index].quantity === 10 ? " btn-success btn-disabled" : "btn-success btn-plus"}
                        onClick={() => props.handleAddToCart(index)}
                    >
                        &#43;
                    </button>
                </div>
            )}
        </div>
    );
};

const ItemsDisplaySection = (props) => {
    <div className="items-information">
        <div id="venue" className="venue_container container_main">
            <div className="text">
                <h1>Venue Room Selection</h1>
            </div>
            <div className="venue_selection">
                {props.venueItems.map((item, index) => (
                    <div className="venue_main" key={index}>
                        <div className="img">
                            <img src={item.img} alt={item.name} />
                        </div>ItemsDisplaySection
                        <div className="text">
                            {item.name}
                        </div>
                        <div>
                            ${item.cost}
                        </div>
                        <ButtonContainer {...props} />
                    </div>
                ))}
            </div>
            <div className="total_cost">
                Total Cost: ${props.venueTotalCost}
            </div>
        </div>
        {/*Necessary Add-ons*/}
        <div id="addons" className="venue_container container_main">
            <div className="text">
                <h1> Add-ons Selection</h1>
            </div>
            <div className="addons_selection">
            </div>
            <div className="total_cost">
                Total Cost:
            </div>
        </div>
        {/* Meal Section */}
        <div id="meals" className="venue_container container_main">
            <div className="text">
                <h1>Meals Selection</h1>
            </div>
            <div className="input-container venue_selection">
            </div>
            <div className="meal_selection">
            </div>
            <div className="total_cost">
                Total Cost:
            </div>
        </div>
    </div>
};

const ConferenceEvent = () => {
    const [showItems, setShowItems] = useState(false);
    const [numberOfPeople, setNumberOfPeople] = useState(1);

    const venueItems = useSelector((state) => state.venue);
    const dispatch = useDispatch();
    const remainingAuditoriumQuantity = 3 - venueItems.find(item => item.name === "Auditorium Hall (Capacity:200)").quantity;


    const handleToggleItems = () => {
        console.log("handleToggleItems called");
        setShowItems(!showItems);
    };

    const handleAddToCart = (index) => {
        if (venueItems[index].name === "Auditorium Hall (Capacity:200)" && venueItems[index].quantity >= 3) {
            return;
        }
        dispatch(incrementQuantity(index));
    };

    const handleRemoveFromCart = (index) => {
        if (venueItems[index].quantity > 0) {
            dispatch(decrementQuantity(index));
        }
    };

    const handleIncrementAvQuantity = (index) => {
    };

    const handleDecrementAvQuantity = (index) => {
    };

    const handleMealSelection = (index) => {

    };

    const getItemsFromTotalCost = () => {
        const items = [];
    };

    const items = getItemsFromTotalCost();

    const ItemsDisplay = ({ items }) => {

    };

    const calculateTotalCost = (section) => {
        let totalCost = 0;
        if (section === "venue") {
            venueItems.forEach((item) => {
                totalCost += item.cost * item.quantity;
            });
        }
        return totalCost;
    };
    const venueTotalCost = calculateTotalCost("venue");

    const navigateToProducts = (idType) => {
        if (idType == '#venue' || idType == '#addons' || idType == '#meals') {
            if (showItems) { // Check if showItems is false
                setShowItems(!showItems); // Toggle showItems to true only if it's currently false
            }
        }
    };

    return (
        <>
            <NavigationBar
                navigateToProducts={navigateToProducts}
                setShowItems={setShowItems}
                showItems={showItems}
            />
            <div className="main_container">
                {!showItems ?
                    <ItemsDisplaySection
                        venueItems={venueItems}
                        venueTotalCost={venueTotalCost}
                        remainingAuditoriumQuantity={remainingAuditoriumQuantity}
                        handleRemoveFromCart={handleRemoveFromCart}
                        handleAddToCart={handleAddToCart}
                        handleIncrementAvQuantity={handleIncrementAvQuantity}
                        handleDecrementAvQuantity={handleDecrementAvQuantity}
                        handleMealSelection={handleMealSelection}
                    /> :
                    <div className="total_amount_detail">
                        <TotalCost
                            totalCosts={venueTotalCost}
                            handleClick={handleToggleItems}
                            ItemsDisplay={() => <ItemsDisplay items={items} />} />
                    </div>
                }
            </div>
        </>
    );
};

export default ConferenceEvent;
