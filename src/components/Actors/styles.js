import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
    image: {
        maxWidth: '90%',
        objectFit: 'cover',
        borderRadius: '25px',
        boxShadow: '0.5em 0.5em 1em',
        marginBottom: '20px',
        [theme.breakpoints.down('sm')]:{
            maxWidth: '100%',
        }
    },
}));