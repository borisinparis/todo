const Footer = (props) => {
    const {tasks,onClick} = props
    {
        tasks.length === 0 ? <p></p> : <div className='lineBottom'></div>
      }
      const clearbottom = () => {
        const clearCompleted = tasks.filter((task) => task.status !== "completed")
        setTasks(clearCompleted)
      }
      {
        tasks.length === 0 ? <div></div> : <div className='countertask'>
          <div className='duusahh'> {tasks.filter(task => task.status === 'completed',).length} of {tasks.length} tasks completed</div>
          <div className='duusah' onClick={clearbottom}>clear completed</div>
        </div>
      }
      <div className='footer container'>Powered by <a>Pinecone academy </a></div>
}  
export default Footer;