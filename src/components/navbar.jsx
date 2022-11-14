import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <>  
 <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <Link class="navbar-brand" to="/">
    Vidly
 </Link>
  <button 
  class="navbar-toggler" 
  type="button" 
  data-toggle="collapse" 
  data-target="#navbarSupportedContent" 
  aria-controls="navbarSupportedContent" 
  aria-expanded="false"
  aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav">
      <li class="nav-item nav-link">
        <Link class="nav-link" to="/movies">Movies</Link>
      </li>
      <li class="nav-item nav-link">
        <Link class="nav-link" to="/customers">Customer</Link>
      </li>
      <li class="nav-item nav-link">
        <Link class="nav-link" to="/rentals">Rentals</Link>
      </li>

    </ul>
  </div>
</nav>
    </>
  )
}

export default Navbar