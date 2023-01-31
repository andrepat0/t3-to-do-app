import { useState, useContext } from "react";
import { ApiContext } from "../../../context/ApiContext";
import { AiOutlineSave } from "react-icons/ai";
import { BiArrowBack } from "react-icons/bi";

interface Props {
  name: string;
  id: string;
  idEditItem: string;
  handleRemoveItem: () => void;
  settingIdEditItem: (val: string) => void;
}

interface ListItemContext {
  editItem: ({}: object) => void;
  isLoadingEdit: boolean;
}

const ListItem: React.FC<Props> = ({
  name,
  id,
  handleRemoveItem,
  idEditItem,
  settingIdEditItem,
}) => {
  //Nuovo valore item lista di cui fare l'update
  const [updatedListValue, setUpdatedListValue] = useState(name);

  const { editItem, isLoadingEdit } = useContext(ApiContext) as ListItemContext;

  function handleUpdateValue(event: React.KeyboardEvent) {
    if (event.key === "Enter") {
      editItem({ name: updatedListValue, id: id });
      // settingIdEditItem("");
    }
  }

  if (isLoadingEdit && idEditItem === id) {
    return (
      <li className="h-10 w-full animate-pulse rounded-md bg-slate-400"></li>
    );
  }

  if (idEditItem === id) {
    return (
      <div className="relative flex items-center ">
        <BiArrowBack
          onClick={() => settingIdEditItem("")}
          className="mr-2 h-6 w-6 cursor-pointer text-red-600"
        />
        <input
          autoFocus
          type="text"
          onChange={(e) => setUpdatedListValue(e.target.value)}
          defaultValue={name}
          className="translate w-full transform break-all rounded-lg border-2 border-white bg-transparent p-2 text-lg text-white duration-200 ease-in-out hover:shadow-white "
          onKeyDownCapture={handleUpdateValue}
        />
      </div>
    );
  }

  return (
    <li
      onClick={() => settingIdEditItem(id)}
      className={` w-full cursor-pointer flex transform flex-row justify-between break-all rounded-lg border-2 border-white p-2 text-lg text-white  hover:shadow-white `}
    >
      {name}
    </li>
  );
};

export default ListItem;
