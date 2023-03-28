import styled from 'styled-components'

export const HeaderContainer = styled.header`
  background: ${(props) => props.theme['gray-900']};
  padding: 2.5rem 0 7.5rem;
`

export const HeaderContent = styled.div`
  width: 100%;
  max-width: 1200px;
  display: flex;
  margin: 0 auto;
  padding: 0 1.5rem;
  justify-content: space-between;
  align-items: center;
`

export const NewTransactionButton = styled.button`
  height: 50px;
  border: 0;
  background: ${(props) => props.theme['green-500']};
  color: ${(porps) => porps.theme.white};
  font-weight: bold;
  padding: 0 1.25rem;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  cursor: pointer;

  &:hover {
    background: ${(props) => props.theme['green-700']};
    transition: background 0.2s;
  }
`
