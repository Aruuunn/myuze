import React, { ReactElement } from 'react';
import { Container } from '@material-ui/core';

import { UploadNewMusic } from '../../components';

export function HomePage(): ReactElement {
  return (
    <>
      <Container maxWidth="lg">
        <UploadNewMusic />
      </Container>
    </>
  );
}
