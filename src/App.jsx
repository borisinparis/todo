import { useState } from 'react'
import './App.css'
import { v4 as uuidv4 } from 'uuid';
import moment from "moment";


function App() {

  const STATUS_BUTTON = ["all", "active", "completed", "logs"]

  const [tasks, setTasks] = useState([]);

  const [newTask, setNewTask] = useState("");

  const [error, setError] = useState(false);

  const [filterState, setFilterState] = useState("all")

  const [logs, setLogs] = useState([])

  const hanleInputChange =(event) => {
    setNewTask(event.target.value)
  }

  const handleFilterStateChange = (state) => {
    setFilterState(state);
  }
  const clearbottom = () => {
    const clearCompleted = tasks.filter((task) => task.status !== "completed")
    setTasks(clearCompleted)
  }
  const activeTasks = tasks.filter((task) => tasks.status !== "active")
  const completedTasks = tasks.filter((task) => tasks.status !== "completed")
  const numberOfLogs = logs.filter((task) => tasks.status !== "logs")
  const deletebottom = (id) => {

    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);

    const updatedLogs = logs.map((log) => {
      if (log.id == id) {
        return { ...log, logs: [...log.logs, { status: "deleted", time: moment().format("h:mm:ss a") }] }
      }

      return log
    });
    console.log(updatedLogs);

    setLogs(updatedLogs)
  };
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

  {STATUS_BUTTON.map((el) => {
    return <button key={el} onClick={() => handleFilterStateChange(el)} style={{ background: filterState === el && "#3c82f6", color: filterState === el && 'white' }} className='tab'>{el}</button>
  })}


  const onChangeCheckBox = (id) => {
    const task = tasks.find((task) => task.id === id)
    const newStatus = task.status === "active" ? "completed" : "active";

    const newLog = {
      status: newStatus,
      time: moment().format("h:mm:ss a"),
    };
    const updatedLogs = logs.map((log) => {
      if (log.id === id) {
        return { ...log, logs: [...log.logs, newLog] }
      }
      else {
        return log
      }
    })

    const updatedTasks = tasks.map((todo) => {
      if (todo.id === id) {
        const newStatuss = todo.status === "active" ? "completed" : "active";
        return {
          ...todo,
          status: newStatuss, 
        };
      }
      return todo;
    });

    setTasks(updatedTasks);
    setLogs(updatedLogs)
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
          {STATUS_BUTTON.map((el) => {
            return <button key={el} onClick={() => handleFilterStateChange(el)} style={{ background: filterState === el && "#3c82f6", color: filterState === el && 'white' }} className='tab'>{el}</button>
          })}
        </div>
        {filterState === "logs" && logs.length > 0 && (
          logs.map((value, index) => (
            <div key={index}>{value.description}
              {value?.logs?.map((el, logIndex) => {
                if (el.status === "active") {
                  return <p key={logIndex}>Created at: {el.time}</p>;
                } else if (el.status === "deleted") {
                  return <p key={logIndex}>Deleted at: {el.time}</p>;
                } else if (el.status === "completed") {
                  return <p key={logIndex}>Completed at: {el.time}</p>;
                } else {
                  return null;
                }
              })}
                    {
        tasks.length === 0 ? <p className='noyet'>No tasks yet. Add one above!</p> :
          tasks.filter((todo) => {
            if (filterState === "active") {
              return todo.status === "active";

            } else if (filterState === "completed") {
              return todo.status === "completed"
            }
            else if (filterState === "all") {
              return true
            }
          }).map((todo) => {
            return <button className='todomain' key={todo.id}> <div>
              <div className='todolists' key={todo.id}>
                <input className='checker' type="checkbox" checked={todo.status === "completed"} onChange={() => onChangeCheckBox(todo.id)} />
                <p className='taskshow'>{todo.status === "completed" ? <del>{todo.description}</del> : todo.description}</p> </div> </div>
              <div onClick={() => { deletebottom(todo.id) }} className='deleter'>Delete</div> </button>

          })
      }
              </div>
          ))
        )}

        {
          logs.length === 0 ? <p className='noyet'>No tasks yet. Add one above!</p> :
            tasks.filter((todo) => {
              if (filterState === "active") {
                return todo.status === "active";

              } else if (filterState === "completed") {
                return todo.status === "completed"
              }
              else if (filterState === "all") {
                return true
              }
            }).map((todo) => {
              return <button className='todomain' key={todo.id}> <div>
                <div className='todolists' key={todo.id}>
                  <input className='checker' type="checkbox" checked={todo.status === "completed"} onChange={() => onChangeCheckBox(todo.id)} />
                  <p className='taskshow'>{todo.status === "completed" ? <del>{todo.description}</del> : todo.description}</p> </div> </div>
                <div onClick={() => { deletebottom(todo.id) }} className='deleter'>Delete</div> </button>

            })
        }
      {
        tasks.length === 0 ? <p></p> : <div className='lineBottom'></div>
      }
      {
        tasks.length === 0 ? <div></div> : <div className='countertask'>
          <div className='duusahh'> {tasks.filter(task => task.status === 'completed',).length} of {tasks.length} tasks completed</div>
          <div className='duusah' onClick={clearbottom}>clear completed</div>
        </div>
      }
      <div className='footer container'>Powered by <a>Pinecone academy </a></div>
      </div>
    </>
  )
}

export default App