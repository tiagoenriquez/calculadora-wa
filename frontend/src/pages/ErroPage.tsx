import { useDispatch, useSelector } from "react-redux";
import Menu from "../components/Menu.";
import { RootState } from "../store";
import { storeConta } from "../store/contaSlice";
import { storePage } from "../store/pageSlice";

export default function ErroPage() {
    const erro = useSelector((state: RootState) => state.erro.erro);
    const dispatch = useDispatch();

    function resetar() {
        dispatch(storeConta({ id: 0, conta: "", resultado: "" }));
        dispatch(storePage("home"));
    }

    return (
        <>
            <Menu />
            <main>
                <p>Erro: { erro }</p>
                <button onClick={resetar}>X</button>
            </main>
        </>
    );
}
