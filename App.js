import React, { useState, useEffect, useRef } from "react";
import { AppState } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "react-native-paper/react-navigation";
import { Provider } from "react-native-paper";

import { Text, View } from "react-native";
import MainNavigation from "./navigation/MainNavigation";

//For Context
import Application from "./context/ApplicationContext";

//For ID
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";

export default function App() {
  const [credentials, setCredentials] = useState([
    {
      id: uuidv4(),
      label: "testlabel",
      email: "testemail",
      pass: "testpas",
      description: "testdesc",
    },
    {
      id: uuidv4(),
      label: "Facebook",
      email: "testemail123",
      pass: "testpass123",
      description: "testdesc123",
    },
    {
      id: uuidv4(),
      label: "Instagram",
      email: "testemail1233",
      pass: "testpass1233",
      description: "testdesc1233",
    },
  ]);
  const [sessionLogs, setSessionLogs] = useState([]);
  const [newLabel, setNewLabel] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPass, setNewPass] = useState("");
  const [description, setDescription] = useState("");

  const handleEditCredentials = (
    id,
    { labelToEdit, emailToEdit, passToEdit, descToEdit }
  ) => {
    setCredentials((prevCredentials) => {
      return prevCredentials.map((prevCreden) =>
        prevCreden.id === id
          ? {
              ...prevCreden,
              label: labelToEdit,
              email: emailToEdit,
              pass: passToEdit,
              description: descToEdit,
            }
          : prevCreden
      );
    });
  };

  const handleCredentials = (label, email, pass, description) => {
    setCredentials((prevCred) => [
      ...(prevCred || []),
      { id: uuidv4(), label, email, pass, description },
    ]);
    setNewLabel("");
    setNewEmail("");
    setNewPass("");
    setDescription("");
  };

  const handleNewLabel = (newLabel) => {
    setNewLabel(newLabel);
  };

  const handleNewEmail = (newEmailCred) => {
    setNewEmail(newEmailCred);
  };

  const handleNewPass = (newPassCred) => {
    setNewPass(newPassCred);
  };

  const handleDescription = (newDescripCred) => {
    setDescription(newDescripCred);
  };

  //For Session Logs
  const logSession = (action) => {
    const timeStamp = new Date().toLocaleString();
    const newLog = `${timeStamp}: ${action}`;

    //Update the Session Logs State
    setSessionLogs((prevSession) => [...prevSession, newLog]);
  };

  const appState = useRef(AppState.currentState);

  useEffect(() => {
    // logSession("New login.");
  }, []);

  useEffect(() => {
    const handleAppStateChange = (nextAppState) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === "active"
      ) {
        // App came to the foreground (user opened the app)
        logSession("App was opened from the background.");
      } else if (
        appState.current === "active" &&
        nextAppState.match(/inactive|background/)
      ) {
        // App went to the background (user closed the app or switched to another app)
        logSession("App was closed.");
      }

      appState.current = nextAppState;
    };
    // Subscribe to app state changes
    const subscription = AppState.addEventListener(
      "change",
      handleAppStateChange
    );

    // Clean up the subscription when the component unmounts
    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <Provider>
      <Application.Provider
        value={{
          credentials,
          newLabel,
          newEmail,
          newPass,
          description,
          sessionLogs,
          handleNewLabel,
          handleNewEmail,
          handleNewPass,
          handleDescription,
          handleEditCredentials,
          handleCredentials,
          logSession,
        }}
      >
        <NavigationContainer>
          <MainNavigation />
        </NavigationContainer>
      </Application.Provider>
    </Provider>
  );
}
