import React from 'react';
import { Box, Grid } from 'grommet';

/**
 * Container
 *
 * @param content
 * @param sidebar
 */
function Wrapper({ content, sidebar }) {
  return (
    <Grid
      fill
      columns={['auto', 'flex']}
      rows={['auto']}
      areas={[
        { name: 'side', start: [0, 0], end: [0, 0] },
        { name: 'content', start: [1, 0], end: [1, 0] },
      ]}
    >
      <Box
        gridarea="side"
        border={{ color: 'dark', side: 'top', size: 'small' }}
        background="#1f3347"
      >
        {sidebar}
      </Box>
      <Box gridarea="content" background="#f0f0f0">
        {content}
      </Box>
    </Grid>
  );
}

export default Wrapper;
