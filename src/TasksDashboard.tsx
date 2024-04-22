import { useNavigate } from "react-router-dom";
import add from "./assets/add.png";

interface Prop {
  addTask(TaskDescription: string, Heading: string): any;
  Tasks: any[];
  setTasks: React.Dispatch<React.SetStateAction<any[]>>;
}

export default function TasksDashBoard(props: Prop) {
  const navigate = useNavigate();
  function handleClick(flag: string) {
    console.log(flag);
    setTimeout(function () {
      navigate("/tasklist", { state: { flag: flag } });
    }, 1000);
  }

  return (
    <>
      <div>
        <img
          src={add}
          className="Add-New"
          onClick={() => setTimeout(()=>navigate("/add-new"),0)}
        />
      </div>
      <div className="dashboard">
        <div className="InProgress" onClick={() => handleClick("created")}>
          <h1>
            {props.Tasks.filter((task) => task.flag == "inprogress").length}
          </h1>
          <h3>Tasks in progress</h3>
        </div>
        <div className="ToDo" onClick={() => handleClick("created")}>
          <h1>{props.Tasks.filter((task) => task.flag == "created").length}</h1>
          <h3>Tasks in todo</h3>
        </div>
        <div className="Done" onClick={() => handleClick("done")}>
          <h1>{props.Tasks.filter((task) => task.flag == "done").length}</h1>
          <h3>Tasks in done</h3>
        </div>
      </div>
    </>
  );
}
