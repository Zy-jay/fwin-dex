// import { ChainId } from '@uniswap/sdk';
import React from 'react';
import { useState } from 'react';
// import { Text } from 'rebass';
// import { NavLink } from 'react-router-dom';
// import { darken } from 'polished';
import styled from 'styled-components';
// import { useTranslation } from 'react-i18next';
import { useMedia } from 'react-use';
import Logo from '../../assets/svg/logo.svg';
import { useActiveWeb3React } from '../../hooks';
import { useDarkModeManager } from '../../state/user/hooks';
// import { useETHBalances } from '../../state/wallet/hooks';

// import { LightCard } from '../Card';
import { Moon, Sun } from 'react-feather';
import { RowFixed } from '../Row';
import Web3Status from '../Web3Status';
import backSvg from '../../assets/svg/back.svg';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

const HeaderFrame = styled.div`
  width: 100vw;
  margin: 0.8rem 28px;
  padding: 0.8rem 1.6rem;
  z-index: 2;
  display: grid;
  grid-template-columns: 120px 1fr 0px;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  border-bottom: 2px solid #c4cbd8;

  ${({ theme }) => theme.mediaWidth.upToLarge`
    grid-template-columns: 60px 1fr 120px;
  `};

  ${({ theme }) => theme.mediaWidth.upToSmall`
    grid-template-columns: 60px 1fr;
  `};

  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    padding: 0.5rem 1rem;
  `}
`;

const HeaderControls = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-self: flex-end;
`;

const HeaderElement = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  position: relative;

  ${({ theme }) => theme.mediaWidth.upToMedium`
   flex-direction: row-reverse;
    align-items: center;
  `};
  @media screen and (max-width: 570px) {
    position: absolute;
    top: 100px;
    left: 20%;
  }
`;

const HeaderElementWrap = styled.div`
  display: flex;
  align-items: center;
  @media screen and (max-width: 570px) {
    display: flex;
  }
`;

const IconMenu = styled.div`
  display: grid;
  position: relative;

  width: 30px;
  height: 28px;
  cursor: pointer;
  z-index: 2;
  margin: auto;
  margin: auto 16px 0 auto;
  padding: 0;
  @media screen and (min-width: 570px) {
    display: none;
  }
  span {
    position: relative;
    transition: all 0.3s ease 0s;
    width: 100%;
    height: 2px;
    background-color: #000;
    z-index: 5;
  }
`;

const HeaderRow = styled(RowFixed)`
  display: flex;
  align-items: center;

  ${({ theme }) => theme.mediaWidth.upToMedium`
    width: 100%;
  `};
`;

// const HeaderLinks = styled(Row)`
//   width: auto;
//   margin: 0 auto;
//   padding: 0.3rem;
//   justify-content: center;
//   border-radius: 0.8rem;
//   box-shadow: rgba(0, 0, 0, 0.01) 0px 0px 1px, rgba(0, 0, 0, 0.04) 0px 4px 8px, rgba(0, 0, 0, 0.04) 0px 16px 24px,
//     rgba(0, 0, 0, 0.01) 0px 24px 32px;
//   background-color: ${({ theme }) => theme.bg1};

//   ${({ theme }) => theme.mediaWidth.upToLarge`
//     margin: 0;
//     margin-right: auto;
//   `};

