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

class QuestionView extends Component {
  getCurrentIndex() {
    return this.props.quiz.index || 0;
  }

  getAnswers() {
    return Object.values(this.props.quiz.answers);
  }

  getCurrentQuestion() {
    return this.props.questions[this.getCurrentIndex()];
  }

  reviewing() {
    return this.props.quiz.reviewing;
  }

  multiselect() {
    //might have something wrong
    return (
      this.getCurrentQuestion()
        .choices.map(choice => choice.correct)
        .filter(answer => answer === true).length > 1
    );
  }

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

  answer = (id, answer) => {
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

  //Trying to fix the code
  choicesHtmll() {
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

        /* console.log("isDisabled " + isDisabled);
        console.log("Input Class " + inputClass); 
        console.log("Input Type " + inputType);
        console.log("Current Index " + this.getCurrentIndex());
        console.log("Is Checked " + isChecked); 
        console.log("MultiSelect " + this.multiselect());
        console.log("Correct Class " + correctClass);
        console.log("Incorrect Class " + incorrectClass);
        console.log("Reviewing " + this.reviewing()); */

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
    /* console.log("Current Question " + currentQuestion); */
    return currentQuestion;
  }

  render() {
    return (
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
)(QuestionView);
