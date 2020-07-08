//* Classe que representa uma despesa
class Despesa {

    //Construtor
    constructor(ano, mes, dia, tipo, valor, descricao){
        this._ano = ano
        this._mes = mes
        this._dia = dia
        this._tipo = tipo
        this._valor = valor
        this._descricao = descricao
    }

    //Getters
    get ano(){return this._ano}

    get mes(){return this._mes}

    get dia(){return this._dia}

    get tipo(){return this._tipo}

    get valor(){return this._valor}

    get descricao(){return this._descricao}

    //Métodos
    validarDados(){
        for(let x in this){
            if(this[x] == undefined || this[x] == '' || this[x] == null)
                return false
        }
        return true
    }
}