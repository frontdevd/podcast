export class Question {
    static create(question) {
        return fetch('https://javascript-app-f034f.firebaseio.com/questions.json', {
            method: 'POST',
            body: JSON.stringify(question),
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(response => response.json())
            .then(response => {
                question.id = response.name;
                return question;
            })
            .then(addToLocalStorage)
            .then(Question.renderList)
            .catch(error => console.log(error))
    }

    static fetch(token) {
        if (!token) {
            return Promise.resolve(`<p class='error'>You dont have token!!! </p>`);
        }
        return fetch(`https://javascript-app-f034f.firebaseio.com/questions.json?auth=${token}`)
            .then(response => response.json())
            .then(response => {
                if(response && response.error) {
                    return `<p class='error'>${response.error}</p>`;
                }
               
                return response ? Object.keys(response).map(key => ({
                    ...response[key],
                    id: key
                })) : []
            })
    }

    static renderList() {
        const questions = getToLocalStorage();
        const html = questions.length
            ? questions.map(toCard).join('')
            : `<div class='mui--text-headline'>Do dont have any questions...</div>`;
        const list = document.getElementById('list');
        list.innerHTML = html;
    }

    static listToHTML(questions) {
        return questions.length
        ? `<ol>${questions.map(q=>`<li>${q.text}</li>`).join('')}</ol>`
        : `<p>No questions for now !</p>`
    }
}

function addToLocalStorage(question) {
    const all = getToLocalStorage();
    all.push(question);
    localStorage.setItem('questions', JSON.stringify(all));
}

function getToLocalStorage() {
    return JSON.parse(localStorage.getItem('questions') || '[]');
}

function toCard(question) {
    return `
        <div class='mui--text-black-54'>
            <p>${question.text}</p>
            <p class="small"> 
                ${new Date(question.date).toLocaleDateString()} - 
                ${new Date(question.date).toLocaleTimeString()}
            </p>
            <hr>
        </div> 
    `;
}
