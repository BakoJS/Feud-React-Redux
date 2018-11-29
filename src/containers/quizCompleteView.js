import React, { Component } from "react";
import { connect } from "react-redux";
import ResetButton from "../components/resetButton";
import ReviewButton from "../components/reviewButton";

class QuizCompleteView extends Component {
  getCurrentScore = () => {
    return (this.props.quiz.correct > 0
      ? (this.props.quiz.correct / this.props.quiz.attempts) * 100
      : 0
    ).toFixed();
  }

  scoreClass() {
    return (
      "quizCompletedView__score" +
      (this.props.quiz.correct > 50 ? "--high" : "--low")
    );
  }

  render() {
    return (
      <div className="quizCompletedView">
        <h2 className={this.scoreClass()}>
          Your last score: <span>{this.getCurrentScore()}%</span>
        </h2>
        <ReviewButton/>
        <ResetButton/>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    quiz: state.quiz
  };
}

export default connect(mapStateToProps)(QuizCompleteView);
