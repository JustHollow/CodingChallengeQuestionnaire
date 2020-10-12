import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@ducks/index";

//Actions
export const fetchQuestionList = createAsyncThunk<
	QuestionnaireAPI.questions.success
>("questionnaire/getFullList", async () => {
	try {
		const response = await fetch("http://localhost:3000/api/questions");
		if (response.status === 500) {
			throw new Error("cant get question list");
		}

		return response.json();
	} catch (err) {
		console.error(err);
	}
});

//Selectors
export const questionnaireSelector = (state: RootState) => state.questionnaire;

//Reducer
export type QuestionnaireState = QuestionnaireAPI.questions.success;
const initialState: QuestionnaireState = [];

const questionnaireSlice = createSlice({
	name: "questionnaire",
	initialState,
	reducers: {
		setFullState: (_state, action: PayloadAction<typeof initialState>) =>
			action.payload,
	},
	extraReducers: (builder) =>
		builder.addCase(
			fetchQuestionList.fulfilled,
			(_state, action) => action.payload
		),
});

export default questionnaireSlice.reducer;
