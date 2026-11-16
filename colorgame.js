// =====================================================
//  THE GREAT GUESSING GAME
// =====================================================

// ---------- Variables ----------
// colors y pickedColor se definen sin valor porque los llena reset()
var numberOfSquares = 6;
var colors;
var pickedColor;

// ---------- Selectores (guardados en variables) ----------
var squares = document.querySelectorAll(".square");
var colorDisplay = document.querySelector("#colorDisplay");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("#h1");
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");


// ---------- Inicio del juego ----------
// init solo ejecuta 3 funciones
function init() {
  setupModeButtons();
  setupSquares();
  reset();
}

init();


// ---------- Botones Easy y Hard ----------
function setupModeButtons() {
  for (var i = 0; i < modeButtons.length; i++) {
    modeButtons[i].addEventListener("click", function () {
      // le saco "selected" a los dos y se la pongo solo al cliqueado
      modeButtons[0].classList.remove("selected");
      modeButtons[1].classList.remove("selected");
      this.classList.add("selected");

      // operador ternario: si el botón dice EASY son 3 cuadrados, si no 6
      numberOfSquares = this.textContent === "EASY" ? 3 : 6;

      reset();
    });
  }
}


// ---------- Click en los cuadrados ----------
function setupSquares() {
  for (var i = 0; i < squares.length; i++) {
    squares[i].addEventListener("click", function () {
      // guardo el color del cuadrado cliqueado
      var clickedColor = this.style.backgroundColor;

      if (clickedColor === pickedColor) {
        // GANÓ
        messageDisplay.textContent = "¡Correcto!";
        resetButton.textContent = "Play Again?";
        changeColors(clickedColor);
        h1.style.backgroundColor = clickedColor;
      } else {
        // PERDIÓ: el cuadrado toma el color del body y "desaparece"
        this.style.backgroundColor = document.body.style.backgroundColor;
        messageDisplay.textContent = "Intentalo Nuevamente";
      }
    });
  }
}


// ---------- Reset: nuevos colores y nuevo ganador ----------
function reset() {
  // 1. generar nuevos colores (3 o 6, según el modo)
  colors = generateRandomColors(numberOfSquares);

  // 2. elegir el color ganador y mostrarlo en el título
  pickedColor = pickColor();
  colorDisplay.textContent = pickedColor;

  // 3. actualizar la página
  resetButton.textContent = "Nuevos Colores";
  messageDisplay.textContent = "";
  h1.style.backgroundColor = "";

  // 4. pintar los cuadrados: si hay color lo muestro, si no lo escondo
  for (var i = 0; i < squares.length; i++) {
    if (colors[i]) {
      squares[i].style.display = "block";
      squares[i].style.backgroundColor = colors[i];
    } else {
      squares[i].style.display = "none";
    }
  }
}

// el botón "Nuevos Colores" / "Play Again?" llama directamente a reset
resetButton.addEventListener("click", reset);


// ---------- Funciones de color ----------

// pinta todos los cuadrados con el mismo color (cuando se gana)
function changeColors(color) {
  for (var i = 0; i < squares.length; i++) {
    squares[i].style.backgroundColor = color;
  }
}

// elige un color al azar del arreglo colors
function pickColor() {
  var random = Math.floor(Math.random() * colors.length);
  return colors[random];
}

// genera un arreglo con "num" colores al azar
function generateRandomColors(num) {
  var arr = [];
  for (var i = 0; i < num; i++) {
    arr.push(randomColor());
  }
  return arr;
}

// genera UN color al azar con el formato "rgb(r, g, b)"
function randomColor() {
  var r = Math.floor(Math.random() * 256);
  var g = Math.floor(Math.random() * 256);
  var b = Math.floor(Math.random() * 256);
  return "rgb(" + r + ", " + g + ", " + b + ")";
}