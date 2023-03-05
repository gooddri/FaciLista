

const API = "https://facilistas2.onrender.com/conteudo"


const getApi = async () => {
   try {
    const promisse = await fetch(API)
    const data = await promisse.json()
    console.log(promisse);
    console.log(data);
    return data 
   }catch (error){
        console.error(error)
   }
}
getApi().then((TITULO) =>{
    
    
});



























// const testeNatal = document.getElementById("natal-click")

// const nomesNatal = natal.map(tipo => tipo.valor)

// testeNatal.addEventListener("click" , (e) =>{
//     e.preventDefault()
//     listaDeItens.push({
//         valor:nomesNatal,
//         checar: false
//     })
    
//     console.log(listaDeItens);
//     exibirItens()
// })









