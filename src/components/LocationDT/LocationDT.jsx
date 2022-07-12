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


const LocationDT = ({ data }) => {

    const navigate = useNavigate();

    const [filteredData, setFilteredData] = useState([])
    const [selectedRows, setSelectedRows] = useState([])
    const [showAlert, setShowAlert] = useState(false)
    const [isLoadingDelete, setIsLoadingDelete] = useState(false)

    const deleteLocationsConfirm = (id) => {
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <div className='custom-ui'>
                        <h1>Are you sure?</h1>
                        <p>{`Do you want to delete the selected record(s) ${id ? `(ID: ${id})` : `(Total: ${selectedRows.length})`}`}</p>
                        <button onClick={() => { id ? deleteLocations(id) : deleteLocations(); onClose() }}>Yes</button>
                        <button onClick={() => { onClose() }}>No</button>
                    </div>
                )
            }
        })

    }

    const deleteLocations = async (id) => {
        console.log("deletelocations")

        var params;

        if (!id) {
            if (selectedRows.length == 0) return setShowAlert(true)
            params = {
                locationList: selectedRows
            }
        } else {
            params = {
                locationList: [id]
            }
        }

        setIsLoadingDelete(true)

        await API.deleteLocations(params).then(([code, data, header]) => {
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
                localStorage.setItem('locationData', JSON.stringify(newList))
            }
        })

        setIsLoadingDelete(false)
    }

    useEffect(() => {
        setFilteredData(data)
    }, [])


    const userColumns = [
        {
            field: "date",
            headerName: "Time",
            type: 'string',
            headerAlign: 'left',
            width: 250,
            renderCell: (params) => {
                return (
                    <p>{momentTz.tz(params.row.date, "Asia/Hong_Kong").format("DD-MM-YYYY HH:mm:ss")}</p>
                )
            }

        },
        {
            field: "groupID",
            headerName: "Group ID",
            type: 'string',
            headerAlign: 'left',
            width: 250,
            renderCell: (params) => {
                return (
                    <p>{params.row.groupID ? params.row.groupID : "No group"}</p>
                )
            }

        },

        {
            field: "userID",
            headerName: "User ID",
            type: 'string',
            headerAlign: 'left',
            width: 250,
        },

        {
            field: "coordinate",
            headerName: "Coordinate (latitude, longitude)",
            type: 'string',
            headerAlign: 'left',
            width: 250,
            renderCell: (params) => {
                return (
                    <p>{`(${params.row.coordinate.latitude}, ${params.row.coordinate.longitude})`}</p>
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
                        <div className="viewButton" onClick={(e) => { e.stopPropagation(); navigate('/locations/locationDetail', { state: { locationData: params.row } }) }}>
                            View
                        </div>
                        <div className="deleteButton" onClick={(e) => { e.stopPropagation(); deleteLocationsConfirm(params.row._id) }}>
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
                    deleteLocationsConfirm()
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

export default LocationDT