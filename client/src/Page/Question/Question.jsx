import React, { Component } from "react";

import "./Question.css";
import QuestionHeader from "../../Components/QuestionHeader/QuestionHeader";
import AnswerList from "../../Components/Answers/AnswerList";
class Question extends Component {
	render() {
		return (
			<main className="question-answer-section">
				<QuestionHeader {...this.props} />
				<AnswerList />
			</main>
		);
	}
}
export default Question;
