import styled from 'styled-components'

const Text = styled.h1`
font-size: 20px;
color: ${({ theme }) => theme.colors.primary};
// ${props => props.theme.media.desktop`
//   font-size: ${props.isEmpty ? '20px' : '.8rem'};
// `}
// ${props => props.theme.media.tablet`
//   font-size: ${props.isEmpty ? '15px' : '.8rem'};
// `}
${props => props.theme.media.phone`
  font-size: ${props.isEmpty ? '10px' : '.8rem'};
`}
`
const Nav = () => (
  <div>
      <Text>Fox Lee Fur Fellas</Text>
  </div>
)

export default Nav