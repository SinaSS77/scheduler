import React, { useState } from "react";
import { useEffect } from "react";
import axios from 'axios';
import "components/Application.scss";
import "components/DayList.js";
import DayList from "components/DayList.js";
import Appointment from "./Appointment";
import { getAppointmentsForDay } from "helpers/selectors";
// import Appointment from "components/Appointment";


// const appointments = {
//   "1": {
//     id: 1,
//     time: "12pm",
//   },
//   "2": {
//     id: 2,
//     time: "1pm",
//     interview: {
//       student: "Lydia Miller-Jones",
//       interviewer: {
//         id: 3,
//         name: "Sylvia Palmer",
//         avatar: "https://i.imgur.com/LpaY82x.png",
//       }
//     }
//   },
//   "3": {
//     id: 3,
//     time: "2pm",
//   },
//   "4": {
//     id: 4,
//     time: "3pm",
//     interview: {
//       student: "Archie Andrews",
//       interviewer: {
//         id: 4,
//         name: "Cohana Roy",
//         avatar: "https://i.imgur.com/FK8V841.jpg",
//       }
//     }
//   },
//   "5": {
//     id: 5,
//     time: "4pm",
//   }
// };






export default function Application() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    // you may put the line below, but will have to remove/comment hardcoded appointments variable
    appointments: {},
    interviewers: {}
  });

  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const appointment = dailyAppointments.map(appointment => {
    const interview = getInterview(state, appointment.interview);
    return (appointment.interview
      ? <Appointment
        key={appointment.id}
        {...appointment}
      />
      : <Appointment
        time={appointment.time}
        id={appointment.id}
        key={appointment.id}
        interview={interview} />);
  });

  const setDay = day => setState({ ...state, day });
  // const setDays = days => setState(prev => ({ ...prev, days }));

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ]).then((all) => {
      const fetchedDays = all[0].data;
      const fetchedAppointments = all[1].data;
      const fetchedInterviewers = all[2].data;
      console.log("it is fetched interview", fetchedInterviewers);
      setState(prev =>
        ({ ...prev, days: fetchedDays, appointments: fetchedAppointments, interviewers: fetchedInterviewers }));
      // setDays(days);
    });
  }, []);

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={state.days} value={state.day}
            onChange={setDay}></DayList>
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />v
      </section>
      <section className="schedule">
        {appointment}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
