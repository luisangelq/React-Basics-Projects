import { Fragment, useState } from "react";
import Form from "./components/Form";

const App = () => {
  const [appointmentsApp, setAppointmentsApp] = useState([]);
  
  const addAppointment = appointment => {
    setAppointmentsApp([...appointmentsApp, appointment]);
  }

  console.log(appointmentsApp);

  return (
    <Fragment>
      <h1>Patients Manager</h1>

      <div className="container">
        <div className="row">
          <div className="one-half column">
            <Form addAppointment={addAppointment} />
          </div>
          <div className="one-half column">2</div>
        </div>
      </div>
    </Fragment>
  );
};

export default App;
