import React, { Component } from "react";

import "./Question.css";
import QuestionHeader from "../../Components/QuestionHeader/QuestionHeader";
import AnswerList from "../../Components/Answers/AnswerList";
class Question extends Component {
	render() {
		const {
			location: { pathname },
		} = this.props;

		const [, , id] = pathname.split("/"); // the [ , , ] represents the first two elements in the array. because we don't need those variables and need just the id
		return (
			<main className="question-answer-section">
				<QuestionHeader {...this.props} id={id} />
				<AnswerList id={id} />
			</main>
		);
	}
}
export default Question;
