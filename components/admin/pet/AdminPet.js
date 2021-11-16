import React, { useState, useEffect } from 'react';
import { Modal, Button, List, Avatar } from 'antd';
import AdminPetForm from "./AdminPetForm";
import { useFetch } from '../../../hooks';
import styled from "styled-components";

const Container = styled.div`
    width: 90%;
    margin: 10px auto;
`;

const initialValues = {
    id: null,
    name: "",
    intro: "",
    weight: 0,
    sex: "m",
    photo_id: null,
    birthday: "",
    color: "000000",

}

const AdminPet = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editKey, setEditKey] = useState(null);
    const [formValues, setFormValues] = useState(null);
    const [pet, setPet] = useState({});
    const [fetchData, doFetchData] = useFetch([]);

    const refreshPets = () => {
        doFetchData("pets/")
    }

    useEffect(() => {
        setEditKey(null)
        refreshPets()
    }, [])

    const showModal = () => {
        setEditKey(null)
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
        setEditKey(null)
        refreshPets()
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setEditKey(null)
    };

    useEffect(() => {
        if (editKey) {
            const editPet = fetchData.data.find(item => item.id === editKey)
            setPet({ ...editPet, photo_id: editPet.photo.id })
        } else {
            setPet({ ...initialValues })
        }
    }, [editKey])

    const handleEdit = (id) => {
        setEditKey(id)
        setIsModalVisible(true);
    };

    const handleDelete = () => {
        setEditKey(null)
    };

    return (
        <Container>
            <Button type="primary" onClick={showModal}>
                Add a new pet
            </Button>
            <List
                itemLayout="horizontal"
                dataSource={fetchData.data}
                renderItem={item => (
                    <List.Item>
                        <List.Item.Meta
                            avatar={<Avatar src={item.photo.url} size={64} />}
                            title={<p>{item.name}</p>}
                            description={item.intro}
                        />
                        <List.Item
                            actions={[<a key="list-loadmore-edit" onClick={() => handleEdit(item.id)}>edit</a>, <a key="list-loadmore-delete">delete</a>]}
                        ></List.Item>
                    </List.Item>
                )}
            />

            <Modal title="Pet" visible={isModalVisible} onCancel={handleCancel} onOk={handleOk} >
                <AdminPetForm data={pet} setFormValues={setFormValues} />
            </Modal>
        </Container>
    );
};

export default AdminPet;