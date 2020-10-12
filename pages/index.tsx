import React from "react";
import { useSelector } from "react-redux";
import { questionnaireSelector } from "@ducks/questionnaire";
import Link from "next/link";

type IndexPageProps = {};
const IndexPage = (props: IndexPageProps) => {
	const questionnaireStore = useSelector(questionnaireSelector);

	return (
		<ul>
			{questionnaireStore.map(({ questionnaire }) => {
				return (
					<li key={questionnaire.identifier}>
						<Link
							href="questions/[id]"
							as={`questions/${questionnaire.identifier}`}
						>
							<div>
								<h1>{questionnaire.name}</h1>
								<h3>{questionnaire.description}</h3>
							</div>
						</Link>
					</li>
				);
			})}
		</ul>
	);
};

export default IndexPage;
