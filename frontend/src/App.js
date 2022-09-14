import "./App.css";
import { useState, useEffect } from "react";
import io from "socket.io-client";
import { nanoid } from "nanoid";

const socket = io.connect("http://localhost:8000"); // yah connect kar raha h backend wala socket say
const userName = nanoid(4);

function App() {
  const [message, setMessage] = useState("");// yha jo v likho ge ea layga control component
  const [chat, setChat] = useState([]); //  yah jo v likha ha msg may ea sab copy karayga

  // line 16 or line 21 may jo chats ha whe backend may v hoga 
  const sendChat = (e) => {
    e.preventDefault();
    socket.emit("chats", { message, userName });// yaha per hm set kar rhe ha socket may wo message
    setMessage("");
  };

  useEffect(() => {
    socket.on("chats", (payload) => {
      setChat([...chat, payload]);
    });
  });

  return (
    <div className="App">
      <header className="App-header">
        <h1>Chatty app</h1>
        {chat.map((payload, index) => {
          return (
            <p key={index} style={{color:"white"}}>
              {payload.message}: <span>id: {payload.userName}</span>
            </p>
          );
        })}

        <form onSubmit={sendChat}>
          <input
            type="text"
            name="chat"
            placeholder="send text"
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
          />
          <button type="submit">Send</button>
        </form>
      </header>
    </div>
  );
}

export default App;
