const body = document.querySelector('body');
const btnAddTask = document.querySelector('#criar-tarefa');
const list = document.querySelector('#lista-tarefas');

// Caso haja algum dado salvo no localStorage este será salvo em tasks caso contrário tasks será um array vazio.
let tasks = [];
if (localStorage.getItem('to-do_list') !== null){
  tasks = JSON.parse(localStorage.getItem('to-do_list'))
} 

// Função que pega as propriedades dos objetos salvos no localStorage e cria uma lista de tarefas com a tag 'li'
function tasksUpdate(){
  for (let obj of tasks){
    const listItem = document.createElement('li');
    listItem.innerText = obj.taskName;
    listItem.classList = obj.className
    list.appendChild(listItem)
  }
}
tasksUpdate()

// Função que adiciona tarefas a uma lista com os valores do input ao clicar no botão
btnAddTask.addEventListener('click', addTask);
function addTask(){
  const taskItem = document.querySelector('#texto-tarefa').value;
  const listItem = document.createElement('li');
  listItem.innerText = taskItem;
  list.appendChild(listItem)
  document.querySelector('#texto-tarefa').value = '';
}
// Função que adiciona tarefas a uma lista com os valores do input ao clicar na tecla 'Enter'
const taskInput = document.querySelector('#texto-tarefa');
taskInput.addEventListener('keydown', function(event){
  if(event.key === 'Enter'){
    addTask()
  }
} )

// Função que altera a cor de fundo do item ao ser clicado adicionado a classe 'selected' 
list.addEventListener('click', changeBackground);
function changeBackground(event){
  const list = document.querySelector('.selected')
  if (list){
    list.classList.toggle('selected')
  }
  event.target.classList.toggle('selected')
}
// Função que faz com que o texto seja riscado ao ser clicado duas vezes adicionado a classe 'completed' 
list.addEventListener("dblclick", taskCompleted);
function taskCompleted(event){
  event.target.classList.toggle('completed')
}

// Função que apaga todas as tarefas
const btnClearList = document.querySelector('#apaga-tudo');
btnClearList.addEventListener('click', clearList);
function clearList(){
  list.innerHTML='';
} 

// Função que apaga todas as tarefas completadas
const btnClearTaskCompleted = document.querySelector('#remover-finalizados');
btnClearTaskCompleted.addEventListener('click', clearTaskCompleted);
function clearTaskCompleted(){
  const taskCompleted = document.querySelectorAll('.completed');
  for(let item of taskCompleted){
    item.remove()
  }
}

// Função que move a tarefa selecionada para cima 
const btnMoveUp = document.querySelector('#mover-cima')
btnMoveUp.addEventListener('click', moveUp)
function moveUp(){
  if (document.querySelector('.selected')){
    const atual = document.querySelector('.selected')
    const anterior = document.querySelector('.selected').previousSibling
    const pai = document.querySelector('.selected').parentElement
    if (anterior != null){
      pai.insertBefore(atual, anterior)
    }
  }
}

// Função que move a tarefa selecionada para baixo 
const btnMoveDown = document.querySelector('#mover-baixo')
btnMoveDown.addEventListener('click', moveDown)
function moveDown(){
  if(document.querySelector('.selected')){
    const atual = document.querySelector('.selected')
    const posterior = document.querySelector('.selected').nextSibling
    const pai = document.querySelector('.selected').parentElement
    if (posterior != null){
      pai.insertBefore(atual, posterior.nextSibling)
    }
  }
}

// Função que remove a tarefa selecionada
const btnSelectRemove = document.querySelector('#remover-selecionado')
btnSelectRemove.addEventListener('click', selectRemove)
function selectRemove(){
  const atual = document.querySelector('.selected')
  atual.remove()
}

// Função que salva as propriedades das tarefas em objetos contido no array tasks que será salvo no localStorage no formato JSON
const btnSaveList = document.querySelector('#salvar-tarefas');
btnSaveList.addEventListener('click', saveList);
function saveList(){
  tasks = [];
  const taskList = document.querySelectorAll('li');
  Array.from(taskList).forEach(item =>{
    const properties = {
      taskName: item.innerText,
      className: item.className,
    }
    tasks.push(properties);
  })
  localStorage.setItem('to-do_list', JSON.stringify(tasks));
}