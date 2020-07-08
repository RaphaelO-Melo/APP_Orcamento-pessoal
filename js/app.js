//* Cadastro da despesa
function cadastrarDespesa() {
    
    //TODO: Capturar valores dos campos
    let ano = document.getElementById('ano')
    let mes = document.getElementById('mes')
    let dia = document.getElementById('dia')
    let tipo = document.getElementById('tipo')
    let valor = document.getElementById('valor')
    let descricao = document.getElementById('descricao')

    //TODO: Criar novo objeto Despesa com os valores obtidos
    let novaDespesa = new Despesa(ano.value, mes.value, dia.value, tipo.value, valor.value, descricao.value)

    //TODO: Gravar despesa criada
    gravarDespesa(novaDespesa)
}

//* Gravação de uma despesa no Local Storage
function gravarDespesa(despesa) {

    //Converte objeto para notação JSON
    let dJSON = JSON.stringify(despesa)
    localStorage.setItem('despesa', dJSON)
}