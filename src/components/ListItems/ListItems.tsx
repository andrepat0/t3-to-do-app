import { useContext, useState } from "react";
import { ApiContext } from "../../context/ApiContext";
import ListItem from "./ListItem/ListItem";
import { IoIosRemove, IoMdRemoveCircleOutline } from "react-icons/io";

interface ListItemsContext {
  isLoadingList: boolean;
  isLoadingRemove: boolean;
  isLoadingCreation: boolean;
  listItems: [];
  removeItem: (id: string) => void;
}

const ListItems: React.FC = () => {
  //Item in lista attualmente in stato aggiornamento
  const [idEditItem, setIdEditItem] = useState("");

  const { isLoadingList, isLoadingCreation, listItems, removeItem } =
    useContext(ApiContext) as ListItemsContext;

  const [idRemovedItem, setIdRemovedItem] = useState("");

  function handleRemoveToDo(id: string) {
    setIdRemovedItem(id);
    removeItem(id);
  }

  return (
    <ul className=" relative flex h-full max-h-max w-full max-w-sm flex-col gap-2 overflow-y-auto p-4">
      {isLoadingList
        ? [Array(10)].map((el, i) => (
            <li
              key={i}
              className="h-6 w-full animate-pulse rounded-md bg-slate-400"
            />
          ))
        : isLoadingCreation
        ? [{ name: "new", id: "new" }, ...listItems]?.map(
            (el: { name: string; id: string }, i: number) =>
              el.name === "new" ? (
                <li
                  key={i}
                  className="h-10 w-full animate-pulse rounded-md bg-slate-400"
                ></li>
              ) : (
                <div key={i}>
                  <ListItem
                    idEditItem={idEditItem}
                    settingIdEditItem={(val: string) => setIdEditItem(val)}
                    id={el?.id}
                    name={el?.name}
                    handleRemoveItem={() => handleRemoveToDo(el.id)}
                  />
                </div>
              )
          )
        : listItems?.map((el: { name: string; id: string }, i: number) => (
            <div
              className={
                el?.id == idRemovedItem
                  ? " relative left-0 top-0 flex items-center -translate-x-full transform duration-500 ease-out "
                  : " relative flex items-center duration-200 ease-in-out hover:translate-x-2 "
              }
              key={i}
            >
              <ListItem
                idEditItem={idEditItem}
                settingIdEditItem={(val: string) => setIdEditItem(val)}
                id={el?.id}
                name={el?.name}
                handleRemoveItem={() => handleRemoveToDo(el.id)}
              />
                <IoIosRemove
                onClick={() => handleRemoveToDo(el.id)}
                className=" hover:bg-transparent hover:border-2 hover:border-red-600 hover:scale-110 bg-red-600 ml-2 rounded-md h-6 w-6 min-w-6 cursor-pointer text-white group-hover:hidden" />
                {/* <IoMdRemoveCircleOutline
                  onClick={() => handleRemoveToDo(el.id)}
                  className="hidden h-6 w-6 min-w-6 cursor-pointer text-red-600 hover:scale-110 group-hover:flex"
                /> */}
            </div>
          ))}
    </ul>
  );
};

export default ListItems;
