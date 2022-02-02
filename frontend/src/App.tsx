import './index.css';
import NanoLeafHome from './components/NanoLeafHome';
import { QueueMode, RandomMode, ManualMode } from './components/index';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
//import TestComponent from './components/TestComponent';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<NanoLeafHome />}>
          <Route
            path="manual"
            element={
              <ManualMode
                effectsList={[]}
                onEffectClick={() => {}}
                selectedEffect={''}
              />
            }
          />
          <Route path="random" element={<RandomMode />} />
          <Route path="queue" element={<QueueMode />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
