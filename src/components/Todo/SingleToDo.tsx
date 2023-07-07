import "./ToDo.css";
import { toDo } from "../../model";
import { AiFillEdit } from "react-icons/ai";
import { BsFillTrashFill } from "react-icons/bs";
import { MdDone } from "react-icons/md";
// import {useDraggable} from "react-beautiful-dnd";
// import { useDraggable } from 'react-beautiful-dnd';
import { Draggable } from "react-beautiful-dnd";
import { useState, useRef, useEffect } from "react";

interface props {
  todo: toDo;
  setToDos: React.Dispatch<React.SetStateAction<toDo[]>>;
  toDos: toDo[];
  index: number;
}
const SingleToDo: React.FC<props> = ({ todo, index, setToDos, toDos }) => {
  const [isEdit, setEdit] = useState<boolean>(false);
  const [editTodo, seteditTodo] = useState<string>(todo.todo);
  const editInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    editInput.current?.focus();
  }, [isEdit]);

  //   handle delete func
  const handleDelete = (id: number) => {
    setToDos(
      toDos.filter((todo) => {
        return todo.id !== id;
      })
    );
  };

  //   handle edit func
  const handleEdite = () => {
    if (!todo.isDone) {
      setEdit(!isEdit);
    }
    // if (isEdit) {
    //   editInput.current?.focus();
    // }
  };
  const handleEditInput = (id: number, e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setToDos(
      toDos.map((e) => {
        return e.id === id ? { ...e, todo: editTodo } : e;
      })
    );
    setEdit(!isEdit);
  };
  //   handle done func
  const hangleDone = (id: number) => {
    setToDos(
      toDos.map((item) =>
        item.id === id ? { ...item, isDone: !item.isDone } : item
      )
    );
  };

  return (
    <Draggable draggableId={todo.id.toString()} index={index}>
      {(provided) => (
        <form
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className="toDo"
          onSubmit={(e) => {
            handleEditInput(todo.id, e);
          }}
        >
          {isEdit ? (
            <input
              className="single-todo"
              ref={editInput}
              value={editTodo}
              onChange={(e) => {
                seteditTodo(e.target.value);
              }}
            />
          ) : !todo.isDone ? (
            <p className="todo-text">{todo.todo}</p>
          ) : (
            <s className="todo-text">{todo.todo}</s>
          )}
          {isEdit && (
            <button className="edit-btn" type="submit">
              {" "}
              Edit
            </button>
          )}

          <AiFillEdit className="icon" onClick={handleEdite} />
          <BsFillTrashFill
            className="icon"
            onClick={() => {
              handleDelete(todo.id);
            }}
          />
          <MdDone
            className="icon"
            onClick={() => {
              hangleDone(todo.id);
            }}
          />
        </form>
      )}
    </Draggable>
  );
};

export default SingleToDo;
