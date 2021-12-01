import { 
    TextField
} from '@mui/material';

export default function TextInput(props) {
    const { name, label, value, error=null, onChange, ...other } = props;
    return (
        <TextField
            variant="outlined"
            fullWidth
            name={name}
            value={value}
            onChange={onChange}
            {...other}
            {...(error && {error:true,helperText:error})}
        />
    )
}