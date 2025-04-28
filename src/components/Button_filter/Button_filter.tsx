export default function BotaoFiltro() {
    const handleClick = () => {
        alert("Abrir tela CRM!"); // Exibe um alerta quando o botão é clicado
    };

    return (
        <button id="botao-filtro-ia-manual" onClick={handleClick}>
            📋 Filtrar IA/Manual
        </button>
    );
}