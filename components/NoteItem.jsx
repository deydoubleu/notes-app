import {View, Text, StyleSheet, TouchableOpacity, TextInput} from 'react-native';
import {useState, useRef} from 'react';

const NoteItem = ({ note, onDelete, onEdit }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedText, setEditedText] = useState(note.text);
    const inputRef = useRef(null);
    const handleSave = () => {
        if (editedText.trim() == "") { return;}
        onEdit(note.$id, editedText);
        setIsEditing(false);
    };

    return (
        <View style={styles.noteItem}>
            { isEditing ? (
                <TextInput
                    ref={inputRef}
                    style={styles.update}
                    value={editedText}
                    onChangeText={setEditedText}
                    autoFocus
                    onSubmitEditing={handleSave}
                    returnKeyType="done"
                    />
            ): (
                <Text style={ styles.noteText }>{note.text}</Text>
            )}
           <View style= {styles.actions}>
                {isEditing ? (
                    <TouchableOpacity onPress={()=> {
                        handleSave();
                        inputRef?.current.blur();
                    }}>
                        <Text style={styles.edit}>💾</Text>
                    </TouchableOpacity>
                ):(
                    <TouchableOpacity onPress={() => setIsEditing(true)}>
                        <Text style={styles.edit}>✏️</Text>
                    </TouchableOpacity>
                )}

                <TouchableOpacity onPress={() => onDelete(note.$id)}>
                    <Text style={styles.delete}>❌</Text>
                </TouchableOpacity>
           </View>
        </View>
    );
}

const styles = StyleSheet.create({
    noteItem: {
        backgroundColor: "#f5f5f5",
        padding: 15,
        borderRadius: 5,
        marginVertical: 5,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    noteText: {
        fontSize: 18,
    },
    delete: {
        fontSize: 18,
        color: "red",
    },
    actions: {
        flexDirection: "row"
    },
    edit: {
        fontSize: 18,
        color: "blue",
        marginRight: 10,
    }
})

export default NoteItem;