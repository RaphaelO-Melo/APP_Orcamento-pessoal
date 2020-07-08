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

    recuperarRegistro(){
        //Array de despesas
        let despesas = [];
        //Coleta a referência do que seria o próximo ID
        let id = localStorage.getItem('id');

        for(let i = 1; i <= id; i++){
            let despesa = JSON.parse(localStorage.getItem(i));
            if(despesa === null)
                continue;
            despesas.push(despesa);
        }

        return despesas;
    }
}