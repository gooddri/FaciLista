

const ulItens = document.getElementById("lista-de-itens")
const ulItensComprados = document.getElementById('itens-comprados')


const listaDeItens = []
let itemAEditar

const API = "https://facilistas2.onrender.com/conteudo"

const getApi = async () => {
   try {
    const promisse = await fetch(API)
    const data = await promisse.json()
    // console.log(data);
    return data 
   }catch (error){
        console.error(error)
   }
}

let objetoSemanal = null;
let lista = [];
getApi().then((data) => {

   
   for (let i = 0; i < data.length; i++) {
     if (data[i].TITULO === 'natal') {
       objetoSemanal = data[i];
       lista.push(objetoSemanal.DESCRICAO);
     }
   }
    
});

// console.log(lista)


const semanal = document.getElementById('natal-click')

semanal.addEventListener('click', (e) => {
   e.preventDefault()
   MostraItensNatal()
   enviarItem()
   console.log(lista);
})

const enviarItem = () => {
     
    lista.push({
        valor: lista,
        checar: false
    })
   
   
   
   
}



const MostraItensNatal = () => {
         ulItens.innerHTML = ''
         ulItensComprados.innerHTML = ''
        
         lista.forEach((str, index) => {
            if(str.checar) {
                ulItensComprados.innerHTML += `
                    <li class="item-compra is-flex is-justify-content-space-between" data-value="${index}">
                        <div>
                            <input type="checkbox" checked class="is-clickable" />
                            <span class="itens-comprados is-size-5">${str}</span>
                        </div>
                        <div>
                            <i class="fa-solid fa-trash is-clickable deletar"></i>
                        </div>
                    </li>
                `
            }else {
                ulItens.innerHTML += `
                    <li class="item-compra is-flex is-justify-content-space-between" data-value="${index}">
                        <div>
                            <input type="checkbox" class="is-clickable" />
                            <input type="text" class="is-size-5" value="${str}" ${index !== Number(itemAEditar) ? 'disabled' : ''} ></input>
                        </div>
                        <div>
                            ${ index === Number(itemAEditar) ? '<button onclick="salvarEdicao()"><i class="fa-regular fa-floppy-disk is-clickable"></i></button>' : '<i class="fa-regular is-clickable fa-pen-to-square editar"></i>'}
                            <i class="fa-solid fa-trash is-clickable deletar"></i>
                        </div>
                        
                    </li>    
                    
                    `
            }
         }) 
                 
         
        selecionarCheckbox()

        deletarItens()

        editarItensLista()
         
}

function selecionarCheckbox () {
    
    let inputsCheck = document.querySelectorAll('input[type="checkbox"]')
    inputsCheck.forEach( (i) => {
        i.addEventListener('click', (evento) => {
            lista[inputsCheck].checar = evento.target.checked
            MostraItensNatal()
            
        })
    })
}



function deletarItens () {
    const deletarObjetos = document.querySelectorAll('.deletar')
    
    deletarObjetos.forEach( (i) => {
        i.addEventListener('click', (evento) => {
            let valorDoElemento = evento.target.parentElement.parentElement.getAttribute('data-value')
            lista.splice(valorDoElemento, 1)
            MostraItensNatal()
            
        })
    })
}

function editarItensLista () {
    const editarItens = document.querySelectorAll('.editar')
    editarItens.forEach( i => {
        i.addEventListener('click', (evento) => {
            itemAEditar = evento.target.parentElement.parentElement.getAttribute('data-value')
            MostraItensNatal()
            
        })
    })
}   



const salvarEdicao = () => {
    let itemEditado = document.querySelector(`[data-value="${itemAEditar}"] input[type="text"]`)
    lista[itemAEditar].valor = itemEditado.value
    itemAEditar = -1
    exibirItens()

}






























