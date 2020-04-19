export function getAuthForm() {
    return `
            <form class="mui-form" id="auth-form">
                <div class="mui-textfield mui-textfield--float-label">
                    <input type="email" id="email" required>
                    <label for="email">email</label>
                </div>

                <div class="mui-textfield mui-textfield--float-label">
                    <input type="password" id="password">
                    <label for="empasswordail">password</label>
                </div>
            <button type="submit" class="mui-btn mui-btn--primary">login</button>
        </form>
    `;
}

export function authWithEmailAndPassword(email, password) {
    const apiKey = apiKey;
    return fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`, {
        method: 'POST',
        body: JSON.stringify({
            email: email,
            password: password,
            returnSecureToken: true,
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => data.idToken);
}
