import React from 'react';

const FichaSuscriptor = ({suscriptor}) => {
    return ( 
        <div class="card border-primary mb-3">
            <div class="card-header">Datos Suscriptor</div>
            <div class="card-body">
                <h4 class="card-title">{suscriptor.nombre}</h4>
                <p class="card-text"><span className="font-weight-bold">Apellidos:</span> {suscriptor.apellido}</p>
                <p class="card-text"><span className="font-weight-bold">Formación:</span> {suscriptor.formacion}</p>
                <p class="card-text"><span className="font-weight-bold">Código:</span> {suscriptor.codigo}</p>
            </div>
        </div>
     );
}
 
export default FichaSuscriptor;