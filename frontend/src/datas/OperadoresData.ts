import type LinhaDeOperadores from "../models/LinhaDeOperadores";

export default function OperadoresData(): LinhaDeOperadores[] {
    return [
        { id: 1, operadores: [
            { id: 1, digito: "(", tooltip: "Abre parênteses" },
            { id: 2, digito: ")", tooltip: "Fecha parênteses" },
            { id: 3, digito: "^", tooltip: "Eleva a qualquer potência" },
            { id: 4, digito: "%", tooltip: "Calcula resto" },
        ] },
        { id: 2, operadores: [
            { id: 1, digito: "7", tooltip: "7" },
            { id: 2, digito: "8", tooltip: "8" },
            { id: 3, digito: "9", tooltip: "9" },
            { id: 4, digito: "/", tooltip: "Divide" },
        ] },
        { id: 3, operadores: [
            { id: 1, digito: "4", tooltip: "4" },
            { id: 2, digito: "5", tooltip: "5" },
            { id: 3, digito: "6", tooltip: "6" },
            { id: 4, digito: "*", tooltip: "Multiplica" },
        ] },
        { id: 4, operadores: [
            { id: 1, digito: "1", tooltip: "1" },
            { id: 2, digito: "2", tooltip: "2" },
            { id: 3, digito: "3", tooltip: "3" },
            { id: 4, digito: "-", tooltip: "Subtrai" },
        ] },
        { id: 5, operadores: [
            { id: 1, digito: "0", tooltip: "0" },
            { id: 2, digito: ",", tooltip: "Separa parte inteira da decimal" },
            { id: 3, digito: "C", tooltip: "Limpa campos" },
            { id: 4, digito: "+", tooltip: "Soma" },
        ] },
    ]
}
