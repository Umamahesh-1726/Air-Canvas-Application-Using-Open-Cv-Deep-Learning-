import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WelcomePage from "./components/WelcomePage";
import Sheet from "./components/Sheet";
import Gallery from "./components/Gallery";

const App: React.FC = () => {
  const [started, setStarted] = useState(false);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            !started ? (
              <WelcomePage onStart={() => setStarted(true)} />
            ) : (
              <Sheet />
            )
          }
        />
        <Route path="/gallery" element={<Gallery />} />
      </Routes>
    </Router>
  );
};

export default App;
