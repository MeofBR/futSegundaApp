import React, { useState } from 'react';
import { createTheme, ThemeProvider, Button, Checkbox } from '@mui/material';
import './App.css';

const theme = createTheme({
  // ... (definições de cores)
});

function FutSegundaHome() {
  const [loading, setLoading] = useState(false);
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [times, setTimes] = useState([]);
  const [mediasTimes, setMediasTimes] = useState([]);

  const jogadores = [
    { nome: 'Dudu', nota: 8, posicao: 'Lateral' },
    { nome: 'Maylon', nota: 7.9, posicao: 'Lateral' },
    { nome: 'Thibes', nota: 5.3, posicao: 'Meia' },
    { nome: 'João', nota: 6.3, posicao: 'Lateral' },
    { nome: 'Sala', nota: 6.6, posicao: 'Atacante' },
    { nome: 'Perdigão', nota: 8.8, posicao: 'Meia' },
    { nome: 'Vinicius', nota: 7.5, posicao: 'Zagueiro' },
    { nome: 'Matheus', nota: 6.7, posicao: 'Meia' },
    { nome: 'Eric', nota: 7.4, posicao: 'Atacante' },
    { nome: 'Gabriel F', nota: 6.6, posicao: 'Zagueiro' },
    { nome: 'Alexandre', nota: 6.8, posicao: 'Zagueiro' },
    { nome: 'Cristian', nota: 8.9, posicao: 'Meia' },
    { nome: 'Danilo', nota: 7.0, posicao: 'Lateral' },
    { nome: 'PB', nota: 8.3, posicao: 'Atacante' },
    { nome: 'DG', nota: 6.1, posicao: 'Lateral' },
    { nome: 'Diego', nota: 8.3, posicao: 'Atacante' },
    { nome: 'Eduardo', nota: 7.1, posicao: 'Meio' },
    { nome: 'Nivo', nota: 6.0, posicao: 'Zagueiro' },
    { nome: "Diego Bodybuilder", nota: 7.5, posicao: "Meio"},
    { nome: "Willian", nota: 7, posicao: "Lateral"},
    { nome: "Joffe", nota: 8.0, posicao: "Atacante"},
    { nome: "Dan ", nota: 7, posicao: "Meia"},
    { nome: "Jose", nota: 6.5, posicao: "Meia"},
    { nome: "Marlon", nota: 7.5, posicao: "Meio"},
    { nome: "Ajair", nota: 7.25, posicao: "Meia"},
    { nome: "Tiago", nota: 7.0, posicao: "Zagueiro"},
    { nome: "Leandro", nota: 7.3, posicao: "Zagueiro"},
    { nome: "Andre", nota: 7.7, posicao: "Zagueiro"},
    { nome: "Julia", nota: 4.5, posicao: "Zagueiro"},
    { nome: "Vivian", nota: 6.4, posicao: "Zagueiro"},
    { nome: "Ariel", nota: 7.0, posicao: "Zagueiro"},
    { nome: "Raycar", nota: 7.0, posicao: "Meia"},
  ];

  function shuffleArray(array) {
    var currentIndex = array.length,
      temporaryValue,
      randomIndex;

    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  function dividirJogadores(jogadores, numTimes) {
    jogadores = shuffleArray(jogadores);

    var times = [];
    for (var i = 0; i < numTimes; i++) {
      times.push([]);
    }

    for (var i = 0; i < jogadores.length; i++) {
      var jogador = jogadores[i];
      var timeIndex = i % numTimes;
      times[timeIndex].push(jogador);
    }

    return times;
  }

  function calcularMediaTimes(times) {
    var medias = [];

    for (var i = 0; i < times.length; i++) {
      var jogadoresTime = times[i];
      var somaNotas = jogadoresTime.reduce(function (total, jogador) {
        return total + jogador.nota;
      }, 0);
      var media = somaNotas / jogadoresTime.length;
      medias.push(media);
    }

    return medias;
  }

  function handlePlayerCheckboxChange(player) {
    setSelectedPlayers((prevSelectedPlayers) =>
      prevSelectedPlayers.includes(player)
        ? prevSelectedPlayers.filter((p) => p !== player)
        : [...prevSelectedPlayers, player]
    );
  }

  function handleTeamButton() {
    const selectedJogadores = jogadores.filter((jogador) =>
      selectedPlayers.includes(jogador.nome)
    );
    const dividedTimes = dividirJogadores(selectedJogadores, 3);
    setTimes(dividedTimes);
    const medias = calcularMediaTimes(dividedTimes);
    setMediasTimes(medias);
  }

  return (
    <ThemeProvider theme={theme}>
      <Button onClick={handleTeamButton} className="sorterButton">
        Sortear times
      </Button>
      <div className="container-global">
        <div className="left">
          {loading && (
            <div className="loader-container">
              <div className="spinner"></div>
            </div>
          )}
          <ul className="players-list">
            {jogadores.map((jogador) => (
              <li key={jogador.nome}>
                <Checkbox
                  checked={selectedPlayers.includes(jogador.nome)}
                  onChange={() => handlePlayerCheckboxChange(jogador.nome)}
                />
                <span className="player-info">
                  <strong></strong> {jogador.nome}, <strong></strong>{' '}
                  {jogador.posicao}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="right">
          {times.length > 0 && (
            <ul className="teams-list">
              {times.map((time, index) => (
                <li key={index}>
                  <strong>Time {index + 1}:</strong>
                  {time.map((jogador, jogadorIndex) => (
                    <p key={jogadorIndex}>
                      - {jogador.nome}, {jogador.posicao}
                    </p>
                  ))}
                  <h4>Média: {mediasTimes[index]}</h4>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </ThemeProvider>
  );
}

export default FutSegundaHome;
