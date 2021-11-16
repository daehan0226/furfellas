import styled from "styled-components";
import { DatePicker } from 'antd';
import moment from "moment";

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

const DateSelect = ({ title, date, setDate }) => {

    const onDatetimeChange = (_, dateString) => {
        setDate(dateString)
    }
    const dateFormat = 'YYYY-MM-DD';

    return (
        <DateContainer>
            <Title>{title}</Title>
            <DatePicker
                onChange={onDatetimeChange} defaultValue={moment(date, dateFormat)}
            />
        </DateContainer>
    );
};

export default DateSelect;
