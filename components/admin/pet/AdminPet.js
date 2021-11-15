import React, { useState, useEffect } from 'react';
import { Modal, Button, List, Avatar } from 'antd';
import AdminPetForm from "./AdminPetForm";
import { useFetch } from '../../../hooks';

const AdminPet = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editKey, setEditKey] = useState(null);
    const [formValues, setFormValues] = useState(null);
    const [pets, setPets] = useState([]);
    const [fetchData, doFetchData] = useFetch([]);

    useEffect(() => {
        doFetchData('pets/')
    }, [])

    useEffect(() => {
        setPets([])
        if (fetchData.data.length > 0) {
            setPets([...fetchData.data])
        }
    }, [fetchData.data])


    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        console.log(formValues)
        setIsModalVisible(false);
        setEditKey(null)
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setEditKey(null)
    };


    const handleEdit = (id) => {
        setIsModalVisible(true);
        setEditKey(id)
    };

    const handleDelete = () => {
        setEditKey(null)
    };


    return (
        <>
            <Button type="primary" onClick={showModal}>
                Add a new pet
            </Button>
            <List
                itemLayout="horizontal"
                dataSource={pets}
                renderItem={item => (
                    <List.Item>
                        <List.Item.Meta
                            avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                            title={<a href="https://ant.design">{item.name}</a>}
                            description={item.intro}
                        />
                        <List.Item
                            actions={[<a key="list-loadmore-edit" onClick={() => handleEdit(item.id)}>edit</a>, <a key="list-loadmore-delete">delete</a>]}
                        ></List.Item>
                    </List.Item>
                )}
            />

            <Modal title="Pet" visible={isModalVisible} onCancel={handleCancel} onOk={handleOk} >
                <AdminPetForm data={pets.find(item => item.id === editKey)} setFormValues={setFormValues} />
            </Modal>
        </>
    );
};

export default AdminPet;