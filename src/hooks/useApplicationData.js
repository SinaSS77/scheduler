import { useState, useEffect } from "react";

import axios from "axios";
import { remainedSpots } from "../helpers/selectors";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = (day) => setState({ ...state, day });

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {
      const fetchedDays = all[0].data;
      const fetchedAppointments = all[1].data;
      const fetchedInterviewers = all[2].data;

      setState((prev) => ({
        ...prev,
        days: fetchedDays,
        appointments: fetchedAppointments,
        interviewers: fetchedInterviewers,
      }));
    });
  }, []);



  async function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    const days = remainedSpots(state, id, appointments);
    return await axios
      .put(`/api/appointments/${id}`, { interview: interview })
      .then(() => setState({ ...state, appointments, days }));
  }

  async function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    const days = remainedSpots(state, id, appointments);

    return axios.delete(`/api/appointments/${id}`).then((resp) => {
      setState({ ...state, appointments, days });
    });
  }
  return { state, setDay, bookInterview, cancelInterview };
}