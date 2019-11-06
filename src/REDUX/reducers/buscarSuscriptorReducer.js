import { BUSCAR_SUSCRIPTOR } from '../types';

const initialState={
   
}

export default function(state=initialState,action){
    switch (action.type){
        case BUSCAR_SUSCRIPTOR:{
           
            return{
                ...state,
                nombre:action.suscriptor.nombre,
                apellido: action.suscriptor.apellido,
                codigo: action.suscriptor.codigo,
                formacion: action.suscriptor.formacion
            }
        }
        default: return state
    }
}