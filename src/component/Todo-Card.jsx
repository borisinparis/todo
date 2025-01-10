import { Buttom } from "./Button";
import { EmptyMessages } from "./Empty-Messages";
const TodoCard = (props) => {
    const {tasks , logs } = props
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
}