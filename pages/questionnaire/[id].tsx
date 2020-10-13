import React, { useEffect, useMemo } from "react";

import { GetServerSideProps, NextPage } from "next";
import Questions from "@components/Questions";
import useTypedDispatch from "@hooks/useTypedDispatch";
import { appActions, appQuestionIdSelector, setNextQuestion } from "@ducks/app";
import Layout from "@components/Layout";
import Button from "@uikit/Button";
import useTypedSelector from "@hooks/useTypedSelector";
import { questionnaireSelector } from "@ducks/questionnaire";
import { answerByIdSelector } from "@ducks/answers";

type QuestionsPageProps = { id: string };
const QuestionsPage: NextPage<QuestionsPageProps> = (props) => {
    const dispatch = useTypedDispatch();
    const QuestionnaireState = useTypedSelector(questionnaireSelector);
    const ActiveQuestion = useTypedSelector(appQuestionIdSelector);

    const activeQuestionnaire = useMemo(
        () =>
            QuestionnaireState.find(
                (quest) => quest.questionnaire.identifier === props.id
            ),
        [QuestionnaireState]
    );

    const questions = activeQuestionnaire.questionnaire.questions;
    const questionsLength = questions.length - 1;
    const activeQuestionIdx = questions.findIndex(
        (question) => question.identifier === ActiveQuestion
    );

    const activeQuestion = useTypedSelector(
        answerByIdSelector(questions[activeQuestionIdx]?.identifier)
    );

    const showNextButton = questionsLength > activeQuestionIdx;

    useEffect(() => {
        dispatch(appActions.setQuestionnaireId(props.id));
    }, []);

    return (
        <Layout
            title={`Questionnaire: ${activeQuestionnaire.questionnaire.name}`}
            footer={
                showNextButton ? (
                    <Button
                        color="secondary"
                        variant="filled"
                        onClick={() => dispatch(setNextQuestion())}
                        disabled={activeQuestion?.required}
                    >
                        Next question
                    </Button>
                ) : (
                    <Button color="secondary" variant="filled">
                        Done
                    </Button>
                )
            }
        >
            <Questions questionnaireId={props.id} />
        </Layout>
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
