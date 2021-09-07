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

    export function getHttpUrl(){
       //return 'http://localhost:8080/';
        return 'https://chatbot2-tip-backend.herokuapp.com/';
    }

    export function getHttpUrlInterprete(){
        //return 'http://localhost:5000/';
        return 'https://chatbot2-tip-interprete.herokuapp.com/';
     }
 

    export function getActualUser(){
        return this.actualUser;
    }
    export function setActualUser(id:string){ 
        this.actualUser=id;
    }



}