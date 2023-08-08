import './App.css';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import PrivateRoute from './utils/PrivateRoute'
import { AuthProvider } from './context/AuthContext'

import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import Header from './components/Header'

function App() {
  return (
    <div className="App container">
      <Router>
        <AuthProvider>
          <Header />
          <Routes>
            <Route path='/' element={<PrivateRoute>
              <HomePage />
            </PrivateRoute>} exact/>
            <Route Component={LoginPage} path='/login'/>
            <Route Component={RegisterPage} path='/register'/>
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
