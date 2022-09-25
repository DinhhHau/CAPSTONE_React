import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./reducers/productReducer";
import userReducer from "./reducers/userReducer";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import persistStore from "redux-persist/es/persistStore";

const reducer = combineReducers({
  productReducer: persistReducer(
    {
      key: "product",
      storage,
      keyPrefix: "capstone-",
    },
    productReducer
  ),

  userReducer: userReducer,
});

const store = configureStore({
  reducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

const persister = persistStore(store);

export { store, persister };
