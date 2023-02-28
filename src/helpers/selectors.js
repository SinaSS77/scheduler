//+++++++HELPFULL FUNCTIONS THAT WILL BE USED IN APP AND HOOK+++++++++++++

// function returns an array of appointments for given day.
export function getAppointmentsForDay(state, day) {
  if (state.days.length === 0) {
    return [];
  }

  const filteredDay = state.days.filter((item) => item.name === day);

  if (filteredDay.length === 0) {
    return [];
  }

  const filterAppointmentFromDay = filteredDay[0].appointments;

  const desiredAppointments = filterAppointmentFromDay.map(
    (id) => state.appointments[id]
  );

  return desiredAppointments;
}

// function returns a new object containing relevant data pertaining to selected interview
/*State is look like this: {
  "id":1,
  "time":"12pm",
  "interview": {
    "student": "Lydia Miller-Jones",
    "interviewer": 1
  }
} */
export function getInterview(state, interview) {
  if (interview === null || interview.length === 0 || !interview) return null;
  //get value of interviewer from interview obj
  const interviewerId = interview.interviewer;

  //get single interviewer object from interviewers
  const singleInterviewer = state.interviewers[interviewerId];

  //combine data in a new object
  return { ...interview, interviewer: singleInterviewer };
}

export function getInterviewersForDay(state, day) {
  const foundDay = state.days.find((d) => d.name === day);
  if (!foundDay) {
    return [];
  }
  return foundDay.interviewers.map(
    (interviewerId) => state.interviewers[interviewerId]
  );
}

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//++++++++++Functions to calculate the remaining Spots in a single day
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

//function returns an object where the key is the id of a day and the value is the number of null (empty/avilable) appointments
const freeSpots = (state, appointments) => {
  let daysAppointments = {};
  state.days.map(day => {
    const { id, appointments } = day;
    daysAppointments[id] = [...appointments];
  });

  let dayLength = {};
  for (const [key, arr] of Object.entries(daysAppointments)) {
    let count = 0;
    arr.forEach((item) => {
      if (appointments[item].interview) {
        count++;
      }
      dayLength[key] = arr.length - count;
    });
  }
  return dayLength;
};

//function checks each day to find the appt id that was passed in and returns the corresponding day id.
const dayIdInAppointment = (state, apptId) => {
  let dayId;
  state.days.forEach((day) => {
    const { id, appointments } = day;
    if (appointments.includes(apptId)) {
      dayId = id;
    }
  });
  return dayId;
};

//function returns a day object with the updated spots value
export const remainedSpots = (state, apptId, appointments) => {
  const dayId = dayIdInAppointment(state, apptId);
  const spotsRemaining = freeSpots(state, appointments);
  const updatedSpot = spotsRemaining[dayId];
  const days = [...state.days];
  const updatedDays = days.map((day) => {
    if (day.id === dayId) {
      day = { ...day, spots: updatedSpot };
    }
    return day;
  });
  return updatedDays;
};