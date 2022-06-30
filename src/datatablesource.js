export const userColumns = [
  {
    field: "timestamp",
    headerName: "Registration time",
    type: 'dateTime',
    headerAlign: 'left',
    width: 180
  },
  {
    field: "username",
    headerName: "Username",
    type: 'string',
    headerAlign: 'left',
    width: 100,
  },
  {
    field: "password",
    headerName: "Password",
    type: 'string',
    headerAlign: 'left',
    width: 200,
  },

  {
    field: "email",
    headerName: "Email",
    type: 'string',
    headerAlign: 'left',
    width: 180,
  },
  {
    field: "confirmed",
    headerName: "Confirmed",
    type: 'string',
    headerAlign: 'left',
    width: 100,
    renderCell: (params) => {
      return (
        <div className="confirmedText">
          {params.row.confirmed.toString()}
        </div>
      )
    }
  },
  {
    field: "info",
    headerName: "No. of the hiking info",
    type: 'number',
    headerAlign: 'left',
    width: 180,
    renderCell: (params) => {
      return (
        <div className="numText">
          <p>{params.row.info.length}</p>
        </div>
      )
    }
  },
];

