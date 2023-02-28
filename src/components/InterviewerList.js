import PropTypes from 'prop-types';
import React from "react";
import "./InterviewerList.scss";
import InterviewerListItem from "./InterviewerListItem";

export default function InterviewerList(props) {
  const list = props.interviewers.map(interviewer => {
    return (
      <InterviewerListItem
        key={interviewer.id}
        name={interviewer.name}
        avatar={interviewer.avatar}
        // selected={interviewer.id === props.interviewer}
        selected={interviewer.id === props.value}
        // setInterviewer={() => props.setInterviewer(interviewer.id)} />
        setInterviewer={() => props.onChange(interviewer.id)} />
    );
  });

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {list}
      </ul>
    </section>
  );
}
InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
};