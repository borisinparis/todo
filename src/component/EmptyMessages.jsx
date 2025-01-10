const EmptyMessages = (props) => {
    const { filter, tasks } = props;
    const activeTasks = tasks.filter((task) => task.status === "active");
    const completedTasks = tasks.filter((task) => task.status === "completed");
return (
    <>
          {activeTasks.length === 0 && filter === "active" && (
        <div>No ACTIVE TASKS</div>
      )}
      {completedTasks.length === 0 && filter === "completed" && (
        <div>No COMPLETED TASKS</div>
      )}
      {tasks.length === 0 && filter === "all" && <div>No TASKS</div>}
    </>
)
}
export default EmptyMessages