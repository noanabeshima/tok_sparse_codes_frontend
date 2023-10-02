import './App.css'
import './normalize.css'
import { AtomComponent, CodeComponent } from './Components.jsx'
import SearchBar from './SearchBar.jsx'

import {
  BrowserRouter as Router,
  Routes,
  Route,
  useParams
} from 'react-router-dom';



function Index() {
  return (
    <>
      <SearchBar/>
    </>
  );
}

function App() {
  return (
    <>
      <Index/>
      <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <div style={{width: "90%"}}>
      <Router>
        <Routes>
          <Route path="/code/:codeString" element={<CodeComponentWrapper />} />
          <Route path="/atom/:id" element={<AtomComponentWrapper />} />
        </Routes>
      </Router>
      </div>
      </div>
    </>
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