import React, { useState, useEffect } from 'react'
import './datatable.scss'
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import '../customUI/customUI.scss'
import ReactJsAlert from "reactjs-alert"


const DatatableUI = ({ data }) => {

  const navigate = useNavigate();

  const [filteredData, setFilteredData] = useState([])
  const [selectedRows, setSelectedRows] = useState([])
  const [showAlert, setShowAlert] = useState(false)

  const deleteUsersConfirm = () => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className='custom-ui'>
            <h1>Are you sure?</h1>
            <p>Do you want to delete the selected record(s)?</p>
            <button onClick={() => { deleteUsers(); onClose() }}>Yes</button>
            <button onClick={() => { onClose() }}>No</button>
          </div>
        )
      }
    })

  }

  const deleteUsers = () => {
    console.log("delete", selectedRows)
    if (selectedRows.length == 0) return setShowAlert(true)
  }

  useEffect(() => {
    setFilteredData(data)
  }, [])

  useEffect(() => {
    console.log(selectedRows)
  }, [selectedRows])

  const userColumns = [
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
    {
      field: "action", headerName: "Action", width: 200, renderCell: () => {
        return (
          <div className="cellAction">
            <div className="viewButton">
              View
            </div>
            <div className="deleteButton">
              Delete
            </div>
          </div>
        )
      }
    }
  ]


  return (
    <div className="datatable">
      <ReactJsAlert
        status={showAlert}
        type="error"
        title="You must select at least one row!"
        Close={() => setShowAlert(false)}
      />
      <div className="datatableTitle">
        Add New User
        <div className="link" onClick={() => { navigate("/users/addUser") }}>
          Add New
        </div>
      </div>
      <div className="deleteSelectedButtonContainer" onClick={() => {
        deleteUsersConfirm()
      }}>
        <DeleteIcon className='deleteButton' />
        <p className="deleteText">Delete</p>
      </div>
      <DataGrid
        className="datagrid"
        rows={filteredData}
        columns={userColumns}
        getRowId={(row) => row._id}
        checkboxSelection
        pageSize={10}
        rowsPerPageOptions={[10]}
        pagination
        onSelectionModelChange={(item) => { setSelectedRows(item) }}
      />

    </div>
  )
}

export default DatatableUI