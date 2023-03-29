import { createSlice } from "@reduxjs/toolkit";

const items =
  localStorage.getItem("cartItems") !== null
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [];

const totalAmount =
  localStorage.getItem("totalAmount") !== null
    ? JSON.parse(localStorage.getItem("totalAmount"))
    : 0;

const totalQuantity =
  localStorage.getItem("totalQuantity") !== null
    ? JSON.parse(localStorage.getItem("totalQuantity"))
    : 0;

const shouldNotifyUser = false;
const notificationMessage = "";

const setItemFunc = (item, totalAmount, totalQuantity) => {
  localStorage.setItem("cartItems", JSON.stringify(item));
  localStorage.setItem("totalAmount", JSON.stringify(totalAmount));
  localStorage.setItem("totalQuantity", JSON.stringify(totalQuantity));
};

const initialState = {
  cartItems: items,
  totalQuantity: totalQuantity,
  totalAmount: totalAmount,
  shouldNotifyUser: shouldNotifyUser,
  notificationMessage: notificationMessage,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,

  
  reducers: {
    // =========== add item ============
    addItem(state, action) {
      const newItem = action.payload;
      const id = action.payload.id;
      const existingItem = state.cartItems.find((item) => item.id === id);

      
      if (!existingItem) {
        state.cartItems.push({
          id: newItem.id,
          title: newItem.title,
          image01: newItem.image01,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          extraIngredients: [],
        });
        state.totalQuantity++;
        state.shouldNotifyUser = true;
        state.notificationMessage =
          "Pizza added to Cart. You can now choose toppings!";
      } else {
        state.shouldNotifyUser = true;
        state.notificationMessage = "This pizza is already in the cart.";
      }
    
      state.totalAmount = state.cartItems.reduce(
        (total, item) => total + Number(item.price) * Number(item.quantity),
        0
      );


      setItemFunc(
        state.cartItems.map((item) => item),
        state.totalAmount,
        state.totalQuantity
      );
    },

   updateIngredients(state, action) {
    const id = action.payload.id;
    const existingItem = state.cartItems.find((item) => item.id === id);
    if(existingItem.extraIngredients.includes(action.payload.ingredients)) {
      const indexOfExistingIngredient = existingItem.extraIngredients.indexOf(action.payload.ingredients);
      if(indexOfExistingIngredient !== -1) {
        existingItem.extraIngredients.splice(indexOfExistingIngredient, 1);
      }
    } else {
      const index = state.cartItems.indexOf(existingItem);
      existingItem.extraIngredients = [...existingItem.extraIngredients, action.payload.ingredients]
      if (index !== -1) {
          state.cartItems.splice(index, 1, existingItem);
      }
    }

      setItemFunc(
        state.cartItems.map((item) => item),
        state.totalAmount,
        state.totalQuantity
      );
    },

    updateIngredients(state, action) {
      const id = action.payload.id;
      const existingItem = state.cartItems.find((item) => item.id === id);
      if (existingItem.extraIngredients.includes(action.payload.ingredients)) {
        const indexOfExistingIngredient = existingItem.extraIngredients.indexOf(
          action.payload.ingredients
        );
        if (indexOfExistingIngredient !== -1) {
          existingItem.extraIngredients.splice(indexOfExistingIngredient, 1);
        }
      } else {
        const index = state.cartItems.indexOf(existingItem);
        existingItem.extraIngredients = [
          ...existingItem.extraIngredients,
          action.payload.ingredients,
        ];
        if (index !== -1) {
          state.cartItems.splice(index, 1, existingItem);
          state.shouldNotifyUser = true;
          state.notificationMessage = "Cart updated successfuly.";
        }
      }

      setItemFunc(
        state.cartItems.map((item) => item),
        state.totalAmount,
        state.totalQuantity
      );
    },

    // ========= remove item ========

    removeItem(state, action) {
      const id = action.payload;
      const existingItem = state.cartItems.find((item) => item.id === id);
      state.totalQuantity--;

      if (existingItem.quantity === 1) {
        state.cartItems = state.cartItems.filter((item) => item.id !== id);
      } else {
        existingItem.quantity--;
        existingItem.totalPrice =
          Number(existingItem.totalPrice) - Number(existingItem.price);
      }

      state.totalAmount = state.cartItems.reduce(
        (total, item) => total + Number(item.price) * Number(item.quantity),
        0
      );

      setItemFunc(
        state.cartItems.map((item) => item),
        state.totalAmount,
        state.totalQuantity
      );
    },

    //============ delete item ===========

    deleteItem(state, action) {
      const id = action.payload;
      const existingItem = state.cartItems.find((item) => item.id === id);

      if (existingItem) {
        state.cartItems = state.cartItems.filter((item) => item.id !== id);
        state.totalQuantity = state.totalQuantity - existingItem.quantity;
      }

      state.totalAmount = state.cartItems.reduce(
        (total, item) => total + Number(item.price) * Number(item.quantity),
        0
      );
      setItemFunc(
        state.cartItems.map((item) => item),
        state.totalAmount,
        state.totalQuantity
      );
    },

    cancelNotification(state) {
      state.shouldNotifyUser = false;
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice;
