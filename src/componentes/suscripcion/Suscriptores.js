import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import PropTypes from 'prop-types';




const Suscriptores = (props) => {

    const { firestore } = props;
    if(!props.suscriptores) return <Spinner/>

    const eliminarRegistro = id =>{
        firestore.delete({
            collection:'suscriptores',
            doc:id
        });
    }
    return ( 
        <div className="row">
            <div className="col-md-12 mt-4 mb-4">
                {/*TODO: Mostrar enlace para crear nuevos suscriptores */}
                <Link
                    to="/suscriptores/nuevo" className="btn btn-secondary"
                >
                    <i className="fas fa-plus"></i> Nuevo suscriptor
                </Link>
            </div>
            <div className="col-md-8">
                <h2>
                    <i className="fas fa-users"></i> Suscriptores
                </h2>
            </div>
            <table className="table table-striped mt-4">
                <thead className="text-light bg-secondary">
                    <tr>
                        <th>Nombre</th>
                        <th>Formación</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {props.suscriptores.map(suscriptor =>(
                        <tr key={suscriptor.id}>
                            <td>{suscriptor.nombre} {suscriptor.apellido}</td>
                            <td>{suscriptor.formacion}</td>
                            <td className="d-flex justify-content-center">
                                <Link
                                    to={`/suscriptores/mostrar/${suscriptor.id}`} className="btn btn-primary border "
                                >
                                    Más info <i className="fas fa-angle-double-right"/> 
                                </Link>
                                <button 
                                    className="btn btn-danger ml-2 border" 
                                    onClick={()=> eliminarRegistro(suscriptor.id)}>
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
 
Suscriptores.propTypes={
    firestore: PropTypes.object.isRequired,
    suscriptores: PropTypes.array
}

export default compose(
    firestoreConnect([{collection : 'suscriptores'}]),
    connect((state,props) => 
          ({//Así tendremos el contenido de suscriptores que está en firebase en el state
            suscriptores : state.firestore.ordered.suscriptores
        }))
)(Suscriptores);