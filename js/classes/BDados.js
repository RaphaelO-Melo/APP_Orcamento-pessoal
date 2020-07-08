//* Classe que representa um banco de dados
class BDados {

    //Construtor
    constructor(){
        let id = localStorage.getItem('id');

        if(id === null)
            localStorage.setItem('id', 0);
    }

    gravarDespesa(despesa) {
        //Cria um novo ID
        let id = this.criaID();
        //Converte objeto para notação JSON
        let dJSON = JSON.stringify(despesa);
        localStorage.setItem(id, dJSON);

        //Atualiza o ID
        localStorage.setItem('id', id);
    }

    criaID(){
        let proximoID = localStorage.getItem('id');
        //Retorna valor do ultimo ID + 1
        return parseInt(proximoID) + 1;
    }

    recuperarTodoRegistro(){
        //Array de despesas
        let despesas = [];
        //Coleta a referência do que seria o próximo ID
        let id = localStorage.getItem('id');

        for(let i = 1; i <= id; i++){
            let despesa = JSON.parse(localStorage.getItem(i));
            if(despesa === null)
                continue;
            despesa.id = i;
            despesas.push(despesa);
        }

        return despesas;
    }

    pesquisarDespesa(despesa){
        //Recupera o array com registros
        let despesasFiltradas = this.recuperarTodoRegistro();
        
        //TODO: Retornar array após apolicação dos filtros nos objetos usando o .filter 
        //ano
        if(despesa._ano != '')
            despesasFiltradas = despesasFiltradas.filter(d => d._ano == despesa._ano)

        //mes
        if(despesa._mes != '')
            despesasFiltradas = despesasFiltradas.filter(d => d._mes == despesa._mes)

        //dia
        if(despesa._dia != '')
            despesasFiltradas = despesasFiltradas.filter(d => d._dia == despesa._dia)

        //tipo
        if(despesa._tipo != '')
            despesasFiltradas = despesasFiltradas.filter(d => d._tipo == despesa._tipo)

        //valor
        if(despesa._valor != '')
            despesasFiltradas = despesasFiltradas.filter(d => d._valor == despesa._valor)

        //descrição
        if(despesa._descricao != '')
            despesasFiltradas = despesasFiltradas.filter(d => d._descricao == despesa._descricao)

        return despesasFiltradas;
    }

    removerRegistro (id) {
        localStorage.removeItem(id);
    }
}