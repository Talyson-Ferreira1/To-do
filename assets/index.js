
var ul = document.querySelector('.containerList');
let ArrayTarefas = new Array();

function preferencias(){
    fullScreen()
    
    if(localStorage.hasOwnProperty("li")){

        ArrayTarefas = localStorage.getItem("li");
        ul.innerHTML += `${ArrayTarefas}`;

    }else return;

}

setTimeout(load,5000);

function load(){
    const load = document.querySelector(".containerLoad")
    load.style.display="none"
}





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
    warningText.innerHTML="Esse projeto tem fins educacionais"
    
})




const form = document.querySelector('.item');
const btnSubmit = document.querySelector('.addItem');

form.onsubmit = (event) => {event.preventDefault()};

btnSubmit.addEventListener("click", ()=>{
    const input = document.querySelector('.input');
    var value = input.value;

    if(value == "") return

    ul.innerHTML += `<li class="contentCard">
                            <input class="contentText" value="${value}" disabled=""></input>
                            <button class="check"></button>
                            <button class="edit"></button>
                            <button class="delete"></button>
                    </li>`;
    input.value = "" ;


    pushItemsToArray();

})

ul.addEventListener("click",(event)=>{
    const containerItem = event.target.parentElement;
    const editItem = containerItem.children[0];
    const CheckItem = containerItem.children[1];
    const deleteItem = containerItem.children[3];
    //Criar um card confirm

    if(event.target.classList.contains('delete')){

        if(confirm("Deseja deletar esse item?")){
            containerItem.remove();
        }

    }else if(event.target.classList.contains('check')){

        containerItem.classList.toggle("checkItem");
        editItem.classList.toggle('line-through');


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
    
        }


    }
    pushItemsToArray()
})

function pushItemsToArray(){

    const tarefasCriadas = ul.children;

    ArrayTarefas = [];
    ArrayTarefas.push(tarefasCriadas)
    let dadosLocalStorage = ArrayTarefas.map(tarefaSalva => ul.innerHTML ); 
    localStorage.setItem('li', dadosLocalStorage);
}

const element = document.documentElement;


function fullScreen(){ 
    if (element.requestFullscreen) {
        
        element.addEventListener('click', () => {
        
            element.requestFullscreen();
        });
    }
}

//Criar dois botões, o primeiro corresponde a edição do elemento da lista, o segundo a
