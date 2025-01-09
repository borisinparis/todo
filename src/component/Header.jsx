import { Button } from "./Button";
import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';

const STATUS_BUTTON = ["all", "active", "completed", "logs"]

const Header = (props) => {
    const { tasks , setTasks , setFilter, filter , logs , setLogs , filterState , setFilterState} = props;
    const {newTask, setNewTask} = useState("");

      const addTask = () => {
        if (newTask.length === 0) {
          setError(true);
          alert("ta yum bichnuuu")
        }
        else {
          setError(false);
          const newTodoTask = {
            description: newTask, id: uuidv4(), status: "active"
          }
          setTasks([...tasks, newTodoTask]);
          setNewTask("")
          setLogs([...logs, {
            description: newTask,
            id: newTodoTask.id,
            logs: [{ status: "active", time: moment().format("h:mm:ss a") }]
          }]);
    
        }
      }

      const hanleInputChange = (event) => {
        setNewTask(event.target.value);
      }
}

