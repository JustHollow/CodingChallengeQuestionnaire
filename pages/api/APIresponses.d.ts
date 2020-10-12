type DefaultError = { statusCode: number; message: string };
type withDefaultError<T> = T | DefaultError;

namespace QuestionnaireAPI {
	namespace questions {
		type success = QuestionnaireJSON.Response[];
		type fail = DefaultError;
		type response = withDefaultError<success>;

		namespace id {
			type success = QuestionnaireJSON.Question;
			type fail = DefaultError;
			type response = withDefaultError<success>;
		}
	}
}
