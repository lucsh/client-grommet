import React, { Fragment, useState, useEffect, useRef } from 'react';
import { Box, Button, Heading, Text } from 'grommet';
import Vocabulario from './vocabulario';
import SearchField from '../common/SearchField';
import Tabla from '../common/Tabla';
import TextTooltip from '../common/TextTooltip';
import moment from 'moment';
import { Edit, Trash } from 'grommet-icons';
import ColloredBullet from '../common/ColloredBullet';
import Foto from '../common/Foto';
import LoadingIcon from '../common/LoadingIcon';

const columns = [
  {
    title: '',
    key: 'foto',
    size: '24px',
    sizeInCard: 'full',
    boxSizing: 'content-box',
    pad: '8px',
    render: (foto, fila, size, isInCard) => {
      // query al servicio de personas con fila.numero (de dni)
      return (
        <Foto
          foto={undefined}
          loading={false}
          error={undefined}
          size={isInCard ? '64px' : size}
        />
      );
    },
  },
  {
    title: 'Documento',
    key: 'numero',
    size: '150px',
    sizeInCard: '50%',
    render: (numero, fila) => {
      return (
        <Box direction="row">
          <Box background="black" round="xxsmall" pad="xsmall">
            <Text size="xsmall" textAlign="center">
              {fila.tipoDoc} {numero}
            </Text>
          </Box>

          {fila.apellido.includes('Gonzale') ? (
            <ColloredBullet color="status-error" description="Es Gonzales" />
          ) : null}
          {fila.apellido.includes('Cortez') ? (
            <ColloredBullet color="status-ok" description="Es Cortez" />
          ) : null}
        </Box>
      );
    },
  },
  {
    title: 'Tipo',
    key: 'tipoPersona',
    size: '100px',
    sizeInCard: '50%',
    render: dato => {
      return (
        <Box background="focus" round="xxsmall" pad="xsmall">
          <Text
            style={{
              textTransform: 'uppercase',
            }}
            size="8px"
            textAlign="center"
          >
            {dato}
          </Text>
        </Box>
      );
    },
  },
  {
    title: 'Apellido',
    key: 'apellido',
    size: '120px',
    sizeInCard: '50%',
    sortable: true,
  },
  {
    title: 'Nombres',
    key: 'nombre',
    size: '120px',
    sizeInCard: '50%',
    sortable: true,
    render: dato => {
      return (
        <TextTooltip align="center" width="120px" size="small" content={dato} />
      );
    },
  },
  {
    title: 'Fecha Nacimiento',
    key: 'fechaNacimiento',
    size: '120px',
    sizeInCard: '50%',
    render: a => <Text size="small">{moment(a).format('DD/MM/YYYY')}</Text>,
  },
  {
    title: 'Profesión',
    key: 'profesion',
    size: '120px',
    sortable: true,
  },
  {
    title: 'Nacionalidad',
    key: 'nacionalidad',
    size: '120px',
    sortable: true,
  },
  {
    title: 'Telefono',
    key: 'telefono',
    size: '120px',
    sortable: true,
  },
  {
    title: 'Email',
    key: 'email',
    size: '120px',
    sizeInCard: '100%',
  },
  {
    title: 'Acciones',
    size: '120px',
    key: 'acciones',
    sizeInCard: '100%',
    render: (dato, fila, size, isInCard) => {
      return (
        <Box gap="small" direction="row">
          <Button
            primary
            color="brand"
            size="small"
            label={isInCard ? 'Editar' : ''}
            icon={<Edit size="small" color="white" />}
            onClick={event => {
              // importante para no clickear la Fila tambien
              event.stopPropagation();
              console.log(fila.id);
            }}
          />
          <Button
            primary
            color="status-error"
            size="small"
            label={isInCard ? 'Eliminar' : ''}
            icon={<Trash size="small" color="white" />}
            onClick={event => {
              // importante para no clickear la Fila tambien
              event.stopPropagation();
              console.log(fila.id);
            }}
          />
        </Box>
      );
    },
  },
];

const Content = ({
  personas,
  busqueda,
  order,
  total,
  validateBusqueda,
  onRowClick,
  onRowClose,
  onColumnOrder,
  onLoadMore,
  loading,
}) => {
  const [loadMoreButtonDisabled, setLoadMoreButtonDisabled] = useState(false);
  const [data, setData] = useState([]);
  const [totalData, setTotalData] = useState(total);
  const [selectedRows, setSelectedRows] = useState(['28155687']);

  const bottom = useRef(null);
  const scrollToBottom = () => {
    setTimeout(function() {
      bottom && bottom.current.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  };

  useEffect(() => {
    setData(personas);
    setTotalData(total);
    if (personas.length === 0 || personas.length === total) {
      setLoadMoreButtonDisabled(true);
    } else {
      setLoadMoreButtonDisabled(false);
    }
    scrollToBottom();
  }, [personas, total]);

  useEffect(scrollToBottom, [data, totalData]);
  useEffect(() => {
    console.info('<--selectedRows changed-->');
    console.log(selectedRows);
    console.info('<--/selectedRows changed-->');
  }, [selectedRows]);
  return (
    <Fragment>
      <Box justify="center" gap="none" direction="row-responsive">
        <Heading textAlign="center" level={2}>
          {Vocabulario.get('TITULO')}
        </Heading>
      </Box>
      <Box pad="small">
        <Box
          align="stretch"
          justify="end"
          gap="none"
          margin="auto"
          direction="row-responsive"
          width="920px"
        >
          <SearchField
            round="xsmall"
            size="xsmall"
            name="busqueda"
            value={busqueda}
            loading={loading}
            onChange={validateBusqueda}
            placeholder="Buscar por nombre o apellido"
          />
        </Box>
      </Box>
      <Box pad="medium">
        <Tabla
          onColumnOrder={onColumnOrder}
          order={order}
          onRowClick={onRowClick}
          onRowClose={onRowClose}
          loading={loading}
          data={data}
          columns={columns}
          rowID="numero"
          aislable
          showConfig
          selection={{
            selected: selectedRows,
            setSelected: setSelectedRows,
            disabled: ['53722711'],
          }}
          visibleColumns={[
            'foto',
            'tipoPersona',
            'nombre',
            'fechaNacimiento',
            'profesion',
            'nacionalidad',
            'telefono',
            'email',
          ]}
          fixedColumns={['numero', 'apellido', 'acciones']}
          emptyMessage={Vocabulario.get('SIN RESULTADOS')}
          zebra
          rowHeight="small"
        />
      </Box>
      <Box pad="small">
        <Box justify="center" gap="none" margin="auto" width="920px">
          <Text textAlign="center" size="xsmall" weight="bold">
            Mostrando {data.length} de {totalData} personas
          </Text>
        </Box>
      </Box>

      <Box pad="small">
        <Box
          justify="end"
          gap="none"
          margin="auto"
          direction="row-responsive"
          width="920px"
        >
          {/*spinner*/}
          <Button
            color="brand"
            primary
            disabled={loading || loadMoreButtonDisabled}
            icon={loading ? <LoadingIcon color="white" size="16px" /> : null}
            label="Cargar más"
            onClick={onLoadMore}
            fill={false}
          />
        </Box>
      </Box>

      <div ref={bottom} />
    </Fragment>
  );
};

export default Content;
