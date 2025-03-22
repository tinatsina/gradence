import stlyes from './HomePage.module.css';
import NavBar from '../../components/NavBar/NavBar';

const HomePage = () => (
  <>
    <NavBar />
    <h1 className={stlyes.homepage}>HomePage</h1>
  </>
);

export default HomePage;
