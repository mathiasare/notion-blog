'use client';

import { useEffect, useState } from "react";
import { GameStatus, createNewGame } from "@/lib/gol/game"
import { BoardGrid } from "./board-grid";

let game = createNewGame();
export const GameOfLife = () => {

    const [gameStatus, setGameStatus] = useState(game.status);
  const [curBoard, setBoard] = useState(game.board);

  const [playButtonText, setPlayButtonText] = useState("Play");
  const [editButtonText, setEditButtonText] = useState("Edit");

  const [gridSize, setGridSize] = useState(10);
  const [delay, setDelay] = useState(5);

  function togglePlayPaused() {
    if (gameStatus !== GameStatus.PLAYING) {
      game.status = GameStatus.PLAYING;
    } else {
      game.status = GameStatus.PAUSED;
    }

    setGameStatus(game.status);
  }

  function toggleEditMode() {
    if (gameStatus !== GameStatus.EDITED) {
      game.status = GameStatus.EDITED;
      setEditButtonText("Stop editing")
    } else {
      game.status = GameStatus.PAUSED;
      setEditButtonText("Edit")
    }

    setGameStatus(game.status);
  }

  const handleBoardSizeChange = (e) => {
    setGridSize(e.target.value);
  };

  const handleDelayChange = (e) => {
    setDelay(e.target.value);
  };

  const handleNewGame = () => {
    game = createNewGame(gridSize, false);
    setBoard(game.board);
  };

  const handleNewRandomGame = () => {
    game = createNewGame(gridSize, true);
    setBoard(game.board);
  };

  useEffect(() => {
    if (gameStatus !== GameStatus.PLAYING) {
      setPlayButtonText("Play");
      return;
    }

    setPlayButtonText("Pause");
    setEditButtonText("Edit")

    if (!game.next()) {
      console.log("did not change!");
      return;
    }

    console.log("Changed!");

    setTimeout(() => {
      setBoard(game.board);
    }, (delay * 1000) / gridSize);
  }, [gameStatus, curBoard]);


    return (
        <div className="flex flex-col justify-center items-center">
      <h1 className="font-extrabold text-5xl m-4">Game of Life</h1>
      <BoardGrid board={curBoard} status={gameStatus}></BoardGrid>
      <div className="flex flex-row h-auto w-auto mt-4 justify-around">
        <button
          className="rounded bg-indigo-600 px-2 mx-2  py-1 md:text-lg font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick={handleNewGame}
        >
          New Game
        </button>
        <button
          className="rounded bg-indigo-600 px-2 mx-2  py-1 md:text-lg font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick={handleNewRandomGame}
        >
          New Random Game
        </button>
        <button
          className="rounded bg-indigo-600 px-2 mx-2 py-1 md:text-lg font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick={() => togglePlayPaused()}
        >
          {playButtonText}
        </button>
        <button
          className="rounded bg-indigo-600 px-2 mx-2  py-1 md:text-lg font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick={toggleEditMode}
        >
          {editButtonText}
        </button>
      </div>
      <div className="flex flex-col md:flex-row h-auto w-auto mt-4 justify-around">
        {/*  Board size */}
        <div className="flex flex-col md:flex-row items-center space-x-4">
          <label className="text-gray-600">Board Size: {gridSize}</label>
          <input
            type="range"
            min="2"
            max="50"
            step="1"
            value={gridSize}
            className="w-64 h-4 text-blue-500"
            onChange={handleBoardSizeChange}
          />
        </div>

        {/*  Delay  */}
        <div className="flex flex-col md:flex-row  items-center space-x-4">
          <label className="text-gray-600">Delay: {delay}</label>
          <input
            type="range"
            min="1"
            max="10"
            step="1"
            value={delay}
            className="w-64 h-4 text-blue-500"
            onChange={handleDelayChange}
          />
        </div>
      </div>
    </div>
    )
}