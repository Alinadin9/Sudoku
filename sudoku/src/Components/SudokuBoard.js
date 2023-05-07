import {React, useState, useEffect} from 'react';




function SudokuBoard(props) {
  const [board, setBoard] = useState([])
  const [solvable, setSolvable] = useState(false)
  useEffect(() => {
    const get_data = async () => {
      const response = await fetch('http://127.0.0.1:5000/views/generate_puzzle')
      const result = await response.json()
      console.log(result)

      setBoard(result.puzzle)
        // .then((data) => {data.text()})
        // .then((data) => {JSON.parse(data)})
        // .then((data) => {console.log(data)})
        
        // const response = await result["puzzle"]
        // setBoard(response)

    }
    get_data()
    
  },[] )

  function handleChange(event, row, col) {
    const value = parseInt(event.target.value);
    onChange(row, col, value);
  }
  
  function onChange(i, j, value) {
    if (board[i]) {
      const updatedRow = [...board[i]];
      updatedRow[j] = value;
      const updatedBoard = [...board];
      updatedBoard[i] = updatedRow;
      setBoard(updatedBoard);
    }
  }

   
  console.log(board)

  function trimite(){
      // Simple POST request with a JSON body using fetch
      const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify( board )
      };
      fetch('http://127.0.0.1:5000/views/sudokuSolver', requestOptions)
          .then(response => response.json())
          .then(data => setSolvable(data.response));
  }

  function solve(){
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify( board )
   };
    fetch('http://127.0.0.1:5000/views/solve_puzzle', requestOptions)
       .then(response => response.json())
       .then(data => setBoard(data.response));

  }

  function generatePuzzle(){
    const get_data = async () => {
      const response = await fetch('http://127.0.0.1:5000/views/generate_puzzle')
      const result = await response.json()
      console.log(result)

      setBoard(result.puzzle)
    }
    get_data()
  }

  return (
    <>
    <table className="sudoku-board">
      <tbody>
        {board.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((value, colIndex) => (
              <td key={`${rowIndex}-${colIndex}`}>
                <input style={{width: "60px", height: "60px", textAlign: "center", fontSize:30, fontFamily: "cursive" , border: "hidden", backgroundColor: "lightgreen"}} 
                              type="number" min="1" max="9" value={value || ''}  onChange={(event) => handleChange(event, rowIndex, colIndex)}  />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
    <button onClick={() => {solve()}}>
      Solve
    </button>
    <button onClick={() => {trimite()}}>
      Send
    </button>
    {
      solvable ? (
        <p>
          Correct
        </p>
      ): (
        <p> </p>
      )
    }
    <button onClick={() => {generatePuzzle()}}>
      Generate new puzzle
    </button>
    </>
  );
}

export default SudokuBoard;
