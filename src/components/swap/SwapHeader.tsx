import React from 'react';
import styled from 'styled-components';
import Settings from '../Settings';
import { RowBetween } from '../Row';
import { TYPE } from '../../theme';

const StyledSwapHeader = styled.div`
  padding: 12px 0rem 0px 0rem;
  margin: auto;
  margin-bottom: 0.4rem;
  width: 100%;
  max-width: 600px;
  color: ${({ theme }) => theme.text2};
  // @media screen and (max-width: 540px) {
  //   width: 150px;
  //   padding: 0.8rem 0.5rem;
  // }
  @media screen and (max-width: 620px) {
    max-width: 40%;

  }

  h2 {
    font-family: 'Gilroy', sans-serif;
    font-style: normal;
    font-weight: 900;
    font-size: 32px;
    line-height: 140%;
    /* identical to box height, or 45px */
    color: ${({ theme }) => theme.text1};
    text-transform: uppercase;
  }
`;

export default function SwapHeader() {
  return (
    <StyledSwapHeader>
      <RowBetween>
        <TYPE.black>
          <h2> Swap</h2>
        </TYPE.black>
        <Settings />
      </RowBetween>
    </StyledSwapHeader>
  );
}
