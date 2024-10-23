import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import AuthContextProvider from './context/authContext';
import Register from './components/Register';
import Home from './components/Home';
import CustomerContextProvider from './context/customerContext';
import Dashboard from './components/admin/dashboard';
import AddItem from './components/admin/add_items';
import AddVendorDetails from './components/admin/vendor_profile';
import ProductContextProvider from './context/productContext';
import ViewItemsDash from './components/admin/viewItems';
import AddCustomerDetails from './components/profileCustomer';
import Details from './components/details';
import Shop from './components/shop';
import Cart from './components/cart';
import ProtectedRoute from './protectedRoute';

function App() {
  return (
    <div className="App">
      <AuthContextProvider>
       <CustomerContextProvider>
       <ProductContextProvider>
       <Router>
          <Routes>
            <Route path='/' element={<Login/>} />
            <Route path='/register' element= {<Register/>} />


            {/* Protected Route */}
            
            <Route path='/home'  element={<ProtectedRoute><Home/></ProtectedRoute>}/>
            <Route path='/dashboard' element= {<ProtectedRoute><Dashboard/></ProtectedRoute>}/>
            <Route path='/admin/additem' element={<ProtectedRoute><AddItem/></ProtectedRoute>} />
            <Route path='/admin/vendor/profile' element= {<ProtectedRoute><AddVendorDetails/></ProtectedRoute>}/>
            <Route path='/admin/vendor/items' element = {<ProtectedRoute><ViewItemsDash/></ProtectedRoute>} />
            <Route path='/profile/create' element = {<ProtectedRoute><AddCustomerDetails/></ProtectedRoute>}/>
            <Route path='/details/:id' element= {<ProtectedRoute><Details/></ProtectedRoute>} />
            <Route path='/shop' element= {<ProtectedRoute><Shop/></ProtectedRoute>}/>
            <Route path= '/cart' element= {<ProtectedRoute><Cart/></ProtectedRoute>}/>
          </Routes>
        </Router>
       </ProductContextProvider>
       </CustomerContextProvider>
      </AuthContextProvider>
    </div>
  );
}

export default App;
