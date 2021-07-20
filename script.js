const elementoContainer = document.querySelector('.container'); // pega o primeiro elemento que contem  a classe container
const elementoFormulario = document.querySelector('form') // pega direto pela tag input. pega o primeiro form
const elementoInput = document.querySelector('input[type=text]') // pega o primeiro input com type text

elementoFormulario.addEventListener('submit', function(evento) {
    evento.preventDefault(); // não deixa recarregar a pagina que o submit faz por padrao ao ser clicado

    elementoContainer.innerHTML = '';

    pegarPokemon(elementoInput.value)

})



async function pegarPokemon(nome) {
    nome = nome.toLowerCase();

    const resposta = await fetch(`https://pokeapi.co/api/v2/pokemon/${nome}`);    // armazena o resultado da pesquisa. o fetch significa alcançar. o ${} é um placeholder q permite inserir uma variavel. o fetch por padrao retorna uma promises onde significa que os pacotes com os arquivos ainda não chegaram por isso colocamos o await (chamados isso de assincrono pois  n sabemos quando que esses pacotes chegarão) e no começo da função adicionamos o async. tudo tem o objetivo de fazer a aplicao continuar rodando e não parar pra esperar essa requisição especifica


    if (resposta.ok == true) { // se o nome pesquisado tiver certo mostre ele na tela
        const pokemonInfo = await resposta.json()

        const elementoPokemon = document.createElement("div"); // cria uma div
        elementoPokemon.classList.add("pokemon") // adiciona uma classa a div criada
    
        elementoPokemon.innerHTML = `
            <div class="card">
                
                <h2> ${pokemonInfo.name[0].toUpperCase() + pokemonInfo.name.substring(1)}</h2> <!-- aqui trasnfora em capitalize o nome do pokemon-->
    
                ${
                    pokemonInfo.stats.map(
                        function(item) {
                            return `<p>${item.stat.name}: ${item.base_stat} </p>`
                        }
                    ).join("")
                }
    
            </div> 
            <img src="https://pokeres.bastionbot.org/images/pokemon/${pokemonInfo.id}.png" />
    
        `
    
    
        //Dps de tudo vai adicionar
        elementoContainer.appendChild(elementoPokemon) // adiciona como filho do containeir o elemento pokemon
    

    } else if (resposta.ok == false){ // caso não esteja achando o nome do pokemon, mostre na tela

        const elementoPokemon = document.createElement("div"); // cria uma div
        elementoPokemon.classList.add("pokemon") // adiciona uma classa a div criada
        elementoPokemon.innerHTML = `
            <div class="card"> 
                <h1>Pokemon não encontrado</h1>
            </div
        `
        
        elementoContainer.appendChild(elementoPokemon)
    }

   
}
