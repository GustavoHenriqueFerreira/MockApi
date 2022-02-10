import React, { useState, useEffect } from 'react';
import axios from 'axios';

import '../../Assets/css/CadastroConsulta.css';
import Cabecalho from "../../components/cabecalho/cabecalho";
import Rodape from "../../components/rodape/rodape";

export default function CadastroConsulta() {
    const [listaConsultas, setListaConsultas] = useState([]);
    const [idPaciente, setIdPaciente] = useState('');
    const [idMedico, setIdMedico] = useState('');
    const [idSituacao, setIdSituacao] = useState('');
    //const [DescricaoConsulta, setDescricaoConsulta] = useState('');
    const [DataHoraConsulta, setDataHoraConsulta] = useState(new Date());
    const [isLoading, setIsLoading] = useState(false);
    const [confirmacaoMensagem, SetMensagem] = useState('');
    //const [listaTiposUsuario, setListaTituloUsuario] = useState([]);
    //const [tituloTipoUsuario, setTituloUsuario] = useState('');

    function buscarConsultas() {
        console.log('vamos fazer a chamada para a API');

        axios('http://192.168.15.11:5000/api/consultas', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('usuario-login')
            }
        })
            .then(resposta => {
                if (resposta.status === 200) {
                    setListaConsultas(resposta.data)
                }
            })

            .catch(erro => console.log(erro));
    };

    useEffect(buscarConsultas, []);

    function CadastroConsulta(evento) {
        evento.preventDefault();

        SetMensagem('')
        setIsLoading(true);

        if (listaConsultas) {
        }

        axios.post('http://192.168.15.11:5000/api/consultas', {
            idPaciente: idPaciente,
            idMedico: idMedico,
            idSituacao: idSituacao,
            DescricaoConsulta: '',
            DataHoraConsulta: DataHoraConsulta,
        }, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('usuario-login')
            }
        })
            .then(resposta => {
                if (resposta.status === 201) {

                    console.log('Cadastrado');

                    buscarConsultas();

                    setIdMedico('');
                    setIdPaciente('');
                    setIdSituacao('');
                    setDataHoraConsulta('');

                    setIsLoading(false);
                    SetMensagem('Cadastrado com sucesso!')
                }
            })

            .catch(erro => console.log(erro), setInterval(() => {
                setIsLoading(false)
                SetMensagem('Não foi possível realizar o cadastrado!')
            }, 5000));
    };

    /* function buscarTiposUsuario() {
        console.log('vamos fazer a chamada para a API');

        axios('http://192.168.4.131:5000/api/tiposuser', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('usuario-login')
            }
        })
            .then(resposta => {
                if (resposta.status === 200) {
                    setListaTituloUsuario(resposta.data)
                }
            })

            .catch(erro => console.log(erro));
    };

    useEffect(buscarConsultas, []);

    function CadastroTipoUsuario(event) {
        event.preventDefault();

        setIsLoading(true);

        if (listaTiposUsuario) {
        }

        axios.post('http://localhost:5000/api/tiposuser', {
            tituloTipoUsuario: tituloTipoUsuario
        }, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('usuario-login')
            }
        })
            .then(resposta => {
                if (resposta.status === 201) {

                    console.log('Cadastrado');

                    buscarTiposUsuario();

                    setTituloUsuario('');

                    setIsLoading(false);
                }
            })

            .catch(erro => console.log(erro), setInterval(() => {
                setIsLoading(false)
            }, 5000));
    };*/

    return (
        <div>
            <Cabecalho />
            <main>
                <section>
                    <div className="container-CadCon banner-CadCon">
                        <h1 className="h1-CadCon">Cadastrar Consulta</h1>
                        <div className="box_pesquisa-CadCon">
                            <form onSubmit={CadastroConsulta} className="container cadastro">
                                <div className="espacamento_box-CadCon">

                                    {/* <div>
                                            <label className="label-CadCon">Clínica:</label>
                                            <input type="text" 
                                            value={titulo}
                                            onChange={(campo) => setTitulo(campo.target.value)} 
                                            className="input_pesquisa-CadCon" />
                                    </div> */}

                                    <div>
                                        <label className="label-CadCon">Médico:</label>
                                        <input type="text"
                                            value={idMedico}
                                            onChange={(campo) => setIdMedico(campo.target.value)}
                                            className="input_pesquisa-CadCon" />
                                    </div>

                                    <div>
                                        <label className="label-CadCon">Paciente:</label>
                                        <input type="text"
                                            value={idPaciente}
                                            onChange={(campo) => setIdPaciente(campo.target.value)}
                                            className="input_pesquisa-CadCon" />
                                    </div>

                                    <div>
                                        <label className="label-CadCon">Situação</label>
                                        <input type="text"
                                            value={idSituacao}
                                            onChange={(campo) => setIdSituacao(campo.target.value)}
                                            className="input_pesquisa-CadCon" />
                                    </div>

                                    <div>
                                        <label className="label-CadCon">Data:</label>
                                        <input type="datetime-local"
                                            value={DataHoraConsulta}
                                            onChange={(campo) => setDataHoraConsulta(campo.target.value)}
                                            className="input_pesquisa-CadCon" />
                                    </div>

                                    <div className="espacamento_btn-CadCon">
                                        {
                                            isLoading === false &&
                                            <button value={DataHoraConsulta} type="submit" className="btn_cadastrar-CadCon">Cadastrar</button>
                                        }

                                        {
                                            isLoading === true && 
                                            <button type="submit" className="btn_cadastrar-CadCon" disabled>Carregando...</button>
                                        }
                                    </div>
                                </div>
                            </form>
                        </div>

                    </div>
                    {/* <form onSubmit={CadastroTipoUsuario} className="container_cadastro">
                        <div className="container espacamento_box-CadCon">

                            <div>
                                            <label className="label-CadCon">Clínica:</label>
                                            <input type="text" 
                                            value={titulo}
                                            onChange={(campo) => setTitulo(campo.target.value)} 
                                            className="input_pesquisa-CadCon" />
                                    </div>


                            <div>
                                <label className="label-CadCon">Titulo do novo tipo de usuario: </label>
                                <input type="text"
                                    value={tituloTipoUsuario}
                                    onChange={(campo) => setTituloUsuario(campo.target.value)}
                                    className="input_pesquisa-CadCon" />
                            </div>

                            <div className="espacamento_btn-CadCon">
                                {
                                    isLoading === false &&
                                    <button type="submit" className="btn_cadastrar-CadCon">Cadastrar</button>
                                }

                                {
                                    isLoading === true &&
                                    <button type="submit" className="btn_cadastrar-CadCon" disabled>Carregando...</button>
                                }
                            </div>
                        </div>
                    </form>

                    {
                        listaTiposUsuario.map((tiposUser) => {
                            return (
                                <div>
                                    <h1 className="h1-CadCon">{tiposUser.tituloTipoUsuario}</h1>
                                </div>
                            ) 
                        })
                    } */}
                </section>
            </main>
            <Rodape />
        </div>
    );
}