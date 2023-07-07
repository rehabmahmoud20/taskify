import "./ToDo.css";
import { toDo } from "../../model";
import SingleToDo from "./SingleToDo";
import { Droppable } from "react-beautiful-dnd";

interface props {
  setToDos: React.Dispatch<React.SetStateAction<toDo[]>>;
  setcompletedtoDos: React.Dispatch<React.SetStateAction<toDo[]>>;
  toDos: toDo[];
  completedtoDos: toDo[];
}
const TodoList: React.FC<props> = ({
  setToDos,
  toDos,
  completedtoDos,
  setcompletedtoDos,
}) => {
  return (
    <div className="container">
      <Droppable droppableId="todosList">
        {(provided, snapshot) => (
          <div
            className={`toDos active ${
              snapshot.isDraggingOver && "dragActive"
            }`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <span className="toDos-header">active tasks</span>
            {!toDos.length ?  (
              <h3 className="noTasksYet" >no taskes asigned yet !</h3>
            ) :  (
              toDos.map((todo, index) => (
                <SingleToDo
                  index={index}
                  todo={todo}
                  key={todo.id}
                  setToDos={setToDos}
                  toDos={toDos}
                />
              ))
            )}

            {provided.placeholder}
          </div>
        )}
      </Droppable>

      <Droppable droppableId="toDosCompleted">
        {(provided, snapshot) => (
          <div
            className={`completed toDos ${
              snapshot.isDraggingOver && "dragComplete"
            }`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <span className="toDos-header">completed tasks</span>
            {!completedtoDos.length ? (
              <h3 className="noTasksYet">no completed tasks yet !</h3>
            ) : (
              completedtoDos.map((todo, index) => (
                <SingleToDo
                  index={index}
                  todo={todo}
                  key={todo.id}
                  setToDos={setcompletedtoDos}
                  toDos={completedtoDos}
                />
              ))
            )}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default TodoList;
