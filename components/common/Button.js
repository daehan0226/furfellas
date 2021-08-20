import styled from "styled-components";

const Btn =  styled.button`
    cursor: pointer;
    color: #fff;
    margin: 10px;
    padding: 8px;
    border-color: ${({ theme }) => theme.colors.primary.btnMain};
    background: ${({ theme }) => theme.colors.primary.btnMain};
    text-shadow: 0 -1px 0 rgb(0 0 0 / 12%);
    box-shadow: 0 2px #0000000b;
    font-weight: 400;
    white-space: nowrap;
    text-align: center;
    font-size: 14px;

    :hover {
        border-color: ${({ theme }) => theme.colors.primary.btnLight};
        background: ${({ theme }) => theme.colors.primary.btnLight};
    }
`

const Button = ({text, onClick}) => {
    return <Btn onClick={()=>onClick()}>{text}</Btn>
}

export default Button;
