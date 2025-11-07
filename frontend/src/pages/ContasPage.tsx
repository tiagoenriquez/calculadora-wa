import { useDispatch, useSelector } from "react-redux";
import Menu from "../components/Menu.";
import type Conta from "../models/Conta";
import { RootState } from "../store";
import { storeConta } from "../store/contaSlice";
import { storePage } from "../store/pageSlice";

export default function ContasPage() {
    const contas = useSelector((state: RootState) => state.contas.contas);
    const dispatch = useDispatch();

    function calcular(conta: Conta) {
        dispatch(storeConta(conta));
        dispatch(storePage("home"));
    }

    return (
        <>
            <Menu />
            <main>
                <table>
                    <tbody>
                        {contas.map((conta) => (
                            <tr key={conta.id}>
                                <td
                                    className="conta"
                                    title={`Mostra ${conta.conta}=${conta.resultado} na calculadora`}
                                    onClick={() => calcular(conta)}
                                >
                                    { `${conta.conta}=${conta.resultado}` }
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <button
                    onClick={() => calcular({ id: 0, conta: "", resultado: "" })}
                >
                    Calcular
                </button>
            </main>
        </>
    );
}
