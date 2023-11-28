import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {
  KeyboardAvoidingView,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import CreateAccount from "./screens/CreateAccount";
import SettingsScreen from "./screens/SettingsScreen";
import CredentialLists from "./screens/CredentialLists";
import SessionLogs from "./screens/SessionLogs";
import { Button, TouchableRipple } from "react-native-paper";

const Tab = createBottomTabNavigator();

const MainNavigation = () => {
  return (
    <Tab.Navigator
      initialRouteName="Create"
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          position: "absolute",
          bottom: 10,
          left: 7.5,
          right: 7.5,
          borderRadius: 10,
          height: 70,
        },
      }}
    >
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => (
            <View style={styles.iconLabelContainer}>
              <MaterialCommunityIcons name="cog" color={color} size={size} />
              <Text>Settings</Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Session Logs"
        component={SessionLogs}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => (
            <View style={styles.iconLabelContainer}>
              <MaterialCommunityIcons
                name="clipboard-text"
                color={color}
                size={size}
              />
              <Text>Session Logs</Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Lists"
        component={CredentialLists}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => (
            <View style={styles.iconLabelContainer}>
              <MaterialCommunityIcons
                name="account-details"
                color={color}
                size={size}
              />
              <Text>Lists</Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Create"
        component={CreateAccount}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => (
            <View
              style={{
                position: "absolute",
                top: -20,
                padding: 15,
                backgroundColor: "red",
                borderRadius: 40,
                shadowColor: "#7F5DF0",
                shadowOffset: {
                  width: 0,
                  height: 10,
                },
                shadowOpacity: 0.5,
                shadowRadius: 3.5,
                elevation: 6,
              }}
            >
              <View style={{ backgroundColor: "blue" }}></View>
              <View>
                <MaterialCommunityIcons
                  name="plus"
                  color={focused ? "#FFFFFF" : color}
                  size={40}
                />
              </View>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  iconLabelContainer: {
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
  },
});

export default MainNavigation;
