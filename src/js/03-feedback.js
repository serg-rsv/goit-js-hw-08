import throttle from 'lodash.throttle';

const STORAGE_FORM_KEY = 'feedback-form-state';

const formEl = document.querySelector('.feedback-form');
const emailEl = formEl.elements.email;
const messageEl = formEl.elements.message;

const savedForm = load(STORAGE_FORM_KEY) ? load(STORAGE_FORM_KEY) : { email: '', message: '' };

emailEl.value = savedForm.email;
messageEl.value = savedForm.message;

formEl.addEventListener('input', throttle(onInput, 500));
formEl.addEventListener('submit', onSubmit);

function onInput() {
  savedForm.email = emailEl.value;
  savedForm.message = messageEl.value;
  save(STORAGE_FORM_KEY, savedForm);
}

function onSubmit(e) {
  e.preventDefault();
  console.log(savedForm);
  formEl.reset();
  localStorage.removeItem(STORAGE_FORM_KEY);
}

function save(key, value) {
  try {
    const serializedState = JSON.stringify(value);
    localStorage.setItem(key, serializedState);
  } catch (error) {
    console.error('Set state error: ', error.message);
  }
}

function load(key) {
  try {
    const serializedState = localStorage.getItem(key);
    return serializedState === null ? undefined : JSON.parse(serializedState);
  } catch (error) {
    console.error('Get state error: ', error.message);
  }
}
