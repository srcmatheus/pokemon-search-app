function searchPokemon(i){
    
    let url = ``;

    const searchPokemon = document.getElementById('search');
    const pokemonImage = document.getElementById('pokemonImage');
    const pokemonImageFull = document.getElementById('pokemonImageFull');
    const pokemonName = document.getElementById('name');
    const pokemonType = document.getElementById('type');
    const pokemonHeight = document.getElementById('height');
    const pokemonWeight = document.getElementById('weight');
    const pokemonAbilities = document.getElementById('abilities');
    const abilities = [];

    const life = document.getElementById('life');
    const attack = document.getElementById('attack');
    const defense = document.getElementById('defense');
    const specialAttack = document.getElementById('special-attack');
    const specialDefense = document.getElementById('special-defense');
    const speed = document.getElementById('speed');
    const allBars = document.querySelectorAll('.after');

    if(searchPokemon.value === "" && i != 2){
        document.getElementById('section').style.display = "none";
        alert("Digite o nome do pokemon ou gere um aleatório...")
        return;
    }

    if(i === 1){
        url = `https://pokeapi.co/api/v2/pokemon/${searchPokemon.value.toLocaleLowerCase()}`;
    }else{
        url = `https://pokeapi.co/api/v2/pokemon/${Math.floor(Math.random() * 1025) + 1}`;
    }

    fetch(url)
        .then(response => response.json())
        .then(data => {
            document.getElementById('section').style.display = "flex";
            pokemonImage.src = data.sprites.front_default;
            pokemonImageFull.src = data.sprites.other["official-artwork"].front_default;
            pokemonName.innerText = data.name.charAt(0).toUpperCase() + data.name.slice(1);
            pokemonType.innerText = `Tipo: ${data.types[0].type.name}`;
            pokemonHeight.innerText = `Altura: ${data.height * 10}cm`;
            pokemonWeight.innerText = `Peso: ${data.weight / 10}kg`;
            for(const i in data.abilities) abilities[i] = data.abilities[i].ability.name;
            pokemonAbilities.innerText = `Habilidades: ${abilities.join(', ')}`;

            life.innerText = "Vida";
            attack.innerText = "Ataque";
            defense.innerText = "Defesa";
            specialAttack.innerText = "Ataque especial";
            specialDefense.innerText = "Defesa especial";
            speed.innerText = "Velocidade";
            allBars.forEach((element, index) =>{
                element.style.width = `calc(${data.stats[index].base_stat} / 255 * 100%)`;
            })
        })
        .catch(() => alert("Pokemon não encontrado..."));


    searchPokemon.value = "";
}