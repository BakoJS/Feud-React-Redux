import connect from "react-redux/lib/connect/connect";
import React, { Component } from "react";
//import ReviewButton from "../components/reviewButton";
import ResetButton from "../components/resetButton";
import NextButton from "../components/nextButton";

class ButtonGroupView extends Component {
  getCurrentIndex() {
    return this.props.quiz.index || 0;
  }

  getAnswers() {
    return Object.values(this.props.quiz.answers);
  }

  quizComplete() { 
    return (
      this.getCurrentIndex() === 0 &&
      this.getAnswers().length === this.props.questions.length
    );
  }

  buttons() {
    console.log("Quiz Complete?:",this.quizComplete());
    console.log("Get Answers: ",this.getAnswers().length);
    console.log("Questions length: ",this.props.questions.length);
    console.log("Get current index",this.getCurrentIndex());
    console.log("Reviewing:",this.props.quiz.reviewing);
    console.log("Current Index to end of quiz", this.getCurrentIndex() === 0);

    /* if(this.quizComplete() && !this.props.quiz.reviewing) {
      return (
        <div>
          <ReviewButton />
          <ResetButton />
        </div>
      );
    } */
    return (
      <div>
        <NextButton />
        <ResetButton />
      </div>
    );
  }

  render() {
    return <div className="buttonGroup">{this.buttons()}</div>;
  }
}

function mapStateToProps(state) {
  return {
    quiz: state.quiz,
    questions: state.questions
  };
}

export default connect(mapStateToProps)(ButtonGroupView);
