import { useRef } from "react";
import "./InputField.css";
interface props {
  toDo: string;
  setToDo: React.Dispatch<React.SetStateAction<string>>;
  handleSubmit: (e: React.FormEvent) => void;
}
const InputField: React.FC<props> = ({ toDo, setToDo, handleSubmit }) => {
  const inputEle = useRef<HTMLInputElement>(null);
  const setTask = (e: React.ChangeEvent<HTMLInputElement>) => {
    setToDo(e.target.value);
  };

  return (
    <form onSubmit={(e)=>{
        handleSubmit(e)
        inputEle.current?.blur()
    }}>
      <input
        ref={inputEle}
        type="text"
        className="enter-input"
        placeholder="Enter a task"
        value={toDo}
        onChange={setTask}
      />
      <button className="add-task-btn" type="submit">go</button>
    </form>
  ); 
};

export default InputField;
