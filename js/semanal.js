const ulItens = document.getElementById("lista-de-itens")
const ulItensComprados = document.getElementById('itens-comprados')


const listaDeItens = []
let itemAEditar

const API = "https://facilistas2.onrender.com/conteudo"

const getApi = async () => {
   try {
    const promisse = await fetch(API)
    const data = await promisse.json()
    
    return data 
   }catch (error){
        console.error(error)
   }
}

let objetoSemanal = null;
let listaSemanal = [];
getApi().then((data) => {

   
   for (let i = 0; i < data.length; i++) {
     if (data[i].TITULO === 'semanal') {
       objetoSemanal = data[i];
       listaSemanal.push(objetoSemanal.DESCRICAO);
     }
   }
    
});


const semanal = document.getElementById('semanal-click')

semanal.addEventListener('click', (e) => {
   e.preventDefault()
   MostraItensNatal()
   enviarItem()
    
})

const enviarItem = () => {
     
    listaSemanal.push({
        valor: listaSemanal,
        checar: false
    })
     
}



const MostraItensNatal = () => {
         ulItens.innerHTML = ''
         
        
         listaSemanal.forEach((str, index) => {
            ulItens.innerHTML += `
                    <li class="item-compra is-flex is-justify-content-space-between" data-value="${index}">
                        <div>
                            <input type="checkbox" class="is-clickable" />
                            <input type="text" class="is-size-5" value="${str}" ${index !== Number(itemAEditar) ? 'disabled' : ''} ></input>
                        </div>
                        <div>
                            ${ index === Number(itemAEditar) ? '<button><i class="fa-regular fa-floppy-disk is-clickable"></i></button>' : '<i class="fa-regular is-clickable fa-pen-to-square editar"></i>'}
                            <i class="fa-solid fa-trash is-clickable deletar"></i>
                        </div>
                        
                    </li>    
                    
                    `
        }) 
        

        selecionarCheckbox()
        deletarItens()
        editarItensLista()
        
}

function selecionarCheckbox () {
      
    let inputsCheck = document.querySelectorAll('input[type="checkbox"]')
    inputsCheck.forEach( (i) => {
        i.addEventListener('click', (evento) => {
            listaSemanal[inputsCheck].checar = evento.target.checked
            MostraItensNatal()
            
        })
    })
   
}



function deletarItens () {
    const deletarObjetos = document.querySelectorAll('.deletar')
        deletarObjetos.forEach( (i) => {
            i.addEventListener('click', (evento) => {
                let valorDoElemento = evento.target.parentElement.parentElement.getAttribute('data-value')
                listaSemanal.splice(valorDoElemento, 1)
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
