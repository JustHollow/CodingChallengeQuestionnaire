import { combineReducers } from "redux";
import questionnaire from "./questionnaire";
import answers from "./answers";
import app from "./app";

export type RootState = ReturnType<typeof rootReducer>;
const rootReducer = combineReducers({ app, answers, questionnaire });

export default rootReducer;
