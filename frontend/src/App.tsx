import { useSelector } from 'react-redux';
import ContasPage from './pages/ContasPage';
import ErroPage from './pages/ErroPage';
import HomePage from './pages/HomePage';
import { RootState } from './store';

function App() {
    const page = useSelector((state: RootState) => state.page.page);

    return (
        <>
            {
                page === "contas" ? <ContasPage /> :
                page === "erro" ? <ErroPage /> :
                page === "home" ? <HomePage /> :
                null
            }
        </>
    )
}

export default App
