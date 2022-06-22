import './App.css';
import ItemDetails from './ItemDetails';
import ItemEdit from './ItemEdit';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
function App(props) {
  return (
     <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<ItemDetails />} />
          <Route exact path="/ItemEdit/editID/:id" element={<ItemEdit />} />
        </Routes>
      </div>
    </Router>
 
  );
}
 
export default App;
