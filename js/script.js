const pokemonName = document.querySelector('.pokemon__name');
const pokemonNumber = document.querySelector('.pokemon__number');
const pokemonImage = document.querySelector('.pokemon__image');
const pokemonType = document.querySelector('.pokemon__type');
const pokemonType2 = document.querySelector('.pokemon__type2');

const form = document.querySelector('.form');
const input = document.querySelector('.input__search');
const buttonPrevious = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');
const buttonShiny = document.querySelector('.btn-shiny');

let searchPokemon = 1;
let shiny = false;

const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if (APIResponse.status === 200) {
        const data = await APIResponse.json();
        return data; 
    }
}

const renderPokemon = async (pokemon) => {
    
    pokemonName.innerHTML = 'Loading...';
    pokemonNumber.innerHTML = '';
    pokemonType.innerHTML = '';
    pokemonType2.innerHTML = '';

    const data = await fetchPokemon(pokemon);

    if (data) {
        pokemonImage.style.display = 'block';
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        pokemonType.innerHTML = data['types']['0']['type']['name']
        try { 
            (pokemonType2.innerHTML = data['types']['1']['type']['name'])
        } catch {
            pokemonType2.innerHTML = ''
        }
        if (shiny === false) {
            pokemonImage.src = data['sprites']['front_default']
        } else {
            pokemonImage.src = data['sprites']['front_shiny']
        }
        input.value = '';
        searchPokemon = data.id
    } else {
        pokemonImage.style.display = 'none';
        pokemonName.innerHTML = 'Not found';
        pokemonNumber.innerHTML = '';
        pokemonType.innerHTML = '';
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    shiny = false
    renderPokemon(input.value.toLowerCase());
})

buttonPrevious.addEventListener('click', () => {
    if (searchPokemon > 1) {
        searchPokemon -= 1
        shiny = false
        renderPokemon(searchPokemon)
    }
})

buttonNext.addEventListener('click', () => {
    searchPokemon += 1
    shiny = false
    renderPokemon(searchPokemon)
})

buttonShiny.addEventListener('click', () => {
    if (shiny === false) {
        shiny = true
    } else {
        shiny = false
    }
    renderPokemon(searchPokemon)
})

renderPokemon(searchPokemon)