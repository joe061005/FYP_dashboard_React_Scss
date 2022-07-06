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


const FormDT = ({ data }) => {

    const navigate = useNavigate();

    const [filteredData, setFilteredData] = useState([])
    const [selectedRows, setSelectedRows] = useState([])
    const [showAlert, setShowAlert] = useState(false)
    const [isLoadingDelete, setIsLoadingDelete] = useState(false)

    const deleteFormsConfirm = (id) => {
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <div className='custom-ui'>
                        <h1>Are you sure?</h1>
                        <p>{`Do you want to delete the selected record(s) ${id ? `(User ID: ${id})` : `(Total: ${selectedRows.length})`}`}</p>
                        <button onClick={() => { id ? deleteForms(id) : deleteForms(); onClose() }}>Yes</button>
                        <button onClick={() => { onClose() }}>No</button>
                    </div>
                )
            }
        })

    }

    const deleteForms = async (id) => {
        console.log("deleteForms")

        var params;


        if (!id) {
            if (selectedRows.length == 0) return setShowAlert(true)

            setIsLoadingDelete(true)

            const selectedData = filteredData.filter((data) => {
                return selectedRows.includes(data._id)
            })

            console.log(selectedData)

            for(let selectedRow of selectedData){
                params = {
                    userID: selectedRow.user
                }

                await API.quitGroup(params).then(([code, data, header]) => {
                    if (code == '401' || code == '500') {
                        console.log(data)
                    } else if (code == '200') {

                        const filteredData = JSON.parse(localStorage.getItem('formData'))
                        
                        const newList = filteredData.filter((row, index) => {
                            return row.user != selectedRow.user
                        })

                        console.log(newList)
                        localStorage.setItem('formData', JSON.stringify(newList))

                        
                    }
                })
            }

            setFilteredData(JSON.parse(localStorage.getItem('formData')))


        } else {
            setIsLoadingDelete(true)

            params = {
                userID: id
            }

            await API.quitGroup(params).then(([code, data, header]) => {
                if (code == '401' || code == '500') {
                    console.log(data)
                } else if (code == '200') {
                    const newList = filteredData.filter((row, index) => {
                        return row.user != id
                    })
                    setFilteredData(newList)
                    localStorage.setItem('formData', JSON.stringify(newList))
                }
            })
        }

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
            width: 180,

        },
        {
            field: "user",
            headerName: "User ID",
            type: 'string',
            headerAlign: 'left',
            width: 240,

        },
        {
            field: "name",
            headerName: "Name",
            type: 'string',
            headerAlign: 'left',
            width: 100,

        },

        {
            field: "phoneNumber",
            headerName: "Phone Number",
            type: 'string',
            headerAlign: 'left',
            width: 170,
            renderCell: (params) => {
                return (
                    <p>{params.row.phoneNumber ? params.row.phoneNumber : "No phone number"}</p>
                )
            }
        },
        {
            field: "gender",
            headerName: "Gender",
            type: 'string',
            headerAlign: 'left',
            width: 100,
            renderCell: (params) => {
                return (
                    <p>{params.row.gender == 0 ? "Female" : "Male"}</p>
                )
            }
        },
        {
            field: "age",
            headerName: "Age",
            type: 'string',
            headerAlign: 'left',
            width: 110,
            renderCell: (params) => {
                return (
                    <p>{`${params.row.age}0-${params.row.age}9`}</p>
                )
            }
        },
        {
            field: "experience",
            headerName: "Hiking Experience",
            type: 'string',
            headerAlign: 'left',
            width: 170,
            renderCell: (params) => {
                return (
                    <p>{params.row.experience == 1 ? "0-2 year(s)" : `${params.row.experience * 2 - 1}-${params.row.experience * 2} year(s)`}</p>
                )
            }
        },
        {
            field: "difficulty",
            headerName: "Trail Difficulty",
            type: 'string',
            headerAlign: 'left',
            width: 150,
            renderCell: (params) => {
                return (
                    <p>{`${params.row.difficulty} star(s)`}</p>
                )
            }
        },
        {
            field: "time",
            headerName: "Trail Duration",
            type: 'string',
            headerAlign: 'left',
            width: 150,
            renderCell: (params) => {
                return (
                    <p>{params.row.time == 1 ? "1-2 hour(s)" : `${params.row.time * 2 - 1}-${params.row.time * 2} hour(s)`}</p>
                )
            }
        },
        {
            field: "startTime",
            headerName: "Start Time",
            type: 'string',
            headerAlign: 'left',
            width: 130,
            renderCell: (params) => {
                return (
                    <p>{params.row.startTime == 0 ? "morning" : params.row.startTime == 1 ? "afternoon" : "night"}</p>
                )
            }
        },
        {
            field: "view",
            headerName: "Trail View",
            type: 'string',
            headerAlign: 'left',
            width: 130,
            renderCell: (params) => {
                return (
                    <p>{`${params.row.view} star(s)`}</p>
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
                        <div className="viewButton" onClick={(e) => { e.stopPropagation(); navigate('/forms/formDetail', { state: { formData: params.row } }) }}>
                            View
                        </div>
                        <div className="deleteButton" onClick={(e) => { e.stopPropagation(); deleteFormsConfirm(params.row.user) }}>
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
                    deleteFormsConfirm()
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

export default FormDT