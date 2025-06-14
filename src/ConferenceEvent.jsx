import { useState } from "react";
import "./ConferenceEvent.css";
import TotalCost from "./TotalCost";
import PropTypes from "prop-types";

import { useSelector, useDispatch } from "react-redux";
import { incrementQuantity, decrementQuantity } from "./venueSlice";
import { incrementAvQuantity, decrementAvQuantity } from "./avSlice";
import { toggleMealSelection } from "./mealsSlice";

const NavigationBar = (props) => {
    return (
        <nav className="navbar_event_conference">
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
                <button className="details_button" onClick={() => props.setShowItems(!props.showItems)}>
                    Show Details
                </button>
            </div>
        </nav>
    );
};

NavigationBar.propTypes = {
    navigateToProducts: PropTypes.func.isRequired,
    setShowItems: PropTypes.func.isRequired,
    showItems: PropTypes.bool.isRequired,
};

const ButtonContainer = (props) => {
    const index = props.index;
    const isAuditorium = props.item.name === "Auditorium Hall (Capacity:200)";
    const quantity = props.item.quantity;
    return (
        <div className="button_container">
            <button
                className={quantity === 0 ? "btn-warning btn-disabled" : "btn-minus btn-warning"}
                onClick={() => props.handleRemoveFromCart(index)}
            >
                &#8211;
            </button>
            <span className="selected_count">
                {quantity > 0 ? ` ${quantity}` : "0"}
            </span>
            <button
                className={
                    isAuditorium
                        ? (props.remainingAuditoriumQuantity === 0 ? "btn-success btn-disabled" : "btn-success btn-plus")
                        : (quantity === 10 ? "btn-success btn-disabled" : "btn-success btn-plus")
                }
                onClick={() => props.handleAddToCart(index)}
            >
                &#43;
            </button>
        </div>
    );
};

ButtonContainer.propTypes = {
    item: PropTypes.shape({
        img: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        cost: PropTypes.number.isRequired,
        quantity: PropTypes.number.isRequired
    }).isRequired,
    index: PropTypes.number.isRequired,
    remainingAuditoriumQuantity: PropTypes.number.isRequired,
    handleRemoveFromCart: PropTypes.func.isRequired,
    handleAddToCart: PropTypes.func.isRequired
};

const VenueItem = (props) => {
    return (
        <div className="venue_main" key={props.index}>
            <div className="img">
                <img src={props.item.img} alt={props.item.name} />
            </div>
            <div className="text">
                {props.item.name}
            </div>
            <div>
                ${props.item.cost}
            </div>
            <ButtonContainer
                item={props.item}
                index={props.index}
                remainingAuditoriumQuantity={props.remainingAuditoriumQuantity}
                handleRemoveFromCart={props.handleRemoveFromCart}
                handleAddToCart={props.handleAddToCart}
            />
        </div>
    );
};

VenueItem.propTypes = {
    item: PropTypes.shape({
        img: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        cost: PropTypes.number.isRequired
    }).isRequired,
    index: PropTypes.number.isRequired,
    venueItems: PropTypes.array.isRequired,
    remainingAuditoriumQuantity: PropTypes.number.isRequired,
    handleRemoveFromCart: PropTypes.func.isRequired,
    handleAddToCart: PropTypes.func.isRequired
};

const VenueItems = (props) => {
    return (
    <div id="venue" className="venue_container container_main">
        <div className="text">
            <h1>Venue Room Selection</h1>
        </div>
        <div className="venue_selection">
            {props.venueItems.map((item, index) => (
                <VenueItem key={index} item={item} index={index}
                    remainingAuditoriumQuantity={props.remainingAuditoriumQuantity}
                    handleRemoveFromCart={props.handleRemoveFromCart}
                    handleAddToCart={props.handleAddToCart}
                />
            ))}
        </div>
        <div className="total_cost">
            Total Cost: ${props.venueTotalCost}
        </div>
    </div>
    );
};

VenueItems.propTypes = {
    venueItems: PropTypes.arrayOf(PropTypes.shape({
        img: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        cost: PropTypes.number.isRequired,
        quantity: PropTypes.number.isRequired
    })).isRequired,
    venueTotalCost: PropTypes.number.isRequired,
    remainingAuditoriumQuantity: PropTypes.number.isRequired,
    handleRemoveFromCart: PropTypes.func.isRequired,
    handleAddToCart: PropTypes.func.isRequired
};

const AvItem = (props) => {
    return (
        <div className="av_data venue_main" key={props.index}>
            <div className="img">
                <img src={props.item.img} alt={props.item.name} />
            </div>
            <div className="text">
                {props.item.name}
            </div>
            <div>
                ${props.item.cost}
            </div>
            <div className="addons_btn">
                <button className="btn-warning" onClick={() => props.handleDecrementAvQuantity(props.index)}> &ndash; </button>
                <span className="quantity-value">{props.item.quantity}</span>
                <button className=" btn-success" onClick={() => props.handleIncrementAvQuantity(props.index)}> &#43; </button>
            </div>
        </div>
    );
};

