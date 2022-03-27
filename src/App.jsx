import { useState, useCallback, useEffect } from 'react'
import logo from './logo.svg'
import './App.css'

function App(props) {
  let guess = [["_", "_", "_", "_", "_"],
                ["_", "_", "_", "_", "_"],
                ["_", "_", "_", "_", "_"],
                ["_", "_", "_", "_", "_"],
                ["_", "_", "_", "_", "_"],
                ["_", "_", "_", "_", "_"]];
  const [letters, setLetters] = useState(guess);
  const [curLetter, setCurLetter] = useState(0);
  const [curGuess, setCurGuess] = useState(0);
  let cl = 0;
  let cg = 0;
  let guessLetter = "";

  function updateState() {
    cl = curLetter;
    cg = curGuess;
    let updatedGuess = [...letters];
    if (updatedGuess[cg][cl] === "_") {
      updatedGuess[cg][cl] = guessLetter;
    }

    if (cl < 4) {
      cl++;
    }

    if (cg < 6) {
      cg++;
    }
    console.log(updatedGuess);
    setLetters(updatedGuess);
    setCurLetter(cl);
    
  }

  /*const keyInputHandler = useCallback((event) => {
    const alphabet = "abcdefghijklmnopqrstuvwxyz";
    if (alphabet.includes(event.key)) {
      guessLetter = event.key;
      updateState();
      console.log(event.key);
    }

    if (event.key === "Backspace") {
      backSpacePressed();
    }

  })*/
/*
  useEffect(() => {
    const keyInputHandler = (e) => {
      const alphabet = "abcdefghijklmnopqrstuvwxyz";
      if (alphabet.includes(e.key)) {
        guessLetter = e.key;
        updateState();
        console.log(e.key);
      }

      if (e.key === "Backspace") {
        backSpacePressed();
      }
      
      if (e.key === "Enter") {
        enterPressed();
      }
    };
    document.addEventListener("keydown", keyInputHandler, false);
    
    return () => window.removeEventListener('keydown', keyInputHandler);
  }, []);*/


  function backSpacePressed() {
    cl = curLetter;
    cg = curGuess;
    let updatedGuess = [...letters];
    updatedGuess[cg][cl] = "_";

    if (cl > 0) {
      cl--;
    }
    console.log(updatedGuess);
    setLetters(updatedGuess);
    setCurLetter(cl)
  }
  
  function enterPressed() {
    let guessWord = [...letters][curGuess].join('');
    cg = curGuess;

    if (!guessWord.includes("_")) {
      console.log(guessWord);
      if (cg < 5) {
        cg++;
        setCurGuess(cg)
        setCurLetter(0);
      }
    }
  }

  return (
    
    <div className='font-mono'>
      <div className="text-3xl font-bold">
        {letters[0][0]}{letters[0][1]}{letters[0][2]}{letters[0][3]}{letters[0][4]}
        <br/>
        {letters[1][0]}{letters[1][1]}{letters[1][2]}{letters[1][3]}{letters[1][4]}
        <br/>
        {letters[2][0]}{letters[2][1]}{letters[2][2]}{letters[2][3]}{letters[2][4]}
        <br/>
        {letters[3][0]}{letters[3][1]}{letters[3][2]}{letters[3][3]}{letters[3][4]}
        <br/>
        {letters[4][0]}{letters[4][1]}{letters[4][2]}{letters[4][3]}{letters[4][4]}
        <br/>
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
      <button onClick={backSpacePressed}
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
      <button onClick={enterPressed}
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
