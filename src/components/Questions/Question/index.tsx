import React, { useEffect } from "react";
import { QuestionnaireState } from "@ducks/questionnaire";
import Button from "@uikit/Button";
import styles from "./question.module.scss";
import { answerByIdSelector, answersActions } from "@ducks/answers";
import useTypedDispatch from "@hooks/useTypedDispatch";
import useTypedSelector from "@hooks/useTypedSelector";
import Textarea from "@uikit/Textarea";
import useDebounce from "@hooks/useDebounce";
import { appActions, setNextQuestion } from "@ducks/app";
import clsx from "clsx";

type QuestionProps = {
    question: QuestionnaireState[0]["questionnaire"]["questions"][0];
};

const Question: React.FC<QuestionProps> = ({ question }) => {
    const dispatch = useTypedDispatch();

    const activeQuestion = useTypedSelector(
        answerByIdSelector(question.identifier)
    );

    useEffect(() => {
        dispatch(appActions.setQuestionId(question.identifier));
    }, []);

    const setAnswerDebounced = useDebounce((answer) => {
        dispatch(
            answersActions.setAnswer({
                ...question,
                answer: [answer],
            })
        );
    });

    return (
        <div key={question.identifier} className={styles.question}>
            <h1>{question.headline}</h1>
            <h3>{question.description}</h3>

            <ul className={styles.answers}>
                {question.multiline && (
                    <li
                        className={clsx(
                            styles.answerItem,
                            styles.answerItemTextarea
                        )}
                    >
                        <Textarea
                            onChange={(event) =>
                                setAnswerDebounced(event.target.value)
                            }
                        />
                    </li>
                )}

                {question.choices?.map((choice, idx) => {
                    const isActiveChoice = activeQuestion?.answer.find(
                        (ans) => ans === choice.value
                    );

                    return (
                        <li
                            key={choice.value + idx}
                            className={styles.answerItem}
                        >
                            <Button
                                variant={isActiveChoice ? "filled" : "outline"}
                                color="primary"
                                onClick={() => {
                                    if (question.multiple === "true") {
                                        const answers =
                                            activeQuestion?.answer.slice() ??
                                            [];

                                        const answerIdx = answers.findIndex(
                                            (answer) => answer === choice.value
                                        );

                                        const newAnswers =
                                            answerIdx === -1
                                                ? [...answers, choice.value]
                                                : (answers.splice(answerIdx, 1),
                                                  answers);

                                        dispatch(
                                            answersActions.setAnswer({
                                                ...question,
                                                answer: newAnswers,
                                            })
                                        );
                                    } else {
                                        dispatch(
                                            answersActions.setAnswer({
                                                ...question,
                                                answer: [choice.value],
                                            })
                                        );
                                        dispatch(setNextQuestion());
                                    }
                                }}
                            >
                                {choice.label}
                            </Button>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default Question;
