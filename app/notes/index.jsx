import {useState , useEffect} from "react";
import {
    View, Text, StyleSheet, FlatList, TouchableOpacity, Modal, TextInput, Alert, ActivityIndicator
} from "react-native";
import NoteList from "@/components/NoteList";
import AddNoteModal from "@/components/AddNoteModal";
import noteService from "@/services/noteService";
import { useRouter } from "expo-router";
import { useAuth } from "@/contexts/AuthContext";

const NotesScreen = () => {
    const router = useRouter();
    const { user, loading: authLoading } = useAuth();

    const [modalVisible, setModalVisible] = useState(false);
    const [newNote, setNewNote] = useState("");
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if ( !authLoading && !user) {
            router.replace("/auth");
        }
    }, [user, authLoading]);

    useEffect (() => {
        if (user) {
            fetchNotes();
        }
    }, [user]);

    const fetchNotes = async () => {
        setLoading(true);
        const response = await noteService.getNotes(user.$id);
        if (response.error){
            setError(response.error);
            Alert.alert("Error", response.error);
        } else{
            setNotes(response.data);
            setError(null);
        }
        setLoading(false);
    }

    const addNote = async () => {
        if (newNote.trim() == "") return;

        const response = await noteService.addNote(user.$id , newNote);
        if (response.error) {
            Alert.alert("Error", response.error);
        }
        else {
            setNotes([...notes, response.data]);
        }
        setNewNote("");
        setModalVisible(false);
    } 
    
    // Delete Note
    const deleteNote = async (id) => {
        Alert.alert("Delete Note", "Are you sure you want to delete thisnote?",
            [
                {
                    text: "cancel",
                    style: "cancel",
                },
                {
                    text: "Delete",
                    style: "destructive",
                    onPress: async () => {
                        const response = await noteService.deleteNote(id);
                        if (response.error) {
                            Alert.alert("Error", response.error);
                        } else {
                            setNotes(notes.filter((notes) => notes.$id != id));
                        }
                        
                    },
                },
            ]
        );
    }

    // Update Note
    const updateNote = async (id, newText) => {
        if (!newText.trim()) {
            Alert.alert("Error", "Note Text Cannot be  empty");
            return;
        }
        const response = await noteService.updateNote(id, newText);
        if (response.error){
            Alert.alert("Error", response.error);
        } else{
            setNotes((prevNotes) => prevNotes.map((note) => 
                note.$id == id ? {...note, text: response.data.text}: note
            ));
        }
    };

    return (
    <View style={styles.container}>

        {loading ? (
            <ActivityIndicator size="large" color="#007bff" />
        ) : (
            <>
            {error && <Text style= {styles.errorText}>{error}</Text>}
            {notes.length == 0 ? (
                <Text style={styles.noNotesText}>No notes</Text>
            ): (
                <NoteList notes={notes} onDelete={deleteNote} onEdit={updateNote} />
            ) }
            </>
        )}
        
        <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
            <Text style={styles.addButtonText}>+ Add Note</Text>
        </TouchableOpacity>

        {/* Modal */}
        <AddNoteModal
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            newNote={newNote}
            setNewNote={setNewNote}
            addNote={addNote}
        />
        
    </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 20,
    },
    addButton: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
        backgroundColor: '#007bff',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
      },
      addButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
      },
      errorText: {
        color: 'red',
        textAlign: 'center',
        marginBottom: 10,
        fontSize: 16,
      },
        noNotesText: {
            textAlign: 'center',
            fontSize: 20,
            color: '#555',
            marginTop: 15,
        },
});

export default NotesScreen;