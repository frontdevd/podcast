import { Question } from './questions';
import "./style.css";
import { isValid, createModal } from "./utils";
import { getAuthForm, authWithEmailAndPassword } from './auth';

const form = document.getElementById('form');
const input = form.querySelector('#question-input');
const submitBtn = form.querySelector('#submit');
const modalBtn = document.getElementById('modal-btn');

window.addEventListener('load', Question.renderList())
form.addEventListener('submit', submitFormhandler);
input.addEventListener('input', () => {
    submitBtn.disabled = !isValid(input.value);
});

modalBtn.addEventListener('click', openModal)

function submitFormhandler(event) {
    event.preventDefault();

    if (isValid(input.value)) {
        const question = {
            text: input.value.trim(),
            date: new Date().toJSON()
        }
        submitBtn.disabled = true;

        // async request 
        Question.create(question).then(() => {
            input.value = '';
            input.className = '';
            submitBtn.disabled = false;
            console.log('test')
        })

    }
}

function openModal() {
    createModal('Login in your account', getAuthForm());
    document.getElementById('auth-form')
        .addEventListener('submit', authFormHadler, { once: true })
}

function authFormHadler(event) {
    event.preventDefault();
    const email = event.target.querySelector('#email').value;
    const password = event.target.querySelector('#password').value;

    authWithEmailAndPassword(email, password)
        .then(token => {
            return Question.fetch(token);
        })
        .then(renderModalAfterAuth)
}

function renderModalAfterAuth(content) {
    if (typeof content === 'string') {
        createModal('Error', content);
    } else {
        console.log(content)
        createModal('List of Questions', Question.listToHTML(content));
    }
}