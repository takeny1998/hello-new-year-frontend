// src/main/frontend/src/App.js

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./pages/Main";
import Login from "./pages/Login";
import CreateAccount from "./pages/CreateAccount";
import React from "react";
import LetterBox from "./pages/LetterBox";
import InviteLetter from "./pages/InviteLetter";
import SendLetter from "./pages/SendLetter";
import ReadLetter from "./pages/ReadLetter";
import Custom from "./pages/Custom";
import SendComplete from "pages/SendComplete";

function App() {
  function setScreenSize() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }
  React.useEffect(() => {
    setScreenSize();
  });

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<CreateAccount />} />
        <Route path="/letter-box" element={<LetterBox />} />
        <Route path="/letter-box/:id" element={<ReadLetter />} />
        <Route path="/letter/:uuid" element={<InviteLetter />} />
        <Route path="/letter/:uuid/send" element={<SendLetter />} />
        <Route path="/letter/:uuid/send/complete" element={<SendComplete />} />
        <Route path="/custom" element={<Custom />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
