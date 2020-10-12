import React from "react";
import { useSelector } from "react-redux";
import { questionnaireSelector } from "@ducks/questionnaire";
import { GetServerSideProps } from "next";
import Question from "@components/question";

type QuestionsPageProps = { id: string };
const QuestionsPage = (props: QuestionsPageProps) => {
	const questionnaireStore = useSelector(questionnaireSelector);

	const currentQuestionnare = questionnaireStore.find(
		({ questionnaire }) => questionnaire.identifier === props.id
	);

	if (!currentQuestionnare) {
		return <div>Sorry, we can't find suitable questions </div>;
	}

	return (
		<Question questionList={currentQuestionnare.questionnaire.questions} />
	);
};

export const getServerSideProps: GetServerSideProps<QuestionsPageProps> = async (
	context
) => {
	return {
		props: {
			id: Array.isArray(context.params?.id)
				? context.params.id[0]
				: context.params.id,
		},
	};
};

export default QuestionsPage;
