const socket = io();

const usernameForm = document.getElementById("username-form");
const usernameInput = document.getElementById("username");
const chat = document.getElementById("chat");
const messages = document.getElementById("messages");
const form = document.getElementById("form");
const input = document.getElementById("input");

usernameForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const username = usernameInput.value.trim();
  if (username) {
    window.currentUsername = username;
    socket.emit("set username", username);
    usernameForm.classList.add("hidden");
    chat.classList.remove("hidden");
  }
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (input.value.trim()) {
    socket.emit("chat message", {
      username: window.currentUsername,
      message: input.value.trim(),
    });
    input.value = "";
  }
});

socket.on("chat message", (data) => {
  const li = document.createElement("li");
  li.className = data.username === "⚡ SYSTEM" ? "system-message" : "user-message";
  li.innerHTML = `<strong>${data.username}</strong>: ${data.message}`;
  messages.appendChild(li);
  messages.scrollTop = messages.scrollHeight; // 
});
