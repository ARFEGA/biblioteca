import React, { Component } from 'react';
import { Link } from 'react-router-dom';
//Para poder acceder a los métodos de firestore
import { firestoreConnect } from 'react-redux-firebase';
import PropTypes from 'prop-types';

class NuevoSuscriptor extends Component {
    state = { 
        nombre:'',
        apellido:'',
        formacion:'',
        codigo:''
     }
    leerDato = e => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }
    agregarSubscriptor = e =>{
        //Para que no se ejecute nada más cargar la página
        e.preventDefault();
        //Extraemos el state a una variable
        const nuevoSuscriptor = this.state;
        //Extraemos firestore de props
        const { firestore, history } =this.props;
        //Ejecutamos el metodo add de firestore, pasandole la collección/tabla
        firestore.add({collection:'suscriptores'},nuevoSuscriptor)
            .then(() => history.push('/suscriptores'))
    }
   
    render() { 
       
        return ( 
            <div className="row">
                <div className="col-12 m-4">
                    <Link to={'/suscriptores'} className="btn btn-secondary">
                        <i className="fas fa-arrow-circle-left"></i> Volver Listado
                    </Link>
                </div>
                <div className="col-12">
                    <h2>
                        <i className="fas fa-user-plus"></i> Nuevo suscriptor
                    </h2>
                    <div className="row justify-content-center">
                    <div className="col-md-8 mt-5">
                        <form onSubmit={this.agregarSubscriptor}>
                            <div className="form-group">
                                <label>Nombre:</label>
                                <input
                                    type="text"
                                    className="form-control 100vw"
                                    name="nombre"
                                    placeholder="Nombre"
                                    required
                                    onChange={this.leerDato}
                                    value={this.state.nombre}
                                />
                            </div>
                            <div className="form-group">
                                <label>Apellido:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="apellido"
                                    placeholder="Apellido"
                                    required
                                    onChange={this.leerDato}
                                    value={this.state.apellido}
                                />
                            </div>
                            <div className="form-group">
                                <label>Formacion:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="formacion"
                                    placeholder="Formacion"
                                    required
                                    onChange={this.leerDato}
                                    value={this.state.formacion}
                                />
                            </div>
                            <div className="form-group">
                                <label>Codigo:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="codigo"
                                    placeholder="Codigo"
                                    required
                                    onChange={this.leerDato}
                                    value={this.state.codigo}
                                />
                            </div>
                            <input
                                type="submit"
                                className="btn btn-primary"
                                value="Guardar"
                            />
                        </form>
                    </div>
                </div>
                </div>
            </div>
           
        
        
            );
    }
};


NuevoSuscriptor.propTypes={
    firestore:PropTypes.object.isRequired
}


 
export default firestoreConnect()(NuevoSuscriptor);