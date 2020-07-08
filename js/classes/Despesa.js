//* Classe que representa uma despesa
class Despesa {

    //Construtor
    constructor(ano, mes, dia, tipo, valor, descricao){
        this._ano = ano;
        this._mes = mes;
        this._dia = dia;
        this._tipo = tipo;
        this._valor = valor;
        this._descricao = descricao;
    }

    //Métodos
    validarDados(){
        for(let x in this){
            if(this[x] == undefined || this[x] == '' || this[x] == null)
                return false;
        }
        return true;
    }
}