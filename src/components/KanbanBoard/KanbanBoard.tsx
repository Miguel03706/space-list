import React, { useEffect, useState } from 'react';
import {
    DragDropContext,
    Droppable,
    Draggable,
    DropResult,
} from 'react-beautiful-dnd';
import "./styles.css";
import ButtonRefresh from '../ButtonRefresh/ButtonRefresh';

type Task = {
    id: string;
    numero: string;
    nome: string;

};

type Column = {
    name: string;
    items: Task[];
};

type Columns = {
    [key: string]: Column;
};

// const initialData: Columns = {
//     ia: {
//         name: 'IA',
//         items: [
//             { id: '1', numero: '11984191539', nome: "Miguel Silva" },
//             { id: '2', numero: '27992394747', nome: "Renan Costa" },
//         ],
//     },
//     manual: {
//         name: 'Manual',
//         items: [],
//     },
// };


const KanbanBoard: React.FC = () => {
    const [columns, setColumns] = useState<Columns>({
        ia: { name: 'IA', items: [] },
        manual: { name: 'Manual', items: [] },
    });

    const [loading, setLoading] = useState(false);

    const onDragEnd = (result: DropResult) => {
        const { source, destination } = result;
        console.log(result);

        if (!destination) return;

        // se o card for movido dentro da mesma coluna
        if (source.droppableId === destination.droppableId) {
            const column = columns[source.droppableId];
            const copiedItems = [...column.items];
            const [removed] = copiedItems.splice(source.index, 1);
            copiedItems.splice(destination.index, 0, removed);

            setColumns({
                ...columns,
                [source.droppableId]: {
                    ...column,
                    items: copiedItems,
                },
            });
            // se o card for movido para outra coluna
        } else {
            const sourceColumn = columns[source.droppableId];
            const destColumn = columns[destination.droppableId];
            const sourceItems = [...sourceColumn.items];
            const destItems = [...destColumn.items];
            const [removed] = sourceItems.splice(source.index, 1);
            destItems.splice(destination.index, 0, removed);

            setColumns({
                ...columns,
                [source.droppableId]: {
                    ...sourceColumn,
                    items: sourceItems,
                },
                [destination.droppableId]: {
                    ...destColumn,
                    items: destItems,
                },
            });
        }

        // vai realizar o código para mudar o alert mode
        if (destination.droppableId === "manual") {
            console.log("mudou para manual");
        }
        if (destination.droppableId === "ia") {
            console.log("mudou para IA");
        }

    };

    // Simula uma chamada de API que busca os dados de contatos
    const fetchTasksFromAPI = async (): Promise<Task[]> => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve([
                    { id: '1', numero: '+551111111-1111', nome: "Miguel Silva" },
                    { id: '2', numero: '+552222222-2222', nome: "Renan Gomes" },
                    { id: '3', numero: '+553333333-3333', nome: "Teste 3" },
                    { id: '4', numero: '+554444444-4444', nome: "Teste 4" },
                    { id: '5', numero: '+555555555-5555', nome: "Teste 5" },
                    { id: '6', numero: '+556666666-6666', nome: "Teste 6" },
                    { id: '7', numero: '+557777777-7777', nome: "Teste 7" },
                    { id: '8', numero: '+558888888-8888', nome: "Teste 8" },
                    { id: '9', numero: '+559999999-9999', nome: "Teste 9" },
                ]);
            }, 1000); // simula delay de 1 segundo
        });

        // Quando for usar uma API real:
        /*
        const response = await fetch("https://sua-api.com/dados");
        const data = await response.json();
        return data;
        */
    };

    function handleRefresh() {
        setLoading(true);
        console.log("Atualizando dados...");
        // setColumns({
        //     ia: { name: 'IA', items: [] },
        //     manual: { name: 'Manual', items: [] },
        // });
        // const loadData = async () => {
        //     const tasks = await fetchTasksFromAPI();
        //     setColumns(prev => ({
        //         ...prev,
        //         ia: {
        //             ...prev.ia,
        //             items: tasks,
        //         }
        //     }));
        // };
        // loadData();
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }

    useEffect(() => {
        const loadData = async () => {
            const tasks = await fetchTasksFromAPI();
            setColumns(prev => ({
                ...prev,
                ia: {
                    ...prev.ia,
                    items: tasks,
                }
            }));
        };

        loadData();
    }, []);

    return (
        <>
            <div className='header-kanban'> <ButtonRefresh handleRefresh={handleRefresh} loading={loading} /> </div>
            <div className="dashboard">
                <DragDropContext onDragEnd={onDragEnd}>
                    {Object.entries(columns).map(([columnId, column]) => (
                        <Droppable key={columnId} droppableId={columnId}>
                            {(provided) => (
                                <div
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                    className="column-kanban"
                                >
                                    <h3 className='title-kanban'>{column.name}</h3>
                                    {column.items.map((item, index) => (
                                        <Draggable
                                            key={item.id}
                                            draggableId={item.id}
                                            index={index}
                                        >
                                            {(provided, snapshot) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    style={{
                                                        userSelect: 'none',
                                                        padding: 16,
                                                        margin: '0 0 8px 0',
                                                        minHeight: '50px',
                                                        backgroundColor: snapshot.isDragging
                                                            ? '#263B4A'
                                                            : '#456C86',
                                                        color: 'white',
                                                        borderRadius: 4,
                                                        ...provided.draggableProps.style,
                                                    }}
                                                >
                                                    <div className='name-contact'>
                                                        <strong>{item.nome}</strong>
                                                    </div>
                                                    <div className='number-contact'>
                                                        {item.numero}
                                                    </div>
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    ))}
                </DragDropContext>
            </div>
        </>

    );
};

export default KanbanBoard;
