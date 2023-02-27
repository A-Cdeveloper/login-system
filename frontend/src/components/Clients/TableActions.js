import Icon from "../../components/ui/Icon";

import { useDeleteClientMutation } from "../../store/redux/clientApi";

const TableActions = ({ id }) => {
  //const [deleteClient] = useDeleteClientMutation();

  const editHandler = () => {
    console.log(`editHandler - ${id}`);

    // action("edit");
  };

  const deleteHandler = () => {
    // deleteClient(id);
    console.log(`deleteHandler - ${id}`);
  };

  const viewHandler = () => {
    console.log(`viewHandler - ${id}`);
  };

  return (
    <>
      <Icon btnType="edit" size="20" item_id={id} itemType="client" onClick={editHandler} />
      <Icon btnType="delete" size="20" item_id={id} itemType="client" onClick={deleteHandler} />
      <Icon btnType="view" size="20" item_id={id} itemType="client" onClick={viewHandler} />
    </>
  );
};

export default TableActions;
