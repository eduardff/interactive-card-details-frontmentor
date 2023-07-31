const $inputName = document.getElementById('name');
const $inputCardNumber = document.getElementById('card-number');
const $inputMonth = document.getElementById('card-month');
const $inputYear = document.getElementById('card-year');
const $inputCvc = document.getElementById('card-cvc');

const $form = document.getElementById('form');
const $send = document.getElementById('send');
const $container = document.getElementById('container-form');

const $cardElementName = document.getElementById('card-element-name');
const $cardElementNumber = document.getElementById('card-element-number');
const $cardElementMonth = document.getElementById('card-element-month');
const $cardElementYear = document.getElementById('card-element-year');
const $cardElementCvc = document.getElementById('card-element-cvc');

/* ---------------------- Funciones de Utilidad ---------------------- */
// comprobar que ningun campo esté vacio
const isRequired = (value) => {
  return value === '' ? false : true;
};
// comprobar que los campos solo acepten numeros
const isNumber = (value) => {
  const pattern = /^[0-9]+$/;
  return pattern.test(value);
};
// comprobar que el nombre solo acepte letras
const isWord = (value) => {
  const pattern = /^[A-Za-z\s'-\.]+$/;
  return pattern.test(value);
};
// comprobar que acepte solo la cantidad necesaria de números
// const isBetween = (length, min, max) => {
//   return length < min || length > max ? false : true;
// };
const isBetween = (length, number) => {
  return length != number ? false : true;
};
// mostrar y remover mensaje de error
const showError = (input, message) => {
  input.classList.add('form__input--error');

  const divInputContainer = input.parentElement;
  const $small = divInputContainer.querySelector('small');
  $small.textContent = message;
};
const removeError = (input) => {
  input.classList.remove('form__input--error');

  const divInputContainer = input.parentElement;
  const $small = divInputContainer.querySelector('small');
  $small.textContent = '';
};

/* ----------- Funciones de  validacion de campos de entrada ----------- */

// validar nombre
const checkUsername = () => {
  const userName = $inputName.value.trim();
  switch (true) {
    case !isRequired(userName):
      showError($inputName, "can't be blank ");
      break;
    case !isWord(userName):
      showError($inputName, 'Wrong format, letters only');
      break;
    default:
      removeError($inputName);
      return true;
  }
  return false;
};
// validar todos los input que acepten numeros
const checkNumbers = (input, numberRange, message) => {
  const CardNumber = input.value.trim();
  const number = numberRange;
  switch (true) {
    case !isRequired(CardNumber):
      showError(input, "can't be blank");
      break;
    case !isNumber(CardNumber):
      showError(input, 'Wrong format,numbers only');
      break;
    case !isBetween(CardNumber.length, number):
      showError(input, message);
      break;
    default:
      removeError(input);
      return true;
  }
  return false;
};
// evento submit
const formEvent = (event) => {
  event.preventDefault();

  let isNameValid = checkUsername();
  let isCardNumberValid = checkNumbers(
    $inputCardNumber,
    16,
    'Wrong format, 16-digit number required'
  );
  let isMonthValid = checkNumbers(
    $inputMonth,
    2,
    'Wrong format, 2-digit number required'
  );
  let isYearValid = checkNumbers(
    $inputYear,
    2,
    'Wrong format, 2-digit number required'
  );
  let isCvcValid = checkNumbers(
    $inputCvc,
    3,
    'Wrong format, 3-digit number required'
  );

  let isFormCardValid =
    isNameValid &&
    isCardNumberValid &&
    isMonthValid &&
    isYearValid &&
    isCvcValid;

  if (isFormCardValid) {
    $container.hidden = true;
    $send.style.display = 'flex';
  }
  $form.reset();
};
// eventos input
const inputEvent = (cardElement, inputValue) => {
  cardElement.textContent = inputValue.value;
};
const interactiveCard = () => {
  $form.addEventListener('submit', formEvent);
  $inputName.addEventListener('input', () => {
    inputEvent($cardElementName, $inputName);
  });
  $inputCardNumber.addEventListener('input', () => {
    inputEvent($cardElementNumber, $inputCardNumber);
  });
  $inputMonth.addEventListener('input', () => {
    inputEvent($cardElementMonth, $inputMonth);
  });
  $inputYear.addEventListener('input', () => {
    inputEvent($cardElementYear, $inputYear);
  });
  $inputCvc.addEventListener('input', () => {
    inputEvent($cardElementCvc, $inputCvc);
  });
};

export { interactiveCard };
// TODO: falta separar los numeros de las tajetas,validar las fechas que no exedan y validar el mes que puede ser un valor o dos no exactamente igual
