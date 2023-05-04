import React from 'react';
import { Container, GoBackButton, Row } from '../Styles/errorStyles';
import { FaRegSadTear } from 'react-icons/fa'

export default function Error() {
 return (
   <Container>
      <Row>

        <h3> Lamento, página não encontrada </h3>
        <FaRegSadTear size={17.5} color="#fff"/>

      </Row>
      <GoBackButton to="/">

        Ir para Home

      </GoBackButton>
   </Container>
 );
}