import React, { useEffect, useState } from 'react';
import moment from 'moment';
import styled from "styled-components";
import { Table, Input, InputNumber, Popconfirm, Form, Typography, DatePicker, Button } from 'antd';
import { useFetch } from '../../hooks';
import { getCurrentStringDatetime } from '../../utils/utils';
import deleteResources from "../../utils/deleteResources";
import upsertResource from '../../utils/todos';

const Container = styled.div`
  width: 90%;
  margin: 10px auto;
  
  ${(props) => props.theme.media.phone`
    width: 100%;
  `}
`;


const Title = styled.a`
    color: ${({ theme }) => theme.colors.primary.light};
`;



const EditableCell = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
}) => {
    const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
    return (
        <td {...restProps}>
            {editing ? (
                <Form.Item
                    name={dataIndex}
                    style={{
                        margin: 0,
                    }}
                    rules={[
                        {
                            required: true,
                            message: `Please Input ${title}!`,
                        },
                    ]}
                >
                    {inputNode}
                </Form.Item>
            ) : (
                children
            )}
        </td>
    );
};

const initialValues = {
    task: '',
    repeat_interval: '',
    start_datetime: '',
    finish_datetime: '',
}

const TodoTable = () => {
    const [form] = Form.useForm();
    const [data, setData] = useState([]);
    const [fetchData, doFetchData] = useFetch([])
    const [editingKey, setEditingKey] = useState('');

    const refreshTodos = () => {
        doFetchData('todo-groups/')
    }

    useEffect(() => {
        refreshTodos()
    }, [])

    useEffect(() => {
        if (fetchData.data.length > 0) {
            setData([...fetchData.data.map(item => { return { ...item, key: item.id } })])
        } else {
            setData([])
        }
    }, [fetchData.data])

    const isEditing = (record) => record.key === editingKey;

    const edit = (record) => {
        form.setFieldsValue({
            ...initialValues,
            ...record,
        });
        setEditingKey(record.key);
    };

    const cancel = () => {
        setEditingKey('');
    };

    const handleAdd = () => {
        const today = getCurrentStringDatetime()
        const lastKey = Math.max.apply(Math, data.map(function (o) { return o.key; }))
        setData([{ ...initialValues, start_datetime: today, key: lastKey + 1 }, ...data])
    };

    const handleDelete = (id, key) => {
        if (id) {
            deleteResources({
                id,
                resource: "todo-groups",
                successCallback: () => {
                    setEditingKey('');
                    refreshTodos()
                }
            })
        } else {
            setData([...data.filter(item => item.key !== key)])
        }
    };

    const onDatetimeStartChange = (_, dateString) => {
        form.setFieldsValue({
            start_datetime: dateString
        });
    }
    const onDatetimeEndChange = (_, dateString) => {
        form.setFieldsValue({
            finish_datetime: dateString
        });
    }


    const save = async () => {
        try {
            const rowdata = await form.getFieldValue();
            upsertResource({
                ...rowdata,
                successCallback: () => {
                    setEditingKey('');
                    refreshTodos()
                }
            })

        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    };

    const columns = [
        {
            title: 'Task',
            dataIndex: 'task',
            width: '30%',
            editable: true,
            render: text => <Title>{text}</Title>,
        },
        {
            title: 'Repeat Interval',
            dataIndex: 'repeat_interval',
            width: '20%',
            editable: true,
        },
        {
            title: 'Start',
            dataIndex: 'start_datetime',
            width: '20%',
            render: (_, record) => {
                const editable = isEditing(record);
                return editable ? (
                    <DatePicker
                        onChange={onDatetimeStartChange} defaultValue={moment(record.start_datetime, 'YYYY-MM-DD')}
                    />
                ) : (
                    <p>{record.start_datetime}</p>
                )
            }
        },
        {
            title: 'End',
            dataIndex: 'finish_datetime',
            width: '20%',
            render: (_, record) => {
                const editable = isEditing(record);
                return editable ? (
                    <DatePicker
                        onChange={onDatetimeEndChange} defaultValue={moment(record.finish_datetime, 'YYYY-MM-DD')}
                    />
                ) : (
                    <p>{record.finish_datetime}</p>
                )
            }
        },
        {
            title: 'Edit',
            dataIndex: 'edit',
            render: (_, record) => {
                const editable = isEditing(record);
                return editable ? (
                    <span>
                        <a
                            href="javascript:;"
                            onClick={() => save(record.key)}
                            style={{
                                marginRight: 8,
                            }}
                        >
                            Save
                        </a>
                        <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                            <a>Cancel</a>
                        </Popconfirm>
                    </span>
                ) : (
                    <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
                        Edit
                    </Typography.Link>
                );
            },
        },
        {
            title: 'Delete',
            dataIndex: 'delete',
            render: (_, record) =>
                data.length >= 1 ? (
                    <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.id, record.key)}>
                        <a>Delete</a>
                    </Popconfirm>
                ) : null,
        },
    ];
    const mergedColumns = columns.map((col) => {
        if (!col.editable) {
            return col;
        }

        return {
            ...col,
            onCell: (record) => ({
                record,
                inputType: 'text',
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });
    return (
        <Container>
            <Button
                onClick={handleAdd}
                type="primary"
                style={{
                    marginBottom: 16,
                }}
            >
                Add a row
            </Button>
            <Form form={form} component={false}>
                <Table
                    components={{
                        body: {
                            cell: EditableCell,
                        },
                    }}
                    bordered
                    dataSource={data}
                    columns={mergedColumns}
                    rowClassName="editable-row"
                    pagination={{
                        onChange: cancel,
                    }}
                />
            </Form>
        </Container>
    );
};

export default TodoTable;