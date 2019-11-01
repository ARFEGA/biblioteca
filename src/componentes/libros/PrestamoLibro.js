import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';

class PrestamoLibro extends Component {
   
    

    render() { 
        const { libro } = this.props;
        
        if(!libro) return <Spinner/>

        return ( <h1>Prestamo Libro</h1> );
    }
}
 

PrestamoLibro.propTypes = {
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
)(PrestamoLibro);

