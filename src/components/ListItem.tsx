
import {IoIosRemove, IoMdRemoveCircleOutline} from "react-icons/io";

interface Props {
    name: string;
    handleRemoveItem: () => void;
  }
  
  const ListItem: React.FC<Props> = ({ name, handleRemoveItem }) => {
    return(<li className="text-lg ease-in-out group flex flex-row justify-between border-2 transform translate hover:translate-x-2 duration-200 hover:shadow-white border-white p-2 text-white rounded-lg break-all">{name}<IoIosRemove className="w-6 h-6 group-hover:hidden cursor-pointer text-red-500 min-w-6" /><IoMdRemoveCircleOutline onClick={() => handleRemoveItem()} className="w-6 h-6 min-w-6 hidden group-hover:flex cursor-pointer text-red-600 hover:scale-110" /></li>)
}

export default ListItem;
