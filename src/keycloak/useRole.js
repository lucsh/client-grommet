import _ from 'lodash';
import { Keycloak } from './Authenticator';
import { useState, useContext, useEffect } from 'react';

/**
 * useRole
 * use role es un hook que permite consumir el state de keycloak y devolver si
 * el listado dado para el usuario existente lo contiene
 *  @param {string | array} roles
 *  @param {object} options
 */
function useRole(roles, options = undefined) {
  const { keycloak } = useContext(Keycloak);
  const [hasRole, setHasRole] = useState(false);

  useEffect(() => {
    if (_.isString(roles)) {
      // El rol es unico, va a existir un solo tipo
      setHasRole(keycloak.hasResourceRole(roles));
    } else {
      // Cada rol es verificado y armamos un array de existencia
      const hasMultipleRoles = _.map(roles, r => keycloak.hasResourceRole(r));
      // Verificamos si existe al menos un Rol no existente
      const condition = _.get(options, 'any', false);
      const existencia = hasMultipleRoles.some(r => r === condition);
      // Si la condition es AND existencia debe ser negada
      setHasRole(condition ? existencia : !existencia);
    }
  }, [roles]);

  return hasRole;
}

export default useRole;
