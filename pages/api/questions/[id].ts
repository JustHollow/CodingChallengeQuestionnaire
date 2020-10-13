import { NextApiRequest, NextApiResponse } from "next";
import questionnaireJSON from "./questionnaire.json";

const questionsHandler = (
    req: NextApiRequest,
    res: NextApiResponse<QuestionnaireAPI.questions.id.response>
) => {
    try {
        const questionId = Array.isArray(req.query.id)
            ? req.query.id[0]
            : req.query.id;

        if (!questionnaireJSON || !questionId) {
            throw new Error("Cannot find question data");
        }

        const findedQuestion = questionnaireJSON.questionnaire.questions.find(
            (question) => question.identifier === questionId
        );

        if (!findedQuestion)
            throw new Error(`Cannot find question with id: ${questionId}`);

        res.status(200).json(
            findedQuestion as QuestionnaireAPI.questions.id.success
        );
    } catch (err) {
        res.status(500).json({ statusCode: 500, message: err.message });
    }
};

export default questionsHandler;
