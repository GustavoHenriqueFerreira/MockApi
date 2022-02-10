import '../../Assets/css/ConsultaAdm.css';

export default function SituacaoConsulta(situacao) {

    switch (situacao.situacao) {
        default:
            return (
                <div className="selects">
                    <select id={situacao.idConsulta} className="status vazio" name="status" disabled onChange={situacao.mudar}>
                        <option value="1">Realizada</option>
                        <option value="2">Cancelada</option>
                        <option value="3">Agendada</option>
                    </select>
                </div>
            )
    }
}