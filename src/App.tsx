import React, { useState } from 'react';
import './App.css';
import { getURL } from './EnviromentContext';

function App() {

  const [text, setText] = useState("Click me!");

  const testTrigger = async () => {
    let text  = await (await fetch(getURL()+"HttpTrigger").then()).text()
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
          {text}
        </a>
        <button onClick={() => {testTrigger()}}>{text}</button>
      </header>
    </div>
  );
}

export default App;
