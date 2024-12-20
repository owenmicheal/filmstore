import React, { useState } from 'react';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { useDispatch } from 'react-redux';

import useStyles from './styles';
import { searchMovie } from '../../features/currentDenreOrCategory';

const Search = () => {
    const classes = useStyles();
    const [query, setQuery] = useState('');
    const dispatch = useDispatch();

    const handleSearch = () => {
        if (query.trim()) {
            dispatch(searchMovie(query));
            setQuery(''); // Clear the text field
        }
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div className={classes.searchContainer}>
            <TextField
                onKeyUp={handleKeyPress}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                variant="standard"
                placeholder="Search movie..."
                InputProps={{
                    className: classes.input,
                    startAdornment: (
                        <InputAdornment position="start">
                            <IconButton onClick={handleSearch}>
                                <SearchIcon />
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />
        </div>
    );
};

export default Search;
