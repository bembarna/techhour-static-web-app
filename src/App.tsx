import React, { useState } from 'react';
import './App.css';

function App() {

  const [text, setText] = useState("Click me!");

  const testTrigger = async () => {
    let { text } = await( await fetch("http://localhost:7071/api/HttpTrigger")).json();
    setText(text);
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <button onClick={() => {testTrigger()}}>{text}</button>
      </header>
    </div>
  );
}

export default App;
