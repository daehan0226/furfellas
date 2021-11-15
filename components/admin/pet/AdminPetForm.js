import React, { useEffect, useState } from 'react';
import moment from 'moment';
import {
    Form,
    Input,
    Radio,
    DatePicker,
    InputNumber,
    Select,
    Avatar,
} from 'antd';
import { useFetch } from '../../../hooks';


const initialValues = {
    id: null,
    name: "",
    intro: "",
    weight: 0,
    sex: "m",
    birthday: '',
    color: "000000"
}


const AdminPetForm = ({ data, setFormValues }) => {
    const [form] = Form.useForm();
    const [fetchPhotos, dofetchPhotos] = useFetch([]);
    const [photoOptions, setPhotoOptions] = useState([]);

    useEffect(() => {
        form.resetFields()
        if (data && data.id) {
            dofetchPhotos(`photos/?pet_ids=${data.id}`)
            form.setFieldsValue({
                ...data,
                birthday: moment(data.birthday.slice(0, 10), 'YYYY-MM-DD')
            })
        }
    }, [data])

    useEffect(() => {
        setPhotoOptions([])
        if (fetchPhotos.data.length > 0) {
            setPhotoOptions([...fetchPhotos.data])
        }
    }, [fetchPhotos.data])

    const handleValueChange = () => {
        setFormValues({ ...form.getFieldsValue() })
    }


    return (
        <>
            <Form
                form={form}
                labelCol={{
                    span: 4,
                }}
                wrapperCol={{
                    span: 14,
                }}

                initialValues={initialValues}
                onValuesChange={handleValueChange}
            >
                <Form.Item name="name" label="Name" >
                    <Input />
                </Form.Item>
                <Form.Item name="intro" label="Introdction">
                    <Input />
                </Form.Item>
                <Form.Item label="Image">
                    <Select>
                        <Select.Option value={null}>no image</Select.Option>
                        {photoOptions.map(option => (
                            <Select.Option key={option.id} value={option.id}><Avatar src={option.thumbnail} /></Select.Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item label="Birthday" name="birthday">
                    <DatePicker />
                </Form.Item>
                <Form.Item label="Weight" name="weight">
                    <InputNumber />
                </Form.Item>
                <Form.Item label="Sex" name="sex">
                    <Radio.Group >
                        <Radio.Button value="m">Male</Radio.Button>
                        <Radio.Button value="f">Female</Radio.Button>
                    </Radio.Group>
                </Form.Item>
            </Form>
        </>
    );
};

export default AdminPetForm;