AvItem.propTypes = {
    item: PropTypes.shape({
        img: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        cost: PropTypes.number.isRequired,
        quantity: PropTypes.number.isRequired
    }).isRequired,
    index: PropTypes.number.isRequired,
    handleIncrementAvQuantity: PropTypes.func.isRequired,
    handleDecrementAvQuantity: PropTypes.func.isRequired
};

const AvItems = (props) => {
    return (
        <div id="addons" className="venue_container container_main">
            <div className="text">
                <h1> Add-ons Selection</h1>
            </div>
            <div className="addons_selection">
                {props.avItems.map((item, index) => (
                    <AvItem key={index} item={item} index={index}
                        handleIncrementAvQuantity={props.handleIncrementAvQuantity}
                        handleDecrementAvQuantity={props.handleDecrementAvQuantity}
                    />
                ))}
            </div>
            <div className="total_cost">
                Total Cost: {props.avTotalCost}
            </div>
        </div>
    );
};

AvItems.propTypes = {
    avItems: PropTypes.arrayOf(PropTypes.shape({
        img: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        cost: PropTypes.number.isRequired,
        quantity: PropTypes.number.isRequired
    })).isRequired,
    avTotalCost: PropTypes.number.isRequired,
    handleIncrementAvQuantity: PropTypes.func.isRequired,
    handleDecrementAvQuantity: PropTypes.func.isRequired
};

const MealsItems = (props) => {
    return (
        <div id="meals" className="venue_container container_main">
            <div className="text">
                <h1>Meals Selection</h1>
            </div>
            <div className="input-container venue_selection">
                <label htmlFor="numberOfPeople">
                    <h3>Number of People:</h3>
                </label>
                <input type="number" className="input_box5" id="numberOfPeople" value={props.numberOfPeople}
                    onChange={(e) => props.setNumberOfPeople(parseInt(e.target.value))}
                    min="1"
                />
            </div>
            <div className="meal_selection">
                {props.mealsItems.map((item, index) => (
                    <div className="meal_item" key={index} style={{ padding: 15 }}>
                        <div className="inner">
                            <input type="checkbox" id={ `meal_${index}` }
                                checked={ item.selected }
                                onChange={() => props.handleMealSelection(index)}
                            />
                            <label htmlFor={`meal_${index}`}> {item.name} </label>
                        </div>
                        <div className="meal_cost">${item.cost}</div>
                    </div>
                ))}
            </div>
            <div className="total_cost">
                Total Cost: {props.mealsTotalCost}
            </div>
        </div>
    );
};

MealsItems.propTypes = {
    mealsItems: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        cost: PropTypes.number.isRequired,
        selected: PropTypes.bool.isRequired,
        numberOfPeople: PropTypes.number
    })).isRequired,
    mealsTotalCost: PropTypes.number.isRequired,
    numberOfPeople: PropTypes.number.isRequired,
    setNumberOfPeople: PropTypes.func.isRequired,
    handleMealSelection: PropTypes.func.isRequired
};

const ItemsDisplay = (props) => {
    console.log(props.items);
    return (
        <div className="display_box1">
            {props.items.length === 0 && <p>No items selected</p>}
            <table className="table_item_data">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Unit Cost</th>
                        <th>Quantity</th>
                        <th>Subtotal</th>
                    </tr>
                </thead>
                <tbody>
                    {props.items.map((item, index) => (
                        <tr key={index}>
                            <td>{item.name}</td>
                            <td>${item.cost}</td>
                            <td>
                                {item.type === "meals" || item.numberOfPeople
                                ? ` For ${props.numberOfPeople} people`
                                : item.quantity}
                            </td>
                            <td>{item.type === "meals" || item.numberOfPeople
                                ? `${item.cost * props.numberOfPeople}`
                                : `${item.cost * item.quantity}`}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

ItemsDisplay.propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        cost: PropTypes.number.isRequired,
        quantity: PropTypes.number,
        type: PropTypes.string.isRequired
    })).isRequired,
    numberOfPeople: PropTypes.number
};

const ItemsDisplaySection = (props) => {
    return (
    <div className="items-information">
        <VenueItems
            venueItems={props.venueItems}
            venueTotalCost={props.venueTotalCost}
            remainingAuditoriumQuantity={props.remainingAuditoriumQuantity}
            handleRemoveFromCart={props.handleRemoveFromCart}
            handleAddToCart={props.handleAddToCart}
        />
        <AvItems
            avItems={props.avItems}
            avTotalCost={props.avTotalCost}
            handleIncrementAvQuantity={props.handleIncrementAvQuantity}
            handleDecrementAvQuantity={props.handleDecrementAvQuantity}
        />
        <MealsItems
            mealsItems={props.mealsItems}
            mealsTotalCost={props.mealsTotalCost}
            numberOfPeople={props.numberOfPeople}
            setNumberOfPeople={props.setNumberOfPeople}
            handleMealSelection={props.handleMealSelection}
        />
    </div>
    )
};

ItemsDisplaySection.propTypes = {
    venueItems: PropTypes.arrayOf(PropTypes.shape({
        img: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        cost: PropTypes.number.isRequired,
        quantity: PropTypes.number.isRequired
    })).isRequired,
    venueTotalCost: PropTypes.number.isRequired,
    remainingAuditoriumQuantity: PropTypes.number.isRequired,
    avItems: PropTypes.arrayOf(PropTypes.shape({
        img: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        cost: PropTypes.number.isRequired,
        quantity: PropTypes.number.isRequired
    })).isRequired,
    avTotalCost: PropTypes.number.isRequired,
    mealsItems: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        cost: PropTypes.number.isRequired,
        selected: PropTypes.bool.isRequired,
        numberOfPeople: PropTypes.number
    })).isRequired,
    mealsTotalCost: PropTypes.number.isRequired,
    numberOfPeople: PropTypes.number.isRequired,
    setNumberOfPeople: PropTypes.func.isRequired,
    handleMealSelection: PropTypes.func.isRequired,
    handleRemoveFromCart: PropTypes.func.isRequired,
    handleAddToCart: PropTypes.func.isRequired,
    handleIncrementAvQuantity: PropTypes.func.isRequired,
    handleDecrementAvQuantity: PropTypes.func.isRequired
};

