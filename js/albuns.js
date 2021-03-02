let albuns = [];
let usuarios = [];
let pagina = 1;
let quantidade = 7;
const loader = document.querySelector(".loading");
const container = document.querySelector(".container");
const albumList = document.querySelector("#albuns");
function reloadAlbumList(){
    albumList.innerHTML = '';
    for (let i = (pagina - 1) * quantidade; i < quantidade * pagina; i++) {
        const currentAlbum = albuns[i]; 
        if(currentAlbum){
            const index = usuarios.findIndex(e=> e.id == currentAlbum.userId);
            albumList.innerHTML += 
            `<tr>
                <td>${usuarios[index].username}</td>
                <td><p>${currentAlbum.title}</p></td>
                <td>
                    <button 
                      onclick="loadModal(${currentAlbum.id})" 
                      data-toggle="modal" 
                      data-target="#exampleModal"
                    >Ver fotos</button>
                </td>
            </tr>`
        }
    }
}
async function loadModal(id){
    
    const modalBody = document.querySelector("#modalbody");
    modalBody.innerHTML = "<i class=\"fa fa-spinner fa-spin\" id=\"modalspin\"></i>";

    const response = await fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${id}`).then(e=>e.json());
    let imgString = ''
    const fotos = response.forEach(foto => {
        imgString += `<img src="${foto.thumbnailUrl}">`
    });
    modalBody.innerHTML = imgString;
}
window.onload = async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/albums').then(e=>e.json());
    const users = await fetch('https://jsonplaceholder.typicode.com/users').then(e=>e.json());
    loader.classList.add('hide');
    container.classList.remove('hide')
    albuns = response;
    usuarios = users;
    reloadAlbumList();
}
document.querySelector("#nxt").addEventListener('click', ()=>{
    const teto = Math.ceil(albuns.length / quantidade);
    if(pagina + 1 <= teto){
        pagina++
        reloadAlbumList();
    }else{
        alert('não tem mais páginas')
    }
})

document.querySelector("#bfr").addEventListener('click', ()=>{
    const teto = Math.ceil(albuns.length / quantidade);
    if(pagina - 1 != 0){
        pagina--
        reloadAlbumList();
    }else{
        alert('não há paginas anteriores')
    }
})
document.querySelector('#search').addEventListener('click',async ()=>{
    const pesquisa = document.querySelector('#pesquisa').value;
    loader.classList.remove('hide');
    container.classList.add('hide')
    const response = await fetch('https://jsonplaceholder.typicode.com/albums').then(e=>e.json());
    loader.classList.add('hide');
    container.classList.remove('hide');
    albuns = response.filter(e=>e.title.includes(pesquisa));
    reloadAlbumList();
});