//   ${({ theme }) => theme.mediaWidth.upToSmall`
//     position: fixed;
//     bottom: 0;
//     padding: .5rem;
//     width: 100%;
//     left: 50%;
//     transform: translateX(-50%);
//     border-radius: 0;
//     border-top: 1px solid ${({ theme }) => theme.bg3};
//   `};
// `;
const AccountElement = styled.div<{ active: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
 
  white-space: nowrap;
  width: fit-content;
  padding: none:
  cursor: pointer;
  @media screen and (max-width: 800px) {
    display: "flex";
  }
  
`;

// const HideSmall = styled.span`
//   ${({ theme }) => theme.mediaWidth.upToExtraSmall`
//     display: none;
//   `};
// `;

// const NetworkCard = styled(LightCard)`
//   border-radius: 0.8rem;
//   padding: 8px 12px;

//   ${({ theme }) => theme.mediaWidth.upToSmall`
//     margin: 0;
//     margin-right: 0.5rem;
//     width: initial;
//     overflow: hidden;
//     text-overflow: ellipsis;
//     flex-shrink: 1;
//   `};
// `;

// const BalanceText = styled(Text)`
//   ${({ theme }) => theme.mediaWidth.upToExtraSmall`
//     display: none;
//   `};
// `;

const Title = styled.a`
  display: flex;
  align-items: center;
  pointer-events: auto;
  justify-self: flex-start;
  margin-right: 12px;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    justify-self: center;
  `};
  :hover {
    cursor: pointer;
  }
`;

const Icon = styled.div`
  transition: transform 0.3s ease;
  :hover {
    transform: scale(1.1);
  }
`;

// const activeClassName = 'ACTIVE';

// const StyledNavLink = styled(NavLink).attrs({
//   activeClassName,
// })`
//   ${({ theme }) => theme.flexRowNoWrap}
//   align-items: left;
//   border-radius: 12px;
//   outline: none;
//   cursor: pointer;
//   text-decoration: none;
//   color: ${({ theme }) => theme.text2};
//   font-size: 0.9rem;
//   width: fit-content;
//   padding: 0.3rem 0.6rem;
//   font-weight: 500;
//   transition: 0.3s;

//   &:not(:last-child) {
//     margin-right: 1.5rem;
//     margin-left: 5px;
//   }

//   &.${activeClassName} {
//     color: ${({ theme }) => theme.green};
//     background-color: ${({ theme }) => theme.bg3};
//   }

//   :hover,
//   :focus {
//     color: ${({ theme }) => darken(0.1, theme.green)};
//   }

//   ${({ theme }) => theme.mediaWidth.upToSmall`
//     border-radius: 8px;
//     padding: 0.3rem 7%;
//     border: 1px solid ${({ theme }) => theme.bg3};

//     &:not(:last-child) {
//       margin-right: 2%;
//     }
//   `};
// `;

export const StyledMenuButton = styled.button`
  position: relative;
  width: 100%;
  height: 100%;
  border: none;
  background-color: transparent;
  margin: 0;
  padding: 0;
  height: 35px;
  background-color: ${({ theme }) => theme.bg3};
  margin-left: 16px;
  padding: 0.15rem 0.5rem;
  border-radius: 0.5rem;
  box-shadow: rgba(0, 0, 0, 0.01) 0px 0px 1px, rgba(0, 0, 0, 0.04) 0px 4px 8px, rgba(0, 0, 0, 0.04) 0px 16px 24px,
    rgba(0, 0, 0, 0.01) 0px 24px 32px;

  :hover,
  :focus {
    cursor: pointer;
    outline: none;
    background-color: ${({ theme }) => theme.bg4};
  }

  svg {
    margin-top: 2px;
  }
  > * {
    stroke: ${({ theme }) => theme.text1};
  }
`;

const ButtonBack = styled.button`
  align-items: center;
  padding: 0.8rem 3.2rem;
  border-radius: 8px;
  cursor: pointer;
  user-select: none;
  border: 1px solid #c4cbd8;
  border-radius: 8px;
  width: 200px;
  margin-right: 16px;
  height: 56px;
  @media screen and (max-width: 800px) {
    width: 150px;
    padding: 0.8rem 1.2rem;
  }
  @media screen and (max-width: 480px) {
    width: 100px;
    padding: 0.8rem 0.8rem;
  }

  :hover {
  }
  span {
    display: flex;
    margin: auto;
    width: 70px;
  }
  text {
    display: flex;
    margin: auto;
  }
  img {
    margin: auto;
  }
`;

// const NETWORK_LABELS: { [chainId in ChainId]?: string } = {
//   [ChainId.RINKEBY]: 'Rinkeby',
//   [ChainId.ROPSTEN]: 'Ropsten',
//   [ChainId.GÖRLI]: 'Goerli',
//   [ChainId.KOVAN]: 'Kovan',
//   [ChainId.BSC]: 'BSC',
//   [ChainId.MATIC]: 'Matic',
// };

