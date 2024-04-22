import React from "react";
import { useState, useEffect } from "react";
import "./styles/App.css";
import TasksDashboard from "./TasksDashboard";
import { nanoid } from "nanoid";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddNewTask from "./components/AddNewTask";
import TasksList from "./components/TasksList";
import TaskCard from "./components/TaskCard";

interface Prop {
  addTask(TaskDescription: string, Heading: string): any;
  Tasks: any[];
  setTasks: React.Dispatch<React.SetStateAction<any[]>>;
}

function App() {
  const local = localStorage.getItem("Tasks")
  console.log(local)
  const [Tasks, setTasks] = useState<any[]>(() => local?JSON.parse(local): []);

  useEffect(() => {
    localStorage.setItem("Tasks", JSON.stringify(Tasks))
  },[Tasks]);

  function addTask(TaskDescription: string, Heading: string) {
    setTasks(function (prevTasks) {
      const newTask = {
        id: nanoid(),
        Heading: Heading,
        Description: TaskDescription,
        flag: "created",
      };
      return [...prevTasks, newTask];
    });
  }

  function deleteTask(id:string){
    setTasks((prevTasks) => prevTasks.filter((task)=>task.id!=id))
  }

  function doneTask(id:string){
    setTasks(function (prevTasks) {
      const task = prevTasks.find((task) => task.id===id)
      if(task){
        task.flag = "done"
      }
      return [...prevTasks]
    })
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index addTask={addTask} Tasks={Tasks} setTasks={setTasks}/>} />
        {/* The next line is very important for the Navigate component to work */}
        <Route path="/add-new" element={<AddNewTask addTask={addTask}/>} />
        <Route path="/tasklist" element={<TasksList Tasks={Tasks} setTasks={setTasks}/>} />
        <Route path="/task" element={<TaskCard deleteTask={deleteTask} doneTask={doneTask}/>} />
      </Routes>
    </BrowserRouter>
  );

  
}

function Index(props: Prop) {  
  return (
    <>
      <div className="container">
        <TasksDashboard addTask={props.addTask} Tasks={props.Tasks} setTasks={props.setTasks} />
      </div>
    </>
  );
}

export default App;
