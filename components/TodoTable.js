import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { useFetch } from '../hooks';
import { getCurrentStringDatetime, capitalizeFirstLetter, changeToDisplayStringDatetime } from '../utils/utils';
import { SectionTitle, SectionContainer } from './common';

const TodoTable = () => {
    const [fetchData, doFetchData] = useFetch([]);
    const [data, setData] = useState([]);

    useEffect(() => {
        doFetchData(`todos/?datetime_from=${getCurrentStringDatetime()}`)
    }, [])

    useEffect(() => {
        if (fetchData.data.length > 0) {
            setData([...fetchData.data.map(item => {
                return {
                    ...item,
                    task: capitalizeFirstLetter(item.task),
                    datetime: changeToDisplayStringDatetime(item.datetime)

                }
            })])
        }
    }, [fetchData.data])

    const columns = [
        {
            title: 'Task',
            dataIndex: 'task',
            width: '60%',
        },
        {
            title: 'Date',
            dataIndex: 'datetime',
            width: '40%',
        }
    ];
    return (
        <SectionContainer>
            <SectionTitle text={"Todo"} />
            <Table
                bordered
                dataSource={data}
                columns={columns}
                rowClassName="editable-row"
            />
        </SectionContainer>
    );
};

export default TodoTable;
