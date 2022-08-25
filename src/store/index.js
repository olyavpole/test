import { createStore } from "redux";

import listReducer from "../reducers/listReducer";

const store = createStore(listReducer);

export default store;