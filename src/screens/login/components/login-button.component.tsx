import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";

interface LoginButtonProps extends TouchableOpacityProps {
  title: string;
}

/**
 * LoginButton - A button component specific to the Login screen
 * Following SoC: This component is scoped to the login screen
 * and only used there, keeping concerns separated.
 */
export function LoginButton({ title, ...props }: LoginButtonProps) {
  return (
    <TouchableOpacity style={styles.button} {...props}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
