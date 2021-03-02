let todos = [];
let usuarios = [];
let pagina = 1;
let quantidade = 7;
const loader = document.querySelector(".loading");
const container = document.querySelector(".container");
const todoList = document.querySelector("#todos");
function reloadTodoList(){
    todoList.innerHTML = '';
    for (let i = (pagina - 1) * quantidade; i < quantidade * pagina; i++) {
        const currentTodo = todos[i]; 
        if(currentTodo){
            const index = usuarios.findIndex(e=> e.id == currentTodo.userId);
            todoList.innerHTML += 
            `<tr>
                <td>${usuarios[index].username}</td>
                <td><p>${currentTodo.title}</p></td>
                <td><input type="checkbox" ${(currentTodo.completed)? "checked": ""}></td>
            </tr>`
        }
    }
}
window.onload = async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos').then(e=>e.json());
    const users = await fetch('https://jsonplaceholder.typicode.com/users').then(e=>e.json());
    loader.classList.add('hide');
    container.classList.remove('hide')
    todos = response;
    usuarios = users;
    reloadTodoList();
}
document.querySelector("#nxt").addEventListener('click', ()=>{
    const teto = Math.ceil(todos.length / quantidade);
    if(pagina + 1 <= teto){
        pagina++
        reloadTodoList();
    }else{
        alert('não tem mais páginas')
    }
})
document.querySelector("#bfr").addEventListener('click', ()=>{
    const teto = Math.ceil(todos.length / quantidade);
    if(pagina - 1 != 0){
        pagina--
        reloadTodoList();
    }else{
        alert('não há paginas anteriores')
    }
})
document.querySelector('#search').addEventListener('click',async ()=>{
    const pesquisa = document.querySelector('#pesquisa').value;
    loader.classList.remove('hide');
    container.classList.add('hide')
    const response = await fetch('https://jsonplaceholder.typicode.com/todos').then(e=>e.json());
    loader.classList.add('hide');
    container.classList.remove('hide');
    todos = response.filter(e=>e.title.includes(pesquisa));
    reloadTodoList();
});