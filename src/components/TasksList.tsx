import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import Tasks from "./Tasks";
import "../styles/Tasks.css";
import back from "../assets/arrow-left.png";

type taskInterface = {
  id: string;
  Heading: string;
  Description: string;
  flag: string;
};

interface Prop {
  Tasks: taskInterface[];
  setTasks: React.Dispatch<React.SetStateAction<any[]>>;
  flag?: string;
}

export default function TasksList(props: Prop) {
  const [exit, setExit] = useState(false);
  const location = useLocation();
  const TaskList = props.Tasks.filter(
    (task) => task.flag === location.state.flag
  );

  const n = useNavigate();

  function handleClick(id?: string) {
    setTimeout(function () {
      n("/task", {
        state: { key: id, tasks: TaskList, flag: location.state.flag },
      });
    }, 800);
  }
  function handleExit() {
    setExit(true);
    setTimeout(() => n("/"), 550);
  }

  const TaskElements = TaskList.map((task) => {
    return (
      <Tasks
        TaskHeading={task.Heading}
        TaskDescription={task.Description}
        onClick={() => handleClick(task.id)}
        Exit={exit}
      />
    );
  });

  return (
    <>
      <img className="back-btn" tabIndex={0} src={back} onClick={handleExit} />
      <div className="list">{TaskElements}</div>
    </>
  );
}
