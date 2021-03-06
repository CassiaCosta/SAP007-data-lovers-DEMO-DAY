import { calculos, rarityFilter, eggsFilter, typeFilter, alphabeticalFilter, searchName } from './data.js';
import data from '../data/pokemon/pokemon.js';

let allPokemons = data.pokemon;
const shinyUrlImg = "https://www.serebii.net/pokemongo/pokemon/shiny/";

const selectType = document.getElementById('typeFilter');
const selectRarity = document.getElementById('rarityFilter');
const selectEggs = document.getElementById('eggsFilter');
const selectOrder = document.getElementById('orderFilter');
const inputName = document.getElementById('nameFilter');
const clearButton = document.getElementById('clearButton');
const calculationBar = document.getElementById('calculation');
const buttonTop = document.getElementById('buttonTop');

function translate(type) {
  let translatedType = "";
  switch (type) {
    case "water":
      translatedType = "Água";
      break;
    case "dragon":
      translatedType = "Dragão";
      break;
    case "electric":
      translatedType = "Elétrico";
      break;
    case "ghost":
      translatedType = "Fantasma";
      break;
    case "fire":
      translatedType = "Fogo";
      break;
    case "ice":
      translatedType = "Gelo";
      break;
    case "bug":
      translatedType = "Inseto";
      break;
    case "fighting":
      translatedType = "Lutador";
      break;
    case "normal":
      translatedType = "Normal";
      break;
    case "rock":
      translatedType = "Pedra";
      break;
    case "grass":
      translatedType = "Planta";
      break;
    case "psychic":
      translatedType = "Psíquico";
      break;
    case "ground":
      translatedType = "Terra";
      break;
    case "poison":
      translatedType = "Venenoso";
      break;
    case "flying":
      translatedType = "Voador";
      break;
  }
  return translatedType;
}

function showPokemon(data) {
  const allCards = data.map((item) => {
    let evolutionText = "";
    let candysEvolution = "";
    let eggs = "";
    if (item.evolution["next-evolution"]) {
      // evolutionText = item.evolution["next-evolution"][0].name
      evolutionText = `<p class="info"><b>Próxima evolução:</b> ${item.evolution["next-evolution"].map(evolution => evolution.name).join(', ')}</p>`
      candysEvolution = `<p class="info"><b>Candys:</b> ${item.evolution["next-evolution"].map(candys => candys["candy-cost"]).join(', ')}</p>`
    } else {
      evolutionText = `<p class="info"><b>Não tem próxima evolução</b></p>`
      candysEvolution = `<p class="info">Sem candys</p>`
    }
    if (item.egg == "not in eggs") {
      eggs = `<p class="info"><b>Ovos:</b> Não tem ovos</p>`
    } else {
      eggs = `<p class="info"><b>Ovos:</b>${item.egg}</p>`
    }
    return `
    <div class="cards" id="cards">
        <section class="front-cards" id="frontCards">
          <p class="numberPokemon">${item.num}</p>
          <picture>
              <img class="image-card" src="${item.img}" alt="imagem do Pokémon" loading = "lazy">
          </picture>
          <div class="info-cards">
              <p class="namePokemon">${item.name}</p>
              <p class="info"> <b>Tipo:</b> ${item.type.map(element => {
                return translate(element)
              })}</p>
              ${eggs}
              ${evolutionText}
              ${candysEvolution}
          </div>
        </section>
    </div>
    `}).join('')
    document.getElementById('pokemonList').innerHTML = allCards;
}

function showPokemonShiny(data) {
  const allCards = data.map((item) => {
    let evolutionText = "";
    let candysEvolution = "";
    let eggs = "";
    if (item.evolution["next-evolution"]) {
      // evolutionText = item.evolution["next-evolution"][0].name
      evolutionText = `<p class="info"><b>Próxima evolução:</b> ${item.evolution["next-evolution"].map(evolution => evolution.name).join(', ')}</p>`
      candysEvolution = `<p class="info"><b>Candys:</b> ${item.evolution["next-evolution"].map(candys => candys["candy-cost"]).join(', ')}</p>`
    } else {
      evolutionText = `<p class="info"><b>Não tem próxima evolução</b></p>`
      candysEvolution = `<p class="info">Sem candys</p>`
    }
    if (item.egg == "not in eggs") {
      eggs = `<p class="info"><b>Ovos:</b> Não tem ovos</p>`
    } else {
      eggs = `<p class="info"><b>Ovos:</b>${item.egg}</p>`
    }
    return `
      <div class="cards">
        <section class="front-cards-shiny" id="frontCards">
          <p class="numberPokemon">${item.num}</p>
          <picture>
            <img class="image-card" src="${shinyUrlImg}${item.img.slice(42,50)}" alt="imagem do Pokémon" loading = "lazy">
          </picture>
          <div class="info-cards">
            <p class="namePokemon">${item.name}</p>
            <p class="info"> <b>Tipo:</b> ${item.type.map(element => {
              return translate(element)
              })}</p>
            ${eggs}
            ${evolutionText}
            ${candysEvolution}
          </div>
        </section>
      </div>
  `}).join('')
    document.getElementById('pokemonList').innerHTML = allCards;
}

function searchByType(e) {
  document.body.classList.remove('shiny')
  allPokemons = typeFilter(allPokemons, e.target.value)
  calculationBar.innerHTML = `Este tipo de pokémon representa ${calculos(data.pokemon.length, allPokemons.length)}% 
        do total`
  showPokemon(allPokemons)
}

function searchByRarity(e) {
  if (e.target.value == "shiny") {
    document.body.classList.add('shiny')
    showPokemonShiny(allPokemons)
  } else {
    document.body.classList.remove('shiny')
    const resultRarity = rarityFilter(allPokemons, e.target.value)
    calculationBar.innerHTML = `Esta raridade de pokémon representa ${calculos(allPokemons.length, resultRarity.length)}% 
        do total`
  showPokemon(resultRarity)
  }
}

function searchByEgg(e) {
  document.body.classList.remove('shiny')
  allPokemons = eggsFilter(allPokemons, e.target.value)
  calculationBar.innerHTML = `${calculos(data.pokemon.length, allPokemons.length)}% dos Pokémons podem surgir desses ovos`
  showPokemon(allPokemons)
}

function searchByOrderAlphabetical() {
  document.body.classList.remove('shiny')
  if (selectOrder.value == "a-z") {
    calculationBar.innerHTML = `Pokémons ordenados de A à Z`
  } else if (selectOrder.value == "z-a") {
    calculationBar.innerHTML = `Pokémons ordenados de Z à A`
  }
  showPokemon(alphabeticalFilter(allPokemons, selectOrder.value))
}

function searchByName() {
  document.body.classList.remove('shiny')
  if (inputName.value !== "") {
    calculationBar.innerHTML = `Busca por nome...`
  } else if (inputName.value == "") {
    calculationBar.innerHTML = `Você está vendo todos os Pokémons!`
  }
  showPokemon(searchName(allPokemons, inputName.value.toLowerCase()))
}

function cleanFilters() {
  document.body.classList.remove('shiny')
  allPokemons = data.pokemon;
  showPokemon(allPokemons);
  calculationBar.innerHTML = `Você está vendo todos os Pokémons!`
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

showPokemon(allPokemons);
selectType.addEventListener('change', searchByType);
selectRarity.addEventListener('change', searchByRarity);
selectEggs.addEventListener('change', searchByEgg);
selectOrder.addEventListener('change', searchByOrderAlphabetical);
inputName.addEventListener('input', searchByName);
clearButton.addEventListener('click', cleanFilters);
buttonTop.addEventListener('click', scrollToTop)