/* ------------LAS CONSTANTES------------ */
const bill = document.querySelector('.bill');
const tipBtns = document.querySelectorAll('.tip');
const tipCustom = document.querySelector('.custom');
const people = document.querySelector('.people');
const tipAmount = document.getElementById('amount');
const total = document.getElementById('total');
const btnReset = document.querySelector('.result-reset');
let billValue = 0.0;
let tipPorcent = 0;
let peopleNumber = 1;

/* ------------LAS ESCUCHAS------------ */
bill.addEventListener('input', getBill);
tipBtns.forEach((btn) => {
  btn.addEventListener('click', getTip);
});
tipCustom.addEventListener('input', getTipCustom);
people.addEventListener('input', getPeople);
btnReset.addEventListener('click', setReset);

/* ------------OBTENIENDO IMPORTE FACTURA------------ */
function getBill() {
  if (!validateInputs('float', bill)) {
    bill.value = bill.value.substring(0, bill.value.length - 1);
  }
  billValue = parseFloat(bill.value) || 0.0;
  calculateTip();
}

/* ------------OBTENIENDO PROPINA------------ */
function getTip() {
  tipBtns.forEach((btn) => {
    btn.classList.remove('selected');
  });
  this.classList.add('selected');
  window.CLEARBTN = this;
  tipCustom.value = '';
  tipPorcent = parseInt(this.textContent) / 100;
  calculateTip();
}

/* ------------OBTENIENDO PROPINA CUSTOM------------ */
function getTipCustom() {
  if (!validateInputs('int', tipCustom)) {
    tipCustom.value = tipCustom.value.substring(0, tipCustom.value.length - 1);
  }
  tipBtns.forEach((btn) => {
    btn.classList.remove('selected');
  });
  tipPorcent = parseInt(tipCustom.value) / 100 || 0;
  calculateTip();
}

/* ------------OBTENIENDO ENTRADA PERSONAS------------ */
function getPeople(e) {
  if (!validateInputs('int', people)) {
    people.value = people.value.substring(0, people.value.length - 1);
  }
  if (people.value <= 0) {
    people.classList.add('error');
    people.parentNode.classList.add('error2');
  } else {
    people.classList.remove('error');
    people.parentNode.classList.remove('error2');
  }
  peopleNumber = parseInt(people.value) || 1;
  calculateTip();
}

/* ------------VALIDACION NÚMERO DE ENTRADA------------ */
function validateInputs(inputType, inp) {
  let regx;
  inputType === 'float' ? (regx = /^[0-9]*\.?[0-9]*$/) : (regx = /^[0-9]*$/);

  return inp.value.match(regx);
}

/* ------------CALCULANDO PROPINA------------ */
function calculateTip() {
  if (peopleNumber > 0) {
    tipAmount.textContent = `$${(
      (billValue * tipPorcent) /
      peopleNumber
    ).toFixed(2)}`;
    total.textContent = `$${(
      (billValue * (tipPorcent + 1)) /
      peopleNumber
    ).toFixed(2)}`;
    btnReset.classList.add('active');
  }
}

/* ------------RESETEANDO VALORES------------ */
function setReset() {
  bill.value = '';
  billValue = 0.0;
  tipBtns[0].click();
  CLEARBTN.classList.remove('selected');
  people.value = '';
  peopleNumber = 1;
  people.classList.remove('error');
  people.parentNode.classList.remove('error2');
  btnReset.classList.remove('active');
}
