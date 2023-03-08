const ulItens = document.getElementById("lista-de-itens")
const ulItensComprados = document.getElementById('itens-comprados')

let itemAEditar 

const API = "https://facilistas2.onrender.com/conteudo"

const getApi = async () => {
  try {
    const promisse = await fetch(API)
    const data = await promisse.json()
    console.log();
    return data 
  } catch (error) {
    console.error(error)
  }
}

let objetoSemanal = null;
let listaRomantico = [];
getApi().then((data) => {
  for (let i = 0; i < data.length; i++) {
    if (data[i].TITULO === 'romantico') {
      objetoSemanal = data[i];
      listaRomantico.push({
        valor: objetoSemanal.DESCRICAO,
        checar: false
      });
    }
  }
});

const semanal = document.getElementById('romantico-click')

semanal.addEventListener('click', (e) => {
  e.preventDefault()
  MostraItensNatal()
  console.log(listaRomantico);
})

const enviarItem = () => {
  listaRomantico.push({
    valor: '',
    checar: false
  })
  
  MostraItensNatal()
}

const MostraItensNatal = () => {
  ulItens.innerHTML = ''
  ulItensComprados.innerHTML = ''

  listaRomantico.forEach((obj, index) => {
    if(obj.checar) {
    ulItensComprados.innerHTML += `
    <li class="item-compra is-flex is-justify-content-space-between" data-value="${index}">
        <div>
            <input type="checkbox" checked class="is-clickable" />
            <span class="itens-comprados is-size-5">${obj.valor}</span>
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
          <input type="checkbox" class="is-clickable" ${obj.checar ? 'checked': ''}/>
          <input type="text" class="is-size-5" value="${obj.valor}" ${index === itemAEditar ? 'disabled' : ''} ></input>
        </div>
        <div>
          <i class="fa-solid fa-trash is-clickable deletar"></i>
        </div>
      </li>`
}
    })
  selecionarCheckbox()
  deletarItens()
  editarItens()
  
}

function selecionarCheckbox () {
  let inputsCheck = document.querySelectorAll('input[type="checkbox"]')
  inputsCheck.forEach( (i,index) => {
    i.addEventListener('click', (evento) => {
      listaRomantico[index].checar = evento.target.checked
      MostraItensNatal()
    })
  })
}

function deletarItens () {
  const deletarObjetos = document.querySelectorAll('.deletar')
  deletarObjetos.forEach( (i) => {
    i.addEventListener('click', (evento) => {
      let valorDoElemento = evento.target.parentElement.parentElement.getAttribute('data-value')
      listaRomantico.splice(valorDoElemento, 1)
      
     MostraItensNatal()
    })
  })
} 
