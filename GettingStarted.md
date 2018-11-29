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
- Create a store.js that includes middleware and a connection to Redux Dev Tools and Local Storage <br>

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

##### Types 
- There are nine action creators holding actions for the reducer “reducerQuiz” to listen for. 

##### Index
- Export the actions

### Create the Reducers

##### Combine All Reducers

- Create a function that combines all reducers which will be exported to store.js

    import {combineReducers} from "redux";
    import reducerQuestions from "./reducerQuestions";
    import reducerQuiz from "./reducerQuiz";

    const allReducers = combineReducers({
        questions: reducerQuestions,
        quiz: reducerQuiz
    });

    export default allReducers;

##### Questions reducer

- This contains an array of objects that contain a question along with its answers and whether or not that answer is correct or not.

##### Quiz reducer

- Listens for the actions, and then changes the initial state.
- Create an initial state

    const initHistory = {
    correct: 0, 
    attempts: 0,
    answers: {},
    reviewing: false,
    index: 0
    };

- This will track how many questions the user answered correctly,  how many times the user has attempted the quiz, logs the answers, whether or not the is reviewing their past answers, how far along in the quiz the user is
- Constant `initHistory` will be stored as the initial state in this reducer