export default function Header() {
  const { account } = useActiveWeb3React();
  const below540 = useMedia('(max-width: 570px)');

  // const { t } = useTranslation();
  // const userEthBalance = useETHBalances(account ? [account] : [])?.[account ?? ''];
  const [darkMode, toggleDarkMode] = useDarkModeManager();
  const [menuOpen, setMenuOpen] = useState(false);

  const heandleMenuOpen = () => {
    setMenuOpen(menuOpen ? false : true);
  };

  return (
    <HeaderFrame>
      <HeaderRow>
        <Title href=".">
          <Icon>
            <a href="https://fightwin.io">
            <img width={'78px'} height={56} src={Logo} alt="logo" />
            </a>
          </Icon>
        </Title>
      </HeaderRow>
      {/* <HeaderLinks>
        <StyledNavLink id={`swap-nav-link`} to={'/swap'}>
          <FontAwesomeIcon icon={solid('rotate')} style={{ fontSize: '19px', marginRight: '5px' }} />
          {'Swap'}
        </StyledNavLink>
        <StyledNavLink
          id={`pool-nav-link`}
          to={'/pool'}
          isActive={(match, { pathname }) =>
            Boolean(match) ||
            pathname.startsWith('/add') ||
            pathname.startsWith('/remove') ||
            pathname.startsWith('/create') ||
            pathname.startsWith('/find')
          }
        >
          <FontAwesomeIcon icon={solid('briefcase')} style={{ fontSize: '19px', marginRight: '5px' }} />
          {'Pool'}
        </StyledNavLink>
        <StyledNavLink id={`stats-nav-link`} to={'/stats'}>
          <FontAwesomeIcon icon={solid('chart-simple')} style={{ fontSize: '19px', marginRight: '5px' }} />
          Overview
        </StyledNavLink>
      </HeaderLinks> */}

      <HeaderControls>
        <HeaderElement style={{}}>
          {/* <HideSmall>
            {chainId && NETWORK_LABELS[chainId] && (
              <NetworkCard title={NETWORK_LABELS[chainId]}>{NETWORK_LABELS[chainId]}</NetworkCard>
            )}
          </HideSmall> */}

          <AccountElement
            active={!!account}
            style={{
              pointerEvents: 'auto',
              display: below540 ? (menuOpen ? 'flex' : 'none') : 'flex',
            }}
          >
            {/* {account && userEthBalance ? (
              <BalanceText style={{ flexShrink: 0 }} pl="0.75rem" pr="0.5rem" fontWeight={700}>
                {userEthBalance?.toSignificant(4)} BNB
              </BalanceText>
            ) : null} */}
            <a href="https://fightwin.io">

            <ButtonBack>
              <span>
                <img width={6} height={12} src={backSvg} alt="" /> <text>BACK</text>
              </span>
            </ButtonBack>
            </a>
            <Web3Status />
          </AccountElement>
        </HeaderElement>
        <IconMenu onClick={heandleMenuOpen}>
          <span
            style={{
              transform: menuOpen && below540 ? ' rotate(-45deg)' : 'none',
              top: menuOpen && below540 ? 'calc(50% - 0px)' : 'none',
            }}
          ></span>
          <span style={{ display: menuOpen && below540 ? 'none' : 'initial' }}></span>
          <span
            style={{
              transform: menuOpen && below540 ? 'rotate(45deg)' : 'none',
              bottom: menuOpen && below540 ? 'calc(50% - 0px)' : 'none',
            }}
          ></span>
        </IconMenu>
        <HeaderElementWrap>
          <StyledMenuButton onClick={toggleDarkMode}>
            {darkMode ? <Moon size={20} /> : <Sun size={20} />}
          </StyledMenuButton>
        </HeaderElementWrap>
      </HeaderControls>
    </HeaderFrame>
  );
}
