// src/screens/UserScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, FlatList, StyleSheet, Text } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { addUser, getUsers, updateUser, deleteUser } from '../services/database';
import UserItem from '../components/UserItem';
import DeleteConfirmationModal from '../components/DeleteConfirmationModal';

// Define Yup validation schema
const UserSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    age: Yup.number()
        .typeError('Age must be a number')
        .min(1, 'Age must be at least 1')
        .max(120, 'Age must be 120 or less')
        .required('Age is required'),
    mobile: Yup.string()
        .matches(/^\d{10}$/, 'Mobile number must be exactly 10 digits')
        .required('Mobile number is required'),
});

function UserScreen() {
    const [users, setUsers] = useState<any[]>([]);
    const [editUserId, setEditUserId] = useState<number | null>(null);
    const [deleteUserId, setDeleteUserId] = useState<number | null>(null);
    const [deleteUserName, setDeleteUserName] = useState<string | null>(null);
    const [isModalVisible, setModalVisible] = useState(false);

    const fetchUsers = async () => {
        const allUsers = await getUsers();
        setUsers(allUsers);
    };

    const handleAddOrUpdateUser = async (values: { name: string; age: string; mobile: string }, resetForm: () => void) => {
        if (editUserId) {
            await updateUser(editUserId, values.name, parseInt(values.age), values.mobile);
            setEditUserId(null);
        } else {
            await addUser(values.name, parseInt(values.age), values.mobile);
        }
        resetForm(); // Reset form fields after submission
        fetchUsers();
    };

    const handleEditUser = (user: { id: number; name: string; age: number; mobile: string }, setValues: any) => {
        setValues({ name: user.name, age: user.age.toString(), mobile: user.mobile });
        setEditUserId(user.id);
    };

    const handleDeleteUser = (id: number, userName: string) => {
        setDeleteUserId(id);
        setDeleteUserName(userName);
        setModalVisible(true);
    };

    const confirmDeleteUser = async () => {
        if (deleteUserId !== null) {
            await deleteUser(deleteUserId);
            setModalVisible(false);
            setDeleteUserId(null);
            setDeleteUserName(null);
            fetchUsers();
        }
    };

    const cancelDeleteUser = () => {
        setModalVisible(false);
        setDeleteUserId(null);
        setDeleteUserName(null);
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <Formik
            initialValues={{ name: '', age: '', mobile: '' }}
            validationSchema={UserSchema}
            onSubmit={(values, { resetForm }) => handleAddOrUpdateUser(values, resetForm)}
        >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isValid, setValues }) => (
                <View style={styles.container}>
                    <TextInput
                        placeholder="Name"
                        value={values.name}
                        onChangeText={handleChange('name')}
                        onBlur={handleBlur('name')}
                        style={styles.input}
                    />
                    {errors.name && touched.name && <Text style={styles.errorText}>{errors.name}</Text>}

                    <TextInput
                        placeholder="Age"
                        value={values.age}
                        keyboardType="numeric"
                        onChangeText={handleChange('age')}
                        onBlur={handleBlur('age')}
                        style={styles.input}
                    />
                    {errors.age && touched.age && <Text style={styles.errorText}>{errors.age}</Text>}

                    <TextInput
                        placeholder="Mobile Number"
                        value={values.mobile}
                        keyboardType="phone-pad"
                        onChangeText={handleChange('mobile')}
                        onBlur={handleBlur('mobile')}
                        style={styles.input}
                    />
                    {errors.mobile && touched.mobile && <Text style={styles.errorText}>{errors.mobile}</Text>}

                    <Button
                        title={editUserId ? "Update User" : "Add User"}
                        onPress={() => handleSubmit()}
                        disabled={!isValid}
                    />

                    <FlatList
                        data={users}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            <UserItem
                                user={item}
                                onEdit={() => handleEditUser(item, setValues)}
                                onDelete={() => handleDeleteUser(item.id, item.name)}
                            />
                        )}
                    />

                    <DeleteConfirmationModal
                        visible={isModalVisible}
                        userName={deleteUserName}
                        onConfirm={confirmDeleteUser}
                        onCancel={cancelDeleteUser}
                    />
                </View>
            )}
        </Formik>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    input: {
        borderWidth: 1,
        padding: 8,
        marginBottom: 5,
    },
    errorText: {
        color: 'red',
        marginBottom: 10,
    },
});

export default UserScreen;
