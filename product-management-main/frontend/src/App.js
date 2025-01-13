import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/signIn';
import SignUp from './components/signUp';
import Client from './components/client';
import Admin from './components/admin';
import UpdateAccountGeneral from './components/updateAccountGeneral';
import ViewProduit from './components/viewProduit'; // Assurez-vous que cette ligne existe
import AdminUsers from './components/viewUsersAdmin';
import AddFournisseur from './components/addFournisseur';
import UpdateFournisseur from './components/updateFournisseur';
import ViewArticles from './components/ViewArticle';
import AddArticle from './components/addArticle';
import UpdateArticle from './components/updateArticle';
import UpdateAccountGeneralAdmin from './components/updateAccountAdmin';
import './index.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/client/:id" element={<Client />} />
          <Route path="/updateAccountGeneral/:id" element={<UpdateAccountGeneral />} />
          <Route path="/updateAccountGeneralAdmin/:id" element={<UpdateAccountGeneralAdmin />} />
          <Route path="/viewProduit/:id" element={<ViewProduit />} />
          
          {/* Routes pour Admin */}
          <Route path="/admin">
            <Route index element={<Admin />} />
            <Route path=":id" element={<Admin />} /> {/* Route mise à jour */}
            <Route path="users" element={<AdminUsers />} />
            <Route path="addFournisseur" element={<AddFournisseur />} />
            <Route path="updateFournisseur/:id" element={<UpdateFournisseur />} />
            <Route path="viewArticles/:id" element={<ViewArticles />} />
            <Route path="addArticle/:id" element={<AddArticle />} />
            <Route path="updateArticle/:idF/:id" element={<UpdateArticle />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
