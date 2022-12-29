import './App.css';
import Header from './layouts/Header';
import Form from './layouts/Form';

import AssignmentsStateProvider from './context/AssignmentContext';
import List from './layouts/List';
function App() {
  
  return (
    <div className='app'>
      <AssignmentsStateProvider>
        {/* Header Component */}
        <Header/>
          <div className='app__body'>
            <Form />
            <List/>
          </div>
      </AssignmentsStateProvider>
    </div>
  );
}

export default App;
