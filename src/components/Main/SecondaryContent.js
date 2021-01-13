import React from 'react';
import styled, { css } from 'styled-components';
import { Box, Heading } from 'grommet/es6/index';
import { useQuery } from '@apollo/react-hooks';

import { mobile } from '../../utils/media';
import Error from '../common/Error';
import TEST from './graphql/test.graphql';
import LoadingBlock from '../common/LoadingBlock';

const BigBox = styled(Box)`
  padding: 20vh;
  && {
    ${mobile(css`
      padding: 10px;
    `)};
  }
`;

const Content = () => {
  const response = useQuery(TEST, {
    fetchPolicy: 'network-only',
  });

  if (response.error) {
    return <Error error={response.error} />;
  }
  return (
    <BigBox>
      <Heading margin="small" color="dark" level="1">
        {response.loading ? <LoadingBlock height="50px" /> : response.data.test}
      </Heading>
    </BigBox>
  );
};

export default Content;
