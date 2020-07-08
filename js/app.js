let bd = new BDados();

//* Cadastro da despesa
function cadastrarDespesa() {
    
    //TODO: Capturar valores dos campos
    let ano = document.getElementById('ano');
    let mes = document.getElementById('mes');
    let dia = document.getElementById('dia');
    let tipo = document.getElementById('tipo');
    let valor = document.getElementById('valor');
    let descricao = document.getElementById('descricao');

    //TODO: Criar novo objeto Despesa com os valores obtidos
    let novaDespesa = new Despesa(ano.value, mes.value, dia.value, tipo.value, valor.value, descricao.value);

    //? Os dados da despesa são válidos?
    if(novaDespesa.validarDados()){
        //TODO: Gravar despesa criada
        bd.gravarDespesa(novaDespesa);
        //Moficar modal para mensagem de sucesso
        modificaModal(true);
        //Limpa os campos com dados
        limpaDados();
    } else {
        //!Moficar modal para mensagem de sucesso
        modificaModal(false);
    }
    
    //Exibir modal
    $('#modalGravacao').modal('show');
}

//* Recupera lista de despesas
function carregaDespesas(){

    let despesas = bd.recuperarRegistro();
    let listaDespesas = document.getElementById('listaDespesas');

    despesas.forEach(function(d){
        //Criando linha <tr>
        let linha = listaDespesas.insertRow();
        //Criando coluna <td>
        linha.insertCell(0).innerHTML = `${d._dia}/${d._mes}/${d._ano}`;
        switch(d._tipo){
            case '1': 
                d._tipo = 'Alimentação'
                break;
            case '2': 
                d._tipo = 'Educação'
                break;
            case '3': 
                d._tipo = 'Lazer'
                break;
            case '4': 
                d._tipo = 'Saúde'
                break;
            case '5': 
                d._tipo = 'Transporte'
                break;

        }
        linha.insertCell(1).innerHTML = d._tipo;
        linha.insertCell(2).innerHTML = d._descricao;
        linha.insertCell(3).innerHTML = `R$ ${d._valor}`;
    })
}

//* Personalização do Modal
function modificaModal(success){

    //TODO: Personalizar modal de acordo com o estado recebido
    //Título
    let header = document.getElementById('modalHeader');
    let title = document.getElementById('modalLabel');

    success ? header.className = 'modal-header text-success' : header.className = 'modal-header text-danger';
    success ? title.innerHTML = 'Gravação efetuada' : title.innerHTML = 'Erro na gravação';

    //Descrição
    let text = document.getElementById('modalBody');
    success ? text.innerHTML = 'A despesa foi cadastrada com sucesso' : text.innerHTML = 'Existem campos obrigatórios que não foram preenchidos';

    //Botão
    let button = document.getElementById('modalBtn');
    success ? button.innerHTML = 'Voltar' : button.innerHTML = 'Voltar e corrigir';
    success ? button.className = 'btn btn-success' : button.className = 'btn btn-danger';
}

//* Pesquisa uma despesa
function pesquisarDespesa(){
    //TODO: Capturar valores dos campos
    let ano = document.getElementById('ano').value;
    let mes = document.getElementById('mes').value;
    let dia = document.getElementById('dia').value;
    let tipo = document.getElementById('tipo').value;
    let valor = document.getElementById('valor').value;
    let descricao = document.getElementById('descricao').value;

    //TODO: Criar novo objeto Despesa com os valores obtidos
    let despesaModelo = new Despesa(ano, mes, dia, tipo, valor, descricao);

    //Pesquisa as despesas com o modelo de pesquisa
    let despesas = bd.pesquisarDespesa(despesaModelo);

    let listaDespesas = document.getElementById('listaDespesas');
    listaDespesas.innerHTML = '';

    despesas.forEach(function(d){
        //Criando linha <tr>
        let linha = listaDespesas.insertRow();
        //Criando coluna <td>
        linha.insertCell(0).innerHTML = `${d._dia}/${d._mes}/${d._ano}`;
        switch(d._tipo){
            case '1': 
                d._tipo = 'Alimentação'
                break;
            case '2': 
                d._tipo = 'Educação'
                break;
            case '3': 
                d._tipo = 'Lazer'
                break;
            case '4': 
                d._tipo = 'Saúde'
                break;
            case '5': 
                d._tipo = 'Transporte'
                break;

        }
        linha.insertCell(1).innerHTML = d._tipo;
        linha.insertCell(2).innerHTML = d._descricao;
        linha.insertCell(3).innerHTML = `R$ ${d._valor}`;
    })
}

//* Limpa os campos da despesa
function limpaDados(){
    document.getElementById('ano').value ='';
    document.getElementById('mes').value ='';
    document.getElementById('dia').value ='';
    document.getElementById('tipo').value ='';
    document.getElementById('valor').value ='';
    document.getElementById('descricao').value ='';
}