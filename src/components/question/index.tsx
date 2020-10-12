import { QuestionnaireState } from "@ducks/questionnaire";
import React from "react";

type QuestionProps = {
	questionList: QuestionnaireState[0]["questionnaire"]["questions"];
};
const Question: React.FC<QuestionProps> = ({ questionList }) => {
	return (
		<>
			{questionList.map((question) => (
				<ul key={question.identifier}>
					<li key={question.identifier}>
						<div>
							<h1>{question.headline}</h1>
							<h3>{question.description}</h3>
							{question.choices?.map((el, idx) => (
								<button key={el.value + idx}>{el.label}</button>
							))}
						</div>
					</li>
				</ul>
			))}
		</>
	);
};

export default Question;
