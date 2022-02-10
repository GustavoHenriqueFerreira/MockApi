import React from 'react'
import { Link } from 'react-router-dom';

import '../../Assets/css/Header-Cabecalho.css';

import logo from '../../Assets/img/logo_spmedgroup_v1 3.png';

export default function Rodape() {

    return (
        <footer>
            <nav className="container cabecalho_rodape">
                <a href="">Links Úteis</a>
                <a href="">Telefone</a>
                <Link to="/"> <img className="logo" src={logo} alt="logo" /> </Link>
                <a href="">Siga-nos</a>
                <a href="">Quem somos?</a>
            </nav>
        </footer>
    )
}