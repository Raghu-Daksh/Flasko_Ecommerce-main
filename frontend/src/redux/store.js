import { createStore, applyMiddleware } from "@reduxjs/toolkit";
import createSagaMiddleware from '@redux-saga/core'
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from "./reducer/rootReducer";
import productSaga from "./sagamiddleware/productSaga";

const sagaMiddleware = createSagaMiddleware();

const middlewares = [thunkMiddleware, sagaMiddleware];

const store = createStore(
     rootReducer,
    composeWithDevTools(applyMiddleware(...middlewares))
)
sagaMiddleware.run(productSaga);
export default store;