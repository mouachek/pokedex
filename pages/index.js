import {useEffect, useState} from "react";
import {Button} from 'react-bootstrap';

import Footer from "./components/footer";
import PokemonCard from "./components/pokemonCard";

import styles from '../styles/Home.module.css'

const Home = () => {

    const [allPokemons, setAllPokemons] = useState([])
    const [loadMore, setLoadMore] = useState('https://pokeapi.co/api/v2/pokemon?limit=10')

    const getAllPokemons = async () => {
        const res = await fetch(loadMore)
        const data = await res.json()

        setLoadMore(data.next)

        function createPokemonObject(results) {
            results.forEach(async pokemon => {
                const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
                const data = await res.json()
                setAllPokemons(currentList => [...currentList, data])
            })
        }
        createPokemonObject(data.results)
    }

    useEffect(() => {
        getAllPokemons()
    }, [])

    const sortByDescendingName = () => {
        let i = allPokemons.sort((a, b) => a.species.name < b.species.name ? -1 : 1);
        i.reverse();
        getAllPokemons();
    };


    return (
        <div className={styles.container}>
            <h1>
                Welcome to Pokedex
            </h1>
            <div className="pb-5">
                <Button variant="warning" size="lg" onClick={() => sortByDescendingName()}>Sort by Descending name</Button>
            </div>
            <div className={styles.cardContainer}>
                <div className={styles.allPokemons}>
                    {allPokemons.map((pokemon, index) =>
                        <PokemonCard
                            key={index}
                            id={pokemon.id}
                            image={pokemon.sprites.other.dream_world.front_default}
                            name={pokemon.name}
                            type={pokemon.types[0].type.name}
                        />
                    )}
                </div>
                <div className="pt-5">
                    <Button variant="warning" size="lg" onClick={() => getAllPokemons()}>Load more !</Button>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default Home;
