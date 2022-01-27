import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Home from "pages/home";
import Wallet from "pages/wallet";
import Transactions from "pages/transactions";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Router>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/wallet/:address" element={<Wallet />} />
        <Route path="/transactions" element={<Transactions />} />
    
      </Routes>
    </Router>
  );
}

export default App;
