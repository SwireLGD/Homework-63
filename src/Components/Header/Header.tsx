import { NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './Header.css';

const Header = () => {
  return (
    <div className='bg-primary d-flex justify-content-between container-fluid'>
      <h1 className='text-light'>My Blog</h1>
      <nav>
        <ul className='list-group d-flex flex-row'>
          <li className='navItem list-group-item bg-primary border-0'><NavLink to="/" end className={({ isActive }) => isActive ? 'active' : undefined}>Home</NavLink></li>
          <li className='navItem list-group-item bg-primary border-0'><NavLink to="/new-post" className={({ isActive }) => isActive ? 'active' : undefined}>Add</NavLink></li>
          <li className='navItem list-group-item bg-primary border-0'><NavLink to="/about-us" className={({ isActive }) => isActive ? 'active' : undefined}>About Us</NavLink></li>
          <li className='navItem list-group-item bg-primary border-0'><NavLink to="/contacts" className={({ isActive }) => isActive ? 'active' : undefined}>Contacts</NavLink></li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;