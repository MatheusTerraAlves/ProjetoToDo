const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: '>> '
});

const tarefas = [];

var OPCAO_ENCERRAMENTO = 6;

var cabecalho = "\nSISTEMA DE GESTÃO DE TAREFAS";

var opcoes =
  "\n 1 - Adicionar uma tarefa;" +
  "\n 2 - Editar uma tarefa salva;" +
  "\n 3 - Remover uma tarefa salva;" +
  "\n 4 - Listar todas as tarefas salvas;" +
  "\n 5 - Obter uma tarefa, através de um parâmetro (id)" +
  `\n ${OPCAO_ENCERRAMENTO} - Sair\n`;

var solicitacaoAcao = "\nDigite a ação desejada: ";

var sequence = 1;

function main() {
  console.log(cabecalho);
  console.log(opcoes);
  rl.setPrompt(solicitacaoAcao);
  rl.prompt();

  rl.on('line', (line) => {
    const opcaoEscolhida = parseInt(line.trim());

    switch (opcaoEscolhida) {
      case 1:
        criarTarefa();
        break;
      case 2:
        rl.question("\nDigite o ID da tarefas para editar: ", (tarefaId) => {
            rl.question("\nDigite a nova tarefa: ", (novaTarefa) => {
        
                editarTarefa(tarefaId,novaTarefa);
        
                });
            });
        break;
      case 3:
        removerTarefa();
        break;
      case 4:
        listarTodasTarefasSalvas();
        break;
      case 5:
        vizualizarTarefa();
        break;
      case OPCAO_ENCERRAMENTO:
        rl.close();
        break;
      default:
        console.log("Opção inválida. Tente novamente.");
        break;
    }
  });
}

function criarTarefa() {
  rl.question("Digite o nome da tarefa: ", (nome) => {
    let id = sequence;
    sequence++;

    let tarefa = {
      id: id,
      nome: nome,
    }

    tarefas.push(tarefa);
    console.log(`Tarefa criada: {id: ${tarefa.id}, nome: ${tarefa.nome}}`);
    rl.prompt();
  });
}

function editarTarefa(tarefaId,novaTarefa){
    //console.log(listarTodasTarefasSalvas());
    
        let number = tarefaId - 1;
        tarefas[number].nome=novaTarefa;
        
        console.log(`Tarefa editada: {id: ${tarefas[number].id}, nome: ${tarefas[number].nome}}`);
        rl.prompt();

}


function removerTarefa(){
    //Removendo tasks por Id
    console.log(listarTodasTarefasSalvas());
    
    rl.question("Digite o id da tarefa que quer remover: ", (index) => {
        let number = index -1;    
        
        console.log(`A Tarefa : {id: ${tarefas[number].id}, nome: ${tarefas[number].nome}} foi removida`);
        tarefas.splice(number,1);
        reordenarId(tarefas);
        console.log(listarTodasTarefasSalvas());
        rl.prompt();
      });
}

function listarTodasTarefasSalvas() {
    if (tarefas.length === 0) {
        console.log("Não há tarefas salvas.");
      } else {
        console.log("\nTodas as tarefas salvas:");
        tarefas.forEach((tarefa) => console.log(`Tarefa: {id: ${tarefa.id}, nome: ${tarefa.nome}}`));
      }
  rl.prompt();
}

function vizualizarTarefa(){
    rl.question("Digite o id da tarefa que quer vizualizar: ", (index) => {
        try{
            if (isNaN(index)){
                throw new Error("\nErro! Digite um ID válido!\n")
            }
        
        let number = index -1;
        if(index>tarefas.length){
            throw new Error("\nTarefa não localizada\n")
        }    
        
        console.log(`A Tarefa correspondente ao id ${index} é a: {id: ${tarefas[number].id}, nome: ${tarefas[number].nome}}`);
        }catch (error) {
            return console.error(error.message);
          }

        rl.prompt();
      });
}

rl.on('close', () => {
  console.log("Obrigado por utilizar o programa.");
  process.exit(0);
});

function reordenarId(vetor){
    for(let i=0; i<vetor.length;i++){
        vetor[i].id = i+1;
    }
    sequence = vetor.length +1;
    return vetor;
}


main();