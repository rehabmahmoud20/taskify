import { useState } from "react";
import "./App.css";
import { toDo } from "./model";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// components
import Header from "./components/Header";
import InputField from "./components/InputField/InputField";
import TodoList from "./components/Todo/TodoList";
import { DragDropContext, DropResult } from "react-beautiful-dnd";


const App: React.FC = () => {
  const [todo, setToDo] = useState<string>("");
  const [toDos, setToDos] = useState<toDo[]>([]);
  const [completedtoDos, setcompletedtoDos] = useState<toDo[]>([]);
  
 
  
 

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!todo) {
      toast("please enter your task");
    } else {
      setToDos([...toDos, { id: Date.now(), todo, isDone: false }]);
      if(toDos.length){
        localStorage.setItem('data', JSON.stringify(toDos))
      }
      
      setToDo("");
    }
  };

  const handleOnDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination?.droppableId) return;
    if (
      source.droppableId === destination?.droppableId &&
      destination.index === source.index
    )
      return;

    let addedTask ;
    if (source.droppableId === "todosList") {
      addedTask= toDos[source.index]
     
     
      toDos.splice(source.index, 1);
    } else {
      addedTask= completedtoDos[source.index]

    
      completedtoDos.splice(source.index, 1);
    }
    // ///////////////////////////////////////////////////////////////////////////////
    if (destination.droppableId === "todosList") {
      toDos.splice(destination.index, 0, addedTask);
    } else {
      completedtoDos.splice(destination.index, 0, addedTask);
    }
  };

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <main className="App">
        <Header />
        <ToastContainer />
        <InputField toDo={todo} setToDo={setToDo} handleSubmit={handleSubmit} />
        <TodoList
          setToDos={setToDos}
          toDos={toDos}
          completedtoDos={completedtoDos}
          setcompletedtoDos={setcompletedtoDos}
        />
      </main>
    </DragDropContext>
  );
};

export default App;
