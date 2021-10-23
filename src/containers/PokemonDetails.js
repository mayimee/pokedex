import { Box, CircularProgress, Grid, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import axios from 'axios';
import React, { Component } from 'react'
import { POKEMON_API_URL } from '../config';
import AbilityModal from '../components/AbilityModal';

const styles = (theme) => ({
    mainBox: {
        marginLeft: 150,
        margin: 'auto'
    },
    pokedexContainer: {
        display: 'flex',
        justifyContent: 'center',
        height: '80vh',
        width: '80%',
        backgroundColor: 'lightblue',
        color: 'darkblue',
        margin: 75,
        textAlign: 'center',
        borderRadius: 5,
        paddingTop: 30
    },
    textTitle: {
        textTransform: 'upperCase',
        fontFamily: 'Fantasy',
        fontSize: 40
    },
    imgPokemon: {
        width: '400px',
        height: '400px',
        padding: 10
    },
    pokemonImgContainer: {
        display: 'grid',
        alignItems: 'center'
    },
    pokemonInfoContainer: {
        paddingTop: 40,
        width: '100%',
        height: '100%'
    },
    lineSeparator: {
        height: '0.01mm',
        width: '95%',

    },
    faveButton: {
        height: 40,
        width: 40,
        marginTop: 15
    },
    faveIcon: {
        color: 'red',
        textAlign: 'center',
        fontSize: 40
    },
    text: {
        fontSize: 30,
        textAlign: 'center',
        fontFamily: 'Verdana'
    },
    textDetails: {
        fontSize: 18,
        textAlign: 'center',
        padding: 3,
        color: 'black',
        textTransform: 'capitalize'
    },
    grid: {
        padding: 10
    },
    pokemonNavName: {
        textAlign: 'right',
        top: 18,
        right: 50,
        position: 'fixed',
        zIndex: 1000,
        textTransform: 'capitalize',
        color: 'white'
    },
    abilityModal: {
        color: 'black',
        textTransform: 'capitalize'
    }
})



class PokemonDetails extends Component {

    constructor(props){
        super(props);

        this.state = {
            pokemon: null
        }
    }

    componentDidMount() {

        const {match}= this.props;
        const {id} = match?.params;

        axios.get(POKEMON_API_URL + "/" + id).then((response) => {
            if(response.status >= 200 && response.status < 300)
            {
                console.log(response.data);
                this.setState({pokemon: response.data})
            }
        });

        
    };

    render() {

        const {classes} = this.props;
        const {pokemon} = this.state;

        if(pokemon){

            const {name, sprites, height, weight, types, abilities, stats}  = pokemon;
                
            return(
                <div>
                    <p className={classes.pokemonNavName}>Who's that Pokemon? It's <strong style={{color: 'yellow'}}>{name}</strong> !</p>
                    <Box className={classes.mainBox} sm={12}>
                        <Box className={classes.pokedexContainer}>
                            <Box className={classes.pokemonImgContainer}>
                                <img src={sprites.other.dream_world.front_default ? sprites.other.dream_world.front_default : sprites.front_default} alt={name} className={classes.imgPokemon} />
                            </Box>
                            <Box className={classes.pokemonInfoContainer}>
                                <Grid container>
                                    <Grid item md={6} className={classes.grid}>
                                        <Typography className={classes.text}>
                                            <strong>NAME: </strong>
                                            <p className={classes.textDetails}>{name}</p>
                                        </Typography>
                                    </Grid>
                                    <Grid item md={6} className={classes.grid}>
                                        <Typography className={classes.text}>
                                            <strong> TYPE: </strong>
                                        </Typography>
                                        
                                        {types.map((pokemonType) => {
                                            const {name} =pokemonType.type;
                                            return(
                                                <Typography className={classes.textDetails}>
                                                    {name}
                                                </Typography>
                                            )
                                        })}
                                    </Grid>
                                    <Grid item md={6} className={classes.grid}>
                                        <Typography className={classes.text}>
                                            <strong>HEIGHT:</strong>
                                            <p className={classes.textDetails}>{height}</p>
                                        </Typography>
                                    </Grid>
                                    <Grid item md={6} className={classes.grid}>
                                        <Typography className={classes.text}>
                                            <strong>WEIGHT:</strong>
                                            <p className={classes.textDetails}>{weight} kg</p>
                                        </Typography>
                                    </Grid>
                                    <Grid item md={6} className={classes.grid}>
                                        <Typography className={classes.text}>
                                            <strong>STATS:</strong>
                                        </Typography>
                                        {stats.map((pokemonStats) => {
                                            const {base_stat} = pokemonStats;
                                            const {name} = pokemonStats.stat;

                                            return (
                                                <Typography className={classes.textDetails} style={{textAlign: 'left', paddingLeft: 65}}>
                                                    <strong style={{textTransform:'uppercase'}}>{name}</strong> : {base_stat}
                                                </Typography>
                                            )
                                        })}
                                    </Grid>
                                    <Grid item md={6} className={classes.grid}>
                                        <Typography className={classes.text}>
                                            <strong>ABILITIES:</strong> 
                                        </Typography>
                                        {abilities.map((pokemonAbility) => {
                                            const {name} = pokemonAbility.ability;

                                            return (
                                                <AbilityModal ability={name} className={classes.abilityModal} > {name} </AbilityModal>
                                                
                                            )
                                        })}
                                    </Grid>
                                </Grid>
                            </Box>
                        </Box>
                    </Box>
                </div>
                
            )
        }
        else
        {
            return <CircularProgress />
        }
    }
}

export default withStyles(styles)(PokemonDetails);