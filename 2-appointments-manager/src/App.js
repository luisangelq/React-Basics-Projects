import { Fragment, useState, useEffect } from "react";
import Form from "./components/Form";
import Appointment from "./components/Appointment";

const App = () => {

  let initialAppointments = JSON.parse(localStorage.getItem("appointmentsApp"));
  if (!initialAppointments) {
    initialAppointments = [];
  }
  const [appointmentsApp, setAppointmentsApp] = useState(initialAppointments);

  useEffect(() => {
    if (initialAppointments) {
      localStorage.setItem("appointmentsApp", JSON.stringify(appointmentsApp));
    } else {
      localStorage.setItem("appointmentsApp", JSON.stringify([]));
    }

  }, [appointmentsApp, initialAppointments]);

  const addAppointment = (appointment) => {
    setAppointmentsApp([...appointmentsApp, appointment]);
  };

  //delete appointment by id
  const deleteAppointment = (id) => {
    const newAppointments = appointmentsApp.filter(
      (appointment) => appointment.id !== id
    );
    setAppointmentsApp(newAppointments);
  };

  console.log(appointmentsApp);

  return (
    <Fragment>
      <h1>Patients Manager</h1>

      <div className="container">
        <div className="row">
          <div className="one-half column">
            <Form addAppointment={addAppointment} />
          </div>
          <div className="one-half column">
            {appointmentsApp.length === 0 ? (
              <h2>Add An Appointment</h2>
            ) : (
              <h2>Appointments</h2>
            )}

            {appointmentsApp.map((appointment) => (
              <Appointment
                key={appointment.id}
                appointment={appointment}
                deleteAppointment={deleteAppointment}
              />
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default App;
