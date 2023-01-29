import { useState, useContext } from "react";
import { IoIosRemove, IoMdRemoveCircleOutline } from "react-icons/io";
import { ApiContext } from "../../../context/ApiContext";
import { AiOutlineSave } from "react-icons/ai";
import {BiArrowBack} from "react-icons/bi";

interface Props {
  name: string;
  id: string;
  handleRemoveItem: () => void;
}

interface ListItemContext {
  editItem: (newName: string, id: string) => void;
}

const ListItem: React.FC<Props> = ({ name, id, handleRemoveItem }) => {
  const [idEditItem, setIdEditItem] = useState("");
  const [updatedListValue, setUpdatedListValue] = useState(name);

  const { editItem } = useContext(ApiContext) as ListItemContext;

  if (idEditItem === id) {
    return (
      <div className="relative flex items-center ">
        <BiArrowBack onClick={() => setIdEditItem("")} className="h-6 w-6 cursor-pointer text-red-600 mr-2"  />
        <input
        autoFocus
          type="text"
          onChange={(e) => setUpdatedListValue(e.target.value)}
          defaultValue={name}
          className="translate w-full transform break-all rounded-lg border-2 border-white bg-transparent p-2 text-lg text-white duration-200 ease-in-out hover:shadow-white "
          onKeyDownCapture={(event: React.KeyboardEvent) =>
            event.key === "Enter" ? editItem(updatedListValue, id) : ""
          }
        />
        <AiOutlineSave onClick={() => editItem(updatedListValue,id)} className="h-6 w-6 cursor-pointer text-green-600 ml-2" />

      </div>
    );
  }

  return (
    <li
      onClick={() => setIdEditItem(id)}
      className={`translate group flex transform flex-row justify-between break-all rounded-lg border-2 border-white p-2 text-lg text-white duration-200 ease-in-out hover:translate-x-2 hover:shadow-white `}
    >
      {name}
      <IoIosRemove className="h-6 w-6 min-w-6 cursor-pointer text-red-500 group-hover:hidden" />
      <IoMdRemoveCircleOutline
        onClick={() => handleRemoveItem()}
        className="hidden h-6 w-6 min-w-6 cursor-pointer text-red-600 hover:scale-110 group-hover:flex"
      />
    </li>
  );
};

export default ListItem;
