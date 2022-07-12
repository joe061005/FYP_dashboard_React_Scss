import React, { useState, useEffect } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import '../customUI/customUI.scss'
import '../datatable/datatable.scss'
import ReactJsAlert from "reactjs-alert"
import momentTz from 'moment-timezone'
import moment from 'moment';
import API from '../../Api/Api';
import LoadingOverlay from 'react-loading-overlay';
LoadingOverlay.propTypes = undefined


const TrailDT = ({ data }) => {

    const navigate = useNavigate();

    const [filteredData, setFilteredData] = useState([])
    const [selectedRows, setSelectedRows] = useState([])
    const [showAlert, setShowAlert] = useState(false)
    const [isLoadingDelete, setIsLoadingDelete] = useState(false)

    const deleteTrailsConfirm = (id) => {
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <div className='custom-ui'>
                        <h1>Are you sure?</h1>
                        <p>{`Do you want to delete the selected record(s) ${id ? `(ID: ${id})` : `(Total: ${selectedRows.length})`}`}</p>
                        <button onClick={() => { id ? deleteTrails(id) : deleteTrails(); onClose() }}>Yes</button>
                        <button onClick={() => { onClose() }}>No</button>
                    </div>
                )
            }
        })

    }

    const deleteTrails = async (id) => {
        console.log("deletetrails")

        var params;

        if (!id) {
            if (selectedRows.length == 0) return setShowAlert(true)
            params = {
                trailList: selectedRows
            }
        } else {
            params = {
                trailList: [id]
            }
        }

        setIsLoadingDelete(true)

        await API.deleteTrails(params).then(([code, data, header]) => {
            if (code == '401' || code == '500') {
                console.log(data)
            } else if (code == '200') {
                var newList;
                if (id) {
                    newList = filteredData.filter((row, index) => {
                        return row._id != id
                    })

                } else {
                    newList = filteredData.filter((row, index) => {
                        return !selectedRows.includes(row._id)
                    })
                }
                setFilteredData(newList)
                localStorage.setItem('trailData', JSON.stringify(newList))
            }
        })

        setIsLoadingDelete(false)
    }

    useEffect(() => {
        setFilteredData(data)
    }, [])


    const userColumns = [
        {
            field: "timestamp",
            headerName: "Creation Time",
            type: 'string',
            headerAlign: 'left',
            width: 200,
        },
        {
            field: "district",
            headerName: "Territory",
            type: 'string',
            headerAlign: 'left',
            width: 150,

        },

        {
            field: "place",
            headerName: "District",
            type: 'string',
            headerAlign: 'left',
            width: 150,
        },

        {
            field: "title",
            headerName: "Trail Name",
            type: 'string',
            headerAlign: 'left',
            width: 150,
        },

        {
            field: "description",
            headerName: "Description",
            type: 'string',
            headerAlign: 'left',
            width: 250,
        },

        {
            field: "distance",
            headerName: "Distance (km)",
            type: 'string',
            headerAlign: 'left',
            width: 130,
        },

        {
            field: "star",
            headerName: "Difficulty (1-5 stars)",
            type: 'string',
            headerAlign: 'left',
            width: 180,
            renderCell: (params) => {
                return (
                    <p>{params.row.star.filter((star) => { return star == '1' }).length}</p>
                )
            }
        },

        {
            field: "time",
            headerName: "Time",
            type: 'string',
            headerAlign: 'left',
            width: 250,
            renderCell: (params) => {
                return (
                    <p>{params.row.time.split(".")[0] == '0' ?
                        `${params.row.time.split(".")[1]} minutes`
                        :
                        params.row.time.split(".")[1] == '0' ?
                            `${params.row.time.split(".")[0]} hour(s)`
                            :
                            `${params.row.time.split(".")[0]} hour(s) and ${params.row.time.split(".")[1]} minutes`
                    }
                    </p>
                )
            }
        },

        {
            field: "action",
            headerName: "Action",
            width: 200,
            renderCell: (params) => {
                return (
                    <div className="cellAction">
                        <div className="viewButton" onClick={(e) => { e.stopPropagation(); navigate('/trails/trailDetail', { state: { trailId: params.row._id } }) }}>
                            View
                        </div>
                        <div className="deleteButton" onClick={(e) => { e.stopPropagation(); deleteTrailsConfirm(params.row._id) }}>
                            Delete
                        </div>
                    </div>
                )
            }
        }
    ]


    return (
        <LoadingOverlay
            active={isLoadingDelete}
            spinner
            text='Deleting...'
        >
            <div className="datatable">
                <ReactJsAlert
                    status={showAlert}
                    type="error"
                    title="You must select at least one row!"
                    Close={() => setShowAlert(false)}
                />
                <div className="deleteSelectedButtonContainer" onClick={() => {
                    deleteTrailsConfirm()
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
        </LoadingOverlay>
    )
}

export default TrailDT