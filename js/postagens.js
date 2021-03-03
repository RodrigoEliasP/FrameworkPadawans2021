let postagens = [];
let usuarios = [];
let pagina = 1;
let quantidade = 7;
const loader = document.querySelector(".loading");
const container = document.querySelector(".container");
const postList = document.querySelector("#postagens");
function reloadPostsList(){
    postList.innerHTML = '';
    for (let i = (pagina - 1) * quantidade; i < quantidade * pagina; i++) {
        const currentPost = postagens[i]; 
        if(currentPost){
            const index = usuarios.findIndex(e=> e.id == currentPost.userId);
            postList.innerHTML += 
            `<tr>
                <td>${usuarios[index].username}</td>
                <td><p>${currentPost.title}</p></td>
                <td><p>${currentPost.body}</p></td>
                <td>
                    <button 
                      onclick="loadModal(${currentPost.id})" 
                      data-toggle="modal" 
                      data-target="#exampleModal"
                    >Ver comentários</button>
                </td>
            </tr>`
        }
    }
}
async function loadModal(id){
    
    const modalBody = document.querySelector("#modalbody");
    modalBody.innerHTML = "<i class=\"fa fa-spinner fa-spin\" id=\"modalspin\"></i>";

    const response = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${id}`).then(e=>e.json());
    let imgString = ''
    response.forEach(comentario => {
        imgString += `
        <div class="comentarios">
            <h3>${comentario.name}: ${comentario.email}</h3>
            <p>${comentario.body}</p>
        </div>`
    });
    modalBody.innerHTML = imgString;
}
window.onload = async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts').then(e=>e.json());
    const users = await fetch('https://jsonplaceholder.typicode.com/users').then(e=>e.json());
    loader.classList.add('hide');
    container.classList.remove('hide')
    postagens = response;
    usuarios = users;
    reloadPostsList();
}
document.querySelector("#nxt").addEventListener('click', ()=>{
    const teto = Math.ceil(postagens.length / quantidade);
    if(pagina + 1 <= teto){
        pagina++
        reloadPostsList();
    }else{
        alert('não tem mais páginas')
    }
})

document.querySelector("#bfr").addEventListener('click', ()=>{
    const teto = Math.ceil(postagens.length / quantidade);
    if(pagina - 1 != 0){
        pagina--
        reloadPostsList();
    }else{
        alert('não há paginas anteriores')
    }
})
document.querySelector('#search').addEventListener('click',async ()=>{
    const pesquisa = document.querySelector('#pesquisa').value;
    loader.classList.remove('hide');
    container.classList.add('hide')
    const response = await fetch('https://jsonplaceholder.typicode.com/posts').then(e=>e.json());
    loader.classList.add('hide');
    container.classList.remove('hide');
    postagens = response.filter(e=>e.title.includes(pesquisa));
    reloadPostsList();
});