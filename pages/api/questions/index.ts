import { NextApiRequest, NextApiResponse } from "next";
import questionnaireJSON from "./questionnaire.json";

const questionsHandler = (
	_req: NextApiRequest,
	res: NextApiResponse<QuestionnaireAPI.questions.response>
) => {
	try {
		if (!questionnaireJSON) {
			throw new Error("Cannot find questions data");
		}

		res.status(200).json([questionnaireJSON as QuestionnaireJSON.Response]);
	} catch (err) {
		res.status(500).json({ statusCode: 500, message: err.message });
	}
};

export default questionsHandler;
