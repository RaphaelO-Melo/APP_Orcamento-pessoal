let bd = new BDados();

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

    //? Os dados da despesa são válidos?
    if(novaDespesa.validarDados()){
        //TODO: Gravar despesa criada
        bd.gravarDespesa(novaDespesa)
        //Exibir mensagem de sucesso
        $('#sucessoGravacao').modal('show')
    } else {
        //!Dados inválidos, exibir modal com erro
        $('#erroGravacao').modal('show')
    }    
}