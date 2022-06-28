import React from 'react'
import './table.scss'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(name, calories, fat, carbs, protein, status) {
    return { name, calories, fat, carbs, protein, status };
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0,"Approved"),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3,"Pending"),
    createData('Eclair', 262, 16.0, 24, 6.0 ,"Approved"),
    createData('Cupcake', 305, 3.7, 67, 4.3 ,"Approved"),
    createData('Gingerbread', 356, 16.0, 49, 3.9 ,"Pending"),
];

const TableUI = ({data}) => {
    return (
        <TableContainer component={Paper} className='table'>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell className='tableCell'>Dessert (100g serving)</TableCell>
                        <TableCell className='tableCell'>Calories</TableCell>
                        <TableCell className='tableCell'>Fat&nbsp;(g)</TableCell>
                        <TableCell className='tableCell'>Carbs&nbsp;(g)</TableCell>
                        <TableCell className='tableCell'>Protein&nbsp;(g)</TableCell>
                        <TableCell className='tableCell'>Status</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow
                            key={row.name}
                        >
                            <TableCell component="th" scope="row" className='tableCell'>
                                {row.name}
                            </TableCell>
                            <TableCell className='tableCell'>{row.fat}</TableCell>
                            <TableCell className='tableCell'>{row.calories}</TableCell>
                            <TableCell className='tableCell'>{row.carbs}</TableCell>
                            <TableCell className='tableCell'>{row.protein}</TableCell>
                            <TableCell className='tableCell'>
                                <span className={`status ${row.status}`}>{row.status}</span>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>

    )
}

export default TableUI