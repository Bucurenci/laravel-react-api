import {useState} from "react";
import Task from "../components/admin/Task";

export default function TodoList() {

  const [newTask, setNewTask] = useState("");
  const [todoList, setTodoList] =useState([]);

  const handleChange = (event) => {
    setNewTask(event.target.value);
  }

  const addNewTask = (e) => {
    e.preventDefault();
    if (newTask) {
      setTodoList([...todoList, {
        id: todoList.length ? todoList.length : 0,
        taskName: newTask,
        isCompleted: false
      }]);
      setNewTask("");
    }
  }

  const removeTask = (taskId) => {
    setTodoList(todoList.filter((task) => task.id !== taskId));
  }

  const completeTask = (taskId) => {
    setTodoList(todoList.map((task) => {
      if (task.id == taskId) {
        return {...task, isCompleted: true};
      }
      return task;
    }));
  }

  return (

    <div className="card border-0 shadow-lg">
      <div className="card-header">
          <h1 className="h2">Add/Remove TODO Tasks</h1>
      </div>
      <div className="card-body py-4">
        <div className="row justify-content-center">
          <div className="col col-md-9 col-xl-7">

            <form onSubmit={addNewTask} className="row">

              <div className="col">
                <input onChange={handleChange} className="form-control form-control-user form-control-lg"
                       value={newTask}
                       id="todoTaskInput"
                       placeholder="Todo Task..."/>
              </div>
              <div className="col-auto">
                <button className="btn btn-success btn-lg">Add Task</button>
              </div>
            </form>

            {todoList &&
              <div className="col-12 mt-4">
                {todoList.map((task) => {
                  return <Task key={task.id} task={task} onDelete={removeTask} onUpdate={completeTask} />;
                })}
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  );
}
