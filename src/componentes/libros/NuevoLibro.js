import React, { Component } from 'react';
import { Link } from 'react-router-dom';
//Para poder acceder a los métodos de firestore
import { firestoreConnect } from 'react-redux-firebase';
import PropTypes from 'prop-types';

class NuevoLibro extends Component {
    state = {
        titulo:'',
        ISBN:'',
        editorial:'',
        stock:'',
        prestados:[]
      }
    //Actualiza valor en state
    actualizarValor = e =>{
        this.setState({[e.target.name]:e.target.value})
    }
    //Añade libro a firestore
    agregarLibro = e =>{
        e.preventDefault();
        const nuevoLibro = this.state;
        const { firestore , history} = this.props;
        firestore.add({collection:"libros"}, nuevoLibro).then(() => history.push('/'));
    }
    render() { 
        return ( 
            <div className="row">
                <div className="col-md-12 mb-4 mt-4">
                    <Link to={'/'} className="btn btn-secondary">
                        <i className="fas fa-arrow-circle-left"></i> Listado Libros
                    </Link>
                </div>
                <div className="col-md-12">
                    <h2><i className="fas fa-book"></i> Libros</h2>
                
                    <div className="row justify-content-center">
                        <div className="col-md-8 mt-4">
                        <form onSubmit={this.agregarLibro}>
                            <div className="form-group">
                                <label>Titulo:</label>
                                <input
                                    type="text"
                                    name="titulo"
                                    className="form-control 100vw"
                                    placeholder="Titulo del libro"
                                    value={this.state.titulo}
                                    onChange={this.actualizarValor}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>ISBN:</label>
                                <input
                                    type="text"
                                    name="ISBN"
                                    className="form-control"
                                    placeholder="ISBN del libro"
                                    value={this.state.ISBN}
                                    onChange={this.actualizarValor}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Editorial:</label>
                                <input
                                    type="text"
                                    name="editorial"
                                    className="form-control"
                                    placeholder="Editorial del libro"
                                    value={this.state.editorial}
                                    onChange={this.actualizarValor}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Stock:</label>
                                <input
                                    type="text"
                                    name="stock"
                                    className="form-control"
                                    min="0"
                                    placeholder="Stock del libro"
                                    value={this.state.stock}
                                    onChange={this.actualizarValor}
                                    required
                                />
                            </div>
                            <input type="submit" className="btn btn-success" value="Agregar Libro"/>
                        </form>
                        </div>
                    </div>
                </div>
            </div>
            );
    }
}
NuevoLibro.propTypes = {
    firestore: PropTypes.object.isRequired
}

export default firestoreConnect()(NuevoLibro);