import React, { Component } from "react";

import "./Question.css";
import QuestionHeader from "../../Components/QuestionHeader/QuestionHeader";
class Question extends Component {
	render() {
		return (
			<main>
				<QuestionHeader {...this.props} />
			</main>
		);
	}
}
export default Question;
