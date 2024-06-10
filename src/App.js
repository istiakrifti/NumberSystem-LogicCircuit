import './App.css';
import PostfixEvaluator from './postfixToCircuit';
import Linecoding from './linecoding';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';

function App() {
  return (
    <Router>
    <Routes>
    <Route exact path="/" element={<PostfixEvaluator/>}/>
    <Route exact path="/linecoding" element={<Linecoding/>}/>
    </Routes>
</Router>
  );
}

export default App;
