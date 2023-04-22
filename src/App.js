import logo from './logo.svg';
import './App.css';
import Tictactoe from './Tictactoe';
{/*import Invoice, { displayInvoiceDetails, displayInvoiceTable } from './invoice.js';
function App() {
  return (
    <div className="App">
     <Invoice/>
    </div>
  );
}
*/}
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Tic Tac Toe Game</h1>
      </header>
      <Tictactoe/>
    </div>
  );
}
export default App;
