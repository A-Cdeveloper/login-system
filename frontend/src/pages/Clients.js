//import { useState } from "react";
import { useGetClientsQuery } from "../store/redux/clientApi";
import { columns } from "../components/Clients/Tablecolumns";
import { useListItems } from "../hooks/listItems";

// import AddClient from "../components/Clients/AddClient";
// import EditClient from "../components/Clients/EditClient";

import TableActions from "../components/Clients/TableActions";

import { Button } from "reactstrap";

const Clients = () => {
  const { content, record_id } = useListItems(useGetClientsQuery, columns, "No clients found!");

  console.log(record_id);
  return (
    <>
      <h1>Clients</h1>
      <Button color="primary" onClick={() => {}}>
        Add client
      </Button>

      {record_id && <TableActions id={record_id} />}

      {content}
    </>
  );
};

export default Clients;
