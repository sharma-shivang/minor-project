import { createSlice, configureStore } from '@reduxjs/toolkit'
import { createStore } from '@reduxjs/toolkit';
import myReducer from "./reducers"

// const store = configureStore(myReducer)
 const Store = createStore(myReducer , window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

export default Store;