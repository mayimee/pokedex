import React from 'react'
import {AppBar, Toolbar, Typography} from '@material-ui/core';
import { makeStyles} from '@material-ui/core/styles';
import {Link} from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    AppBar: {
        display: 'flex',
        backgroundColor: 'crimson',
        position: 'fixed',
        zIndex: 10
    },
    link: {
        textDecoration: 'none',
    },
    title: {
        color: 'white',
        cursor: 'pointer',
        fontWeight: 'bold',
        justifyContent: 'flex-start'
    },
    searchIcon: {
        color: 'ivory',
        alignSelf: 'flex-end'
    },
    textSearch: {
        color: 'white'
    },
    searchContainer: {
        display: 'flex',
        paddingLeft: 20,
        paddingRight: 20,
        marginTop: 5,
        marginBottom: 5,
    },
    pokemonName: {
        justifyContent: 'flex-start '
    }
}));

export default function AppNavigator() {

    const classes = useStyles();

    return (
        <AppBar className={classes.AppBar}>
            <Toolbar>
                <Link to="/" className={classes.link}>
                     <Typography className={classes.title} variant="h6">Pokedex</Typography>
                </Link>
            </Toolbar>
        </AppBar>   
    )
}
