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


const GroupDT = ({ data }) => {

    const navigate = useNavigate();

    const [filteredData, setFilteredData] = useState([])
    const [selectedRows, setSelectedRows] = useState([])
    const [showAlert, setShowAlert] = useState(false)
    const [isLoadingDelete, setIsLoadingDelete] = useState(false)

    const rounding = (num) => {
        return Math.round(num * 10) / 10
    }

    const deleteGroupsConfirm = (id) => {
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <div className='custom-ui'>
                        <h1>Are you sure?</h1>
                        <p>{`Do you want to delete the selected record(s) ${id ? `(ID: ${id})` : `(Total: ${selectedRows.length})`}`}</p>
                        <button onClick={() => { id ? deleteGroups(id) : deleteGroups(); onClose() }}>Yes</button>
                        <button onClick={() => { onClose() }}>No</button>
                    </div>
                )
            }
        })

    }

    const deleteGroups = async (id) => {
        console.log("deleteGroups")

        var params;

        if (!id) {
            if (selectedRows.length == 0) return setShowAlert(true)
            params = {
                groupList: selectedRows
            }
        } else {
            params = {
                groupList: [id]
            }
        }

        setIsLoadingDelete(true)

        await API.deleteGroups(params).then(([code, data, header]) => {
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
                localStorage.setItem('groupData', JSON.stringify(newList))
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
            width: 180,

        },

        {
            field: "startTime",
            headerName: "Start Time",
            type: 'string',
            headerAlign: 'left',
            width: 120,
            renderCell: (params) => {
                return (
                    <p>{params.row.startTime == 0? "Morning" : params.row.startTime == 1? "Afternoon" : "Night"}</p>
                )
            }
        },

        {
            field: "centroids",
            headerName: "Centroids (Age, Experience, Difficulty, Time, View)",
            type: 'string',
            headerAlign: 'left',
            width: 350,
            renderCell: (params) => {
                return (
                    <p>{`(${rounding(params.row.centroids[0])}, ${rounding(params.row.centroids[1])}, ${rounding(params.row.centroids[2])}, ${rounding(params.row.centroids[3])}, ${rounding(params.row.centroids[4])})`}</p>
                )
            }

        },


        {
            field: "record",
            headerName: "Number of members (Max: 10)",
            type: 'string',
            headerAlign: 'left',
            width: 220,
            renderCell: (params) => {
                return (
                    <p>{params.row.record.length}</p>
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
                        <div className="viewButton" onClick={(e) => { e.stopPropagation(); navigate('/groups/groupDetail', { state: { groupData: params.row } }) }}>
                            View
                        </div>
                        <div className="deleteButton" onClick={(e) => { e.stopPropagation(); deleteGroupsConfirm(params.row._id) }}>
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
                    deleteGroupsConfirm()
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

export default GroupDT