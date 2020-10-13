import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@ducks";
import { AppThunkAction } from "@store";
import { questionnaireSelector } from "@ducks/questionnaire";
import { answersAdapterSelectors, answersSelector } from "@ducks/answers";

//Selectors
export const appSelector = (state: RootState) => state.app;
export const appQuestionIdSelector = (state: RootState) =>
    appSelector(state).activeQuestionId;
export const appQuestionnaireIdSelector = (state: RootState) =>
    appSelector(state).activeQuestionnaireId;

//Reducer
export type AppState = {
    activeQuestionId: string | null;
    activeQuestionnaireId: string | null;
};

const initialState: AppState = {
    activeQuestionId: null,
    activeQuestionnaireId: null,
};

const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        setQuestionId: (
            state,
            action: PayloadAction<AppState["activeQuestionId"]>
        ) => {
            state.activeQuestionId = action.payload;
        },
        setQuestionnaireId: (
            state,
            action: PayloadAction<AppState["activeQuestionnaireId"]>
        ) => {
            state.activeQuestionnaireId = action.payload;
        },
    },
});

export const appActions = appSlice.actions;
export default appSlice.reducer;

//Thunks
export const setNextQuestion: AppThunkAction = () => async (
    dispatch,
    getState
) => {
    try {
        const State = getState();
        const QuestionnaireState = questionnaireSelector(State);
        const AppState = appSelector(State);
        const AnswersState = answersSelector(State);

        const activeQuestionnaire = QuestionnaireState.find(
            (quest) =>
                quest.questionnaire.identifier ===
                AppState.activeQuestionnaireId
        );

        const questions = activeQuestionnaire.questionnaire.questions;

        const activeQuestionIdx = questions.findIndex(
            (question) => question.identifier === AppState.activeQuestionId
        );

        if (
            activeQuestionIdx === -1 ||
            activeQuestionIdx > questions.length - 1
        ) {
            throw new Error(`activeQuestionIdx = ${activeQuestionIdx}`);
        }

        const activeQuestion = questions[activeQuestionIdx];

        const jumpDestination =
            activeQuestion.jumps.length > 0 &&
            activeQuestion.jumps.find((jump) => {
                const questionAnswer = answersAdapterSelectors.selectById(
                    AnswersState,
                    activeQuestion.identifier
                );

                const destination = jump.conditions.find((condition) =>
                    questionAnswer.answer.includes(condition.value)
                );

                return destination;
            });

        const nextQuestion = jumpDestination
            ? questions.find(
                  (question) =>
                      question.identifier === jumpDestination.destination.id
              )
            : questions[activeQuestionIdx + 1];

        if (!nextQuestion) {
            throw new Error(`nextQuestion = ${nextQuestion}`);
        }

        dispatch(appActions.setQuestionId(nextQuestion.identifier));
    } catch (error) {
        console.error("Can't find next question: ", error);
    }
};
