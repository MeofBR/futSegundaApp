import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { List, ListItem, ListItemText, Paper, Container } from '@mui/material';

const playersData = [
  { nome: 'Dudu', nota: 7.7, posicao: 'Lateral' },
  { nome: 'Maylon', nota: 8.03, posicao: 'Lateral' },
  { nome: 'Thibes', nota: 5.5, posicao: 'Meia' },
  { nome: 'João', nota: 6.07, posicao: 'Lateral' },
  { nome: 'Sala', nota: 7, posicao: 'Atacante' },
  { nome: 'Perdigão', nota: 8.5, posicao: 'Meia' },
  { nome: 'Vinicius', nota: 6.5, posicao: 'Zagueiro' },
  { nome: 'Matheus', nota: 6.18, posicao: 'Meia' },
  { nome: 'Eric', nota: 6.88, posicao: 'Atacante' },
  { nome: 'Gabriel F', nota: 7.9, posicao: 'Zagueiro' },
  { nome: 'Alexandre', nota: 6.58, posicao: 'Zagueiro' },
  { nome: 'Cristian', nota: 8.5, posicao: 'Meia' },
  { nome: 'Danilo', nota: 6.13, posicao: 'Lateral' },
  { nome: 'PB', nota: 8, posicao: 'Atacante' },
  { nome: 'DG', nota: 5.2, posicao: 'Lateral' },
  { nome: 'Diego', nota: 8.6, posicao: 'Atacante' },
  { nome: 'Eduardo', nota: 7, posicao: 'Meio' },
  { nome: 'Nivo', nota: 6.5, posicao: 'Zagueiro' },

  //{nome: "Diego Bodybuilder", nota: 7.5, posicao: "Meio"},
  //{nome: "Willian", nota: 7, posicao: "Lateral"},
  //{nome: "Joffe", nota: 8.6, posicao: "Atacante"},
  //{nome: "Dan ", nota: 7, posicao: "Meia"},
  //{nome: "Jose", nota: 6.5, posicao: "Meia"},
  //{nome: "Marlon", nota: 7.0, posicao: "Meio"},
  // {nome: "Ajair", nota: 7.25, posicao: "Meia"},
];

const DraggablePlayerList = () => {
  const [players, setPlayers] = useState(playersData);

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const updatedPlayers = [...players];
    const [reorderedPlayer] = updatedPlayers.splice(result.source.index, 1);
    updatedPlayers.splice(result.destination.index, 0, reorderedPlayer);

    setPlayers(updatedPlayers);
  };

  return (
    <Container maxWidth="sm">
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="players" direction="vertical">
          {(provided) => (
            <List
              component={Paper}
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {players.map((player, index) => (
                <Draggable
                  key={player.nome}
                  draggableId={player.nome}
                  index={index}
                >
                  {(provided) => (
                    <ListItem
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <ListItemText primary={player.nome} />
                    </ListItem>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </List>
          )}
        </Droppable>
      </DragDropContext>
    </Container>
  );
};

export default DraggablePlayerList;
