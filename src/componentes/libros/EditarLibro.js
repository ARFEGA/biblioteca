import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';


class EditarLibro extends Component {
    //refs
    refTitulo = React.createRef();
    refISBN = React.createRef();
    refEditorial = React.createRef();
    refStock = React.createRef();

    actualizarLibro= e =>{
        e.preventDefault()
        //Creo objeto a registrar en firestore
        const libroActualizado = {
            titulo:this.refTitulo.current.value,
            ISBN: this.refISBN.current.value,
            editorial: this.refEditorial.current.value,
            stock: this.refStock.current.value
        }
        //Destructuring
        const {firestore,history,libro} = this.props;
        //Guardar en firestore y redireccionar
        firestore.update({ collection: 'libros', doc: libro.id }, libroActualizado).then(() => {
            history.push('/');
        });
    }
    render() { 
        const { libro } = this.props;
        return ( 
            <div className="row">
                <div className="col-12 mt-4">
                    <Link to={'/'} className="btn btn-secondary">
                        <i className="fas fa-arrow-circle-left"></i> Listado Libros
                    </Link>
                </div>
                <div className="col-12 mt-4">
                    <h2> <i className="fas fa-pencil-alt"></i> Editar Libro</h2>
                    <div className="row justify-content-center mt-4">
                        <div className="col-md-8">
                            <form onSubmit={this.actualizarLibro}>
                                <div className="form-group">
                                    <label>Titulo:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        required
                                        name="titulo"
                                        ref={this.refTitulo}
                                        defaultValue={libro.titulo}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>ISBN:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        required
                                        name="ISBN"
                                        ref={this.refISBN}
                                        defaultValue={libro.ISBN}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Editorial:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        required
                                        name="editorial"
                                        ref={this.refEditorial}
                                        defaultValue={libro.editorial}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Stock:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        required
                                        name="stock"
                                        ref={this.refStock}
                                        defaultValue={libro.stock}
                                    />
                                </div>
                                <input type="submit" className="btn btn-success" value="Actualizar Libro"/>
                            </form>
                        </div>
                    </div>
                </div>
               
            </div>
            );
    }
}
 
EditarLibro.propTypes = {
    firestore: PropTypes.object.isRequired
}
export default compose(
    firestoreConnect(props => [{
        collection: 'libros',//Indicamos la tabla de la que queremos recuperar el registro
        storeAs: 'libro',//Guardamos el resultado como libro
        doc: props.match.params.id //Pasamos el id del libro seleccionado
    }]),
    connect((state, props) =>
        ({//Así tendremos el contenido del libro que queremos mostrar, pasandolo pr props
            libro: state.firestore.ordered.libro && state.firestore.ordered.libro[0]
        }))
)(EditarLibro);

