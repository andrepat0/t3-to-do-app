import React from 'react';
import { api } from '../utils/api';

export const ApiContext = React.createContext({});

interface Props {
    children: React.ReactNode;
  }
  


const ApiContextProvider: React.FC<Props> = ({children}) => {

    const ctx = api.useContext();

    const { data: listItems, isLoading: isLoadingList } = api.example.test.useQuery();
    const { mutate: addItemTodo, isLoading: isLoadingCreation } =
      api.example.createTest.useMutation({
        onSuccess: async () => {
          await ctx.example.invalidate();
        },
      });

      const { mutate: removeItem, isLoading: isLoadingDelete } =
      api.example.removeTest.useMutation({
        onSuccess: async () => {
          await ctx.example.invalidate();
        },
      });

    return (
        <ApiContext.Provider value={{addItemTodo: addItemTodo, isLoadingCreation: isLoadingCreation, removeItem: removeItem, isLoadingDelete: isLoadingDelete, listItems: listItems,isLoadingList:isLoadingList}}>
            {children}
        </ApiContext.Provider>
    )

}

export default ApiContextProvider;