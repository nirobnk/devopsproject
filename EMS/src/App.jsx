import { Routes, Route } from "react-router-dom";


import Dashboard from "./pages/Dashboard";
import Header from "./pages/Header";
import NoMatch from "./pages/NoMatch";
import PostUser from "./pages/PostUser";
import UpdateUser from "./pages/UpdateUser";


function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Dashboard/>}/>
        <Route path="/postemployee" element={<PostUser/>}/>
        <Route path="/employee/:id" element={<UpdateUser/>}/>
        <Route path="*" element={<NoMatch/>}/>

      </Routes>
    </>
  );
}

export default App;
