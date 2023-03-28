import styled from 'styled-components'

export const TransactionsContainer = styled.main`
  width: 100%;
  max-width: 1200px;
  margin: 2rem auto 0;
  padding: 0 1.5rem;
`

export const TransactionsTable = styled.div`
  overflow-x: auto;
  table {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0 0.5rem;
    margin-top: 1rem;

    td {
      padding: 1.25rem 1rem;
      background: ${(props) => props.theme['gray-700']};
      font-size: 0.9rem;

      &:first-child {
        border-top-left-radius: 6px;
        border-bottom-left-radius: 6px;
      }

      &:last-child {
        border-top-right-radius: 6px;
        border-bottom-right-radius: 6px;
      }
    }
  }
`

interface PriceHighLightProps {
  variant: 'income' | 'outcome'
}
export const PriceHighLight = styled.span<PriceHighLightProps>`
  color: ${(props) =>
    props.variant === 'income'
      ? props.theme['green-300']
      : props.theme['red-300']};
`

export const FilterContainer = styled.div`
  background: ${(props) => props.theme['gray-700']};
  padding: 1rem;
  height: 3.5rem;
  width: 100%;
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 1rem;
  border-radius: 6px;
  margin-bottom: 1rem;

  button {
    color: ${(props) => props.theme['gray-400']};
    padding: 0.5rem 1rem;
    border-radius: 6px;
    background: ${(props) => props.theme['gray-800']};
    border: 1px solid ${(props) => props.theme['gray-800']};
    &:hover,
    :focus {
      color: ${(props) => props.theme.white};
    }
  }
`
