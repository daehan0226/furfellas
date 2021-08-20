import styled from "styled-components";

const Title =  styled.h2`
    margin-bottom: .5em;
    font-weight: 600;
    font-size: 30px;
    line-height: 1.35;
    color: ${({ theme }) => theme.colors.primary.dark};
    ${(props) => props.theme.media.phone`
        text-align: center;
    `}
    `

const SectionTitle = ({text}) => {
    return <Title>{text}</Title>
}

export default SectionTitle;
