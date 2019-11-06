import { BUSCAR_SUSCRIPTOR} from '../types';

export const buscarSuscriptor = suscriptor => {
    
    return {
        type:BUSCAR_SUSCRIPTOR,
        suscriptor
    }
}