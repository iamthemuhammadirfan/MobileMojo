import { StyleSheet, Text, View } from "react-native";
import { LoginButton } from "./components";

export default function LoginScreen() {
  const handleLogin = () => {
    console.log("Login pressed");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <LoginButton title="Sign In" onPress={handleLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },
});
