import React from 'react';
import { HashLink } from 'react-router-hash-link';

const NavTab = () => {
  return (
    <nav className="navtab">
      <HashLink to="#project" className="navtab__link">О проекте</HashLink>
      <HashLink to="#technology" className="navtab__link">Технологии</HashLink>
      <HashLink to="#student" className="navtab__link">Студент</HashLink>
    </nav>
  )
}

export default NavTab;