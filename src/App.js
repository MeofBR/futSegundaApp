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
    { nome: 'Diego Bodybuilder', nota: 7.5, posicao: 'Meio' },
    { nome: 'Willian', nota: 7, posicao: 'Lateral' },
    { nome: 'Joffe', nota: 8.6, posicao: 'Atacante' },
    { nome: 'Dan ', nota: 7, posicao: 'Meia' },
    { nome: 'Jose', nota: 6.5, posicao: 'Meia' },
    { nome: 'Marlon', nota: 7.0, posicao: 'Meio' },
    { nome: 'Ajair', nota: 7.25, posicao: 'Meia' },
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
      <div className="container-global">
        <div className="left">
          {loading && (
            <div className="loader-container">
              <div className="spinner"></div>
            </div>
          )}
          <Button onClick={handleTeamButton}>Sortear times</Button>

          <ul className="players-list">
            {jogadores.map((jogador) => (
              <li key={jogador.nome}>
                <Checkbox
                  checked={selectedPlayers.includes(jogador.nome)}
                  onChange={() => handlePlayerCheckboxChange(jogador.nome)}
                />
                <span className="player-info">
                  <strong>Nome:</strong> {jogador.nome},{' '}
                  <strong>Posição:</strong> {jogador.posicao}
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
                      Nome: {jogador.nome}, Posição: {jogador.posicao}
                    </p>
                  ))}
                  Média: {mediasTimes[index]}
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
