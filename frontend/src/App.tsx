import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';
import HomeScreen from './screens/HomeScreen';
import LogoutScreen from './screens/LogoutScreen';

const App = () => {
  return (
    <Router>
      <Header />
      <Container className="py-4">
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/pages/:pageNum" element={<HomeScreen />} />
          <Route path="/pages/" element={<HomeScreen />} />
          <Route path="/logout" element={<LogoutScreen />} />
        </Routes>
      </Container>
      <Footer />
    </Router>
  );
};

export default App;
