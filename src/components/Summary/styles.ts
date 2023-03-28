import styled from 'styled-components'

export const SummaryContainer = styled.section`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-top: -5rem;
  overflow-x: auto;
`

interface SummaryCardProps {
  variant?: 'green'
}
export const SummaryCard = styled.div<SummaryCardProps>`
  background: ${(props) =>
    props.variant === 'green'
      ? props.theme['green-700']
      : props.theme['gray-600']};
  border-radius: 6px;
  padding: 2rem;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4);

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: ${(props) => props.theme['gray-300']};

    span {
      font-weight: 700;
    }
  }

  strong {
    display: block;
    margin-top: 1rem;
    font-size: 2rem;
  }
`
