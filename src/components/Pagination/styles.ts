import styled from 'styled-components'

export const PaginationContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;

  nav {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;

    span {
      font-size: 0.9rem;
      margin-bottom: 0.5rem;
      color: ${(props) => props.theme['gray-300']};
    }

    ul {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 0.5rem;
      list-style-type: none;

      li button {
        color: ${(props) => props.theme.white};
        marker: none;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 2.5rem;
        width: 2.5rem;
        background-color: ${(props) => props.theme['gray-600']};
        border-radius: 6px;
        transition: all 0.2s;
        border: none;
        cursor: pointer;

        &:disabled {
          cursor: not-allowed;
        }

        &:not(:disabled):hover {
          background-color: ${(props) => props.theme['green-700']};
        }
      }
    }
  }
`
