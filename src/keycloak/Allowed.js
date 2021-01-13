import useRole from './useRole';

/**
 * Allowd
 * HOC wrapper de useRole, permite por prop pasar un listado de roles y
 * renderizar o no el children component.
 *  @param children
 *  @param {string | array} roles
 *  @param {object} options
 *  @param {component} fallback
 */

function allowed({ children, roles, options, fallback }) {
  const allowed = useRole(roles, options);
  if (allowed) return children;
  if (fallback) return fallback;
  return null;
}

export default allowed;
