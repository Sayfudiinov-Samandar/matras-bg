import { Route, Routes } from "react-router";
import { Login } from "./pages/Login/Login";
import { useSelector } from "react-redux";
import { Admin } from "./pages/Admin/Admin";




function App() {
    const {token} = useSelector(state => state);



  return (
    <div className="app">

      <Routes>
        <Route path="/*" element={token.token?  <Admin/> : <Login/>}/>
      </Routes>
    </div>
  );
}

export default App;
