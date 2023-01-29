import React from 'react';
import { api } from '../utils/api';

export const ApiContext = React.createContext({});

interface Props {
    children: React.ReactNode;
  }
  


const ApiContextProvider: React.FC<Props> = ({children}) => {

    const ctx = api.useContext();

    const { data: listItems, isLoading: isLoadingList } = api.example.getList.useQuery();
    const { mutate: addItemTodo, isLoading: isLoadingCreation } =
      api.example.createTodo.useMutation({
        onSuccess: async () => {
          await ctx.example.invalidate();
        },
      });

      const { mutate: removeItem, isLoading: isLoadingDelete } =
      api.example.removeTodo.useMutation({
        onSuccess: async () => {
          await ctx.example.invalidate();
        },
      });

      const { mutate: editItem, isLoading: isLoadingEdit } =
      api.example.editTodo.useMutation({
        onSuccess: async () => {
          await ctx.example.invalidate();
        },
      });

    return (
        <ApiContext.Provider value={{addItemTodo: addItemTodo, editItem: editItem, isLoadingEdit: isLoadingEdit, isLoadingCreation: isLoadingCreation, removeItem: removeItem, isLoadingDelete: isLoadingDelete, listItems: listItems,isLoadingList:isLoadingList}}>
            {children}
        </ApiContext.Provider>
    )

}

export default ApiContextProvider;