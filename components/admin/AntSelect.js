import React, { useState } from 'react';
import styled from "styled-components";
import { Select } from 'antd';

const { Option } = Select;


const Span = styled.span`
    color: ${({ theme }) => theme.colors.common.error};
`;

const AntSelect = ({ options, placeholder, defaultValues, selctedItems, setSelctedItems, mode = null, }) => {
    const [err, setErr] = useState("")

    const onChange = (value) => {
        setSelctedItems(value)
    }

    const onBlur = () => {
        setErr("")
        if (selctedItems === '' || Object.keys(selctedItems).length === 0) {
            setErr("Must select at least one!")
        }
    }

    return (
        <>
            <Select
                showSearch
                style={{ width: 200 }}
                mode={mode}
                placeholder={placeholder}
                defaultValue={defaultValues}
                optionFilterProp="children"
                onChange={onChange}
                onBlur={onBlur}
                filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
            >
                {options.map(item => (
                    <Option key={item.name} value={item.id}>{item.name}</Option>
                ))}
            </Select>
            {err !== "" && <Span>{err}</Span>}
        </>
    )
}

export default AntSelect;