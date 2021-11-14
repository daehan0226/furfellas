import React, { useState } from 'react';
import styled from "styled-components";
import { Select } from 'antd';

const { Option } = Select;

const CustomSelect = styled(Select)`
    ${({ err, theme }) =>
        (err !== "") && `
        .ant-select-selector {
            border-color: ${theme.colors.common.error} !important;
        }
    `};
`

const Span = styled.span`
    color: ${({ theme }) => theme.colors.common.error};
`;

const AntSelect = ({ options, placeholder, defaultValues, selectedItems, setSelectedItems, mode = "-", }) => {
    const [err, setErr] = useState("")

    const onChange = (value) => {
        setSelectedItems(value)
        setErr("")
    }

    const onBlur = () => {
        setErr("")
        if (selectedItems === '' || (typeof selectedItems === 'object' && Object.keys(selectedItems).length === 0)) {
            setErr("Must select at least one!")
        }
    }

    return (
        <>
            <CustomSelect
                showSearch
                err={err}
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
            </CustomSelect>
            {err !== "" && <Span>{err}</Span>}
        </>
    )
}

export default AntSelect;