import React, { useState } from 'react';
import {
    DragDropContext,
    Droppable,
    Draggable,
    DropResult,
} from 'react-beautiful-dnd';
import "./styles.css";

type Task = {
    id: string;
    content: string;
};

type Column = {
    name: string;
    items: Task[];
};

type Columns = {
    [key: string]: Column;
};

const initialData: Columns = {
    ia: {
        name: 'IA',
        items: [
            { id: '1', content: 'Tarefa 1' },
            { id: '2', content: 'Tarefa 2' },
        ],
    },
    manual: {
        name: 'Manual',
        items: [],
    },
};

const KanbanBoard: React.FC = () => {
    const [columns, setColumns] = useState<Columns>(initialData);

    const onDragEnd = (result: DropResult) => {
        const { source, destination } = result;

        if (!destination) return;

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
    };

    return (
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
                                <h3>{column.name}</h3>
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
                                                {item.content}
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
    );
};

export default KanbanBoard;
