import React from 'react';
import { BrowserRouter , Route, Switch }  from 'react-router-dom';
//REDUX
//STORE Y PROVIDER
import store from './REDUX/store';
import { Provider } from 'react-redux';

//Libros
import Libros from './componentes/libros/Libros';
import EditarLibro from './componentes/libros/EditarLibro';
import NuevoLibro from './componentes/libros/NuevoLibro';
import MostrarLibro from './componentes/libros/MostrarLibro';
import PrestamoLibro from './componentes/libros/PrestamoLibro';

import Suscriptores from './componentes/suscripcion/Suscriptores';
import NuevoSuscriptor from './componentes/suscripcion/NuevoSuscriptor';
import EditarSuscriptor from './componentes/suscripcion/EditarSuscriptor';
import MostrarSuscriptor from './componentes/suscripcion/MostrarSuscriptor';
import Navbar from './componentes/layout/Navbar';
import Login from './componentes/auth/Login';

//Para redirigir al usuario en función de si está autenticado
import { UserIsAuthenticated,UserIsNotAuthenticated } from './helpers/auth';


function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Navbar />
        <div className="container">
          <Switch>
            <Route exact path="/" component={UserIsAuthenticated(Libros)}/>
            <Route exact path="/libros/nuevo" component={UserIsAuthenticated(NuevoLibro)} />
            <Route exact path="/libros/editar/:id" component={UserIsAuthenticated(EditarLibro)} />
            <Route exact path="/libros/mostrar/:id" component={UserIsAuthenticated(MostrarLibro)} />
            <Route exact path="/libros/prestamo/:id" component={UserIsAuthenticated(PrestamoLibro)} />

            <Route exact path="/suscriptores" component={UserIsAuthenticated(Suscriptores)}/>
            <Route exact path="/suscriptores/nuevo" component={UserIsAuthenticated(NuevoSuscriptor)} />
            <Route exact path="/suscriptores/mostrar/:id" component={UserIsAuthenticated(MostrarSuscriptor)} />
            <Route exact path="/suscriptores/editar/:id" component={UserIsAuthenticated(EditarSuscriptor)}/> 

            <Route exact path="/login" component={UserIsNotAuthenticated(Login)}/>
          </Switch>
        </div>  
      </BrowserRouter>
    </Provider>
  );
}

export default App;
