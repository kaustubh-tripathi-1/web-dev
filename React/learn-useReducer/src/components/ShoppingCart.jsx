import "./ShoppingCart.css";
import { useReducer } from "react";

function cartReducer(state, action) {
    switch (action.type) {
        case "addItem": {
            return {
                items: [
                    ...state.items,
                    {
                        id: crypto.randomUUID(),
                        name: action.payload.item.name,
                        quantity: action.payload.item.quantity,
                        price: action.payload.item.price,
                    },
                ],
            };
        }
        case "deleteItem": {
            return {
                items: state.items.filter(
                    (item) => item.id !== action.payload.id
                ),
            };
        }
        case "incrementCount": {
            return {
                items: state.items.map((item) => {
                    if (item.id === action.payload.id) {
                        return {
                            ...item,
                            quantity: item.quantity + 1,
                        };
                    }
                    return item;
                }),
            };
        }
        case "decrementCount": {
            return {
                items: state.items.map((item) => {
                    if (item.id === action.payload.id) {
                        return {
                            ...item,
                            quantity: item.quantity - 1,
                        };
                    }
                    return item;
                }),
            };
        }
        case "clearCart": {
            return { items: [] };
        }

        default:
            return state;
    }
}

const initialCart = {
    items: [],
};

export default function ShoppingCart() {
    const [state, dispatch] = useReducer(cartReducer, initialCart);

    return (
        <main className="cart-container">
            <h1>Shopping Cart</h1>
            <button
                onClick={() => {
                    dispatch({
                        type: "addItem",
                        payload: {
                            item: { name: "Laptop", quantity: 1, price: 56000 },
                        },
                    });
                }}
            >
                Add Laptop
            </button>
            <button
                onClick={() => {
                    dispatch({
                        type: "addItem",
                        payload: {
                            item: {
                                name: "SSD - 1TB",
                                quantity: 1,
                                price: 5000,
                            },
                        },
                    });
                }}
            >
                Add SSD 1TB
            </button>
            <ul className="cart-list">
                {state.items.length > 0 ? (
                    state.items.map((item) => (
                        <li key={item.id} className="cart-item">
                            <span className="item-name">{item.name}</span>
                            <span className="item-price">
                                ${item.price.toFixed(2)}
                            </span>
                            <div className="quantity-controls">
                                <button
                                    onClick={() =>
                                        dispatch({
                                            type: "decrementCount",
                                            payload: { id: item.id },
                                        })
                                    }
                                >
                                    -
                                </button>
                                <span className="quantity">
                                    {item.quantity}
                                </span>
                                <button
                                    onClick={() =>
                                        dispatch({
                                            type: "incrementCount",
                                            payload: { id: item.id },
                                        })
                                    }
                                >
                                    +
                                </button>
                            </div>
                            <button
                                className="delete-btn"
                                onClick={() =>
                                    dispatch({
                                        type: "deleteItem",
                                        payload: { id: item.id },
                                    })
                                }
                            >
                                Remove
                            </button>
                        </li>
                    ))
                ) : (
                    <p className="empty-cart">Your cart is empty.</p>
                )}
            </ul>
            {state.items.length > 0 && (
                <div className="cart-footer">
                    <button
                        className="clear-cart-btn"
                        onClick={() => {
                            dispatch({
                                type: "clearCart",
                            });
                        }}
                    >
                        Clear Cart
                    </button>
                </div>
            )}
        </main>
    );
}
