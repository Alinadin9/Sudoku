import './App.css';
import Home from "./Components/home"
import SudokuBoard from './Components/SudokuBoard';


function App() {
  return (
    <body style={{backgroundColor: "lightseagreen"}}>
      <div  className="App">
       <Home></Home>
       <SudokuBoard></SudokuBoard>
     </div>
    </body>
  );
}

export default App;