const ConferenceEvent = () => {
    const [showItems, setShowItems] = useState(false);
    const [numberOfPeople, setNumberOfPeople] = useState(1);

    const venueItems = useSelector((state) => state.venue);
    const avItems = useSelector((state) => state.av);
    const mealsItems = useSelector((state) => state.meals);

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
        dispatch(incrementAvQuantity(index));
    };

    const handleDecrementAvQuantity = (index) => {
        dispatch(decrementAvQuantity(index));
    };

    const handleMealSelection = (index) => {
        const item = mealsItems[index];
        if (item.selected && item.type === "mealForPeople") {
            // Ensure numberOfPeople is set before toggling selection
            const newNumberOfPeople = item.selected ? numberOfPeople : 0;
            dispatch(toggleMealSelection(index, newNumberOfPeople));
        } else {
            dispatch(toggleMealSelection(index));
        }
    };

    const getItemsFromTotalCost = () => {
        const items = [];
        venueItems.forEach((item) => {
          if (item.quantity > 0) {
            items.push({ ...item, type: "venue" });
          }
        });
        avItems.forEach((item) => {
          if (
            item.quantity > 0 &&
            !items.some((i) => i.name === item.name && i.type === "av")
          ) {
            items.push({ ...item, type: "av" });
          }
        });
        mealsItems.forEach((item) => {
          if (item.selected) {
            const itemForDisplay = { ...item, type: "meals" };
            if (item.numberOfPeople) {
              itemForDisplay.numberOfPeople = numberOfPeople;
            }
            items.push(itemForDisplay);
          }
        });
        return items;
    };
    const items = getItemsFromTotalCost();

    const calculateTotalCost = (section) => {
        let totalCost = 0;
        if (section === "venue") {
            venueItems.forEach((item) => {
                totalCost += item.cost * item.quantity;
            });
        } else if (section === "av") {
            avItems.forEach((item) => {
                totalCost += item.cost * item.quantity;
            });
        } else if (section === "meals") {
            mealsItems.forEach((item) => {
                if (item.selected) {
                  totalCost += item.cost * numberOfPeople;
                }
              });
        }
        return totalCost;
    };

    const venueTotalCost = calculateTotalCost("venue");
    const avTotalCost = calculateTotalCost("av");
    const mealsTotalCost = calculateTotalCost("meals");
    const totalCost = {
        venue: venueTotalCost,
        av: avTotalCost,
        meals: mealsTotalCost,
    };

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
                        avItems={avItems}
                        mealsItems={mealsItems}
                        venueTotalCost={venueTotalCost}
                        avTotalCost={avTotalCost}
                        mealsTotalCost={mealsTotalCost}
                        remainingAuditoriumQuantity={remainingAuditoriumQuantity}
                        handleRemoveFromCart={handleRemoveFromCart}
                        handleAddToCart={handleAddToCart}
                        handleIncrementAvQuantity={handleIncrementAvQuantity}
                        handleDecrementAvQuantity={handleDecrementAvQuantity}
                        handleMealSelection={handleMealSelection}
                        numberOfPeople={numberOfPeople}
                        setNumberOfPeople={setNumberOfPeople}
                    /> :
                    <div className="total_amount_detail">
                        <TotalCost
                            totalCosts={totalCost}
                            handleClick={handleToggleItems}
                            ItemsDisplay={() => <ItemsDisplay items={items} numberOfPeople={numberOfPeople} />} />
                    </div>
                }
            </div>
        </>
    );
};

export default ConferenceEvent;
