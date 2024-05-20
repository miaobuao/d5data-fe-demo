import React, { useState } from "react";
import ReactDOM from "react-dom/client";
// import UserData from './classbased';
import UserData from "./func-based";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

function App() {
  const [mounted, setMounted] = useState(true)
  return (
    <>
      <button onClick={()=>setMounted(!mounted)}>toggle</button>
      {mounted && <UserData userId="test" />}
    </>
  );
}

root.render(
  <React.StrictMode>
    <App></App>
  </React.StrictMode>
);
