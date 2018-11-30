# PROGRAMMING QUIZ

This is a programming quiz written in React and Redux. The user is given a question to a multiple choice quiz, and then he or she has to choose the answer they believe is correct. Once the user has chosen the question, he or she can either click next to progress to the next question or restart to start the quiz all over again. Once the person has gone through all of the questions, he or she will see his or her score. There are also options to restart the quiz or review. 

# SCREENSHOTS

### Question View:
 
 ![Question View](../images/Question View of Quiz.PNG)

### Score Display: 
 ![Score Display](../images/Score Display of Quiz.PNG)


# TECH/FRAMEWORK USED

- ReactJS
- Redux JS
- Sass


# CODE EXAMPLE

How the score is calculated once the quiz is over: 

```
    getCurrentScore() {
        return (this.props.quiz.correct > 0
        ? (this.props.quiz.correct / this.props.quiz.attempts) * 100
        : 0
        ).toFixed();
    }
```


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

Now you can rename `src/App.css` to `src/App.scss` and update `src/App.js` to import `src/App.scss`.

### Redux installation: 
`npm i redux react-redux redux-thunk`

# HOW TO USE?

### Getting Started:

- App.js is where all of the components will be displayed.
- Create a store.js that includes middleware and a connection to Redux Dev Tools and Local Storage <br>

- Link the Provider from Redux onto App.js as well as link to the store that was created.
	
```
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
```

- The `Select View` component is the only component that will be exported to App.js.


### Create the Actions

#### Types 
- There are nine action creators holding actions for the reducer “reducerQuiz” to listen for. 

#### Index
- Export the actions

### Create the Reducers

#### Combine All Reducers

- Create a function that combines all reducers which will be exported to store.js

```
    import {combineReducers} from "redux";
    import reducerQuestions from "./reducerQuestions";
    import reducerQuiz from "./reducerQuiz";

    const allReducers = combineReducers({
        questions: reducerQuestions,
        quiz: reducerQuiz
    });

    export default allReducers;
```

#### Questions reducer

- This contains an array of objects that contain a question along with its answers and whether or not that answer is correct or not.

#### Quiz reducer

- Listens for the actions, and then changes the initial state.
- Create an initial state

```
    const initHistory = {
    correct: 0, 
    attempts: 0,
    answers: {},
    reviewing: false,
    index: 0
    };
```

- This will track how many questions the user answered correctly,  how many times the user has attempted the quiz, logs the answers, whether or not the is reviewing their past answers, how far along in the quiz the user is
- Constant `initHistory` will be stored as the initial state in this reducer

```
    render() {
        if (this.props.quiz.reviewing) {
        return (
            <div className="btn">
            <button onClick={this.next}>Next</button>
            </div>
        );
        }
        return (
        <div className="btn">
            <button onClick={this.formSubmitHandler}>Next</button>
        </div>
        );
    }
    }
```
     
    

- formSubmitHandler

```
    formSubmitHandler = e => {
        e.preventDefault();
        const name = `question-${this.getCurrentIndex()}`;
        const answers = Array.from(document.forms[0].elements[name])
        .map(choice => {
            if (choice.checked) return choice.value;
        }) 
        .filter(answer => answer);
        this.answer(this.getCurrentIndex(), answers);
        this.save(); // save answer to localStorage
    }; 
```
- When the user clicks on the check box that represents the answer that he or she has chosen, then clicks “next” this function, the “formSubmitHandler” function is called. 
- `const name` is inputted into `Array.from(document.forms[0].elements[name])` function. This function retrieves the choices correlated to a specific question from the form submitted. 
- `const answers` checks the list of options for the question. Based on the choice that was chosen by the user, that choice is filtered out, then used as a parameter for the “answer” function
- The `this.getCurrentIndex()` function corresponds to the current index of the question given. That is passed as a parameter to the `answer` function as well.
- `Answer` function

    ```answer = (id, answer) => {
        const correct =
        this.props.questions[id].choices
        .filter(choice => choice.correct)
        .map(correctAnswer => correctAnswer.answer)
        .toString().trim() === answer.toString().trim();
        if (correct) {
        this.props.increaseCorrect();
        }
        this.props.increaseAttempts();
        this.props.storeAnswer(id, answer);
        this.next();
    };
    ```

 - The answer function takes in the parameters of `id` and `answer`
