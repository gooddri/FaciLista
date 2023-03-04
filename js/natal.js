const testeNatal = document.getElementById("natal-click")


const natal = [
        {
            nome: "Peru"
        },
        {
            nome: "Pernil"
        },
        {
            nome: "Rabanada"
        },
        {
            nome: "Pavê"
        },
        {
            nome: "Arroz"
        },
    ]
    
export {natal}
natal
const nomesNatal = natal.map(tipo => tipo.nome)

testeNatal.addEventListener("click" , (e) =>{
    e.preventDefault()
    console.log("me clikaru");
    console.log(nomesNatal);
})



