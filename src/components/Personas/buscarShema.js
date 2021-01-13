import { string, object } from 'yup';

export const schema = object().shape({
  query: string().test(
    'len',
    'más de 3 caracteres',
    val => val && val.toString().length >= 3
  ),
});