- `const correct` takes the choices that corresponds to the current question in the `reducerQuestions` reducer. It then filters for the choice that has `correct` marked true, then compares that choice to the answer that the user picked. If those two things match, then the action creator `increase Correct` is called to increase the number of correct answers by one. Also, the number of attempts is increased and the answer is stored in the store. Finally the `next` function is called to go to the next question. 
- Next Function

```
next=()=> {
    if (this.getCurrentIndex() < this.props.questions.length - 1) {
      this.props.increaseIndex();
    } else {
      // else reset index to 0
      this.props.setIndex(0);
    }
  }
```

- If the current index of the question is less than the length of the questions minus 1, then increase the index.  If this condition is no longer met, then set the index back to 0. Essential this will take the quiz to the next question, or start it all over again. 

#### Reset Button
- This button resets the quiz back to the beginning once the index is set back to zero by the next function in the “Next Button” component

```
<div className="btn">
        <button onClick={this.handleClick}>Reset</button>
      </div>
```
- This button handles an on click event called `handleClick`

```
handleClick = () => {
    this.props.resetState();
    this.props.setReviewingFalse();
  }
```
- The action creators `resetState` and `setReviewingFalse` are called. The reset state action creator changes the state of the `reducerQuiz` reducer  back to its initial state which is called `initHistory`
- The set reviewing false action creator sets the property of `reviewing` in the `reducerQuiz` reducer back to `false`.
- This action creator triggers the conditional render of the next button component to use the click event `formSubmitHandler` instead of `next` 

```
<div className="btn">
        <button onClick={this.handleClick}>Review</button>
      </div>
```

- Handle Click function for the review button

```
handleClick = () => {
   this.props.setReviewingTrue();
 }
```

- This calls the action creator `setReviewingTrue` which sets the property of `reviewing` in the `reducerQuiz` reducer to `true`
- Setting `reviewing` to `true` triggers the conditional render of the next button in the Next button component to use the on Click event of `next` instead of `formSubmitHandler`
- When the quiz is in reviewing mode, the user can see the correct answers and the answers that he or she chose that were incorrect. Also, the checkboxes will be disabled in this mode. 

### Views

#### Button Group View
- This component takes the components of `Next Button` and `Reset Button` then displays them. 

#### Question View
- This component takes the questions and choices from the `reducerQuestions` reducer and displays them. 

```
<div>
        <div className="questionView --slideInLeft">
          <h2 className="questionView__question">
            {this.getCurrentQuestion().question}
          </h2>
          <form id="answers" onSubmit={this.formSubmitHandler}>
            {this.choicesHtmll()}
          </form>
        </div>
      </div>
```

- The questions are displayed with the function `this.getCurrentQuestion` function.

```
getCurrentQuestion() {
    return this.props.questions[this.getCurrentIndex()];
  }
  ```

- This returns the questions and answers of the `reducerQuestions` reducer that is correlated to the current index. So a current index of 3 would return the fourth element in the `reducerQuestions` reducer.
- The `question` in the rendering of `this.getCurrentQuestion().question` refers to the question property in the element that was returned from the `reducerQuestions` reducer
- The function `choicesHtmll` renders the choices to the current question

