import styled from "styled-components";
import { DatePicker } from 'antd';
import moment from "moment";

const DateContainer = styled.div`
    margin-right: 10px;
`;


const DateSelect = ({ title, date, setDate }) => {

    const onDatetimeChange = (_, dateString) => {
        setDate(dateString)
    }
    const dateFormat = 'YYYY-MM-DD';

    return (
        <DateContainer>
            <DatePicker
                placeholder={title} onChange={onDatetimeChange} defaultValue={moment(date, dateFormat)}
            />
        </DateContainer>
    );
};

export default DateSelect;
