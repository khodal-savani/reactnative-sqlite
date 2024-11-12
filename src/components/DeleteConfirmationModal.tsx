// src/components/DeleteConfirmationModal.tsx
import React from 'react';
import { View, Text, Button, Modal, StyleSheet } from 'react-native';

type DeleteConfirmationModalProps = {
    visible: boolean;
    userName: string | null;
    onConfirm: () => void;
    onCancel: () => void;
};

function DeleteConfirmationModal({ visible, userName, onConfirm, onCancel }: DeleteConfirmationModalProps) {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onCancel}
        >
            <View style={styles.overlay}>
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>
                        Are you sure you want to delete {userName}?
                    </Text>
                    <View style={styles.buttonContainer}>
                        <Button title="Cancel" onPress={onCancel} color="#888" />
                        <Button title="Delete" onPress={onConfirm} color="red" />
                    </View>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
        width: '80%',
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        elevation: 5,
    },
    modalText: {
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});

export default DeleteConfirmationModal;
