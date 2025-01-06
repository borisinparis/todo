import { useState } from 'react'
import './App.css'
import { v4 as uuidv4 } from 'uuid';

function App() {

  const [tasks, setTasks] = useState([]);

  const [newTask, setNewTask] = useState("");

  const [error, setError] = useState(false);

  const [filterState, setFilterState] = useState("all")

  const hanleInputChange = (event) => {
    setNewTask(event.target.value);
  }
  const addTask=() => {
    if (newTask.length === 0) {
      setError(true);
      alert("ta yum bichnuuu")
    }
    else {
      setError(false);
      setTasks([...tasks, {
        description:newTask, status: "active", id: uuidv4()
      }]);
      setNewTask("")
    }
  }
  
  const clearbottom = () => {
    const clearCompleted = tasks.filter((task) => task.status !== "completed")
    setTasks(clearCompleted)
  }
  const deletebottom =(id) => {
    const deleted = tasks.filter((task) => task.id !==id )
    setTasks(deleted)
  }

  const handleFilterStateChange = (state) => {
    setFilterState(state);
  }
  const onChangeCheckBox = (id) => {
    const taskOf = tasks.map((todo) => {
      if (todo.id === id) {
        return { ...todo, status: todo.status === "active" ? "completed" : "active" }
      }
      else {
        return todo
      }
    })
    setTasks(taskOf)
  }
  return (
    <>
      <div className='main-contain'>
        <p className='header'>To-Do-list</p>
        <div className='addflex'>
          <input onChange={hanleInputChange} className='inputer' type='text' placeholder='add a task...'
          />
          <button type='submit' className='add-button' onClick={addTask}>
            add
          </button>
        </div>
        <div className='tab-main'>
          <button onClick={() => handleFilterStateChange("all")} className='tab'>all</button>
          <button onClick={() => handleFilterStateChange("active")} className='tab'>active</button>
          <button onClick={() => handleFilterStateChange("completed")} className='tab'>completed</button>
        </div>
        {
          tasks.length === 0 ? <p>no tasks yet . add one above</p> :
           tasks.filter((todo) => {
            if (filterState === "active") {
              return todo.status === "active";

            } else if (filterState === "completed") {
              return todo.status === "completed"
            }
            else {
              return true
            }
          }).map((todo) => {
            return <button className='todolists' >
              <input type="checkbox" checked={todo.status === "completed"} onChange={() => onChangeCheckBox(todo.id)} />
              <p className='taskshow'>{todo.status==="completed" ? <del>{todo.description}</del> : todo.description}</p>
              <button onClick={()=>{deletebottom(todo.id)}} className='deleter'>Delete</button>
            </button>
 } )
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
        <div className='footer container'>Powered by Pinecone academy</div>
      </div>
    </>
  )
}

export default App
