import React from 'react'
import { Link } from 'react-router-dom';

import '../../Assets/css/Header-Cabecalho.css';

import logo from '../../Assets/img/logo_spmedgroup_v1 3.png';

export default function Cabecalho() {

    return (
        <header>
            <div className="container cabecalho_rodape">
                <div>
                    <Link to="/"><img className="logo" src={logo} alt="logo" /> </Link>
                </div>
                <nav className="menu_header">
                    <Link to="/"> <a href="">Consultas</a> </Link>
                    <Link to="/"> <a href="">Clínicas</a> </Link>
                    <Link to="/"> <a href="">Especialidades</a> </Link>
                    <Link to="/"> <a href="">Médicos</a> </Link>
                    <Link to="/login"> <a href="">Login</a> </Link>
                </nav>
            </div>
        </header>
    )
}