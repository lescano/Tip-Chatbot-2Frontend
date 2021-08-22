export namespace variablesGlobales {
    var actualUser;
    var horariosGlobales;
    /*private static instance: variablesGlobales;
    private constructor() { }
    public static getInstance(): variablesGlobales {
        if (!variablesGlobales.instance) {
            variablesGlobales.instance = new variablesGlobales();
        }

        return variablesGlobales.instance;
    }*/


    export function getActualUser(){
        return this.actualUser;
    }
    export function setActualUser(id:string){ 
        this.actualUser=id;
    }



}