import React from "react";
import Navbar from "./Components/Navbar/Navbar";
import Admin from "./Pages/Admin/Admin"
import Footer from "./Components/AdminFooter/AdminFooter"
const App = () =>{
  return(
    <div>
      <Navbar/>
      <Admin/>
      <Footer/> 
    </div>
  )
}
export default App