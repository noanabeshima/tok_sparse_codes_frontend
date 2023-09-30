import './App.css'
import { AtomComponent, CodeComponent } from './Components.jsx'

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
  useParams
} from 'react-router-dom';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/code/:codeString" element={<CodeComponentWrapper />} />
        <Route path="/atom/:id" element={<AtomComponentWrapper />} />
      </Routes>
    </Router>
  );
}

// Wrapper for the CodeComponent
function CodeComponentWrapper() {
  let { codeString } = useParams();
  
  return <CodeComponent codeStringCandidate={codeString} />;
}

// Wrapper for the AtomComponent
function AtomComponentWrapper() {
  let { id } = useParams();
  
  // Convert to number and validate
  let atomId = Number(id);
  
  return <AtomComponent atom_idx={atomId} />;
}

export default App;