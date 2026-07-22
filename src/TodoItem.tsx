type priority = "urgente" | "Moyenne" | "basse";

type todo = {
  id: number;
  text: string;
  priority: priority;
}

type props = {
  todo: todo;
};

export const TodoItem = ({todo}: props) => {
  return (
    <li className="p-3">
     <div className="flex justify-between items-center">
        <div className="flex item-center gap-2">
<input type="checkbox" defaultChecked className="checkbox checkbox-primary checkbox-sm" />
        <span className="text-md font-bold">
            <span>{todo.text}</span>
        </span>
        <span className={`badge badge-sm badge-soft 
            ${todo.priority === "urgente" ?
             "badge-error" : todo.priority === "Moyenne" ?
              "badge-warning" : "badge-success"}`}>
            {todo.priority}
            </span>
        </div>
        </div> 
    </li>
  )
}

export default TodoItem