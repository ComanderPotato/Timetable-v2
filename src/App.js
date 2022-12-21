import './App.css';
import Header from './layouts/Header';
import Form from './layouts/Form';
import {AssignmentsProvider} from './context/AssignmentsContext';
import List from './layouts/List';
function App() {
  
  return (
    <div className='app'>
      <AssignmentsProvider>

      {/* Header Component */}
      <Header />
        <div className='app__body'>
          <Form />
          <List/>
        </div>
      </AssignmentsProvider>
    </div>
  );
}

export default App;
