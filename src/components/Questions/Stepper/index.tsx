import {
    appActions,
    appQuestionIdSelector,
    appQuestionnaireIdSelector,
} from "@ducks/app";
import { questionnaireSelector } from "@ducks/questionnaire";
import useTypedDispatch from "@hooks/useTypedDispatch";
import Button from "@uikit/Button";
import clsx from "clsx";
import React from "react";
import { useSelector } from "react-redux";
import styles from "./stepper.module.scss";

const Stepper: React.FC = () => {
    const dispatch = useTypedDispatch();
    const QuestionnaireStore = useSelector(questionnaireSelector);
    const QuestionId = useSelector(appQuestionIdSelector);
    const QuestionnaireId = useSelector(appQuestionnaireIdSelector);

    const activeQuestionnare = QuestionnaireStore.find(
        ({ questionnaire }) => questionnaire.identifier === QuestionnaireId
    );

    if (!activeQuestionnare) return null;

    const questions = activeQuestionnare.questionnaire.questions;

    return (
        <ul className={styles.stepper}>
            {questions.map((question, idx) => {
                const isActive = question.identifier === QuestionId;

                return (
                    <li
                        key={question.identifier}
                        className={styles.stepperItem}
                    >
                        <Button
                            className={clsx(
                                styles.stepperItemBtn,
                                isActive && styles.stepperItemBtnActive
                            )}
                            onClick={() =>
                                dispatch(
                                    appActions.setQuestionId(
                                        question.identifier
                                    )
                                )
                            }
                        >
                            {idx + 1}
                        </Button>
                    </li>
                );
            })}
        </ul>
    );
};

export default Stepper;
