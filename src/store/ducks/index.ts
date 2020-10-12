import { combineReducers } from "redux";
import questionnaire from "./questionnaire";

export type RootState = ReturnType<typeof rootReducer>;
const rootReducer = combineReducers({ questionnaire });

export default rootReducer;
