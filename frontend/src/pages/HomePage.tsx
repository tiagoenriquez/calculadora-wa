import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Calcular } from "../../wailsjs/go/main/App";
import Menu from "../components/Menu.";
import { RootState } from "../store";
import OperadoresData from "../datas/OperadoresData";
import { addConta } from "../store/contasSlice";
import { storeErro } from "../store/erroSlice";
import { storePage } from "../store/pageSlice";

export default function HomePage() {
    const contaSalva = useSelector((state: RootState) => state.conta.conta);
    const [conta, setConta] = useState(contaSalva.conta);
    const [resultado, setResultado] = useState(contaSalva.resultado);
    const dispatch = useDispatch()

    function calcular() {
        Calcular(conta.split(',').join('.')).then((result) => {
            if (result.Erro.Mensagem != "") {
                dispatch(storeErro(result.Erro.Mensagem));
                dispatch(storePage("erro"));
            } else {
                setResultado(result.Resultado.toString().replace(".", ","));
                dispatch(addConta({ id: 0, conta, resultado: result.Resultado.toString() }));
            }
        })
    }

    function limpar() {
        setConta("");
        setResultado("");
    }

    function atualizarConta(digito: string) {
        if (digito === "=") {
            return calcular();
        }
        if (digito === "C") {
            return limpar();
        }
        setConta(`${conta}${digito}`);
        setResultado("");
    }

    function digitar(conta: string) {
        const digito = conta[conta.length - 1];
        if ("0123456789,+-*/%^()".includes(digito) || conta === "") {
            setConta(conta);
        }
        if (digito === "=") {
            return calcular();
        }
        setResultado("");
    }

    return (
        <>
            <Menu />
            <main>
                <input
                    placeholder="Digite sua conta aqui"
                    value={conta}
                    onChange={(e) => digitar(e.target.value)}
                />
                <input placeholder="Resultado" value={resultado} readOnly />
                <table>
                    <tbody>
                        { OperadoresData().map((linha) => (
                            <tr key={linha.id}>{ linha.operadores.map((operador) => (
                                <td>
                                    <button
                                        className="digito-button"
                                        title={operador.tooltip}
                                        onClick={() => atualizarConta(operador.digito)}
                                    >
                                        { operador.digito }
                                    </button>
                                </td>
                            )) }</tr>
                        )) }
                    </tbody>
                </table>
                <button
                    className="igual"
                    title="Calcula"
                    onClick={() => atualizarConta("=")}
                >
                    =
                </button>
            </main>
        </>
    );
}
