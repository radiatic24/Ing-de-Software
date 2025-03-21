import styled from "styled-components";
import Icon from "./Icon";
import searchicon from './icons/search.png'

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  border: 2px solid #8B572A;
  border-radius: 8px;
  background-color: #F9F4EE;
  padding: 5px;
  width: 100%;
  max-width: 300px;
`;

const SearchInput = styled.input.attrs({ type: "search" })`
  border: none;
  background: transparent;
  outline: none;
  flex-grow: 1;
  padding: 8px;
  font-size: 16px;
`;


const SearchBar = () => {

    return (
        <SearchContainer>
            <Icon src={searchicon} />
            <SearchInput placeholder='Buscar...'></SearchInput>
        </SearchContainer>


    );
};

export default SearchBar;
