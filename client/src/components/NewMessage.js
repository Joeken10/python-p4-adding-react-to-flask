import React, { useState } from "react";

function NewMessage({ currentUser, onAddMessage }) {
  const [body, setBody] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://127.0.0.1:5555/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: currentUser.username,
        body: body,
      }),
    })
      .then((response) => response.json())
      .then((newMessage) => {
        onAddMessage(newMessage);
        setBody(""); // Reset the input field
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder="Type your message here..."
        required
      />
      <button type="submit">Send</button>
    </form>
  );
}

export default NewMessage;
