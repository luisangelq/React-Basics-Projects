import { Fragment, useState } from "react";
import Swal from "sweetalert2";

const Form = ({addAppointment}) => {
  // State
  const [appointment, setAppointment] = useState({
    name: "",
    owner: "",
    date: "",
    time: "",
    symptoms: "",
  });
  const { name, owner, date, time, symptoms } = appointment;

  const createAppointment = (e) => {
    e.preventDefault();

    //Validate
    if (
      name.trim() === "" ||
      owner.trim() === "" ||
      date.trim() === "" ||
      time.trim() === "" ||
      symptoms.trim() === ""
    ) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "All Fields Are Required",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }

    //add an id
    appointment.id = new Date().getTime();

    //Create appointment
    addAppointment(appointment);

    //Reset Form
    
  };

  return (
    <Fragment>
      <h2>Create Appointment</h2>

      <form onSubmit={createAppointment}>
        <label>Pet Name</label>
        <input
          type="text"
          name="pet"
          className="u-full-width"
          placeholder="Pet Name"
          onChange={(e) =>
            setAppointment({ ...appointment, name: e.target.value })
          }
          value={name}
        />

        <label>Owner Name</label>
        <input
          type="text"
          name="owner"
          className="u-full-width"
          placeholder="Owner Name"
          onChange={(e) =>
            setAppointment({ ...appointment, owner: e.target.value })
          }
          value={owner}
        />

        <label>Date</label>
        <input
          type="date"
          name="date"
          className="u-full-width"
          onChange={(e) =>
            setAppointment({ ...appointment, date: e.target.value })
          }
          value={date}
        />
        <label>Time</label>
        <input
          type="time"
          name="time"
          className="u-full-width"
          onChange={(e) =>
            setAppointment({ ...appointment, time: e.target.value })
          }
          value={time}
        />

        <label>Symptoms</label>
        <textarea
          type="text"
          name="pet"
          className="u-full-width"
          placeholder="Symptoms"
          onChange={(e) =>
            setAppointment({ ...appointment, symptoms: e.target.value })
          }
          value={symptoms}
        ></textarea>

        <button type="submit" className="u-full-width button button-primary">
          Add Appointment
        </button>
      </form>
    </Fragment>
  );
};

export default Form;
