import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import PropTypes from 'prop-types';

const MostrarSuscriptor = ({suscriptor}) => {
    //Mostrar el spinner mientras se recibe la información
    if (!suscriptor) return <Spinner />    
    return ( 
        <div className="row mt-2">
            <div className="col-md-6 mb-4">
                <Link to={'/suscriptores'} className="btn btn-secondary">
                    <i className="fas fa-arrow-circle-left"></i> Suscriptores
                </Link>
            </div>
            <div className="col-md-6">
                <Link to={`/suscriptores/editar/${suscriptor.id}`} className="btn btn-primary float-left">
                    <i className="fas fa-pencil-alt"></i> Editar
                </Link>
            </div>
            <div className="col-12">
                <h2 className="mb-4">
                    {suscriptor.nombre} {suscriptor.apellido}
                </h2>
                <p>
                    <span className="font-weight-bold">Formación:</span> {suscriptor.formacion}
                </p>
                <p>
                    <span className="font-weight-bold">Código:</span> {suscriptor.codigo}
                </p>
            </div>
        </div>
    );
}
 
MostrarSuscriptor.propTypes={
    firestore:PropTypes.object.isRequired
}

export default compose(
    firestoreConnect(props =>[{
        collection:'suscriptores',//Indicamos la tabla de la que queremos recuperar el registro
        storeAs:'suscriptor',//Guardamos el resultado como suscriptor
        doc:props.match.params.id //Pasamos el id del suscriptor seleccionado
    }]),
    connect((state, props) =>
        ({//Así tendremos el contenido del suscriptor que queremos mostrar
            suscriptor: state.firestore.ordered.suscriptor && state.firestore.ordered.suscriptor[0]
        }))
)(MostrarSuscriptor);