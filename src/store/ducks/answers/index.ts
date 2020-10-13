import {
    createEntityAdapter,
    createSlice,
    PayloadAction,
} from "@reduxjs/toolkit";
import { RootState } from "@ducks";

export type Answer = QuestionnaireJSON.Question & {
    answer: string[];
};

const answersAdapter = createEntityAdapter<Answer>({
    selectId: (answer) => answer.identifier,
    sortComparer: (a, b) => a.headline.localeCompare(b.headline),
});

//Selectors
export const answersSelector = (state: RootState) => state.answers;
export const answersAdapterSelectors = answersAdapter.getSelectors();
export const answerByIdSelector = (id: string) => (state: RootState) =>
    answersAdapterSelectors.selectById(answersSelector(state), id);

//Reducer
export type AnswerState = typeof answersAdapter;
const answersSlice = createSlice({
    name: "answers",
    initialState: answersAdapter.getInitialState(),
    reducers: {
        setAnswer: (state, action: PayloadAction<Answer>) => {
            if (answersAdapter.selectId(action.payload)) {
                answersAdapter.updateOne(state, {
                    id: action.payload.identifier,
                    changes: action.payload,
                });
            }
            answersAdapter.addOne(state, action.payload);
        },
    },
});

export const answersActions = answersSlice.actions;
export default answersSlice.reducer;
