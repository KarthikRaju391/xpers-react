import React from 'react';
import { ExpensesContextProvider } from './context/ExpensesContext';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import YourExpenses from './pages/YourExpenses';

function App() {
   return (
      <ExpensesContextProvider>
         <Router>
            <Navbar />
            <Routes>
               <Route exact path='/' element={<Home />} />
               <Route exact path='/expenses' element={<YourExpenses />} />
            </Routes>
         </Router>
      </ExpensesContextProvider>
   );
}

export default App;
