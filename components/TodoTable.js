import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import { Table } from 'antd';
import { useFetch } from '../hooks';
import { createQueryParams, capitalizeFirstLetter, changeToDisplayStringDatetime, getCurrentStringDate, addMonthToCurrentDate, strfDatetime } from '../utils/utils';
import { SectionTitle, SectionContainer, DateSelect } from './common';


const DateContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 10px 0px;
  align-items: center;
`;


const TodoTable = () => {
    const [fetchData, doFetchData] = useFetch([]);
    const [data, setData] = useState([]);
    const [datetiemFrom, setDatetimeFrom] = useState(getCurrentStringDate());
    const [datetiemTo, setDatetimeTo] = useState(strfDatetime(addMonthToCurrentDate({ months: 1 })));

    const refreshTodos = () => {
        const params = createQueryParams({
            datetime_from: datetiemFrom,
            datetime_to: datetiemTo
        });
        doFetchData(`todos/?${params}`)
    }

    useEffect(() => {
        refreshTodos()
    }, [])


    useEffect(() => {
        refreshTodos()
    }, [datetiemFrom, datetiemTo])

    useEffect(() => {
        setData([])
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
            sorter: true,
        }
    ];

    const sortTodos = (order) => {
        let sorted = [];
        if (order === "descend") {
            sorted = data.sort((a, b) => (a.datetime < b.datetime ? 1 : -1));
        } else {
            sorted = data.sort((a, b) => (a.datetime > b.datetime ? 1 : -1));
        }
        setData([...sorted]);
    }

    const handleChange = (pagination, filters, sorter) => {
        sortTodos(sorter.order)
    }

    return (
        <SectionContainer>
            <SectionTitle text={"Todo"} />
            <DateContainer>
                <DateSelect title="Start Date" date={datetiemFrom} setDate={setDatetimeFrom} />
                <DateSelect title="End Date" date={datetiemTo} setDate={setDatetimeTo} />
            </DateContainer>
            <Table
                bordered
                dataSource={data}
                columns={columns}
                rowClassName="editable-row"
                onChange={handleChange}
            />
        </SectionContainer>
    );
};

export default TodoTable;
