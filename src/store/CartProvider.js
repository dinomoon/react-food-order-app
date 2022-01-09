import { useReducer } from 'react';

import CartContext from './cart-context';

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  if (action.type === 'ADD') {
    const findIdx = state.items.findIndex((item) => item.id === action.item.id);
    const existingItem = state.items[findIdx];

    let updatedItems;
    if (existingItem) {
      const updatedItem = {
        ...existingItem,
        amount: existingItem.amount + action.item.amount,
      };
      updatedItems = [...state.items];
      updatedItems[findIdx] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.item);
    }

    const updatedAmount =
      state.totalAmount + action.item.price * action.item.amount;
    return {
      items: updatedItems,
      totalAmount: updatedAmount,
    };
  }

  if (action.type === 'REMOVE') {
    const findIdx = state.items.findIndex((item) => item.id === action.id);
    const existingItem = state.items[findIdx];
    const updatedTotalAmount = state.totalAmount - existingItem.price;

    let updatedItems;
    if (existingItem.amount === 1) {
      updatedItems = state.items.filter((item) => item.id !== action.id);
    } else {
      const updatedItem = { ...existingItem, amount: existingItem.amount - 1 };
      updatedItems = [...state.items];
      updatedItems[findIdx] = updatedItem;
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  return defaultCartState;
};

const CartProvider = (props) => {
  const [state, dispatch] = useReducer(cartReducer, defaultCartState);

  const addItemToCartHandler = (item) => {
    dispatch({
      type: 'ADD',
      item: item,
    });
  };

  const removeItemCartHandler = (id) => {
    dispatch({
      type: 'REMOVE',
      id: id,
    });
  };

  const cartContext = {
    items: state.items,
    totalAmount: state.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
