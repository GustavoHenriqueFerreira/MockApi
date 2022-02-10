import React, { useState, useEffect } from 'react';
import axios from 'axios';

import '../../Assets/css/InserirDescricao.css';
import Cabecalho from "../../components/cabecalho/cabecalho";
import Rodape from "../../components/rodape/rodape";

export default function InserirDescricao() {
    const [listaConsultas, setListaConsultas] = useState([])
    const [idConsultaAlterada, setIdConsultaAlterada] = useState(0)
    const [novaDescricaoConsulta, setNovaDescricaoConsulta] = useState('')

    function buscarConsultasMed() {
        axios('http://192.168.15.11:5000/api/consultas/listaMed', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('usuario-login')
            }
        })
            .then(resposta => {
                if (resposta.status === 200) {
                    // console.log(resposta.data)
                    setListaConsultas(resposta.data)
                };
            })
            .catch(erro => console.log(erro));
    };

    function alteraDescricao(event) {

        event.preventDefault();

        axios.patch('http://192.168.15.11:5000/api/consultas/descricao/' + idConsultaAlterada, {
            DescricaoConsulta: novaDescricaoConsulta
        }, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('usuario-login')
            }
        })
            .then(response => {
                if (response.status === 200) {
                    console.log('Descrição alterada com sucesso')
                }
            })
            .catch(erro => console.log(erro))
        buscarConsultasMed();

    }
    useEffect(buscarConsultasMed, [])

    return (
        <div>
            <Cabecalho />

            <main>
                <section>
                    <div className="banner-InserirDec">
                        <h1 className="h1-InserirDec">Inserir Descrição</h1>
                        <div className="container-InserirDec box_pesquisa-InserirDec">
                            <form className="espacamento_box-InserirDec" onSubmit={alteraDescricao}>
                                <div>
                                    <label className="label-InserirDec">Número da Consulta:</label>
                                    <input onChange={(evt) => setIdConsultaAlterada(evt.target.value)} className="input_pesquisa-InserirDec" type="number" />
                                </div>
                                <div>
                                    <label className="label-InserirDec">Nova descrição:</label>
                                    <input onChange={(evt) => setNovaDescricaoConsulta(evt.target.value)} className="input_descricao-InserirDec" type="text" />
                                </div>
                                <div className="espacamento_btn-InserirDec">
                                    <button type="submit" className="btn_inserir-InserirDec">Inserir</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </section>
            </main>
            <Rodape />
        </div >
    )
}