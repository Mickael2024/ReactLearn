import { useEffect, useState } from "react";
import { TodoItem } from "./TodoItem";

type priority = "urgente" | "Moyenne" | "basse";

type todo = {
  id: number;
  text: string;
  priority: priority;
}

function App() {


  const [input , setInput] = useState<string>("");
   const [priority , setPriority] = useState<priority>("Moyenne");
   const savedTodos = localStorage.getItem("todos");
   const initialTodos = savedTodos ? JSON.parse(savedTodos) : [];
  const [todos , setTodos] = useState<todo[]>(initialTodos);

const [filter, setFilter] = useState<priority | "Tous">("Tous");
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);
   function addTodo() {
    if(input.trim() === "") return;
    const newTodo: todo = {
         id: Date.now(),
        text: input.trim(),
        priority: priority
    }

  const newTodos = [ newTodo, ...todos,];
  setTodos(newTodos);
  setInput("");
  setPriority("Moyenne");
  console.log(newTodos);
   }
   let filteredTodos: todo[] = [];
if (filter === 'Tous') {
  filteredTodos = todos;
}else {
  filteredTodos = todos.filter((todo) => todo.priority === filter);
}

  return (
    <div className="flex justify-center">
      <div className="w-2/3 flex-col gap-4 my-15 bg-base-200 p-4 rounded-2xl">
        <div className="flex gap-4">
          <input type="text" className="input w-full"
           placeholder="ajouter une tache"
           value={input} onChange={(e) => setInput(e.target.value)}
           />
       <select className="select" value={priority} onChange={(e) => setPriority(e.target.value as priority)}>
          <option value="urgente">Urgente</option>
          <option value="Moyenne">Moyenne</option>
          <option value="basse">Basse</option>
        </select>
        <button onClick={addTodo} className="btn btn-primary">Ajouter</button>
        </div>
        <div className="space-y-2 flex-1 h-fit">
          <div className="flex flex-wrap gap-4">
            <button className={`btn btn-soft ${filter === "Tous" ? "btn-primary" : ""}`}
             onClick={() => setFilter("Tous")}>
              tous
              </button>
          </div>
          {filteredTodos.length > 0 ? (
            <ul className="divide-y divide-primary/20">
              {filteredTodos.map((todo) => (
                <li key={todo.id}>
                  <TodoItem todo={todo} />
                </li>
              ))}
            </ul>
          ) : (
            <div>Aucune tâche trouvée</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App
