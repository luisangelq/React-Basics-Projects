import { Fragment } from "react";
import styled from "styled-components";
import Task from "./Task";

const TaskList = () => {
  const tasks = [
    { name: "Do Chores", state: true },

    { name: "Cook Dinner", state: false },
    { name: "Clean House", state: false },
    { name: "Wash Car", state: true },
    { name: "Go to Gym", state: true },
  ];

  return (
    <Fragment>
      <h2>Project: Virtual Store</h2>

      <Ul>
        {tasks.length === 0 ? (
          <li>
            <p>There Are No Tasks</p>
          </li>
        ) : (
          tasks.map((task) => <Task key={task.name} task={task} />)
        )}
      </Ul>
    </Fragment>
  );
};

const Ul = styled.ul`
  max-width: 600px;
  margin: 0 auto;

  p {
      font-size: 1.6rem;
      padding-right: 2rem;
      text-align: center;
    }

`;

export default TaskList;
