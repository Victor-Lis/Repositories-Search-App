import styled, {keyframes, css} from "styled-components";
import { Link } from 'react-router-dom'

const animate = keyframes`
  0%{
    transform: translateZ(0px);
  }

  25%{

    transform: translateZ(1px);

  }

  75%{

    transform: translateZ(-1px);

  }

  100%{
    transform: translateZ(0px);
  }
`;

export const Container = styled.div`
    width: 100%;
    height: 80vh;
    padding: 10vh 0px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;

    h3{

        color: #fff;

    }

    svg{

        margin-left: 2.5px;
        animation: ${animate} 2s infinite linear;

    }

`

export const GoBackButton = styled(Link)`

    text-decoration: none;
    color: #0071db;
    font-size: 14px;
    margin-top: 05px;

`

export const Row = styled.div`

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

`