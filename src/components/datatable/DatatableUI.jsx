import React from 'react'
import './datatable.scss'
import { DataGrid } from '@mui/x-data-grid';
import { userColumns} from '../../datatablesource';
import { useNavigate } from 'react-router-dom';

const DatatableUI = ({data}) => {

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
                rows={data}
                columns={userColumns.concat(actionColumn)}
                getRowId = {(row) => row._id}
                checkboxSelection
                pageSize={10}
                rowsPerPageOptions={[10]}
                pagination
            />

        </div>
    )
}

export default DatatableUI