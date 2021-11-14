import styled from "styled-components";
import { Select } from 'antd';

const { Option } = Select;

const Container = styled.div`
    margin: 10px;
    display: 
`;

const AntSelect = ({ placeholder, onChange, options, selectKey }) => {

    const handleChange = (value) => {
        onChange(selectKey, value)
    }

    return (
        <Container>
            <Select mode="tags" style={{ width: '100%' }} placeholder={placeholder} onChange={handleChange}
            >
                {options.map(({ id, name, color }) => (
                    <Option key={`${id}-${name}`} value={id.toString()} style={{ color: `#${color}` }} >{name}</Option>
                ))}
            </Select>
        </Container>
    )
};

export default AntSelect;
