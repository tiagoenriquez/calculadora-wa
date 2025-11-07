import { useDispatch } from "react-redux";
import { storePage } from "../store/pageSlice";

export default function Menu() {
    const dispatch = useDispatch();

    function abrir(page: string) {
        dispatch(storePage(page));
    }

    return (
        <header>
            <button className="item-de-menu" onClick={() => abrir("home")}>Calculadora</button>
            <button
                className="item-de-menu"
                onClick={() => abrir("contas")}
            >
                Contas
            </button>
        </header>
    );
}
