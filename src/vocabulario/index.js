import _ from 'lodash';
import labels from './labels';
import mensajes from './mensajes';
import notificaciones from './notificaciones';

const diccionario = { ...labels, ...mensajes, ...notificaciones };

// devuelve el elemento solicitado, en caso de no exisitr devuelve self
const get = vocab => _.get(diccionario, vocab, vocab);

export default { get };
