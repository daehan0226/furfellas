import React, { useEffect, useState } from 'react';
import moment from 'moment';
import {
    Form,
    Input,
    Button,
    Radio,
    DatePicker,
    InputNumber,
    Switch,
} from 'antd';
import { changeToDisplayStringDatetime } from '../../../utils/utils';

const AdminPetForm = ({ data }) => {
    const [componentSize, setComponentSize] = useState('default');

    const onFormLayoutChange = ({ size }) => {
        setComponentSize(size);
    };

    useEffect(() => {
        console.log(data)
    }, [])

    return (
        <>
            <Form
                labelCol={{
                    span: 4,
                }}
                wrapperCol={{
                    span: 14,
                }}
                layout="horizontal"
                initialValues={{
                    size: componentSize,
                }}
                onValuesChange={onFormLayoutChange}
                size={componentSize}
            >
                <Form.Item label="Name">
                    <Input value={data.name} />
                </Form.Item>
                <Form.Item label="Introdction">
                    <Input value={data.intro} />
                </Form.Item>
                <Form.Item label="Birthdate">
                    <DatePicker defaultValue={moment(data.birthday.slice(0, 10), 'YYYY-MM-DD')} />
                </Form.Item>
                <Form.Item label="Weight">
                    <InputNumber value={data.weight} />
                </Form.Item>
                <Form.Item label="Sex" name="sex">
                    <Radio.Group>
                        <Radio.Button value="m">Male</Radio.Button>
                        <Radio.Button value="f">Female</Radio.Button>
                    </Radio.Group>
                </Form.Item>
            </Form>
        </>
    );
};

export default AdminPetForm;