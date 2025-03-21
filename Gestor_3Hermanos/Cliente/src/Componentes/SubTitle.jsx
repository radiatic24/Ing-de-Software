import styled from "styled-components";

const SubTitle_Container = styled.div`
display: flex;
align-items: center;
border-bottom: 3px solid black 
`;
const SubTitle = styled.h2`
font-size: 1.5rem;
font-weight: 600;
`;

const SubTitulo = ({stitle}) => {
    return (
        <SubTitle_Container>
            <SubTitle>{stitle}</SubTitle>
        </SubTitle_Container>
    );
};


export default SubTitulo;