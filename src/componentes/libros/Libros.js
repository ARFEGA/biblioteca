import React from 'react'
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import PropTypes from 'prop-types';


const Libros = (props) => {
    const { firestore } = props;
    //Mostrar spinner mientras se carga la información
    if (!props.libros) return <Spinner />
    //Eliminar libros
    const eliminarRegistro = id => {
        firestore.delete({
            collection: 'libros',
            doc: id
        });
    }
    return (
        <div className="row">
            <div className="col-md-12 mt-4 mb-4">
                {/*TODO: Mostrar enlace para crear nuevo libro */}
                <Link
                    to="/libros/nuevo" className="btn btn-secondary"
                >
                    <i className="fas fa-plus"></i> Nuevo libro
                </Link>
            </div>
            <div className="col-md-8">
                <h2>
                    <i className="fas fa-book"></i> Libros
                </h2>
            </div>
            <table className="table table-striped mt-4">
                <thead className="text-light bg-secondary">
                    <tr>
                        <th>Titulo</th>
                        <th>ISBN</th>
                        <th>Editorial</th>
                        <th>Stock</th>
                        <th>Disponibles</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {props.libros.map(libro => (
                        <tr key={libro.id}>
                            <td>{libro.titulo}</td>
                            <td>{libro.ISBN}</td>
                            <td>{libro.editorial}</td>
                            <td>{libro.stock}</td>
                            <td>{libro.stock - libro.prestados.length}</td>
                            <td className="d-flex justify-content-center">
                                <Link
                                    to={`/libros/mostrar/${libro.id}`} className="btn btn-primary border "
                                >
                                    Más info <i className="fas fa-angle-double-right" />
                                </Link>
                                <button
                                    className="btn btn-danger ml-2 border"
                                    onClick={() => eliminarRegistro(libro.id)}>
                                    Eliminar {' '}
                                    <i className="fas fa-trash-alt"></i>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

    );

}
 
Libros.propTypes = {
    firestore: PropTypes.object.isRequired,
    libros: PropTypes.array
}

export default compose(
    firestoreConnect([{ collection: 'libros' }]),
    connect((state, props) =>
        ({//Así tendremos el contenido de libros que está en firebase en el state
            libros: state.firestore.ordered.libros
        }))
)(Libros);