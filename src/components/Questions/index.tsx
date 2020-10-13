import React from "react";
import { useSelector } from "react-redux";
import { questionnaireSelector } from "@ducks/questionnaire";
import Question from "./Question";
import Stepper from "./Stepper";
import { appQuestionIdSelector } from "@ducks/app";

type QuestionsProps = {
    questionnaireId: string;
};

const Questions: React.FC<QuestionsProps> = ({ questionnaireId }) => {
    const QuestionnaireStore = useSelector(questionnaireSelector);
    const QuestionId = useSelector(appQuestionIdSelector);

    const activeQuestionnare = QuestionnaireStore.find(
        ({ questionnaire }) => questionnaire.identifier === questionnaireId
    );

    if (!activeQuestionnare) {
        return <div>Sorry, we can`&apos;`t find suitable questions </div>;
    }

    const questions = activeQuestionnare.questionnaire.questions;

    const question = QuestionId
        ? questions.find((quest) => quest.identifier === QuestionId)
        : questions[0];

    return (
        <>
            <Stepper />
            <Question key={question.identifier} question={question} />
        </>
    );
};

export default Questions;
