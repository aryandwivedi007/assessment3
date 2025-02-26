
import { ErrorBoundary } from "react-error-boundary";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./component/Header";
import Home from "./pages/homepage";
import Food from "./pages/foodpage";
import Restorents from "./pages/restorents";
import OrderPage from "./pages/orderpage";
import BecomePartnerPage from "./pages/becomepartner";
import LoginPage from "./pages/loginpage";
import SignupPage from "./pages/signuppage";
import DriverDashboard from "./pages/DriverDashboard";
import { DummyRestorents } from "./pages/dummyRestorents";
import useNotificationPermission from "./hooks/useNotificationPermission";
import { AuthProvider } from "./context/AuthContext";
import Authenticated from "./layout/Authenticated"; 
import { ErrorFallback } from "./error/ErrorBoundary";

function App() {
  useNotificationPermission();

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
    <AuthProvider>
      <Router>
        <Header /> 
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/" element={<Home />} />
          <Route path="/food" element={<Food />} />
          <Route path="/restorents" element={<Restorents />} />

          {/* Protected Routes */}
          <Route element={<Authenticated />}>
            <Route path="/dummy-restorents" element={<DummyRestorents />} />
            <Route path="/orders" element={<OrderPage />} />
            <Route path="/become-partner" element={<BecomePartnerPage />} />
          </Route>

          <Route path="/driver-dashboard" element={<DriverDashboard />} />
        </Routes>
      </Router>
    </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;


