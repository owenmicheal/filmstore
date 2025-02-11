import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
    imageLink: {
        display: 'flex',
        justifyContent: 'center',
        padding: '12px'
    },

    image: {
        width: '70%',
    },

    links: {
        color: theme.palette.text.primary,
        textDecoration: 'none'
    },

    genreImages: {
        filter: theme.palette.mode === 'dark' ? 'invert(1)' : 'none',
        
    }
}));
