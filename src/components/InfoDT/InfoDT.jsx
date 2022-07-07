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


const InfoDT = ({ data }) => {

    const navigate = useNavigate();

    const [filteredData, setFilteredData] = useState([])
    const [selectedRows, setSelectedRows] = useState([])
    const [showAlert, setShowAlert] = useState(false)
    const [isLoadingDelete, setIsLoadingDelete] = useState(false)

    const deleteInfosConfirm = (id) => {
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <div className='custom-ui'>
                        <h1>Are you sure?</h1>
                        <p>{`Do you want to delete the selected record(s) ${id ? `(ID: ${id})` : `(Total: ${selectedRows.length})`}`}</p>
                        <button onClick={() => { id ? deleteInfos(id) : deleteInfos(); onClose() }}>Yes</button>
                        <button onClick={() => { onClose() }}>No</button>
                    </div>
                )
            }
        })

    }

    const deleteInfos = async (id) => {
        console.log("deleteinfos")

        var params;

        if (!id) {
            if (selectedRows.length == 0) return setShowAlert(true)
            params = {
                infoList: selectedRows
            }
        } else {
            params = {
                infoList: [id]
            }
        }

        setIsLoadingDelete(true)

        await API.deleteInfos(params).then(([code, data, header]) => {
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
                localStorage.setItem('infoData', JSON.stringify(newList))
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
            headerName: "Submission Time",
            type: 'string',
            headerAlign: 'left',
            width: 200,

        },
        {
            field: "district",
            headerName: "District",
            type: 'string',
            headerAlign: 'left',
            width: 150,

        },

        {
            field: "trail",
            headerName: "Trail",
            type: 'string',
            headerAlign: 'left',
            width: 180,
        },

        {
            field: "type",
            headerName: "Info Type",
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
            field: "location",
            headerName: "Coordinate (latitude, longitude)",
            type: 'string',
            headerAlign: 'left',
            width: 250,
            renderCell: (params) => {
                return (
                    <p>{`(${params.row.location.latitude}, ${params.row.location.longitude})`}</p>
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
                        <div className="viewButton" onClick={(e) => { e.stopPropagation(); navigate('/infos/infoDetail', { state: { infoData: params.row } }) }}>
                            View
                        </div>
                        <div className="deleteButton" onClick={(e) => { e.stopPropagation(); deleteInfosConfirm(params.row._id) }}>
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
                    deleteInfosConfirm()
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

export default InfoDT