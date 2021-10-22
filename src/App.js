import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import AppNavigator from './components/AppNavigator';
import Pokedex from './containers/Pokedex';
import PokemonDetails from './containers/PokemonDetails';

export default function App() {
  return (
    <Router>
      <AppNavigator />
        <Route exact path="/" component={Pokedex} />
        <Route exact path="/pokemon/:id" component={PokemonDetails} />
    </Router>
  )
}
