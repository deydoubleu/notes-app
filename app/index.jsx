import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import PostItImage from "@/assets/images/post-it.png"; // Ensure you have an image at this path
import { useRouter } from "expo-router";

const HomeScreen = () => {
  const router = useRouter();
  
  return (
    <View style={styles.container}>
      <Image source={PostItImage} style={styles.image} />
      <Text style={styles.title}>Welcome To Notes App.</Text>
      <Text style={styles.subtitle}>Capture your thoughts anytime anywhere.</Text>
      <TouchableOpacity
        style={styles.button}
        onPress = {() => router.push("/notes")}
        >
        <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
    padding: 20,
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 20,
    borderRadius: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginHorizontal: 20,
  },
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default HomeScreen;
