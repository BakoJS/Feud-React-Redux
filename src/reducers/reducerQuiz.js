import {
  INCREASE_INDEX,
  SET_INDEX,
  INCREASE_ATTEMPTS,
  INCREASE_CORRECT,
  STORE_ANSWER,
  RESET_STATE,
  SET_REVIEWING_TRUE,
  SET_REVIEWING_FALSE,
  REMOVE_STATE
} from "../actions/types";

const initHistory = {
  correct: 0, 
  attempts: 0,
  answers: {},
  reviewing: false,
  index: 0
};

/* let userHistory = localStorage.getItem("state")
  ? JSON.parse(localStorage.getItem("state"))
  : initHistory; 
 
const initState = userHistory; */

export default function(state = /* initState */ initHistory, action) {
  switch (action.type) {
    case INCREASE_INDEX:
      return { ...state, index: state.index + 1 };
    case SET_INDEX:
      return { ...state, index: action.payload};
    case INCREASE_ATTEMPTS:
      return { ...state, attempts: state.attempts + 1 };
    case INCREASE_CORRECT:
      return { ...state, correct: state.correct + 1 };
    case STORE_ANSWER:
      const answers = {
        ...state.answers,
        [action.payload.id]: action.payload.answer
      };
      return { ...state, answers };
    case RESET_STATE:
      return initHistory;
    case SET_REVIEWING_TRUE:
      return { ...state, reviewing: true };
    case SET_REVIEWING_FALSE:
      return { ...state, reviewing: false };
    case REMOVE_STATE:
      return localStorage.removeItem(state);
    default:
      return state; 
  }
}
