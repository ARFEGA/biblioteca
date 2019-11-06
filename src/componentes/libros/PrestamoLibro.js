import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';
import FichaSuscriptor from '../suscripcion/FichaSuscriptor';
//REDUX Actions
import { buscarSuscriptor }  from '../../REDUX/actions/buscarSuscriptorAction';

class PrestamoLibro extends Component {

    state={
        codigoSuscriptor:'',
        hayResultado:null
    }
    //Leer dato introducido
    leerDato = e =>{
        this.setState({[e.target.name]:e.target.value})
    }
    
    consultarSuscriptor = e => {
        e.preventDefault();
        //Asegurar en firestore la existencia del suscriptor
        const { codigoSuscriptor } = this.state;
        //Extraemos firestore
        const { firestore, buscarSuscriptor } =this.props;
        //Creamos la conexión a la db
        const db = firestore.collection('suscriptores');
        //Creamos la select
        const select = db.where("codigo","==",codigoSuscriptor).get();
        //Ejecutamos la select
        select.then(result => {
            if(result.empty){
                //Sin resultados
                buscarSuscriptor({})
               this.setState({
                   hayResultado:false
               })
            }else{
                const datos = result.docs[0];
                //Pasar información a redux
                buscarSuscriptor(datos.data());
                this.setState({
                    hayResultado: true
                }) 
                console.log("DATOS SUSCRIPTOR:");
                console.log(datos.data())
            }
        })

    }

    registrarPrestamo = () =>{
        const fechaPrestamo = new Date().toLocaleDateString();
        const { libro, firestore, history, suscriptor } = this.props;
        suscriptor.fechaPrestamo=fechaPrestamo;

        //Agregamos el suscriptor al campo prestados, que es de tipo map
        libro.prestados.push(suscriptor);
        firestore.update({
            collection:'libros',doc:libro.id
        },libro).then(history.push('/'));
    }
    render() { 
        
        const { libro, suscriptor } = this.props;
        
        if(!libro) return <Spinner/>

        const {hayResultado} = this.state;
        
        let fichaSuscriptor,btnSolicitar;
        if(hayResultado){
            fichaSuscriptor = <FichaSuscriptor
                                suscriptor={suscriptor}
                            />
            btnSolicitar = <button type="button" className="btn btn-primary btn-block" onClick={this.registrarPrestamo}>Registrar Solicitud</button> 
        }
        return (
            <div className="row">
                <div className="col-12 my-4 d-flex">
                    <Link to={'/'} className="btn btn-secondary col-2">
                        <i className="fas fa-arrow-circle-left"></i> Listado Libros
                    </Link>
                    <h2 className="col-10 text-center"><i className="fas fa-book"></i> Alquiler gratuito</h2>
                </div>
                <div className="col-12">
                    <h2><i className="fas fa-hand-point-right"></i> {libro.titulo} </h2>
                    <div className="row justify-content-center mt-5">
                        <div className="col-8">
                            <form onSubmit={this.consultarSuscriptor}>
                                <legend className="text-center">Buscar suscriptor por código</legend>
                                <div className="form-group">
                                    <input type="text" name="codigoSuscriptor" onChange={this.leerDato} placeholder="Introducir código suscriptor" className="form-control" rounded/>
                                </div>
                                <input type="submit" className="btn btn-primary btn-block" value="Validar"/>
                            </form>
                        </div>
                        <div className="col-8 mt-5">
                            {fichaSuscriptor}
                            {btnSolicitar}
                            {hayResultado===false ? <div className="alert alert-danger text-center">Cógido {this.state.codigoSuscriptor} de suscriptor no encontrado</div>:null
                            }
                        </div>
                    </div>
                </div>
            </div>
         );
    }
}
 

PrestamoLibro.propTypes = {
    firestore: PropTypes.object.isRequired,
    suscriptor:PropTypes.object.isRequired
}
export default compose(
    firestoreConnect(props => [{
        collection: 'libros',//Indicamos la tabla de la que queremos recuperar el registro
        storeAs: 'libro',//Guardamos el resultado como libro
        doc: props.match.params.id //Pasamos el id del libro seleccionado
    }]),
    connect((state, props) =>
        ({//Así tendremos el contenido del libro que queremos pedir prestado, pasandolo por props
            libro: state.firestore.ordered.libro && state.firestore.ordered.libro[0],
            suscriptor:state.suscriptor
        }), { buscarSuscriptor })
)(PrestamoLibro);

