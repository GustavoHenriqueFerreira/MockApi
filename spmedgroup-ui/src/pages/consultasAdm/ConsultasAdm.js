import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import '../../Assets/css/ConsultaAdm.css';
import Cabecalho from "../../components/cabecalho/cabecalho";
import Rodape from "../../components/rodape/rodape";
import SituacaoConsulta from "../../components/situacaoConsulta/SituacaoConsulta";

import IconEditar from "../../Assets/img/img_editarSituacao.png";
import IconMapa from "../../Assets/img/mapa.png";

export default function ConsultasAdm() {
    const [listaConsultas, setListaConsultas] = useState([]);
    const [titulo, setTitulo] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [idSituacao, setIdSituacao] = useState(0);

    // função responsável por fazer a requisição e trazer a lista de tipos usuários
    function buscarConsultas() {
        console.log('vamos fazer a chamada para a API');

        // faz a chamada para a API usando axios
        axios('http://192.168.15.11:5000/api/consultas', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('usuario-login')
            }
        })
            .then(resposta => {
                // caso a resposta da requisição tenha um status code igual a 200
                if (resposta.status === 200) {
                    console.log(resposta.data)
                    // atualiza o state listaTiposUsuarios com os dados do corpo da resposta
                    setListaConsultas(resposta.data)
                }
            })

            // caso ocorra algum erro, exibe no console do navegador este erro
            .catch(erro => console.log(erro));
    };

    useEffect(buscarConsultas, []);

    function permitirSelect(idConsulta) {
        console.log("Consulta " + idConsulta + " e a situação é " + idSituacao)
        document.getElementById(idConsulta).removeAttribute("disabled");
        var btn = document.getElementById("btn" + idConsulta);

        if (btn.style.display === "none")
            btn.style.display = "";
        else {
            btn.style.display = "none";
        }
    }

    function alteraSituacao(idConsulta) {

        axios.patch("http://192.168.15.11:5000/api/consultas/situacao/" + idConsulta, {
            idSituacao: idSituacao
        }, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('usuario-login')
            }
        })
            .then(resposta => {
                if (resposta.status === 200) {
                    document.getElementById(idConsulta).setAttribute("disabled", "disabled");
                    var btn = document.getElementById("btn" + idConsulta)

                    btn.style.display = "none";
                    buscarConsultas();
                }
            }).catch(erro => console.log(erro))
        console.log("consulta " + idConsulta + " atualizada");
    }


    return (
        <div>
            <Cabecalho />
            <main>
                <section>
                    <div className="banner-ConAdm">
                        <h1 className="h1-ConAdm">Lista de Consultas</h1>

                        <div className="container-ConAdm box_pesquisa-ConAdm">
                            <div className="espacamento_box-ConAdm">
                                <div>
                                    <label className="label-ConAdm">Clínica:</label>
                                    <input className="input_pesquisa-ConAdm" type="text" />
                                </div>
                                <div>
                                    <label className="label-ConAdm">Médico:</label>
                                    <input className="input_pesquisa-ConAdm" type="text" />
                                </div>
                            </div>

                            <div className="espacamento_box-ConAdm">
                                <div>
                                    <label className="label-ConAdm">Paciente:</label>
                                    <input className="input_pesquisa-ConAdm" type="text" />
                                </div>
                                <div>
                                    <label className="label-ConAdm">Data da Consulta:</label>
                                    <input className="input_pesquisa-ConAdm" type="text" />
                                </div>
                            </div>

                            <div className="espacamento_btn-ConAdm">
                                <button className="btn_listar-ConAdm">Listar</button>
                            </div>
                        </div>

                        <div className="btn_cadastrar">
                            <Link to="/cadastroConsulta"><button className="btn_cadastrar-ConAdm">Cadastrar Consulta</button></Link>
                        </div>
                    </div>
                </section>

                <section>
                    <div className="container-ConAdm posicionamento_titulo-ConAdm">
                        <h2 className="titulo-ConAdm">Consultas</h2>
                    </div>
                    <div className="container-ConAdm lista_consultas-ConAdm">
                        {
                            listaConsultas.map((consultas) => {
                                return (
                                    <div className="container consulta-ConAdm">
                                        <div className="fundo-ConAdm">
                                            <h2> {consultas.idConsulta}° Consulta</h2>
                                            <div className="container img_mapa_posicionamento">
                                                <li className="topicos-ConAdm">Paciente: {consultas.idPacienteNavigation.nomePaciente}</li>
                                                <Link to="/Localizacoes"><img className="img_mapa" src={IconMapa} /></Link>
                                            </div>
                                            {/* <li className="topicos-ConAdm">Clínica:  {consultas.idMedicoNavigation.idClinicaNavigation.nomeClinica} </li> */}
                                            <li className="topicos-ConAdm">Data de Nascimento: {Intl.DateTimeFormat("pt-BR", {
                                                year: 'numeric', month: 'short', day: 'numeric',
                                            }).format(new Date(consultas.idPacienteNavigation.nascimento))}</li>
                                            <li className="topicos-ConAdm">Telefone: {consultas.idPacienteNavigation.telefone}</li>
                                            <li className="topicos-ConAdm">Médico: {consultas.idMedicoNavigation.nomeMedico}</li>
                                            <li className="topicos-ConAdm">Data: {Intl.DateTimeFormat("pt-BR", {
                                                year: 'numeric', month: 'short', day: 'numeric',
                                                hour: 'numeric', minute: 'numeric',
                                                hour12: true
                                            }).format(new Date(consultas.dataHoraConsulta))}</li>

                                            <li className="topicos-ConAdm">Situação: {consultas.idSituacaoNavigation.descricaoSituacao}</li>

                                            <div className="situacao">
                                                <SituacaoConsulta mudar={(campo) => setIdSituacao(campo.target.value)} idConsulta={consultas.idConsulta} situacao={consultas.idSituacaoNavigation.descricaoSituacao} />
                                                <button onClick={() => permitirSelect(consultas.idConsulta)} type="button" className="vazio"><img className="img-editarSituacao" src={IconEditar} /></button>

                                                <button className="container btn_situacao-ConAdm" onClick={() => alteraSituacao(consultas.idConsulta)} id={"btn" + consultas.idConsulta} style={{ display: "none" }}>Atualizar</button>
                                            </div>

                                            <p className="topicos-ConAdm descricao">{consultas.descricaoConsulta}</p>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </section>
            </main>
            <Rodape />
        </div>
    );
}