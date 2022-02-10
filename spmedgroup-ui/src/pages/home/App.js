import { Link } from 'react-router-dom';

import '../../Assets/css/Home.css';

import Cabecalho from "../../components/cabecalho/cabecalho";
import Rodape from "../../components/rodape/rodape";

function App() {
    return (
        <div>
            <Cabecalho />

            <main>
                <div className="banner-home">
                    <div className="nome_slogan-home">
                        <h1 className="h1-home">SP Medical Group</h1>
                        <p className="slogan-home">Venha agendar sua consulta na melhor clínica do Brasil!!!</p>
                    </div>

                    <div className="botoes-home">
                        <div className="btn_banner-home">
                            <Link to="/consultasPac"><a href="">Ver Consultas</a></Link>
                        </div>

                        <div className="btn_banner-home">
                            <a href="">Agendar Consulta</a>
                        </div>

                        <div className="btn_banner-home">
                            <a href="">Ver Cirurgias</a>
                        </div>

                        <div className="btn_banner-home">
                            <a href="">Ver Clínicas</a>
                        </div>
                    </div>
                </div>

                <div className="quem_somos-home">
                    <div className="container posicionamento-home">
                        <h2 className="h2-home">QUEM SOMOS?</h2>
                        <p className="descricao_qmsomos-home">Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                            Lorem Ipsum has been the
                            industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type
                            and
                            scrambled it to make a type specimen book.</p>
                    </div>
                </div>
            </main>

            <Rodape />
        </div>
    );
}

export default App;
