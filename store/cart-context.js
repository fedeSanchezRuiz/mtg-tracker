import {
  createContext,
  useReducer,
  useEffect,
  useState,
} from 'react';

const CartContext = createContext({
  items: [],
  addItem: (item) => {},
  removeItem: (id) => {},
  notification: () => {},
  clearCart: () => {},
});

function cartReducer(state, action) {
  if (action.type === 'ADD_ITEM') {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );

    const updatedItems = [...state.items];

    if (existingCartItemIndex > -1) {
      const existingItem = state.items[existingCartItemIndex];
      const updatedItem = {
        ...existingItem,
        quantity: existingItem.quantity + 1,
      };
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems.push({ ...action.item, quantity: 1 });
    }
    return {
      ...state,
      items: updatedItems,
      notification: 'Item added successfully',
    };
  }
  if (action.type === 'REMOVE_ITEM') {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );

    const existingItem = state.items[existingCartItemIndex];

    const updatedItems = [...state.items];

    if (existingItem.quantity === 1) {
      updatedItems.splice(existingCartItemIndex, 1);
    } else {
      const updatedItem = {
        ...existingItem,
        quantity: existingItem.quantity - 1,
      };
      updatedItems[existingCartItemIndex] = updatedItem;
    }
    return {
      ...state,
      items: updatedItems,
      notification: 'Item removed successfully',
    };
  }
  if (action.type === 'HIDE_NOTIFICATION') {
    return { ...state, notification: null };
  }
  if (action.type === 'LOAD_CART') {
    return { ...state, items: action.items };
  }
  if (action.type === 'CLEAR_CART') {
    return {
      ...state,
      items: [],
    };
  }
  return state;
}

export function CartContextProvider({ children }) {
  const [cart, dispatchCartAction] = useReducer(cartReducer, {
    items: [],
    notification: null,
  });

  const [timerId, setTimerId] = useState(null);

  function showNotification(message) {
    dispatchCartAction({ type: 'SHOW_NOTIFICATION', message });

    if (timerId) {
      clearTimeout(timerId);
    }

    const newTimerId = setTimeout(() => {
      dispatchCartAction({ type: 'HIDE_NOTIFICATION' });
    }, 800);

    setTimerId(newTimerId);
  }

  function addItem(item) {
    dispatchCartAction({ type: 'ADD_ITEM', item });
    showNotification('Item added successfully');
  }

  function removeItem(id) {
    dispatchCartAction({ type: 'REMOVE_ITEM', id });
    showNotification('Item removed successfully');
  }

  function clearCart() {
    dispatchCartAction({ type: 'CLEAR_CART' });
  }

  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      const parsedCart = JSON.parse(storedCart);
      dispatchCartAction({
        type: 'LOAD_CART',
        items: parsedCart,
      });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart.items));
  }, [cart.items]);

  const context = {
    items: cart.items,
    addItem,
    removeItem,
    clearCart,
    notification: cart.notification,
  };

  return (
    <CartContext.Provider value={context}>
      {children}
    </CartContext.Provider>
  );
}

export default CartContext;
