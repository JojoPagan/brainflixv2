import { Link } from 'react-router-dom';
import logo from '../assets/images/BrainFlix-logo.svg';
import searchIcon from '../assets/images/search.svg';
import uploadIcon from '../assets/images/upload.svg';
import profileImage from '../assets/images/Mohan-muruge.jpg';
import '../styles/Header.scss';


const HeaderFeatures = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <form className="header-feature" onSubmit={handleSubmit}>
      <div className="header-feature__input-wrapper">
        <img className="header-feature__search-icon" src={searchIcon} alt="search icon" />
        <label className="header-feature__label" htmlFor="search"></label>
        <input className="header-feature__input" type="text" name="search" placeholder="Search" />
      </div>

      <Link className="header-feature__submit" to="/upload">
        <img className="header-feature__submit-icon" src={uploadIcon} alt="upload icon" />
        UPLOAD
      </Link>

      <div className="header-feature__avatar-wrapper">
        <img className="header-feature__avatar" src={profileImage} alt="Mogan muruge" />
      </div>
    </form>
  );
};


const Header = () => {
  return (
    <nav className="nav">
      <Link to="/">
        <img className="nav__logo" src={logo} alt="BrainFlix logo" />
      </Link>
      <HeaderFeatures />
    </nav>
  );
};

export default Header;
