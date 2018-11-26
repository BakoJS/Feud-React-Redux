import {combineReducers} from "redux";
import reducerQuestions from "./reducerQuestions";
import reducerQuiz from "./reducerQuiz";

const allReducers = combineReducers({
    questions: reducerQuestions,
    quiz: reducerQuiz
});

export default allReducers;