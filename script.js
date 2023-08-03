const $inputName = document.getElementById('name');
const $inputCardNumber = document.getElementById('card-number');
const $inputMonth = document.getElementById('card-month');
const $inputYear = document.getElementById('card-year');
const $inputCvc = document.getElementById('card-cvc');

const $form = document.getElementById('form');

const $sendContainer = document.getElementById('container-send');
const $containerForm = document.getElementById('container-form');

const $cardElementName = document.getElementById('card-element-name');
const $cardElementNumber = document.getElementById('card-element-number');
const $cardElementMonth = document.getElementById('card-element-month');
const $cardElementYear = document.getElementById('card-element-year');
const $cardElementCvc = document.getElementById('card-element-cvc');

const $btnContinue = document.getElementById('btn-continue');

/* ---------------------- Funciones de Utilidad ---------------------- */
// comprobar que ningun campo esté vacio
const isRequired = (value) => {
  return value === '' ? false : true;
};
// comprobar que los campos solo acepten numeros
const isNumber = (value) => {
  // const pattern = /^[0-9]+$/;
  const pattern = /^[0-9\s]+$/;
  return pattern.test(value);
};
// comprobar que el nombre solo acepte letras
const isWord = (value) => {
  const pattern = /^[A-Za-z\s'-\.]+$/;
  return pattern.test(value);
};
// comprobar si esta en el rango establecido
const isBetween = (length, min, max) => {
  return length < min || length > max ? false : true;
};
// comprobar que acepte solo la cantidad necesaria de números

const isEquals = (length, number) => {
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
const checkNumbers = (input, numberEquals, message) => {
  const CardNumber = input.value.trim();
  const number = numberEquals;
  switch (true) {
    case !isRequired(CardNumber):
      showError(input, "can't be blank");
      break;
    case !isNumber(CardNumber):
      showError(input, 'Wrong format,numbers only');
      break;
    case !isEquals(CardNumber.length, number):
      showError(input, message);
      break;
    default:
      removeError(input);
      return true;
  }
  return false;
};
const checkNumbersDate = (input, numberMin, numberMax, message) => {
  const cardNumberDate = input.value.trim();
  let min = numberMin;
  let max = numberMax;
  switch (true) {
    case !isRequired(cardNumberDate):
      showError(input, "can't be blank");
      break;
    case !isNumber(cardNumberDate):
      showError(input, 'Wrong format,numbers only');
      break;
    case !isBetween(+cardNumberDate, min, max):
      showError(input, message);
      break;
    default:
      removeError(input);
      return true;
  }
  return false;
};
/* ----------- Funciones para eventos ----------- */
// evento submit
const formEvent = (event) => {
  event.preventDefault();

  let isNameValid = checkUsername();
  let isCardNumberValid = checkNumbers(
    $inputCardNumber,
    19,
    'Wrong format, 16-digit number required'
  );
  let isMonthValid = checkNumbersDate($inputMonth, 1, 12, 'numbers to 1-12');
  let isYearValid = checkNumbersDate(
    $inputYear,
    23,
    27,
    'years from 2023-2027(23-27)'
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
    $containerForm.hidden = true;
    $sendContainer.style.display = 'flex';
    $form.reset();
  }
};
// eventos input
const inputEvent = (cardElement, inputValue, numStart, numEnd) => {
  const value = inputValue.value.trim();
  const subValue = value.substring(numStart, numEnd);
  cardElement.textContent = subValue;
  inputValue.value = subValue;
};
// funcion debounce para determinar el tiempo de muestra del mensaje de error
const debounce = (fn, delay = 500) => {
  let timeoutId;
  return (...args) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      fn.apply(null, args);
    }, delay);
  };
};
/* ----------- Funcion padre que sera exportada ----------- */
const interactiveCard = () => {
  // evento submit si todo va correcto
  $form.addEventListener('submit', formEvent);

  $form.addEventListener(
    'input',
    debounce((event) => {
      let target = event.target.id;
      switch (target) {
        case 'name':
          checkUsername();
          $cardElementName.textContent = $inputName.value.toUpperCase();
          break;
        case 'card-number':
          const formattedValue = $inputCardNumber.value
            .replace(/\s/g, '')
            .replace(/(\d{4})/g, '$1 ')
            .substring(0, 19);
          $inputCardNumber.value = formattedValue.trim();
          $cardElementNumber.textContent = formattedValue.trim();
          checkNumbers(
            $inputCardNumber,
            19,
            'Wrong format, 16-digit number required'
          );
          break;
        case 'card-month':
          checkNumbersDate($inputMonth, 1, 12, 'numbers to 1-12');
          inputEvent($cardElementMonth, $inputMonth, 0, 2);
          break;
        case 'card-year':
          checkNumbersDate($inputYear, 23, 27, 'years from 2023-2027(23-27)');
          inputEvent($cardElementYear, $inputYear, 0, 2);
          break;
        case 'card-cvc':
          inputEvent($cardElementCvc, $inputCvc, 0, 3);
          checkNumbers($inputCvc, 3, 'Wrong format, 3-digit number required');
          break;
      }
    })
  );
  $btnContinue.addEventListener('click', () => {
    $containerForm.hidden = false;
    $sendContainer.style.display = 'none';

    $cardElementName.textContent = 'Jane Appleseed';
    $cardElementNumber.textContent = '0000 0000 0000 0000';
    $cardElementMonth.textContent = '00';
    $cardElementYear.textContent = '00';
    $cardElementCvc.textContent = '000';
  });
};

export { interactiveCard };

// NOTA:  Si Alguien desea que le explique mi solución puede escribirme a eduardflores.f@hotmail.com
