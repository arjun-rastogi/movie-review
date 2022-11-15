import React from 'react'
import Movies from './components/movies';
import Navbar from './components/navbar';
import MovieForm from './components/movieForm';
import Customers from './components/customers';
import Rentals from './components/rentals';
import Notfound from './components/notFound';
import LoginForm from './components/loginForm';
import RegisterForm from './components/registerForm';
import { 
  BrowserRouter as Router, Routes, Route, Navigate 
} from 'react-router-dom';

const App = () => {
  return (
    <>
    <Router>
    <Navbar />
    <main className="container">
      <Routes>
        <Route path='/register' element={<RegisterForm />}/>
        <Route path='/login' element={<LoginForm />}/>
        <Route path='/movies/:id' element={<MovieForm />}/>
        <Route path='/movies' element={<Movies />}/>
        <Route path='/customers' element={<Customers />}/>
        <Route path='/rentals' element={<Rentals />}/>
        <Route path='/not-found' element={<Notfound />}/>
        <Route path='/' element={<Navigate to="/movies" replace />} />
        <Route path='*' element={<Navigate to="/not-found" replace />} />
      </Routes>
    </main>
    </Router>
    </>
  )
}

export default App