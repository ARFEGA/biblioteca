import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class EditarSuscriptor  extends Component{
   
    state = {
        nombre: '',
        apellido: '',
        formacion: '',
        codigo: ''
    }
    leerDato = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    actualizarSubscriptor = e => {
        //Para que no se ejecute nada más cargar la página
        e.preventDefault();
        //Extraemos el state a una variable
        const datos = this.state;
        //Extraemos firestore de props
        const { firestore, history, suscriptor } = this.props;
        //Ejecutamos el metodo add de firestore, pasandole la collección/tabla
        firestore.update({ collection: 'suscriptores' , doc:suscriptor.id}, datos)
           .then(() => history.push('/suscriptores'))
    }

    render(){
        
        const { suscriptor } = this.props;

        return (
            <div className="row">
                <div className="col-12 m-4">
                    <Link to={'/suscriptores'} className="btn btn-secondary">
                        <i className="fas fa-arrow-circle-left"></i> Volver Listado
                        </Link>
                </div>
                <div className="col-12">
                    <h2>
                        <i className="fas fa-user"></i> Editar suscriptor
                    </h2>
                    <div className="row justify-content-center">
                        <div className="col-md-8 mt-5">
                            <form onSubmit={this.actualizarSubscriptor}>
                                <div className="form-group">
                                    <label>Nombre:</label>
                                    <input
                                        type="text"
                                        className="form-control 100vw"
                                        name="nombre"
                                        placeholder="Nombre"
                                        required
                                        onChange={this.leerDato}
                                        defaultValue={suscriptor.nombre}
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
                                        defaultValue={suscriptor.apellido}
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
                                        defaultValue={suscriptor.formacion}
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
                                        defaultValue={suscriptor.codigo}
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
           )
    }
}

EditarSuscriptor.propTypes={
    firestore:PropTypes.object.isRequired
}
export default compose(
    firestoreConnect(props => [{
        collection: 'suscriptores',//Indicamos la tabla de la que queremos recuperar el registro
        storeAs: 'suscriptor',//Guardamos el resultado como suscriptor
        doc: props.match.params.id //Pasamos el id del suscriptor seleccionado
    }]),
    connect((state, props) =>
        ({//Así tendremos el contenido del suscriptor que queremos mostrar
            suscriptor: state.firestore.ordered.suscriptor && state.firestore.ordered.suscriptor[0]
        }))
)(EditarSuscriptor);

