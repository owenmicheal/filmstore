import { Height } from '@mui/icons-material';
import { makeStyles } from '@mui/styles';
import { height, margin, padding } from '@mui/system';

export default makeStyles((theme) => ({
    containerSpaceAround: {
        display: 'flex',
        justifyContent: 'space-around',
        margin: '10px 0 !important',
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
            flexWrap: 'wrap',
            justifyContent:'center',
            alignItems: 'center'
        },
    },

    poster: {
        borderRadius: '25px',
        boxShadow: '0.5em 1em 1em rgb(64, 64, 70)',
        width: '80%',
        [theme.breakpoints.down('sm')]: {
            margin: '0 auto',
            width: '100%',
            height: '350px',
            marginBottom: '30px'
        },
        [theme.breakpoints.down('md')]: {
            margin: '0 auto',
            width: '100%',
            height: '350px',
            marginBottom: '30px'
        },
    },

    genresContainer:{
        margin: '10px 0 !important',
        display: 'flex',
        justifyContent: 'space-around',
        flexWrap: 'wrap'
    },

    genreImage: {
        filter: theme.palette.mode === 'dark' ? 'invert(1)': 'black',
        marginRight: '10px'
    },

    links: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        [theme.breakpoints.down('sm')]: {
            padding: '0.5rem 1rem '
        },

    }
    
    
}));
