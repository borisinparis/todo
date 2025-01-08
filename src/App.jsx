import { useState } from 'react'
import './App.css'
import { v4 as uuidv4 } from 'uuid';
import moment from "moment";

function App() {

  const statusButton = ["all", "active", "completed", "logs"]

  const [tasks, setTasks] = useState([]);

  const [newTask, setNewTask] = useState("");

  const [error, setError] = useState(false);

  const [filterState, setFilterState] = useState("all")

  const [logs, setLogs] = useState([])


  // const mTime = moment().format("MMMM Do YYYY, h:mm:ss a")

  // const atMoment = () => {
  //   const timer = tasks.filter((task)=> task.status === "active")
  //   setMoment(timer)
  // }


  const hanleInputChange = (event) => {
    setNewTask(event.target.value);
  }
  const addTask = () => {
    if (newTask.length === 0) {
      setError(true);
      alert("ta yum bichnuuu")
    }
    else {
      setError(false);
      setTasks([...tasks, {
        description: newTask, id: uuidv4(), status: "active"
      }]);
      setNewTask("")
      setLogs([...logs, {
        description: tasks, id: tasks.id
        , logs: [{ status: "active", time: moment().format("h:mm:ss a") }]
      }])

    }
  }
  const clearbottom = () => {
    const clearCompleted = tasks.filter((task) => task.status !== "completed")
    setTasks(clearCompleted)
  }
  const deletebottom = (id) => {
    // Find the task to be deleted
    const taskToDelete = tasks.find((task) => task.id === id);
  
    // Update state to remove the task
    const updatedTasks = tasks.filter((task) => task.id === id);
    setTasks(updatedTasks);
  
    // If you want to keep logs of deleted tasks
    if (taskToDelete) {
      setLogs((prevLogs) => [...prevLogs, taskToDelete]);
    }
  };

  const handleFilterStateChange = (state) => {
    setFilterState(state);
  }
  const onChangeCheckBox = (id) => {
    const updatedTasks = tasks.map((todo) => {
      if (todo.id === id) {
        if (todo.status === "active") {
          return { ...todo, status: "completed" };
        } else if (todo.status === "completed") {
          return { ...todo, status: "logs" };
        } else if (todo.status === "logs") {
          return { ...todo, status: "active" };
        }
      }
      return todo; 
    });
    
    setTasks(updatedTasks);
  };
  return (
    <>
      <div className='main-contain'>
        <p className='header'>To-Do List</p>
        <div className='addflex'>
          <input onChange={hanleInputChange} value={newTask} className='inputer' type='text' placeholder='Add a new task...'
          />
          <button type='submit' className='add-button' onClick={addTask}>
            add
          </button>
        </div>
        <div className='tab-main'>
          {statusButton.map((el) => {
            return <button key={el} onClick={() => handleFilterStateChange(el)} style={{ background: filterState === el && "#3c82f6", color: filterState === el && 'white' }} className='tab'>{el}</button>

          })}
        </div>
        {
          tasks.length === 0 ? <p className='noyet'>No tasks yet. Add one above!</p> :
            tasks.filter((todo) => {
              if (filterState === "active") {
                return todo.status === "active";

              } else if (filterState === "completed") {
                return todo.status === "completed"
              } else if (filterState=== "logs") {
                return todo.status ==="logs"
              }
              else {
                return true
              }
            }).map((todo) => {
              return <button className='todomain'> <div>
                <div className='todolists' key={todo.id}>
                  <input className='checker' type="checkbox" checked={todo.status === "completed"} onChange={() => onChangeCheckBox(todo.id)} />
                  <p className='taskshow'>{todo.status === "completed" ? <del>{todo.description}</del> : todo.description}</p> </div> </div>
                <div onClick={() => { deletebottom(todo.id)}} className='deleter'>Delete</div> </button>

            })
        }
        {
          tasks.length === 0 ? <p></p> : <div className='lineBottom'></div>
        }
        {
          tasks.length === 0 ? <div></div> : <div className='countertask'>
            <div className='duusahh'> {tasks.filter(task => task.status === 'completed').length} of {tasks.length} tasks completed</div>
            <div className='duusah' onClick={clearbottom}>clear completed</div>
          </div>
        }
        <div className='footer container'>Powered by <a>Pinecone academy </a></div>
      </div>
    </>
  )
}

export default App