import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Headers';
import Currency from './components/Currency';
import CryptoDetails from './components/Coin';
import { SelectedOptionProvider } from './components/Context/context';

function App() {
  return (
    <BrowserRouter>
      <SelectedOptionProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Currency />} />
          <Route path="/crypto/:id" element={<CryptoDetails />} />
        </Routes>
      </SelectedOptionProvider>

    </BrowserRouter>
  );
}

export default App;
