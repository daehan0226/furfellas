import React, { useEffect, useState } from 'react';
import moment from 'moment';
import styled from "styled-components";
import { Table, Input, InputNumber, Popconfirm, Form, Typography, DatePicker, Button } from 'antd';
import { useFetch } from '../../hooks';
import { getCurrentStringDatetime } from '../../utils/utils';
import { useAction, useLocation, usePhotoType } from "../../contexts";
import deleteResources from "../../utils/deleteResources";
import uploadService from "../../utils/uploadService";
import { InputFile } from "../common";
import { Select } from 'antd';

const { Option } = Select;

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

const Image = styled.img`
  width: 80px;
  height: auto;
`;
const AntSelect = ({ options, placeholder, mode = null, selectedIds = null, setSelctedItems }) => {

    const onChange = (value) => {
        setSelctedItems(value)
    }

    return (
        <Select
            showSearch
            style={{ width: 200 }}
            mode={mode}
            placeholder={placeholder}
            defaultValue={selectedIds}
            optionFilterProp="children"
            onChange={onChange}
            filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
        >
            {options.map(item => (
                <Option key={item.name} value={item.id}>{item.name}</Option>
            ))}
        </Select>
    )
}

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
    file: null,
    actions: [
        {
            id: null,
            name: ""
        }
    ],
    location: {
        id: null,
        name: ""
    },
    type: {
        id: null,
        name: ""
    },
    description: "",
    create_datetime: ""
}

const PhotoTable = () => {
    const [form] = Form.useForm();
    const [data, setData] = useState([]);
    const [file, setFile] = useState(null);
    const [fetchData, doFetchData] = useFetch([])
    const [editingKey, setEditingKey] = useState('');

    const actions = useAction();
    const locations = useLocation();
    const photoTypes = usePhotoType();

    const [selectedActionIds, setSelectedActionIds] = useState(null);
    const [selectedLocationId, setSelectedLocationId] = useState(null);
    const [selectedPhotoTypeId, setSelectedPhotoTypeId] = useState(null);

    const refreshTodos = () => {
        doFetchData('photos/')
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
        if (record.id) {
            setSelectedLocationId(record.location.id);
            setSelectedPhotoTypeId(record.type.id);
            setSelectedActionIds(record.actions.map(item => item.id));
        }
        setEditingKey(record.key);
    };

    const cancel = () => {
        setEditingKey('');
    };

    const handleAdd = () => {
        const today = getCurrentStringDatetime()
        const lastKey = Math.max.apply(Math, data.map(function (o) { return o.key; }))
        setData([{ ...initialValues, create_datetime: today, key: lastKey + 1 }, ...data])
    };

    const handleDelete = (id, key) => {
        if (id) {
            deleteResources({
                id,
                resource: "photos",
                successCallback: () => {
                    setEditingKey('');
                    refreshTodos()
                }
            })
        } else {
            setData([...data.filter(item => item.key !== key)])
        }
    };

    const onDatetimeChange = (_, dateString) => {
        form.setFieldsValue({
            create_datetime: dateString
        });
    }


    const save = async () => {
        try {
            const { id, description, create_datetime } = await form.getFieldValue();
            // validate
            // if not id - file 
            // type, actions, location
            uploadService({
                id,
                file,
                type: selectedPhotoTypeId,
                actions: selectedActionIds,
                location: selectedLocationId,
                description,
                create_datetime,
                successCallback: () => {
                    setEditingKey('');
                    refreshTodos()
                },
                failCallback: () => {
                },
            });

        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    };

    const columns = [
        {
            title: 'Image',
            dataIndex: 'file',
            width: '5%',
            render: (_, record) => {
                const editable = isEditing(record);
                return record.id ? (
                    <Image
                        src={record.thumbnail}
                        alt={record.description}
                    />
                ) : editable ? (
                    <InputFile file={file} setFile={setFile} />
                ) : (
                    <p>No image</p>
                )
            },
        },
        {
            title: 'Description',
            dataIndex: 'description',
            width: '10%',
            editable: true,
        },
        {
            title: 'Type',
            dataIndex: 'type.name',
            width: '5%',
            render: (_, record) => {
                const editable = isEditing(record);
                return editable ? (
                    <AntSelect
                        options={photoTypes.data}
                        placeholder={"Select a photo type"}
                        selectedIds={[record.type.id]}
                        setSelctedItems={setSelectedPhotoTypeId}
                    />
                ) : (
                    <p>{record.type.name}</p>
                )
            }
        },
        {
            title: 'Actions',
            dataIndex: 'actions.name',
            width: '5%',
            render: (_, record) => {
                const editable = isEditing(record);
                return editable ? (
                    <AntSelect
                        options={actions.data}
                        placeholder={"Select actions"}
                        mode="tags"
                        selectedIds={record.id ? record.actions.map(item => item.id) : []}
                        setSelctedItems={setSelectedActionIds}
                    />
                ) : (
                    <p>{record.actions.map(item => item.name).join(", ")}</p>
                )
            }
        },
        {
            title: 'Location',
            dataIndex: 'location.name',
            width: '5%',
            render: (_, record) => {
                const editable = isEditing(record);
                return editable ? (
                    <AntSelect
                        options={locations.data}
                        placeholder={"Select a location"}
                        selectedIds={[record.location.id]}
                        setSelctedItems={setSelectedLocationId}
                    />
                ) : (
                    <p>{record.location.name}</p>
                )
            }
        },
        {
            title: 'Date',
            dataIndex: 'create_datetime',
            width: '20%',
            render: (_, record) => {
                const editable = isEditing(record);
                return editable ? (
                    <DatePicker
                        onChange={onDatetimeChange} defaultValue={moment(record.create_datetime, 'YYYY-MM-DD')}
                    />
                ) : (
                    <p>{record.create_datetime}</p>
                )
            }
        },
        {
            title: 'Edit',
            dataIndex: 'edit',
            width: '5%',
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
            width: '5%',
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
                Add a photo
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

export default PhotoTable;