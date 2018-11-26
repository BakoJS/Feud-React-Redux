import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  increaseIndex,
  setIndex,
  increaseCorrect,
  increaseAttempts,
  storeAnswer
} from "../actions";

class NextButton extends Component {
  /* reviewing() {
    if (this.props.quiz.reviewing === true) {
      return (
        <div class="btn">
          <button onClick="next()">Next</button>
        </div>
      );
    }
    return (
      <div class="btn">
        <button onClick="formSubmitHandler(event)">Next</button>
      </div>
    );
  } */

  answer = (id, answer) => {
    const correct =
      this.props.questions[id].choices
      .filter(choice => choice.correct)
      .map(correctAnswer => correctAnswer.answer)
      .toString().trim() === answer.toString().trim();
    /* console.log("Checking ===:",2 === 2);
    console.log("Correct, true or false: ",correct);
    console.log("Correct answer from questions:", this.props.questions[id].choices
    .filter(choice => choice.correct)
    .map(correctAnswer => correctAnswer.answer)
    .toString());
    console.log("Answer chosen:",answer.toString());
    console.log("Is the answer chosen:",this.props.questions[id].choices
    .filter(choice => choice.correct)
    .map(correctAnswer => correctAnswer.answer)
    .toString().trim() === answer.toString().trim()); */
    if (correct) {
      this.props.increaseCorrect();
    }
    /* console.log("Correct:",this.props.quiz.correct); */
    this.props.increaseAttempts();
    this.props.storeAnswer(id, answer);
    this.next();
  };

  formSubmitHandler = e => {
    e.preventDefault();
    const name = `question-${this.getCurrentIndex()}`;
    const answers = Array.from(document.forms[0].elements[name])
      .map(choice => {
        if (choice.checked) return choice.value;
      })
      .filter(answer => answer);
      /* console.log("Answers:",answers); */
    this.answer(this.getCurrentIndex(), answers);
    //console.log("Answer: " + this.answer(this.getCurrentIndex(), answers));
    this.save(); // save answer to localStorage
  };

  save = () => {
    //localStorage.setItem("quiz", JSON.stringify(store.getState()));
  }

  getCurrentIndex = () => {
    return this.props.quiz.index || 0;
  }

  next=()=> {
    console.log("Reviewing:",this.props.quiz.reviewing);
    console.log("Index:", this.props.quiz.index);
    if (this.getCurrentIndex() < this.props.questions.length - 1) {
      this.props.increaseIndex();
    } else {
      // else reset index to 0
      this.props.setIndex(0);
    }
  }

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

function mapStateToProps(state) {
  return {
    quiz: state.quiz,
    questions: state.questions
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      setIndex: setIndex,
      increaseIndex: increaseIndex,
      increaseCorrect: increaseCorrect,
      increaseAttempts: increaseAttempts,
      storeAnswer: storeAnswer
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  matchDispatchToProps
)(NextButton);
