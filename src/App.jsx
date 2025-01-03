import { useState } from 'react'
import './App.css'

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({})

  const [liked, setLiked] = useState(true);
  

  function hanleInputChange(event) {


    setNewTask({isActive: true, description: event.target.value})
  }
  function addTask() {if(!newTask) return;
    setTasks([...tasks, newTask]);
    console.log(tasks);
    
  }
  function filterTodo (text){
    if(text == "active"){

      const filteredTask = tasks.filter((el)=> {return el.isActive === true})
      setTasks(filteredTask)
    } else if (text == "completed"){

      const filteredTask = tasks.filter((el)=> {return el.isActive === false})
      setTasks(filteredTask)
      console.log("completed daragdlaa");
      
    } else {
      return;
    }




  }


  const onchangeCheckBox = () => {

  }

  return (
    <>
      <div className='main-contain'>
        <p className='header'>To-Do-list</p>
        <div className='addflex'>
          <input onChange={hanleInputChange} className='inputer' type='text' placeholder='add a task...'
          />
          <button className='add-button'
            onClick={addTask}
          >
            add
          </button>
        </div>
        <div className='tab-main'>
          <button className='tab'>all</button>
          <button onClick={()=>filterTodo("active")} checked={liked} className='tab'>
           active
          </button>
          <button  onClick={()=>filterTodo("completed")} className='tab'>completed</button>
        </div>
        {
          tasks.length === 0 ? <p>no tasks yet . add one above</p> : tasks.map((task, index) =>
            <div style={{display: "flex", gap: "10px"}} key={index}>
              <input type='checkbox' onChange={onchangeCheckBox()}/>
              <p className='taskshow'>{task.description}</p>
            </div>
          )
        }
        <div className='footer container'>Powered by Pinecone academy</div>
      </div>
    </>
  )
}

export default App
