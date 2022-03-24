import { useState } from 'react'
import logo from './logo.svg'
import './App.css'

function App() {
  let guess = ["_", "_", "_", "_", "_"];
  const [letters, setLetters] = useState(guess);
  const [curLetter, setCurLetter] = useState(0);
  let cl = 0;
  let guessLetter = ""

  
  function updateState() {
    cl = curLetter;
    let updatedGuess = [...letters];
    if (updatedGuess[cl] === "_") {
      updatedGuess[cl] = guessLetter;
    }

    if (cl < 4) {
      cl++;
    }
    console.log(updatedGuess);
    setLetters(updatedGuess);
    setCurLetter(cl);
  }

  return (
    <div className='font-mono'>
      <div className="text-3xl font-bold">
        {letters[0]}{letters[1]}{letters[2]}{letters[3]}{letters[4]}
      </div>
      
      <button onClick={() => {
        guessLetter = "Q";
        updateState();
      }}
      
      className={"border-2 rounded-md px-1 hover:bg-slate-100"}>Q </button>
      <button onClick={() => {
        guessLetter = "W";
        updateState();
      }}
      
      className={"border-2 rounded-md px-1 hover:bg-slate-100"}>W</button>
      <button onClick={() => {
        guessLetter = "E";
        updateState();
      }}
      className={"border-2 rounded-md px-1 hover:bg-slate-100"}>E</button>
      <button onClick={() => {
        guessLetter = "R";
        updateState();
      }}
      className={"border-2 rounded-md px-1 hover:bg-slate-100"}>R</button>
      <button onClick={() => {
        guessLetter = "T";
        updateState();
      }}
      className={"border-2 rounded-md px-1 hover:bg-slate-100"}>T</button>
      <button onClick={() => {
        guessLetter = "Y";
        updateState();
      }}
      className={"border-2 rounded-md px-1 hover:bg-slate-100"}>Y</button>
      <button onClick={() => {
        guessLetter = "U";
        updateState();
      }}
      className={"border-2 rounded-md px-1 hover:bg-slate-100"}>U</button>
      <button onClick={() => {
        guessLetter = "I";
        updateState();
      }}
      className={"border-2 rounded-md px-1 hover:bg-slate-100"}>I</button>
      <button onClick={() => {
        guessLetter = "O";
        updateState();
      }}
      className={"border-2 rounded-md px-1 hover:bg-slate-100"}>O</button>
      <button onClick={() => {
        guessLetter = "P";
        updateState();
      }}
      className={"border-2 rounded-md px-1 hover:bg-slate-100"}>P</button>
      <button onClick={() => {
        cl = curLetter;
        let updatedGuess = [...letters];
        updatedGuess[cl] = "_";

        if (cl > 0) {
          cl--;
        }
        console.log(updatedGuess);
        setLetters(updatedGuess);
        setCurLetter(cl)
      }}
      className={"border-2 rounded-md px-1 hover:bg-slate-100"}>{"<--"}</button>
      <br/>
      <button onClick={() => {
        guessLetter = "A";
        updateState();
      }}
      className={"border-2 rounded-md px-1 hover:bg-slate-100"}>A</button>
      <button onClick={() => {
        guessLetter = "S";
        updateState();
      }}
      className={"border-2 rounded-md px-1 hover:bg-slate-100"}>S</button>
      <button onClick={() => {
        guessLetter = "D";
        updateState();
      }}
      className={"border-2 rounded-md px-1 hover:bg-slate-100"}>D</button>
      <button onClick={() => {
        guessLetter = "F";
        updateState();
      }}
      className={"border-2 rounded-md px-1 hover:bg-slate-100"}>F</button>
      <button onClick={() => {
        guessLetter = "G";
        updateState();
      }}
      className={"border-2 rounded-md px-1 hover:bg-slate-100"}>G</button>
      <button onClick={() => {
        guessLetter = "H";
        updateState();
      }}
      className={"border-2 rounded-md px-1 hover:bg-slate-100"}>H</button>
      <button onClick={() => {
        guessLetter = "J";
        updateState();
      }}
      className={"border-2 rounded-md px-1 hover:bg-slate-100"}>J</button>
      <button onClick={() => {
        guessLetter = "K";
        updateState();
      }}
      className={"border-2 rounded-md px-1 hover:bg-slate-100"}>K</button>
      <button onClick={() => {
        guessLetter = "L";
        updateState();
      }}
      className={"border-2 rounded-md px-1 hover:bg-slate-100"}>L</button>
      <button onClick={() => {
        let guessWord = [...letters].join('');
        console.log(guessWord);
      }}
      className={"border-2 rounded-md px-1 hover:bg-slate-100"}>enter</button>
      <br/>
      <button onClick={() => {
        guessLetter = "Z";
        updateState();
      }}
      className={"border-2 rounded-md px-1 hover:bg-slate-100"}>Z</button>
      <button onClick={() => {
        guessLetter = "X";
        updateState();
      }}
      className={"border-2 rounded-md px-1 hover:bg-slate-100"}>X</button>
      <button onClick={() => {
        guessLetter = "C";
        updateState();
      }}
      className={"border-2 rounded-md px-1 hover:bg-slate-100"}>C</button>
      <button onClick={() => {
        guessLetter = "V";
        updateState();
      }}
      className={"border-2 rounded-md px-1 hover:bg-slate-100"}>V</button>
      <button onClick={() => {
        guessLetter = "B";
        updateState();
      }}
      className={"border-2 rounded-md px-1 hover:bg-slate-100"}>B</button>
      <button onClick={() => {
        guessLetter = "N";
        updateState();
      }}
      className={"border-2 rounded-md px-1 hover:bg-slate-100"}>N</button>
      <button onClick={() => {
        guessLetter = "M";
        updateState();
      }}
      className={"border-2 rounded-md px-1 hover:bg-slate-100"}>M</button>
      

    </div>
  )
}

export default App
