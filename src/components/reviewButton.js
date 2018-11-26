import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setReviewingTrue } from "../actions";

class ReviewButton extends Component {
 handleClick = () => {
   this.props.setReviewingTrue();
 }

  render() {
    return (
      <div className="btn">
        <button onClick={this.handleClick}>Review</button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    quiz: state.quiz
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({ setReviewingTrue: setReviewingTrue }, dispatch);
}

export default connect(
  mapStateToProps,
  matchDispatchToProps
)(ReviewButton);
