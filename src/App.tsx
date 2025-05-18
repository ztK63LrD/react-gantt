import { useState } from 'react';
import GanttView from './components/gantt';
import GanttView1 from './components/gantt1';
import GanttView2 from './components/gantt2';
import './App.css';

const App = () => {
  const [view, setView] = useState(0);

  const handleViewChange = (index: number) => {
    setView(index);
  };

  return (
    <div className="container">
      <div className='btn'>
        <button onClick={() => handleViewChange(0)} style={{ backgroundColor: view === 0 ? 'red' : 'transparent' }}>3天</button>
        <button onClick={() => handleViewChange(1)} style={{ backgroundColor: view === 1 ? 'red' : 'transparent' }}>7天</button>
        <button onClick={() => handleViewChange(2)} style={{ backgroundColor: view === 2 ? 'red' : 'transparent' }}>30天</button>
      </div>
      { view === 0 && (
        <GanttView />
      )}
      { view === 1 && (
        <GanttView1 />
      )}
      { view === 2 && (
        <GanttView2 />
      )}
    </div>
  );
}

export default App;