```
choicesHtmll=()=> {
    const currentQuestion = this.getCurrentQuestion()
      .choices.map(choice => {
        const inputType = this.multiselect() ? "checkbox" : "radio";
        // reviewing
        const correctClass = choice.correct ? "--correct" : false;
        const incorrectClass =
          this.reviewing() &&
          this.props.quiz.answers[this.getCurrentIndex()].includes(
            choice.answer
          )
            ? "--incorrect"
            : false;
        const inputClass = this.reviewing()
          ? correctClass || incorrectClass
          : "";
        const isChecked =
          this.reviewing() &&
          this.props.quiz.answers[this.getCurrentIndex()].includes(
            choice.answer
          )
            ? "checked"
            : "";
        const isDisabled = this.reviewing() ? "disabled" : "";

      return <div className={`choices ${inputClass} --${inputType}`} key={choice.answer}>
      <input className="choices__choice" type={inputType} name={`question-${this.getCurrentIndex()}`} id={
                choice.answer
              } value={`${choice.answer} ${isChecked} ${isDisabled}`} />
      <span className="choices__checkmark"></span>
      <label className="choices__label" htmlFor={choice.answer}>
                {choice.answer}
              </label>
      </div>;
      });
    return currentQuestion;
  }

```

- `const correctClass` renders to `const inputClass`. This will render a CSS class that will correspond to the correct answer.  The text shown will be green regardless of whether or not the user selected the correct answer.
- `const incorrectClass` renders to `const inputClass`. This will render a CSS class that will correspond to the answer selected by the user. If the answer selected by the user is incorrect, the CSS class will display red text.
- `const inputClass` will only come into effect when the user is reviewing the quiz.  If `this.reviewing()` returns false, then the identification of the correct and/or incorrect answer will not be shown
- `const isDisabled` disables the user’s ability to check a checkbox while they are reviewing their answers.
- `const isChecked` renders a CSS class that will show the user a different color of the choice that he or she selected
- All of these constants are mapped to each choice of each question.
- Once all of these constants are mapped to each choice of each question, then the function of `choicesHtmll` returns all of those choices in a constant called `currentQuestion` 
- The `multiselect` function is also called within the `choicesHtmll` function

```
multiselect=()=> {
    return (
      this.getCurrentQuestion()
        .choices.map(choice => choice.correct)
        .filter(answer => answer === true).length > 1
    );
  }
```

- This function is essentially checking if there is more than one choice with a `correct` property of `true`. This will then determine if the checkboxes are rendered as circles or squares.

#### Quiz Complete View
- Once the user has gotten through all of the questions of the quiz, then the user’s final score is displayed along with the button options to review the quiz and also restart the quiz

```
<div className="quizCompletedView">
        <h2 className={this.scoreClass()}>
          Your last score: <span>{this.getCurrentScore()}%</span>
        </h2>
        <ReviewButton/>
        <ResetButton/>
      </div>
```

- The current score is displayed with the `getCurrentScore` function

```
getCurrentScore = () => {
    return (this.props.quiz.correct > 0
      ? (this.props.quiz.correct / this.props.quiz.attempts) * 100
      : 0
	    ).toFixed();
  }

```

- This either displays a score of zero if the user got none of the questions correct or it displays the percentage of questions the user got correct. That is calculated by dividing the number of questions correct by the number of attempts which come from the `reducerQuiz` reducer. 

#### Select View
- The `Select View` component either conditionally renders the `QuizCompleteView` component or the `ButtonGroupView` and `QuestionView` components together

```
complete() {
    if (this.quizComplete() && !this.props.quiz.reviewing) {
      return <QuizCompleteView />;
    }
    return (
      <div>
        <QuestionView />
        <ButtonGroupView />
      </div>
    );
  }
```

- The `QuizCompleteView` component is only conditionally rendered if the quiz is complete and “reviewing” is set to `false`
- `quizComplete` function

```
quizComplete=()=> {
    return (
      this.getCurrentIndex() === 0 &&
      this.getAnswers().length === this.props.questions.length
    );
  }
```

- This function returns true only if the current index is equal to zero and the length of the answers, which is stored in the “reducerQuiz” reducer, the user selected is equal to the length of the questions.


# CREDITS

- [CodePen](https://codepen.io/phillipgray/pen/jppNVp) 
- [Sass](https://facebook.github.io/create-react-app/docs/adding-a-sass-stylesheet)
- [Beginners Guide to writing a kick ass README](https://medium.com/@meakaakka/a-beginners-guide-to-writing-a-kickass-readme-7ac01da88ab3) 





