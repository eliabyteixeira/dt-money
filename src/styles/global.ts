import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
   * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
   }

   * {
      &::-webkit-scrollbar {
         height: 0.25rem;
         width: 0.25rem;
      }

      &::-webkit-scrollbar-track {
         background: transparent;
      }

      &::-webkit-scrollbar-thumb {
         background-color:  ${(props) => props.theme['green-500']};
         border-radius: 1rem;
      }
   }
   
   :focus {
      outline: 0;
      box-shadow: 0 0 0 2px ${(props) => props.theme['green-500']}
   }

   body {
      background-color: ${(props) => props.theme['gray-800']};
      color: ${(props) => props.theme['gray-100']};
      -webkit-font-smoothing: antialiased;
   }

   body, input, textarea, button {
      font: 400 1rem Roboto, sans-serif;
   }  
`
