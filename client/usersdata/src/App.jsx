
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Users from './component/Users';
import Register from './pages/Register';
import Update from './pages/Update';

function App() {
  return (
    <div className="App">
      <div className='bg-info'>
        <h2 className='text-center'>User Data</h2>
      </div>
      <Register/>
      <Users/>
      <Routes><Route path='/edit' element={<Update></Update>}/></Routes>
    </div>
  );
}

export default App;
