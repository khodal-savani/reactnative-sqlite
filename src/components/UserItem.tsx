// src/components/UserItem.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

type UserItemProps = {
    user: { id: number; name: string; age: number; mobile: string };
    onEdit: () => void;
    onDelete: () => void;
};

const UserItem = ({ user, onEdit, onDelete }: UserItemProps) => {
    return (
        <View style={styles.container}>
            <View style={styles.userInfo}>
                <Text style={styles.userText}>Name: {user.name}</Text>
                <Text>Age: {user.age}</Text>
                <Text>Mobile: {user.mobile}</Text>
            </View>
            <View style={styles.buttonsContainer}>
                <TouchableOpacity onPress={onEdit}>
                    <Text style={styles.editButton}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={onDelete} style={{ marginLeft: 10 }}>
                    <Text style={styles.deleteButton}>Delete</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderColor: '#ccc',
    },
    userInfo: {
        flex: 1,
    },
    userText: {
        fontSize: 16,
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 120, // Adjust the width as needed
    },
    editButton: {
        color: 'blue', // Color for edit button
        fontSize: 16, // Adjust font size
        marginRight: 10, // Space between buttons
    },
    deleteButton: {
        color: 'red', // Color for delete button
        fontSize: 16, // Adjust font size
    },
});

export default UserItem;
