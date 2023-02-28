import { MagnifyingGlass } from "phosphor-react";
import { SearchFormContainer } from "./styles";
// import logoImg from '../../assets/logo.svg'

export function SearchForm() {
   return (
      <SearchFormContainer>
         <input type="text" placeholder="Buscar por transaçōes" />
         <button type="submit">
            <MagnifyingGlass size={20} />
            Buscar
         </button>
      </SearchFormContainer>
   )
}