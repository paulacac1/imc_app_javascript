let labelResultado = null;
let trsTable = null;
let buttonCalcular = null;
let buttonLimpar = null;
let spanResultado = null;
let peso = null;
let altura = null;
let valorPeso = null;
let valorAltura = null;

const formatter = Intl.NumberFormat('pt-BR');

window.addEventListener('load', carregaComponentes);

function carregaComponentes() {
  labelResultado = document.querySelector('#label_result');

  buttonCalcular = document.querySelector('#buttonLimpar');
  buttonCalcular.addEventListener('click', limparFields);

  buttonLimpar = document.querySelector('#buttonCalcular');
  buttonLimpar.addEventListener('click', calculaIMC);

  peso = document.querySelector('#peso');
  peso.addEventListener('keyup', handleChange);

  altura = document.querySelector('#altura');
  altura.addEventListener('keyup', handleChange);

  spanResultado = document.querySelector('span');
  trsTable = document.querySelectorAll('tr');
}

function handleChange(event) {
  if (event.target.id === 'altura') {
    valorAltura = event.target.value;
  } else if (event.target.id === 'peso') {
    valorPeso = event.target.value;
  }
}

function calculaIMC(event) {
  if (
    valorAltura === null ||
    valorAltura === '' ||
    valorPeso === null ||
    valorPeso === ''
  ) {
    return;
  }

  labelResultado.classList.remove('visibleFalse');
  limparResult();

  let imc = valorPeso / (valorAltura * valorAltura);
  spanResultado.textContent = formatter.format(imc);

  let indice = 0;
  if (imc < 18.5) {
    indice = 1;
  } else if (imc < 25) {
    indice = 2;
  } else if (imc < 30) {
    indice = 3;
  } else if (imc < 40) {
    indice = 4;
  } else {
    indice = 5;
  }

  trsTable[indice].classList.add('backgroundColorTable');
}

const limparFields = (event) => {
  altura.value = '';
  peso.value = '';
  labelResultado.classList.add('visibleFalse');
  limparResult();
};

const limparResult = () => {
  for (let i = 0; i < trsTable.length; i++) {
    trsTable[i].classList.remove('backgroundColorTable');
  }
};
