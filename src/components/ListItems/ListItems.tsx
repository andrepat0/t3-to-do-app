import { useContext, useState } from "react";
import { ApiContext } from "../../context/ApiContext";
import ListItem from "./ListItem/ListItem";
  

interface ListItemsContext {
    isLoadingList: boolean;
    isLoadingRemove: boolean;
    isLoadingCreation: boolean;
    listItems: [];
    removeItem: (id: string) => void;
  }
  

const ListItems: React.FC = () => {

    const {isLoadingList, isLoadingCreation , listItems, removeItem} = useContext(ApiContext) as ListItemsContext;

    const [idRemovedItem, setIdRemovedItem] = useState("");


    function handleRemoveToDo(id: string) {
        setIdRemovedItem(id);
        removeItem(id);
      }

    return (
      <ul className=" relative flex h-full w-full max-h-max max-w-sm flex-col gap-2 overflow-y-auto p-4">
        {isLoadingList
          ? [Array(10)].map((el, i) => (
              <li
                key={i}
                className="h-6 w-full animate-pulse rounded-md bg-slate-400"
              />
            ))
          : isLoadingCreation ? 
          [{name: "new", id: "new"},...listItems]?.map((el: {name: string, id: string}, i: number) => (
            el.name === "new" ? 
            <li key={i} className="h-10 w-full animate-pulse rounded-md bg-slate-400"></li>
            :
            <div key={i}>
              <ListItem
              id={el?.id}
                name={el?.name}
                handleRemoveItem={() => handleRemoveToDo(el.id)}
              />
            </div>
          ))
          : listItems?.map((el: {name: string, id: string}, i: number) => (
              <div className={el?.id == idRemovedItem ? " absolute duration-300 ease-out inset-0 transform -translate-x-full " : ""} key={i}>
                <ListItem
                id={el?.id}
                  name={el?.name}
                  handleRemoveItem={() => handleRemoveToDo(el.id)}
                />
              </div>
            ))}
      </ul>
    );
  };

  export default ListItems;