import React from "react";
import { useSelector } from "react-redux";
import { questionnaireSelector } from "@ducks/questionnaire";
import Link from "@uikit/Link";
import styles from "./questionnaires.module.scss";
import { NextPage } from "next";

const Questionnaries: NextPage = () => {
    const questionnaireStore = useSelector(questionnaireSelector);

    return (
        <ul className={styles.wrapper}>
            {questionnaireStore.map(({ questionnaire }) => {
                return (
                    <Link
                        key={questionnaire.identifier}
                        nextLinkProps={{
                            href: "questionnaire/[id]",
                            as: `questionnaire/${questionnaire.identifier}`,
                        }}
                    >
                        <li className={styles.questionnaire}>
                            <h1>{questionnaire.name}</h1>
                            <h3>{questionnaire.description}</h3>
                        </li>
                    </Link>
                );
            })}
        </ul>
    );
};

export default Questionnaries;
