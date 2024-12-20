import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
    searchContainer: {
        [theme.breakpoints.down('sm')]: {
            display: 'flex',
            justifyContent: 'center',
            width: '100%'
        },
    },

    input: {
        color: theme.palette.mode === 'light' ? 'black' : 'white',
        filter: theme.palette.mode === 'light' ? 'invert(1)' : 'none',
        [theme.breakpoints.down('sm')]: {
            border: 'none',
            marginTop: '-10px',
            marginBottom: '10px',
    },
}
}));
