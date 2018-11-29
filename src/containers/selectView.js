import React, { Component } from "react";
import { connect } from "react-redux";
import QuestionView from "./questionView";
import QuizCompleteView from "./quizCompleteView";
import ButtonGroupView from "./buttonGroupView";

class SelectView extends Component {
  getCurrentIndex =()=> {
    return this.props.quiz.index || 0;
  }

  getAnswers =()=> {
    return Object.values(this.props.quiz.answers);
  }

  quizComplete=()=> {
    return (
      this.getCurrentIndex() === 0 &&
      this.getAnswers().length === this.props.questions.length
    );
  }

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

  render() {
    return <div>{this.complete()}</div>;
  }
}

function mapStateToProps(state) {
  return {
    quiz: state.quiz,
    questions: state.questions
  };
}

export default connect(mapStateToProps)(SelectView);
