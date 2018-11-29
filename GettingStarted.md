# PROGRAMMING QUIZ

This is a programming quiz written in React and Redux. The user is given a question to a multiple choice quiz, and then he or she has to choose the answer they believe is correct. Once the user has chosen the question, he or she can either click next to progress to the next question or restart to start the quiz all over again. Once the person has gone through all of the questions, he or she will see his or her score. There are also options to restart the quiz or review. 

# SCREENSHOTS

### Question View:
 
 ![Question View]("images/Question View of Quiz.PNG")

### Score Display: 
 ![Score Display]("images/Score Display of Quiz.PNG")


# TECH/FRAMEWORK USED

- ReactJS
- Redux JS
- Sass


# CODE EXAMPLE

How the score is calculated once the quiz is over: 

    getCurrentScore() {
        return (this.props.quiz.correct > 0
        ? (this.props.quiz.correct / this.props.quiz.attempts) * 100
        : 0
        ).toFixed();
    }


# INSTALLATION

### Create React App:

    npx create-react-app my-app   
    cd my-app
    npm start

### Sass Installation:

To use Sass, first install node-sass:

    $ npm install node-sass --save
    $ # or
    $ yarn add node-sass

Now you can rename `src/App.css` to `src/App.scss` and update `src/App.js' to import 'src/App.scss`.

### Redux installation: 
`npm i redux react-redux redux-thunk`

# HOW TO USE?

### Getting Started:

- App.js is where all of the components will be displayed.
- Create a store.js that includes middleware and a connection to Redux Dev Tools and Local Storage

	import { createStore, applyMiddleware, compose } from "redux";
	import thunk from "redux-thunk";
	import allReducers from "./reducers";
	
	const middleware = [thunk];
	const composeEnhancers =
	  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
	
	
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



- Link the Provider from Redux onto App.js as well as link to the store that was created.

	import React, { Component } from "react";
	import "./App.scss";
	import { Provider } from "react-redux";
	import store from "./store";
	import SelectView from "./containers/selectView";
	
	class App extends Component {
	  
	
	  render() {
	    return (
	      <Provider store={store}>
	        <div className="App"> 
	          <SelectView />
	        </div>
	      </Provider>
	    );
	  }
	}
	
	export default App;

- The `Select View` component is the only component that will be exported to App.js.


### Create the Actions
-	Types 
o	There are nine action creators holding actions for the reducer “reducerQuiz” to listen for. 
-	Index
o	Export the actions

Create the Reducers
-	Combine All Reducers
o	Create a function that combines all reducers which will be exported to store.js



