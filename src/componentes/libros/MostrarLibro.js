import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import PropTypes from 'prop-types';

class MostrarLibro extends Component {
   
   devolverLibro= codigoSuscriptor =>{
        const { firestore,libro } = this.props;
        //Creamos una copia del libro
        const copiaLibro = {...this.props.libro};
        //Eliminamos de prestados el suscriptor que devuelve el libro
        const prestados = libro.prestados.filter(suscriptor=>suscriptor.codigo !== codigoSuscriptor);
       libro.prestados = prestados;
       firestore.update({ collection: "libros", doc: libro.id }, libro)
           
   }
    
    render() { 
        const { libro } = this.props;
         //Mostrar el spinner mientras se recibe la información
        if (!libro) return <Spinner />   

        //Crear boton para solicitar alquiler
        let btnAlquiler=null;
        if(libro.stock - libro.prestados.length > 0)
            btnAlquiler = <Link to={`/libros/prestamo/${libro.id}`} className="btn btn-primary">Solicitar alquiler</Link>
        return ( 
            <div className="row mt-4">
                <div className="col-md-6 mb-4">
                    <Link to={'/'} className="btn btn-secondary">
                        <i className="fas fa-arrow-circle-left"></i> Volver Libros
                    </Link>
                </div>
                <div className="col-md-6">
                    <Link to={`/libros/editar/${libro.id}`} className="btn btn-primary float-right">
                        <i className="fas fa-pencil-alt"></i> Editar Libro
                    </Link>
                </div>
                <hr className="w-100 bg-secondary"/>
                <div className="col-12">
                    <div class="card border-primary mb-3" >
                        <div class="card-header">Datos del libro</div>
                        <div class="card-body">
                            <h4 class="card-title">{libro.titulo}</h4>
                            <p class="card-text"><span className="font-weight-bold">Editorial:</span> {libro.editorial}</p>
                            <p class="card-text"><span className="font-weight-bold">ISBN:</span> {libro.ISBN}</p>
                            <p class="card-text"><span className="font-weight-bold">Stock:</span> {libro.stock}</p>
                            <p class="card-text"><span className="font-weight-bold">Disponibles:</span> {libro.stock - libro.prestados.length}</p>
                        </div>
                    </div>
                   {btnAlquiler}
                    {libro.prestados.length === 0 ? null : 
                        
                            <div class="card border-primary mt-5">
                                <div class="card-header">Suscriptores en posesión del libro</div>
                                {libro.prestados.map(suscriptor =>(
                                    <div class="card-body">
                                        <h5 class="card-title">{suscriptor.nombre} {suscriptor.apellido}</h5>
                                        <p class="card-text">
                                            <span className="font-weight-bold">Código suscriptor: </span>{suscriptor.codigo}
                                            <span className="font-weight-bold"> Formación: </span>{suscriptor.formacion}
                                            <span className="font-weight-bold"> Prestado desde: </span>{suscriptor.fechaPrestamo}
                                        </p>
                                        <p><button type="button" className="btn btn-primary" onClick={() =>this.devolverLibro(suscriptor.codigo)}>Devolver Libro</button></p>
                                    </div>
                                ))}  
                            </div>
                    }
                    
                </div>
                
            </div> 
            
         );
    }
}
MostrarLibro.propTypes = {
    firestore: PropTypes.object.isRequired
}
export default compose(
    firestoreConnect(props => [{
        collection: 'libros',//Indicamos la tabla de la que queremos recuperar el registro
        storeAs: 'libro',//Guardamos el resultado como libro
        doc: props.match.params.id //Pasamos el id del libro seleccionado
    }]),
    connect((state, props) =>
        ({//Así tendremos el contenido del libro que queremos mostrar
            libro: state.firestore.ordered.libro && state.firestore.ordered.libro[0]
        }))
)(MostrarLibro);