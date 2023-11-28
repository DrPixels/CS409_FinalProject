import React, { useContext, useEffect, useState, useRef } from "react";
import { TextInput, Button, HelperText } from "react-native-paper";
import { View, Text, StyleSheet, StatusBar, AppState } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Application from "../../context/ApplicationContext";

const CreateAccount = () => {
  const context = useContext(Application);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const {
    newLabel,
    newEmail,
    newPass,
    description,
    credentials,
    handleNewLabel,
    handleNewEmail,
    handleNewPass,
    handleDescription,
    handleCredentials,
  } = context;

  const handleVerifyCredentials = () => {
    const newErrors = {};

    if (!newLabel.trim()) {
      newErrors.label = "Label is required.";
    }

    if (!newEmail.trim()) {
      newErrors.email = "Email/Username is required.";
    }
    if (!newPass.trim()) {
      newErrors.pass = "Password is required.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmitForm = () => {
    if (handleVerifyCredentials()) {
      handleCredentials(newLabel, newEmail, newPass, description);
    }
  };

  return (
    <SafeAreaView>
      <View>
        <TextInput
          label="Label*"
          mode="outlined"
          value={newLabel}
          onChangeText={handleNewLabel}
        />
        {errors.label && <HelperText type="error">{errors.label}</HelperText>}
        <TextInput
          label="Email/Username*"
          mode="outlined"
          value={newEmail}
          onChangeText={handleNewEmail}
        />
        {errors.email && <HelperText type="error">{errors.email}</HelperText>}
        <TextInput
          label="Password*"
          mode="outlined"
          secureTextEntry={!showPassword}
          value={newPass}
          onChangeText={handleNewPass}
          right={
            <TextInput.Icon
              icon={showPassword ? "eye" : "eye-off"}
              onPress={() => setShowPassword(!showPassword)}
            />
          }
        />
        {errors.pass && <HelperText type="error">{errors.pass}</HelperText>}

        <TextInput
          label="Description (optional)"
          value={description}
          onChangeText={handleDescription}
        />
        <View style={styles.buttonContainer}>
          <Button
            mode="elevated"
            onPress={handleSubmitForm}
            rippleColor="#808080"
          >
            Add Credential
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CreateAccount;

const styles = StyleSheet.create({
  mainWrapper: {},
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});
