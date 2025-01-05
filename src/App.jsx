import { useState } from 'react'
import './App.css'

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({})
  const [liked, setLiked] = useState(true);
  function hanleInputChange(event) {


    setNewTask({isActive: true, description: event.target.value})
    console.log(newTask);
    
  }


  function addTask() {
    
    if(!newTask)
      return;
    setTasks([...tasks, newTask]);
    console.log(tasks);
    
    
  }
  function filterTodo (text){
    if(text === "all") {
      setTasks(tasks)
      console.log("all daragdlaa");
      
    }


    if(text == "active"){

      const filteredTask = tasks.filter((el)=> {return el.isActive === true})
      setTasks(filteredTask)
      console.log("active daragdlaa");
      
    } else if (text == "completed"){

      const filteredTask = tasks.filter((el)=> {return el.isActive === false})
      setTasks(filteredTask)
      console.log("completed daragdlaa");
      
    } else {
      return;
    }




  }

  const clearbottom= () => {
    alert("cleared")

  }
  const onchangeCheckBox = (e) => {

    setLiked(e.target.checked)}


  return (
    <>
      <div className='main-contain'>
        <p className='header'>To-Do-list</p>
        <div className='addflex'>
          <input onChange={hanleInputChange} className='inputer' type='text' placeholder='add a task...'
          />
          <button type='submit' className='add-button'
            onClick={addTask}
          >
            add
          </button>
        </div>
        <div className='tab-main'>
          <button onClick={()=>filterTodo("all")} className='tab-all'>all</button>
          <button onClick={()=>filterTodo("active")} checked={liked} className='tab'>
           active
          </button>
          <button  onClick={()=>filterTodo("completed")} className='tab'>completed</button>
        </div>
        {
          tasks.length === 0 ? <p>no tasks yet . add one above</p> : tasks.map((task, index) =>
            <button className='todolists' key={index} checked={liked} onClick={onchangeCheckBox} >
              <input type='checkbox'/>
              <p className='taskshow'>{liked ? <del>{task.description}</del> : task.description }</p>
              <button className='deleter'>Delete</button>
            </button>
          )
        }
        {
          tasks.length === 0 ? <p></p>: <div className='lineBottom'></div> 
        }
        {
          tasks.length === 0 ? <div></div> : <div className='countertask'>
            <div className='duusahh'> of tasks compeleted </div> 
            <div className='duusah' onClick={clearbottom}>clear completed</div>
          </div>
        }
        <div className='footer container'>Powered by Pinecone academy</div>
      </div>
    </>
  )
}

export default App
