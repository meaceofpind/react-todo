import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/AddNewTask.css"
import back from "../assets/arrow-left.png"

interface Prop {
  addTask(TaskDescription: string, Heading: string): any;
}

export default function AddNewTask(props: Prop) {
  const task = {
    Heading: "",
    Description: "",
  };
  const [input, setInput] = useState(task);
  const navigate = useNavigate();
  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setInput({
      ...input,
      [name]: value,
    });
  };
  function handleclick() {
    props.addTask(input.Description, input.Heading);
    
    navigate("/");
  }
  return (
    <>
      <img className="back-btn" src={back} onClick={()=>navigate("/")}/>
      <div className="addnewtask">
        <input
          className="heading"
          type="textbox"
          placeholder="Heading"
          name="Heading"
          onChange={handleChange}
        />
        <textarea
          className="desc"
          placeholder="Description"
          name="Description"
          onChange={handleChange}
        />
        <button className="save" onClick={handleclick}>Save</button>
      </div>
    </>
  );
}
