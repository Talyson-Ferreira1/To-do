
var ul = document.querySelector('.containerList');
let ArrayTarefas = new Array();
const form = document.querySelector('.item');
const btnSubmit = document.querySelector('.addItem');

setTimeout(load,1000);


function preferencias() {
  const tasksJSON = localStorage.getItem("Tasks");
  const allTasks = tasksJSON ? JSON.parse(tasksJSON) : {};
  const lista = document.querySelector("ul");

  lista.innerHTML = "";

  Object.entries(allTasks).forEach(([id, task]) => {
    const li = document.createElement("li");
    li.className = `contentCard ${task.state?"checkItem":""}`;
    li.id =`${id}`
    
    const input = document.createElement("input");
    input.className = `contentText ${task.state?"line-through":""}`;
    input.value = task.text;
    input.disabled = true;
    input.name = `${task.id}`;

    const btnCheck = document.createElement("button");
    btnCheck.className = "check";
    // if(task.state){btnCheck.className = "active"}

    const btnEdit = document.createElement("button");
    btnEdit.className = "edit";

    const btnDelete = document.createElement("button");
    btnDelete.className = "delete";

    li.appendChild(input);
    li.appendChild(btnCheck);
    li.appendChild(btnEdit);
    li.appendChild(btnDelete);

    lista.appendChild(li);
  });
}

function load(){
    const load = document.querySelector(".containerLoad")
    load.style.display="none"
}

function getTasksInLocalStorage(){
    const tasksJSON = localStorage.getItem("Tasks");
    let data

   return tasksJSON !== null? data = JSON.parse(tasksJSON) : data = {};
    
}

function pushChangesToLocalStorage(tasks){
    localStorage.setItem("Tasks", JSON.stringify(tasks));
}

function addNewTask(newTask={}){
    let tasksRescued = getTasksInLocalStorage();

    tasksRescued[newTask.id] = newTask

    pushChangesToLocalStorage(tasksRescued)

    preferencias()
}

function deleteTask(taskId){
    let allTasks = getTasksInLocalStorage()


    if (taskId && allTasks.hasOwnProperty(taskId)) {
        delete allTasks[taskId];
    }

    pushChangesToLocalStorage(allTasks);
}

function editTask(taskId, NewTaskValue){
    let allTasks = getTasksInLocalStorage()

    if (taskId && allTasks.hasOwnProperty(taskId)) {
        allTasks[taskId].text = NewTaskValue;
    }

    pushChangesToLocalStorage(allTasks);
}

function checkTask(taskId, state){
    let allTasks = getTasksInLocalStorage()

    if (taskId && allTasks.hasOwnProperty(taskId)) {
        allTasks[taskId].state = state;
    }

    pushChangesToLocalStorage(allTasks);
}


form.onsubmit = (event) => {event.preventDefault()};

btnSubmit.addEventListener("click", ()=>{
    const input = document.querySelector('.input');
    var inputValue = input.value;
    let TaskInfo = {
        id: crypto.randomUUID(),
        text: inputValue,
        charNumber: inputValue.length,
        state: false,
        date: new Date().toISOString()
    }

    if(inputValue == "") return

    ul.innerHTML += `<li class="contentCard">
                            <input class="contentText" name=${TaskInfo.id}" value="${inputValue}" disabled=""></input>
                            <button class="check"></button>
                            <button class="edit"></button>
                            <button class="delete"></button>
                    </li>`;

    addNewTask(TaskInfo);

    input.value = "" ;

})


ul.addEventListener("click",(event)=>{
    const containerItem = event.target.parentElement;
    const editItem = containerItem.children[0];
    const CheckItem = containerItem.children[1];
    const deleteItem = containerItem.children[3];
    const id = containerItem.id
    
    if(event.target.classList.contains('delete')){

        if(confirm("Deseja deletar esse item?")){
            containerItem.remove();
            deleteTask(id)
        }

    }else if(event.target.classList.contains('check')){

        containerItem.classList.toggle("checkItem");
        editItem.classList.toggle('line-through');

        if(containerItem.classList.contains('checkItem')){
            checkTask(containerItem.id,true)
        }else{
            checkTask(containerItem.id,false)

        }



    }else if(event.target.classList.contains('edit')){

        editItem.classList.toggle('active');

        if(editItem.classList.contains('active')){

            CheckItem.style.display="none";
            deleteItem.style.display="none";
            editItem.removeAttribute("disabled");
            containerItem.classList.add("active");
            
        }else if(editItem.classList.contains!=('active')) {

            CheckItem.style.display="block";
            deleteItem.style.display="block";
            editItem.disabled="true";
            containerItem.classList.remove("active");
            editItem.setAttribute("value",editItem.value);
            editTask(containerItem.id,editItem.value)
    
        }


    }
    // addNewTask()
})
const element = document.documentElement;

const warning = document.querySelector('.warning');
const warningText = document.querySelector('.warning span');
const warningRepositorio = document.querySelector('.repositorio');
const warningLinkedin = document.querySelector('.linkedin');
const warningPortfolio = document.querySelector('.portfolio');

warningRepositorio.addEventListener('mouseenter', ()=>{
    warningText.innerHTML="Visitar o repositório do projeto"
    
})
warningLinkedin.addEventListener('mouseenter', ()=>{
    warningText.innerHTML="Visitar linkedin do desenvolvedor"
})
warningPortfolio.addEventListener('mouseenter', ()=>{
    warningText.innerHTML="Visitar portfólio do desenvolvedor"
    
})
warning.addEventListener('mouseout', ()=>{
    warningText.innerHTML="Conheça o desenvoledor"
    
})

/* 
function fullScreen(){ 
    if (element.requestFullscreen) {
        
        element.addEventListener('click', () => {
        
            element.requestFullscreen();
        });
    }
}
 */
