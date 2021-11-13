import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import { Table, DatePicker } from 'antd';
import moment from "moment";
import { useFetch } from '../hooks';
import { createQueryParams, getCurrentStringDatetime, capitalizeFirstLetter, changeToDisplayStringDatetime, getCurrentStringDate } from '../utils/utils';
import { SectionTitle, SectionContainer } from './common';


const DateContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 10px;
  align-items: center;
`;


const Title = styled.h6`
    margin-bottom: 0px;
    margin-right: 6px;
    width: 120px;
`;


const TodoTable = () => {
    const [fetchData, doFetchData] = useFetch([]);
    const [data, setData] = useState([]);
    const [datetiemFrom, setDatetimeFrom] = useState(getCurrentStringDate());
    const [datetiemTo, setDatetimeTo] = useState("");

    useEffect(() => {
        doFetchData(`todos/?datetime_from=${getCurrentStringDatetime()}`)
    }, [])


    useEffect(() => {
        const params = createQueryParams({
            datetime_from: datetiemFrom,
            datetime_to: datetiemTo
        });
        doFetchData(`todos/?${params}`)
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

    const onDatetimeFromChange = (date, dateString) => {
        setDatetimeFrom(dateString)
    }
    const onDatetimeToChange = (date, dateString) => {
        setDatetimeTo(dateString)
    }

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

    const dateFormat = 'YYYY-MM-DD';

    return (
        <SectionContainer>
            <SectionTitle text={"Todo"} />
            <DateContainer>
                <DateContainer>
                    <Title>Start Date</Title>
                    <DatePicker
                        onChange={onDatetimeFromChange} defaultValue={moment(datetiemFrom, dateFormat)}
                    />
                </DateContainer>
                <DateContainer>
                    <Title>End Date</Title>
                    <DatePicker onChange={onDatetimeToChange} />
                </DateContainer>
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
