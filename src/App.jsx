import { BrowserRouter, Routes, Route } from "react-router-dom";
import AllComponentContainer from "./components/AllComponentsContainer/AllComponentContainer";

function App() {
  return (
    <div className="App" id="pagetodownload">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AllComponentContainer />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
