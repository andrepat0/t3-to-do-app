import { useContext } from "react";
import { ApiContext } from "../../context/ApiContext";
import ListItem from "../ListItem";
  

interface ListItemsContext {
    isLoadingList: boolean;
    listItems: [];
    removeItem: (id: string) => void;
  }
  

const ListItems: React.FC = () => {

    const {isLoadingList, listItems, removeItem} = useContext(ApiContext) as ListItemsContext;


    function handleRemoveToDo(el: string) {
        removeItem(el);
      }

    return (
      <ul className="flex max-h-64 w-full max-w-sm flex-col gap-2 overflow-auto p-4">
        {isLoadingList
          ? [Array(10)].map((el, i) => (
              <li
                key={i}
                className="h-6 w-full animate-pulse rounded-md bg-slate-400"
              />
            ))
          : listItems?.map((el: {name: string, id: string}, i: number) => (
              <div key={i}>
                <ListItem
                  name={el?.name}
                  handleRemoveItem={() => handleRemoveToDo(el.id)}
                />
              </div>
            ))}
      </ul>
    );
  };

  export default ListItems;