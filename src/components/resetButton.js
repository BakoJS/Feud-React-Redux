import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setReviewingFalse, resetState, removeState } from "../actions";

class ResetButton extends Component {
  handleClick = () => {
    //this.props.removeState();
    this.props.resetState();
    this.props.setReviewingFalse();
  }

  render() {
    return (
      <div className="btn">
        <button onClick={this.handleClick}>Reset</button>
      </div>
    );
  }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators(
      {
        setReviewingFalse: setReviewingFalse,
        resetState: resetState,
        removeState: removeState
      },
      dispatch
    ); 
  } 

function mapStateToProps(state){
    return{
        quiz: state.quiz    
    };
}

export default connect(mapStateToProps, matchDispatchToProps)(ResetButton);
