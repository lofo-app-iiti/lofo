import { createStore } from "redux";
import Reducers from "./reducers";

const store = createStore(Reducers);
store.subscribe(() => {
    console.log(store.getState());
})
export default store;