import { defaultRandomPattern, defaultRandomPattern2 } from "./constans.js";
console.log(defaultRandomPattern);
let pattern = defaultRandomPattern2;
const memoryDIV = document.querySelector(".memory") as HTMLElement;
const containerDIV = document.querySelector(".container") as HTMLElement;
const newGameButton = document.querySelector(
  ".new_game_btn"
) as HTMLButtonElement;
let buffor: any[] = [];

let numberOfSquares: number = pattern.length;
let indexesToShow: string[] = [];

const createSquare = () => {
  const newSquare = document.createElement("button");
  newSquare.classList.add("square");
  getValueFromSquareDIV(newSquare);
  return newSquare;
};
const createBoardSquare = (numberOfSquares: number) => {
  for (let i = 0; i < numberOfSquares; i++) {
    const square = createSquare();
    memoryDIV.appendChild(square);
  }
};
const clearBoard = () => {
  indexesToShow = [];
  buffor = [];
  const winParagraf = document.querySelector(".win");
  winParagraf?.parentElement?.removeChild(winParagraf);
  const squaresDIV = document.querySelectorAll(".square") as NodeList;
  squaresDIV.forEach((x) => {
    x.parentNode?.removeChild(x);
  });
};
const setValuesFromPatternToSquare = () => {
  const squaresDIV = document.querySelectorAll(".square");
  if (numberOfSquares === squaresDIV.length) {
    pattern.map((value, index) => {
      squaresDIV[index].setAttribute("data-value", String(value));
      squaresDIV[index].setAttribute("data-index", String(index));
    });
  }
};
const addDataIndexToShow = (index1: string, index2: string) => {
  indexesToShow.push(index1);
  indexesToShow.push(index2);
  const allSquares = document.querySelectorAll(".square");
  allSquares.forEach((square) => {
    if (
      square &&
      indexesToShow.find((x) => x === square.getAttribute("data-index"))
    ) {
      // square.textContent = square.getAttribute("data-value");
      square.classList.add("active");
      square.setAttribute("disabled", "true");
    }
    if (indexesToShow.length === numberOfSquares) {
      clearBoard();
      const win = document.createElement("p");
      win.classList.add("win");
      win.textContent = "THE END";
      memoryDIV.appendChild(win);
    }
  });
};
const getValueFromSquareDIV = (squareDIV: HTMLElement) => {
  squareDIV.addEventListener("click", (event: Event) => {
    // squareDIV.textContent = squareDIV.getAttribute("data-value");
 
    squareDIV.style.backgroundImage=`url(${squareDIV.getAttribute("data-value")})`;
    
   
    buffor.push(squareDIV);
    squareDIV.setAttribute("disabled", "true");
    if (
      buffor.length === 2 &&
      buffor[0].getAttribute("data-value") ===
        buffor[1].getAttribute("data-value")
    ) {
      addDataIndexToShow(
        buffor[0].getAttribute("data-index"),
        buffor[1].getAttribute("data-index")
      );
    }
    if (
      buffor.length === 2 &&
      buffor[0].getAttribute("data-value") !==
        buffor[1].getAttribute("data-value")
    ) {
      buffor[1].setAttribute("disabled", "true");
    }
    if (
      buffor.length > 2 &&
      buffor[0].getAttribute("data-value") !==
        buffor[1].getAttribute("data-value")
    ) {
      buffor[0].textContent = "";
      buffor[1].textContent = "";
      buffor[0].removeAttribute("disabled");
      buffor[1].removeAttribute("disabled");
      buffor[0].style.backgroundImage=` url("./assets/ask.PNG")`
      buffor[1].style.backgroundImage=` url("./assets/ask.PNG")`
    
    }
    if (buffor.length > 2) {
      buffor = buffor.slice(buffor.length - 1);

    }
  });
};

const createNewRandomPattern = () => {
  const startSlice = Math.floor(Math.random() * numberOfSquares);
  const firstSlice = pattern.slice(startSlice);
  const secondSlice = pattern.slice(0, startSlice);
  pattern = firstSlice.concat(secondSlice);
};

const newGame = () => {
  newGameButton.addEventListener("click", (event: Event) => {
    event.preventDefault();
    clearBoard();

    createBoardSquare(numberOfSquares);
    createNewRandomPattern();
    setValuesFromPatternToSquare();
  });
};
newGame();
