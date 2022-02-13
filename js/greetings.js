const loginForm = document.querySelector("#login-form");
const loginInput = document.querySelector("#login-form input");
const greeting = document.querySelector("#greeting");

const HIDDEN_CLASSNAME= "hidden";
const USERNAME_KEY="username"

function onLoginSubmit(event) {
    event.preventDefault(); //submit시 새로고침 되는 기본 효과 방지
    loginForm.classList.add(HIDDEN_CLASSNAME); //css에서 hidden이라는 클래스네임을 loginForm에 추가해서 함수 발생 시 없어지게 한다.
    const username = loginInput.value;
    localStorage.setItem(USERNAME_KEY, username);
    paintGreetings(username);
}


loginForm.addEventListener("submit", onLoginSubmit);

function paintGreetings(username) {
    greeting.innerText = `Hello ${username}`;
    greeting.classList.remove(HIDDEN_CLASSNAME);
}


const savedUsername = localStorage.getItem(USERNAME_KEY);
if (savedUsername === null) {
    loginForm.classList.remove(HIDDEN_CLASSNAME);
    loginForm.addEventListener("submit", onLoginSubmit);
}
else {
    paintGreetings(savedUsername);
}