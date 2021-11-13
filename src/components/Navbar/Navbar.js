import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [click, setClick] = useState(false);

  const handleOnClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);
  return (
    <Fragment>
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo">
            NAV<i className="fab fa-typo3" />
          </Link>
          <div className="menu-icon" onClick={handleOnClick}>
            <i className={click ? "fas fa-times" : "fas fa-bars"} />
          </div>

          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <Link to="/" className="nav-links" onClick={closeMobileMenu}>Home</Link>
            </li>
          </ul>
        </div>
      </nav>
    </Fragment>
  )
}

export default Navbar;
