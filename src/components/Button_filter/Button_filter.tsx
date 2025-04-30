import { position } from 'polished';
import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
// import { CloseOutline } from 'react-ionicons'
import "./styles.css";
import KanbanBoard from '../KanbanBoard/KanbanBoard';


const customStyles = {
    content: {
        top: '5%',
        left: '5%',
        right: 'auto',
        bottom: 'auto',
        width: '90vw',
        height: '90vh',
        zIndex: 9999,
    },
    overlay: {
        zIndex: 9998,
    },
};

export default function BotaoFiltro() {
    const [modalIsOpen, setIsOpen] = React.useState(false);

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    // const handleClick = () => {
    //     alert("Abrir tela CRM!"); // Exibe um alerta quando o botão é clicado
    // };

    return (
        <div>
            <button id="botao-filtro-ia-manual" onClick={openModal}>
                📋 Filtrar IA/Manual
            </button>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <div className='modal-closer'>
                    <button onClick={closeModal}>
                        {/* <CloseOutline
                            color={'#00000'}
                            height="50px"
                            width="50px"
                        /> */}
                    </button>
                </div>
                <div className='modal-header'>
                    <h2>Controle de acesso</h2>
                </div>
                <div className='modal-body'>
                    <KanbanBoard />
                </div>
            </Modal>
        </div>
    );
}