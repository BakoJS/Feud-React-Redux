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
} from "./types";

//Action creators
export function increaseIndex() {
  return {
    type: INCREASE_INDEX
  };
}

export function setIndex(index) {
  return {
    type: SET_INDEX,
    payload: index
  };
}


export function increaseAttempts() {
  return {
    type: INCREASE_ATTEMPTS
  };
}

export function increaseCorrect() {
  return {
    type: INCREASE_CORRECT
  };
}

export function storeAnswer(id, answer) {
  return {
    type: STORE_ANSWER,
    payload: { id, answer }
  };
}

export function resetState() {
  return {
    type: RESET_STATE
  };
}

export function setReviewingTrue() {
  return {
    type: SET_REVIEWING_TRUE
  };
}

export function setReviewingFalse() {
  return {
    type: SET_REVIEWING_FALSE
  };
}

export function removeState(){
  return{
    type: REMOVE_STATE
  };
}

/* //Action creators

export const increaseIndex = () => ({ type: INCREASE_INDEX });

export const setIndex = index => ({ type: SET_INDEX, payload: { index } });

export const increaseAttempts = () => ({ type: INCREASE_ATTEMPTS });
export const increaseCorrect = () => ({ type: INCREASE_CORRECT });

export const storeAnswer = (id, answer) => ({
  type: STORE_ANSWER,
  payload: { id, answer }
});

export const resetState = () => ({ type: RESET_STATE });

export const setReviewingTrue = () => ({ type: SET_REVIEWING_TRUE });

export const setReviewingFalse = () => ({ type: SET_REVIEWING_FALSE }); */

/* // actions with side-effects
export const next = () => {
  // if there are still more questions, increase the index
  if (getCurrentIndex() < store.getState().questions.length - 1) {
    store.dispatch(increaseIndex());
  } else {
    // else reset index to 0
    store.dispatch(setIndex(0));
  }
};

export const answer = (id, answer) => {
  const correct =
  store.getState().questions[id].choices
      .filter(choice => choice.correct)
      .map(correctAnswer => correctAnswer.answer)
      .toString() === answer.toString();
  if (correct) {
    store.dispatch(increaseCorrect());
  }
  store.dispatch(increaseAttempts());
  store.dispatch(storeAnswer(id, answer));
  next();
};

export const save = () => {
  localStorage.setItem("quiz", JSON.stringify(store.getState()));
};

export const reset = () => {
  localStorage.removeItem("quiz");
  store.dispatch(resetState());
  store.dispatch(setReviewingFalse());
};

export const onSetReviewingTrue = () => {
  store.dispatch(setReviewingTrue());
}; */
