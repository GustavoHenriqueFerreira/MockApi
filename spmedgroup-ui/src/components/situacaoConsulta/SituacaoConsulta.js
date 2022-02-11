import '../../Assets/css/ConsultaAdm.css';

export default function SituacaoConsulta(situacao) {

    switch (situacao.situacao) {
        default:
            return (
                <div className="selects">
                    <select id={situacao.id} className="status vazio" name="status" disabled onChange={situacao.mudar}>
                        <option value="1">Realizado</option>
                        <option value="2">Cancelado</option>
                        <option value="3">Agendado</option>
                    </select>
                </div>
            )
    }
}