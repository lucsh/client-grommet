import React, { useState } from 'react';

import { useQuery } from '@apollo/react-hooks';

import _ from 'lodash';
import { schema } from './buscarShema';
import Error from '../common/Error';

import GET_PERSONAS from './graphql/personas.graphql';
import GET_TOTAL_PERSONAS from './graphql/totalPersonas.graphql';

import personasJSON from './personas.json'

import Content from './Content';

const Container = () => {
  const [busqueda, setBusqueda] = useState();
  const [order, setOrder] = useState({});

  const onRowClick = id => {
    // cuando hago click en el row recibo el valor del campo marcado en rowID
    console.info('<-- atrib@onRowClick -->');
    console.log(id);
    console.info('<-- /atrib@onRowClick -->');
    // ie. buscar los datos completos de la persona
  };

  const onRowClose = id => {
    // cuando hago click en cerrar row recibo el valor del campo marcado en rowID
    console.info('<-- atrib@oonRowClose -->');
    console.log(id);
    console.info('<-- /atrib@onRowClose -->');
  };

  const onColumnOrder = (column, direction) => {
    console.log(`Ordenar por ${column} > ${direction}`);

    let newOrder = Object.assign({}, order);
    newOrder[column] = direction;
    setOrder(newOrder);
  };

  const validateBusqueda = ({ target }) => {
    if (target.value.length === 0) {
      setBusqueda(undefined);
    }
    schema
      .validate({ query: target.value })
      .then(() => {
        setBusqueda(target.value);
      })
      .catch(error => {
        const err = {};
        err[error.path] = error.message;
        return false;
      });
  };

  // const personasQuery = useQuery(GET_PERSONAS, {
  //   onCompleted: () => {
  //     totalPersonasQuery.refetch();
  //   },
  //   variables: {
  //     offset: 0,
  //     busqueda,
  //     // mapeo el objeto order a un array para poder ser enviado a graphql
  //     order: Object.keys(order).map(key => ({
  //       column: key,
  //       direction: order[key],
  //     })),
  //   },
  //   fetchPolicy: 'network-only',
  // });

  // const totalPersonasQuery = useQuery(GET_TOTAL_PERSONAS, {
  //   fetchPolicy: 'network-only',
  // });
  //
  // if (personasQuery.error) {
  //   return <Error error={personasQuery.error} />;
  // }

  const personas = personasJSON;
  const total = personas.length;

  if (personas.length >= 3) {
    personas[2].highlight = true;
    personas[2].footnote = <div>MUESTRA DE NOTA AL PIE DE LA FILA</div>;
  }


  return (
    <Content
      busqueda={busqueda}
      setBusqueda={setBusqueda}
      personas={personas}
      total={total}
      validateBusqueda={validateBusqueda}
      onRowClick={onRowClick}
      onRowClose={onRowClose}
      onColumnOrder={onColumnOrder}
      order={order}
      // loading={personasQuery.loading || totalPersonasQuery.loading}
      loading={false}
      onLoadMore={() => console.log('loading more')}
      // onLoadMore={() =>
      //   personasQuery.fetchMore({
      //     variables: {
      //       offset: personasQuery.data.personas.length,
      //     },
      //     updateQuery: (prev, { fetchMoreResult }) => {
      //       if (!fetchMoreResult) return prev;
      //       return Object.assign({}, prev, {
      //         personas: [...prev.personas, ...fetchMoreResult.personas],
      //       });
      //     },
      //   })
      // }
    />
  );
};

export default Container;
