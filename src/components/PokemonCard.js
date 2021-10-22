import { Card, CardContent, CardMedia, Grid, Typography, makeStyles } from '@material-ui/core';
import React from 'react'
import { Link } from 'react-router-dom';


const useStyles = makeStyles(() => ({
    cardMedia: {
        margin: 'auto',
        width: 130,
        height: 130
    },
    card: {
        cursor: 'pointer',
        backgroundColor: 'darkblue',
        color: 'white',
        "&:hover": {
            backgroundColor: 'lightblue',
            color: 'darkblue'
        }
    },
    cardContent: {
        textAlign: 'center'
    },
    link: {
        textDecoration: 'none',
    }
}))

export default function PokemonCard(props) {

    const classes = useStyles();

    const { pokemon, image } = props;
    const { id, name } = pokemon;

    return (
        <Grid item xs={12} sm={2} lg={3} key={id}>
            <Link to={"/pokemon/" + id} className={classes.link}>
                <Card className={classes.card}>
                    <CardMedia className={classes.cardMedia} image={image}></CardMedia>
                    <CardContent className={classes.cardContent}>
                        <Typography>
                           #{id} {name}
                        </Typography>
                    </CardContent>
                </Card>
            </Link>   
        </Grid>
    )
}
