import './App.css';
import PostfixEvaluator from './postfixToCircuit';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';

function App() {
  return (
    <Router>
    <Routes>
    <Route exact path="/" element={<PostfixEvaluator/>}/>
    </Routes>
</Router>
  );
}

export default App;
