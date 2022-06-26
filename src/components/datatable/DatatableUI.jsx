import React from 'react'
import './datatable.scss'
import { DataGrid } from '@mui/x-data-grid';
import { userColumns, userRows } from '../../datatablesource';
import { useNavigate } from 'react-router-dom';
import TablePagination from '@mui/material/TablePagination';

const DatatableUI = () => {

    const navigate = useNavigate();


    const actionColumn = [
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
            <div className="datatableTitle">
                Add New User
                <div className="link" onClick={() => { navigate("/users/addUser") }}>
                    Add New
                </div>
            </div>
            <DataGrid
                className="datagrid"
                rows={userRows}
                columns={userColumns.concat(actionColumn)}
                rowsPerPageOptions={[10, 20, 30]}
                checkboxSelection
                autoPageSize
            />

        </div>
    )
}

export default DatatableUI