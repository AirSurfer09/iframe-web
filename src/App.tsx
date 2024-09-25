import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [messageFromParent, setMessageFromParent] = useState<string | null>(null);

  // Send message to parent when button is clicked
  const sendMessageToParent = () => {
    if (window.parent) {
      window.parent.postMessage(`Count is ${count}`, "*"); // "*" allows cross-origin messaging (replace with specific origin for security)
    }
  };

  // Receive messages from the parent
  useEffect(() => {
    const messageHandler = (event: MessageEvent) => {
      if (event.origin) {
        // Verify the origin for security (replace with your actual parent domain)
        console.log(event.origin)
      }
      // Set the received message
      setMessageFromParent(event.data);
    };

    window.addEventListener("message", messageHandler);

    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener("message", messageHandler);
    };
  }, []);

  return (
    <>
      <div className="card">
        <button onClick={() => {
          setCount((count) => count + 1);
          sendMessageToParent()
        }}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <p>Message from parent: {messageFromParent || "No message received yet"}</p>
    </>
  )
}

export default App
