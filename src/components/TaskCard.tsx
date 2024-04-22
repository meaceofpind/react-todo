import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import "../styles/TaskCard.css";
import back from "../assets/arrow-left.png"

interface Prop {
  doneTask(id: string): any;
  deleteTask(id: string): any;
}

type taskInterface = {
  id: string;
  Heading: string;
  Description: string;
  flag: string;
};

export default function TaskCard(props: Prop) {
  const [isDone,setDone] = useState(false)

  const n = useNavigate();
  const location = useLocation();
  console.log(location.state.flag);
  const taskid = location.state.key;
  const taskList = location.state.tasks;

  const task = taskList.find((tasks: taskInterface) => tasks.id == taskid);

  function handleDelete() {
    props.deleteTask(taskid);
    n("/tasklist", { state: { flag: location.state.flag } });
  }

  function handleDone() {
    props.doneTask(taskid);
    setDone(true)
    setTimeout(()=>n("/tasklist", { state: { flag: location.state.flag } }),800);
  }

  return (
    <>
        <img className="back-btn" src={back} onClick={()=>n("/tasklist", { state: { flag: location.state.flag } })}/>
      <div className={`Card ${location.state.flag} ${isDone?"isDone":""}`}>
        <h1>{task.Heading}</h1>
        <h2>{task.Description}</h2>
      </div>
      <div className={`buttons ${location.state.flag} ${isDone?"isDone":""}`}>
        <button className="Delete-btn" onClick={handleDelete}>
            <span>&#215;</span>
            <br />
            Delete
        </button>
        <button className="Done-btn" onClick={handleDone}>
          <span>&#10003;</span>
          <br />
          {location.state.flag === "done" ? "Completed" : "Done"}
        </button>
      </div>
    </>
  );
}
