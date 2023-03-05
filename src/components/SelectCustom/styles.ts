import styled from 'styled-components'
import * as Select from '@radix-ui/react-select'

export const Trigger = styled(Select.Trigger)`
  border-radius: 6px;
  border: 0;
  background: ${(props) => props.theme['gray-900']};
  color: ${(props) => props.theme['gray-300']};
  padding: 1rem;
  text-align: left;
  display: flex;
  gap: 0.5rem;
  align-items: center;
  justify-content: space-between;
`

export const Viewport = styled(Select.Viewport)`
  max-height: 340px;
  padding: 1rem 0.5rem;
  width: min(100%, 380px);
  display: flex;
  flex-direction: column;
  align-items: start;
  box-shadow: none;
`

export const Content = styled(Select.Content)`
  border-radius: 6px;
  padding: 1rem;
  background: ${(props) => props.theme['gray-900']};
  :focus {
    outline: 0;
    box-shadow: 0 0 0 0 ${(props) => props.theme['green-500']};
  }
`
export const Item = styled(Select.Item)`
  width: 100%;
  padding: 0.5rem;
  max-width: 95%;
  border-radius: 6px;
  font-size: 0.9rem;

  &:hover {
    background: ${(props) => props.theme['gray-700']};
  }
`
