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
function carregaDespesas(despesas = [], filtro = false){

    if(despesas.length == 0 && filtro == false)
        despesas = bd.recuperarTodoRegistro();
    
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
        linha.insertCell(3).innerHTML = `R$ ${d._valor},00`;
        //Cria botão de exclusão
        let btn = document.createElement('button'); 
        btn.className = 'btn btn-danger'
        btn.innerHTML = '<i class="fas fa-times"> </i>'
        btn.id = `id_despesa_${d.id}`;

        console.log(btn)

        btn.onclick = function(){
            
            let id = this.id.replace('id_despesa_','');
            bd.removerRegistro(id);
        }

        linha.insertCell(4).append(btn);
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
    carregaDespesas(despesas, true);
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

//* Filtra campos para usar só números
function somenteNumeros(e, max) {
    let charCode = e.charCode ? e.charCode : e.keyCode;
    // charCode 8 = backspace   
    // charCode 9 = tab
   if (charCode != 8 && charCode != 9) {
       // charCode 48 equivale a 0   
       // charCode 57 equivale a 9
       let dia = document.getElementById('dia');    
       let money = document.getElementById('valor');       
            
       if ((charCode < 48 || charCode > 57)||(dia.value.length >= max)||(money.value.length >= max)) {
          return false;
       }
   }
}

//* Filtra a data
function verificaData(){
    //Coleta referencia do campo data
    let num = document.getElementById('dia');       
    let mes = document.getElementById('mes');
    let ano = parseInt(document.getElementById('ano').value);

    //Verificação máxima padrão
    num.value > 31 ? num.value = 31 : num.value = num.value;

    //Se meses que possuem 30 dias
    if(mes.value == 4 || mes.value == 6 || mes.value == 9 || mes.value == 11){
        num.value > 30 ? num.value = 30 : num.value = num.value;
    }

    //Cálculo do ano bissexto
    if(mes.value == 2){
        if ((ano % 4 == 0) && ((ano % 100 != 0)) || (ano % 400 == 0)){
            num.value > 29 ? num.value = 29 : num.vaue = num.value;
        } else {
            num.value > 28 ? num.value = 28 : num.vaue = num.value;
        }
    }
}

//* Filtra ano
function verificaAno(){
    let ano = document.getElementById('ano');
    ano.value > 2020 ? ano.value = 2020 : ano.value = ano.value;
}

//* Filtra valores mínimos
function verificaMin(){
    let num = document.getElementById('dia');
    let ano = document.getElementById('ano');

    if(num.value < 1  && num.value != '')
        num.value = 1;

    if(ano.value < 1920  && ano.value != '')
        ano.value = 1920;
    
        verificaData();
}

//* Reinicia página
function reiniciaPagina(){
    window.location.reload();
}