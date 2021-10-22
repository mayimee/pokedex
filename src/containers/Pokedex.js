import { Box, CircularProgress, Grid, makeStyles, TextField } from '@material-ui/core'
import React, {useEffect, useState} from 'react'
import axios from 'axios';
import { IMAGE_API_URL, POKEMON_API_URL } from '../config';
import PokemonCard from '../components/PokemonCard';
import SearchIcon from '@material-ui/icons/Search';
import { Stack } from '@mui/material';
import { Pagination } from '@mui/material';


const useStyles = makeStyles((theme) => ({
    pokedexContainer: {
        textAlign: 'center'
    },
    mainBox: {
        padding: "65px 10px 30px 10px",
        textAlign: 'center', 
    },
    text: {
        fontSize: 30,
        fontStyle: 'Verdana',
        alignSelf: 'flex-end'
    },
    searchContainer: {
        display: 'flex',
        justifyContent: 'center',
        paddingLeft: 20,
        paddingRight: 20,
        marginTop: 5,
        marginBottom: 5,
    }, 
    cardMedia: {
        margin: 'auto',
        width: 130,
        height: 130
    },
    searchIcon: {
        alignSelf:'flex-end',
        color: 'darkblue',
    },
    searchText: {
        width: 200,
        margin: 5
    },
    paginationStack: {
        justifyContent: 'center'
    }
}));

export default function Pokedex() {

    const classes = useStyles();
    const [pokemonData, setPokemonData] = useState([]);

    const [searchPokemon, setSearchPokemon] = useState('');

    const [loading, setLoading] = useState(true);

    const getPokemon = async () => {

        try{
            setLoading(true);

            const url = POKEMON_API_URL + "/?limit=898&offset=40";
            const res = await axios.get(url);

            setLoading(false);

            const {results} = res.data;

            let newPokemon = [];

            results.forEach((pokemon, index) => {
                index++;

                let pokemonObject = {
                    id: index,
                    url: IMAGE_API_URL + index + '.png',
                    name: pokemon.name,
                    type: pokemon.type
                };
                newPokemon.push(pokemonObject);
            });

            setPokemonData(newPokemon);

        }
        catch (e){
            console.log(e);
        }
    }

    useEffect(() => {
        getPokemon();
    }, []);

    if (loading) return "Loading Pokemons..."

    return (
        <Box className={classes.mainBox}>

            <div className={classes.searchContainer}>
                <SearchIcon className={classes.searchIcon} />
                <TextField className={classes.searchText} onChange={e => {setSearchPokemon(e.target.value)}} label="Search Pokemon..." variant="standard" />
            </div>
            
            <br />
            {pokemonData ? 
                <Grid container spacing={2} className={classes.pokedexContainer}>

                    {pokemonData.filter((pokemon) => {
                        if(searchPokemon === ""){
                            return pokemon;
                        }
                        else if (pokemon.name.toLowerCase().includes(searchPokemon.toLowerCase()))
                        {
                            return pokemon;
                        }
                        return false;
                    }).map((pokemon) => {
                        return(
                            <PokemonCard pokemon={pokemon} image={pokemon.url} key={pokemon.id} />
                        )
                    }
                )}

                </Grid>
            : <CircularProgress style={{marginTop: 100}}/>}

            <Stack className={classes.paginationStack}>
                <Pagination 
                    count={23}
                    pageSize={20}
                    
                />
            </Stack>
        </Box>
    )
}
