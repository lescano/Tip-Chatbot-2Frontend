export namespace variablesGlobales {
    var actualUser;
    var horariosGlobales;

    export function getHttpUrl() {
       // return 'http://localhost:8080/';
        return 'https://chatbot2-tip-backend.herokuapp.com/';
    }

    export function getHttpUrlInterprete() {
        //return 'http://localhost:5000/';
        return 'https://chatbot2-tip-interprete.herokuapp.com/';
    }

    export function getHeader(){
        return { Authorization:'*', 'Access-Control-Allow-Origin': 'https://chatbot2-tip-frontend.herokuapp.com/', 'content-type':'*' };
    }


    export function getActualUser() {
        return this.actualUser;
    }
    export function setActualUser(id: string) {
        this.actualUser = id;
    }

    export function getSemesterName(semester) {
        switch (semester) {
            case "1": return "Primer";
            case "2": return "Segundo";
            case "3": return "Tercer";
            case "4": return "Cuarto";
            case "5": return "Quinto";
            case "6": return "Sexto";
        }
    }

    export function getSubjectByCode(code) {

        switch (code) {
            //semestre 1
            case "arq": return "Arquitectura del Computador";
            case "i1": return "Inglés Técnico 1";
            case "mat": return "Matemática";
            case "mdl1": return "Matemática Discreta y Lógica 1";
            case "pp": return "Prinicipios de Programación";
            //semestre 2
            case "bd1": return "Base de datos 1";
            case "i2": return "Inglés Técnico 2";
            case "eda": return "Extructuras de Datos y Algoritmos";
            case "mdl2": return "Matemática Discreta y Lógica 2";
            case "so": return "Sistemas Operativos";
            //semestre 3
            case "bd2": return "Base de datos 2";
            case "coe": return "Comunicación Oral y Escrita";
            case "cont": return "Contabilidad";
            case "red": return "Redes de Computadoras";
            case "pa": return "Programación Avanzada";
            //semestre 4
            case "adm1": return "Administración de Infraestructuras";
            case "ingsof": return "Ingeniería de Software";
            case "pye": return "Probabilidad y Estadística";
            case "progapl": return "Programación de Aplicaciones";
            case "rpyl": return "Relaciones Personales y Laborales";
            //semestre 5
            case "ricas": return "Taller de Aplicaciones de Internet Ricas";
            case "java": return "Taller de sistemas de información Java EE";
            case "adm2": return "Administración de Infraestructuras 2";
            case "pas": return "Pasantía Laboral";
            case "php": return "Taller de Desarrollo de aplicaciones Web con PHP";
            case "mov": return "Taller de Aplicaciones para dispositivos Móviles";
            //semestre 6
            case "gest": return "Sistema de Gestión de Contenidos Joomla y Moodle";
            case "net": return "Taller de sistemas de Información .NET";
            case "insiscon": return "Introducción a los Sistemas de Control";
            case "proy": return "Proyecto";
            case "ayge": return "Aprender y Gestionar una Empresa";
            case "juego": return "Introducción al Desarrollo de juegos";
            default: return "Asignatura no detectada";
        }
    }

}
