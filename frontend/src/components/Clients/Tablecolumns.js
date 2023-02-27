export const columns = [
  {
    name: "Client",
    selector: (row) => row.client_name,
    sortable: true,
    width: "30%",
  },
  {
    name: "E-mail",
    selector: (row) => <a href={`mailto:${row.client_email}`}>{row.client_email}</a>,
    width: "30%",
  },
  {
    name: "www",
    selector: (row) => (
      <a href={`https://${row.client_site}`} target="_blank" rel="noreferrer">
        {row.client_site}
      </a>
    ),
    width: "30%",
  },
  {
    name: "",
    selector: (row) => {},
    width: "10%",
  },
];
