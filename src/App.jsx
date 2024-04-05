import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AllComponentContainer from "./components/All Components Container/AllComponentContainer";




function App() {
  return (
    <>
      <div className="App" id="pagetodownload">
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <AllComponentContainer />
                </>
              }
            />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
