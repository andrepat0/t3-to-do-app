import React, { useState, useContext, MouseEventHandler } from "react";
import { ApiContext } from "../context/ApiContext";

  interface ButtonAddContext {
    addItemTodo: (itemName: string) => void;
  }

  
  const ButtonAddTodo: React.FC = () => {
    const [toDoName, setToDoName] = useState("");

    const {addItemTodo} = useContext(ApiContext) as ButtonAddContext;

    function handleAddTodo(){
      if(toDoName){
        addItemTodo(toDoName)
        setToDoName("");
      }
    }

    return (
      <div className="flex flex-row gap-2 mb-4 min-w-[22rem] ">
        <input type="text" onKeyDownCapture={(event: React.KeyboardEvent) => event.key === 'Enter' ? handleAddTodo() : ""} className="rounded-lg w-full" onChange={(e) => setToDoName(e.target.value)} value={toDoName} />
        <input value="ADD"  type="button" className="text-white font-bold hover:text-[#2e026d] hover:bg-white rounded-lg p-2 border-2 border-white mr-2" onClick={handleAddTodo} />
      </div>
    )
}

export default ButtonAddTodo;
