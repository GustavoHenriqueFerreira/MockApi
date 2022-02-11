import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import '../../Assets/css/ConsultaMed.css';
import Cabecalho from "../../components/cabecalho/cabecalho";
import Rodape from "../../components/rodape/rodape";

export default function ConsultasMed() {
    const [listaConsultasMed, setListaConsultasMed] = useState([]);

    function buscarConsultasMed() {
        axios('https://6204f8ac161670001741b12e.mockapi.io/consulta', {
        })
            .then(resposta => {
                if (resposta.status === 200) {
                    //console.log(resposta.data)
                    setListaConsultasMed(resposta.data)
                };
            })
            .catch(erro => console.log(erro));
    };

    useEffect(buscarConsultasMed, []);

    return (
        <div>
            <Cabecalho />
            <main>
                <section>
                    <div className="banner-ConMed">
                        <h1 className="h1-ConMed">Lista de Consultas</h1>

                        <div className="container-ConMed box_pesquisa-ConMed">
                            <div className="espacamento_box-ConMed">
                                <div>
                                    <label className="label-ConMed">Clínica:</label>
                                    <input className="input_pesquisa-ConMed" type="text" />
                                </div>
                                <div>
                                    <label className="label-ConMed">Médico:</label>
                                    <input className="input_pesquisa-ConMed" type="text" />
                                </div>
                            </div>

                            <div className="espacamento_box-ConMed">
                                <div>
                                    <label className="label-ConMed">Paciente:</label>
                                    <input className="input_pesquisa-ConMed" type="text" />
                                </div>
                                <div>
                                    <label className="label-ConMed">Data da Consulta:</label>
                                    <input className="input_pesquisa-ConMed" type="text" />
                                </div>
                            </div>

                            <div className="espacamento_btn-ConMed">
                                <button className="btn_listar-ConMed">Listar</button>
                            </div>
                        </div>

                        <div className="btn_addDesc">
                            <Link to='/inserirDescricao'><button className="btn_descricao-ConMed">Adicionar Descrição</button></Link>
                        </div>
                    </div>
                </section>

                <section>
                    <div className="container-ConMed posicionamento_titulo-ConMed">
                        <h2 className="titulo-ConMed">Consultas</h2>
                    </div>
                    <div className="container-ConMed lista_consultas-ConMed">
                        {
                            listaConsultasMed.map((minhasConsultas) => {
                                return (
                                    <div className="consulta-ConMed">
                                        <h2>{minhasConsultas.id}° Consulta</h2>
                                        <li className="topicos-ConMed">Nome do Paciente: {minhasConsultas.pacientes[0].nomePaciente}</li>
                                        <li className="topicos-ConMed">Telefone: {minhasConsultas.pacientes[0].telefone}</li>
                                        <li className="topicos-ConMed">Data de Nascimento: {Intl.DateTimeFormat("pt-BR", {
                                            year: 'numeric', month: 'short', day: 'numeric',
                                        }).format(new Date(minhasConsultas.pacientes[0].nascimento))}</li>
                                        <li className="topicos-ConMed">Data: {Intl.DateTimeFormat("pt-BR", {
                                            year: 'numeric', month: 'short', day: 'numeric',
                                            hour: 'numeric', minute: 'numeric',
                                            hour12: true
                                        }).format(new Date(minhasConsultas.dataConsulta))}</li>
                                        <li className="topicos-ConMed">Situação: {minhasConsultas.situacoes[0].nomeSituacao}</li>
                                        <p className="topicos-ConMed descricao">{minhasConsultas.descricaoConsulta}</p>
                                    </div>
                                )
                            })
                        }
                    </div>
                </section>
            </main>
            <Rodape />
        </div>
    )
};