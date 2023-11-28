import React, { useContext } from "react";
import { View, Text, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Application from "../../context/ApplicationContext";

const SessionLogs = () => {
  const context = useContext(Application);
  const { sessionLogs } = context;
  return (
    <SafeAreaView>
      <FlatList
        data={sessionLogs}
        renderItem={({ item }) => <Text>{item}</Text>}
      />
    </SafeAreaView>
  );
};

export default SessionLogs;
