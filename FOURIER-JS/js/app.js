// variáveis básicas.
let arr_x = [];
let x = -20;

function getDOM() {
  // resgata os valores do DOM.
  let coefA = document.getElementById('coefA').value;
  let coefB = document.getElementById('coefB').value;
  let cte = parseFloat(document.getElementById('cte').value);
  let termos = parseInt(document.getElementById('termos').value);
  return [coefA, coefB, cte, termos]
}

// cria um array de valores para x espaçados por 0.1.
while (x <= 20) {
  x += 0.05;
  arr_x.push(x);
}

// calcula os valores de y nos pontos de x para um dado n fixo.
function y_func(A, B, n, arr_x) {
  console.log(A, B)
  let arr_y_n = [];
  for (x of arr_x) {
    let y_val = (eval(A))*Math.cos(n*x) + (eval(B))*Math.sin(n*x);
    arr_y_n.push(y_val);
  }
  return arr_y_n;
}

// transforma a equação em um formato compreensivel para a avaliação do js
function pure(coef) {
  let newCoef = coef;
  newCoef = newCoef.replace('sin', 'Math.sin');
  newCoef = newCoef.replace('cos', 'Math.cos');
  newCoef = newCoef.replace('tg', 'Math.tan');
  newCoef = newCoef.replace('sqrt', 'Math.sqrt');
  newCoef = newCoef.replace('pi', 'Math.PI');
  newCoef = newCoef.replace('ln', 'Math.log');
  newCoef = newCoef.replace('^', '**');
  return newCoef;
}

function graf() {

  let [coefA, coefB, cte, termos] = getDOM();

  // ajeita os coeficientes a e b

  // checagem básica de valores.
  if (termos < 1) {
    return alert('O número de termos deve ser maior que 1!');
  }

  // calcula os valores de y para cada n. depois, armazena os arrays calculados.
  let all_arr_y_n = [];
  let n = 1;
  while (n < (termos + 1)) {
    all_arr_y_n.push(y_func(pure(coefA), pure(coefB), n, arr_x))
    n += 1
  }

  // soma o valor de cada y calculado.
  let i = 0;
  let y_graf = [];
  while (i < all_arr_y_n[0].length) {
    let soma_parcial = cte;
    for (arr of all_arr_y_n) {
      soma_parcial += arr[i];
    }
    y_graf.push(soma_parcial);
    i++;
  }

  console.log(y_graf);

  // cria o gráfico \o/
  let GRAFICO = document.getElementById('grafico');
  	Plotly.newPlot( GRAFICO, [{
  	x: arr_x,
  	y: y_graf }], {
  	margin: { t: 0 } }, {staticPlot: true} );
}

document.getElementById('termos').addEventListener("change", function() {
  document.getElementById('lblTermos').innerHTML = document.getElementById('termos').value;
});

// atualiza a série mostrada de forma dinâmica.
MathJax = {
  loader: {load: ['input/asciimath', 'output/chtml']}
}
// função que atualiza a equação.
function updateEquation() {
  let [coefA, coefB, cte, termos] = getDOM();
  document.getElementById('equacao').innerHTML = `\`${cte} + sum_{i=1}^${termos} = [${coefA}*cos(nx) + ${coefB}*sin(nx)]\``;
  MathJax.typeset()
}
// atualiza a equação mostrada e o gráfico de forma dinâmica.
document.getElementById('coefA').addEventListener("change", function() {
  updateEquation(); graf();
});
document.getElementById('coefB').addEventListener("change", function() {
  updateEquation(); graf();
});
document.getElementById('cte').addEventListener("change", function() {
  updateEquation(); graf();
});
document.getElementById('termos').addEventListener("change", function() {
  updateEquation(); graf();
});

graf();
updateEquation();
