import { 
    Paper,
    TableContainer,
    Table,
    TableHead,
    TableCell,
    TableBody,
    TableRow,
} from '@mui/material';

const columns = [
    { id: 'date', label: 'Date', minWidth: 125 },
    { id: 'time', label: 'Time', minWidth: 75 },
    { id: 'duration', label: 'Duration', minWidth: 75},
    { id: 'session', label: 'Session', minWidth: 150},
    { id: 'guest', label: 'With', minWidth: 150},
    { id: 'status_id', label: 'Status', minWidth: 75},
    { id: 'control', label: '', minWidth: 75},
];

function createData(date, time, duration, session, guest , status_id) {
    return { date, time, duration, session, guest, status_id };
}

const rows = [
    createData('17 nov', '10:00AM', '30 mins', '30 Minutes Math Session', 'Elie Mounif', 'Canceled'),
    createData('17 nov', '10:00AM', '30 mins', '30 Minutes Math Session', 'Elie Mounif', 'Canceled')
]
  
export default function BookingsTable() {

    return (
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader >
                <TableHead>
                    <TableRow>
                        {columns.map((column) => (
                        <TableCell
                            key={column.id}
                            align={column.align}
                            style={{ minWidth: column.minWidth }}
                        >
                            {column.label}
                        </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                {rows.map((row, i) => {
                    return (
                        <TableRow hover role="checkbox" tabIndex={-1} key={i}>
                        {columns.map((column) => {
                            const value = row[column.id];
                            return (
                            <TableCell key={column.id} align={column.align}>
                                {column.format && typeof value === 'number'
                                ? column.format(value)
                                : value}
                            </TableCell>
                            );
                        })}
                        </TableRow>
                    );
                    })}
                </TableBody>
            </Table>
        </TableContainer>
      </Paper>
    );
  }