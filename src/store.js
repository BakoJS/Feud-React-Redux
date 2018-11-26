import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import allReducers from "./reducers";

const middleware = [thunk];
const composeEnhancers =
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

/* const initHistory = {
  correct: 0,
  attempts: 0,
  answers: {},
  reviewing: false,
  index: 0
};

let userHistory = localStorage.getItem("quiz")
  ? JSON.parse(localStorage.getItem("quiz"))
  : initHistory; */

function saveToLocalStorage(state) {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("state", serializedState);
  } catch (e) {
    console.log(e);
  }
}

function loadFromLocalStorage() {
  try {
    const serializedState = localStorage.getItem("state");
    if (serializedState === null) return undefined;
    return JSON.parse(serializedState);
  } catch (e) {
    console.log(e);
    return undefined;
  }
}

const persistedState = loadFromLocalStorage();

const store = createStore(
  allReducers, persistedState,
  compose(
    composeEnhancers,
    applyMiddleware(...middleware)
  )
);

store.subscribe(() => saveToLocalStorage(store.getState()));

export default store;

/* Persisting State in Redux:

https://egghead.io/lessons/javascript-redux-persisting-the-state-to-the-local-storage
*/


/* Combining Local storage and the reducer: 

https://gist.github.com/bruce/f55e729d810ed07c86c6dc51bb8c99be

https://stackoverflow.com/questions/38765148/localstorage-with-react-redux
*/