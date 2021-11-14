import React, { useState } from 'react';
import { Select } from 'antd';

const { Option } = Select;

const AntSelect = ({ options, placeholder, defaultValues, selctedItems, setSelctedItems, mode = null, }) => {
    const [err, setErr] = useState("")

    const onChange = (value) => {
        setSelctedItems(value)
    }

    const onBlur = () => {
        setErr("")
        if (selctedItems === '' || Object.keys(selctedItems).length === 0) {
            setErr("must select at least one")
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
            {err !== "" && <span>{err}</span>}
        </>
    )
}

export default AntSelect;