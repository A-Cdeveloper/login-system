import React, { useState } from "react";
import DataTable from "react-data-table-component";

import Loader from "../components/ui/Loader";

export const useListItems = (apifn, columns, initialTitle) => {
  const { data, error, isLoading } = apifn();
  const [record_id, setRecord_id] = useState(null);

  let content = <p>{initialTitle}</p>;

  if (error) {
    content = { error };
  }

  if (isLoading) {
    content = <Loader />;
  }

  if (!isLoading && !error) {
    content = (
      <DataTable
        columns={columns}
        data={data}
        responsive={true}
        pagination
        striped
        onRowClicked={(row, event) => {
          setRecord_id(row.client_id);
          console.log(event);
        }}
      />
    );
  }

  return {
    data,
    error,
    isLoading,
    content,
    record_id,
  };
};
