import { Map, Marker, GoogleApiWrapper, InfoWindow } from 'google-maps-react';
import { Component } from "react";
import axios from "axios";

import Cabecalho from '../../components/cabecalho/cabecalho';

class MapContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            listaLocalizacoes: [],
            showingInfoWindow: false,
            marcadorAtivo: {},
            local: {}
        }
    };

    BuscarLocalizacoees = () => {
        axios("http://192.168.15.11:5000/api/localizacoes", {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('usuario-login')
            }
        })
            .then(resposta => {
                if (resposta.status === 200) {
                    this.setState({ listaLocalizacoes: resposta.data });
                }
            }).catch(erro => console.log(erro))
    }

    cliqueMarcador = (props, marker, e) =>
        this.setState({
            local: props,
            marcadorAtivo: marker,
            showingInfoWindow: true
        });

    componentDidMount() {
        this.BuscarLocalizacoees();
    }

    render() {
        return (
            <div>
                <Cabecalho />
                <main>
                    <Map google={this.props.google} zoom={11}
                        initialCenter={{
                            lat: -23.5613413,
                            lng: -46.6586759
                        }}>
                        {
                            
                            this.state.listaLocalizacoes.map((item) => {
                                console.log(item);
                                return (
                                    <Marker onClick={this.cliqueMarcador}
                                        id={item.id}
                                        title={item.id}
                                        name={item.latitude}
                                        position={{
                                            lat: item.latitude,
                                            lng: item.longitude
                                        }}
                                    />
                                )
                            })
                        }

                        <InfoWindow
                            marker={this.state.marcadorAtivo}
                            visible={this.state.showingInfoWindow}
                        >
                            <div>
                                <h1>{this.state.local.name},{this.state.longitude}</h1>
                            </div>
                        </InfoWindow>
                    </Map>
                </main>
            </div>
        )
    }
}

export default GoogleApiWrapper({
    apiKey: ('')
})(MapContainer)