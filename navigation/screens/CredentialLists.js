import React, { useContext, useState, useEffect } from "react";
import { View, Text, FlatList, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Divider,
  Searchbar,
  List,
  Dialog,
  TextInput,
  Button,
} from "react-native-paper";
import Application from "../../context/ApplicationContext";
import { createStackNavigator } from "@react-navigation/stack";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import { HelperText } from "react-native-paper";
import { useResetNavigation } from "../../utilities/utils";

const Stack = createStackNavigator();

const EditCredential = ({ route, navigation }) => {
  const context = useContext(Application);
  const { credentials, handleEditCredentials, logSession } = context;
  const { ID_CRED_TO_ACCESS } = route.params;
  const credenToAccess = credentials.find(
    (cred) => cred.id == ID_CRED_TO_ACCESS
  );
  const { label, email, pass, description } = credenToAccess;

  const [labelToEdit, setLabelToEdit] = useState(label);
  const [emailToEdit, setEmailToEdit] = useState(email);
  const [passToEdit, setPassToEdit] = useState(pass);
  const [descToEdit, setDescToEdit] = useState(description);

  const [isChanged, setIsChanged] = useState(false);

  useEffect(() => {
    const checkChange =
      labelToEdit !== label ||
      emailToEdit !== email ||
      passToEdit !== pass ||
      descToEdit !== description;

    setIsChanged(checkChange);
  }, [labelToEdit, emailToEdit, passToEdit, descToEdit]);

  const [errors, setErrors] = useState({});
  const handleVerifyCredentials = () => {
    const newErrors = {};

    if (!labelToEdit.trim()) {
      newErrors.label = "Label is required.";
    }

    if (!emailToEdit.trim()) {
      newErrors.email = "Email/Username is required.";
    }
    if (!passToEdit.trim()) {
      newErrors.pass = "Password is required.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmitForm = () => {
    if (handleVerifyCredentials()) {
      handleEditCredentials(ID_CRED_TO_ACCESS, {
        labelToEdit,
        emailToEdit,
        passToEdit,
        descToEdit,
      });
      logSession("A credential was changed.");
    }
  };

  return (
    <>
      <TextInput
        label="Label"
        mode="outlined"
        value={labelToEdit}
        onChangeText={setLabelToEdit}
      />
      {errors.label && <HelperText type="error">{errors.label}</HelperText>}
      <TextInput
        label="Email/Username"
        mode="outlined"
        value={emailToEdit}
        onChangeText={setEmailToEdit}
      />
      {errors.email && <HelperText type="error">{errors.email}</HelperText>}
      <TextInput
        label="Password"
        mode="outlined"
        value={passToEdit}
        onChangeText={setPassToEdit}
      />
      {errors.pass && <HelperText type="error">{errors.pass}</HelperText>}

      <TextInput
        label="Description (optional)"
        value={descToEdit}
        onChangeText={setDescToEdit}
      />
      <Button disabled={!isChanged} mode="contained" onPress={handleSubmitForm}>
        Save changes
      </Button>
    </>
  );
};

const CredentialInfo = ({ route, navigation }) => {
  const context = useContext(Application); //For getting the context from App.js
  const { credentials } = context; // Destructuring
  const { ID_CRED_TO_ACCESS } = route.params;

  const credenToAccess = credentials.find(
    (cred) => cred.id == ID_CRED_TO_ACCESS
  );

  return (
    <>
      <Button
        mode="contained"
        onPress={() =>
          navigation.navigate("Edit Credential", { ID_CRED_TO_ACCESS })
        }
      >
        Edit Credential Info
      </Button>
      <View>
        <Text>Email: {credenToAccess.email}</Text>
      </View>
      <View>
        <Text>Password: {credenToAccess.pass}</Text>
      </View>
      <View>
        <Text>Description: {credenToAccess.description}</Text>
      </View>
    </>
  );
};

const PasswordStack = ({ route, navigation }) => {
  const [showPassword, setShowPassword] = useState(false); //eye or eye-off in password dialog
  const [inputPass, setInputPass] = useState("");
  const mainkey = "password";
  const { ID_CRED_TO_ACCESS } = route.params;

  const handleVerify = (password) => {
    if (inputPass && password == mainkey) {
      navigation.navigate("Credential", { ID_CRED_TO_ACCESS });
    } else {
      console.log("wrong mossing");
    }
  };
  return (
    <>
      <View>
        <TextInput
          label="Key"
          mode="outlined"
          secureTextEntry={!showPassword}
          value={inputPass}
          onChangeText={setInputPass}
          right={
            <TextInput.Icon
              icon={showPassword ? "eye" : "eye-off"}
              onPress={() => setShowPassword(!showPassword)}
            />
          }
        />

        <Button
          icon="camera"
          mode="contained"
          onPress={() => handleVerify(inputPass)}
        >
          Press me
        </Button>
      </View>
    </>
  );
};

const CredLists = ({ navigation }) => {
  const context = useContext(Application); //For getting the context from App.js
  const { credentials } = context; // Destructuring
  let ID_CRED_TO_ACCESS;

  const [searchText, setSearchText] = useState("");
  const [filteredCredential, setFilteredCredential] = useState(credentials);

  const handleListPress = (pathName, id) => {
    ID_CRED_TO_ACCESS = id;
    navigation.navigate(`${pathName}`, { ID_CRED_TO_ACCESS });
  };

  useEffect(() => {
    // Update filtered credentials when credentials change
    const filtered = credentials.filter((credential) => {
      const label = credential.label;
      return label.toLowerCase().includes(searchText.toLowerCase());
    });

    setFilteredCredential(filtered);
  }, [credentials, searchText]);

  const handleSearch = (searchText) => {
    setSearchText(searchText);
  };

  return (
    <>
      <View>
        <Searchbar
          placeholder="Search Credentials"
          onChangeText={handleSearch}
        />
        <View>
          <FlatList
            data={filteredCredential}
            renderItem={({ item }) => (
              <Pressable
                onPress={() => {
                  handleListPress("Password", item.id);
                }}
              >
                <List.Item
                  title={item.label}
                  description={item.description || "No description provided"}
                  left={(props) => <List.Icon {...props} icon="account-lock" />}
                />
              </Pressable>
            )}
          />
        </View>
      </View>
    </>
  );
};

const CredentialLists = ({ navigation }) => {
  const [inputPass, setInputPass] = useState(""); //Password entered by the user in the dialog

  useResetNavigation(navigation, "Credential Lists");
  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <Stack.Navigator initialRouteName="Credential Lists">
        <Stack.Screen
          name="Credential Lists"
          component={CredLists}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Password"
          options={{ title: "Enter Main Key / Primary Key" }}
          component={PasswordStack}
        />

        <Stack.Screen
          name="Credential"
          options={{
            title: "Credential",
            headerBackImage: () => (
              <Pressable
                onPress={() => {
                  navigation.reset({
                    index: 0,
                    routes: [{ name: "Lists" }],
                  });
                }}
              >
                <MaterialCommunityIcons name="arrow-left-box" size={26} />
              </Pressable>
            ),
          }}
          component={CredentialInfo}
        />
        <Stack.Screen name="Edit Credential" component={EditCredential} />
      </Stack.Navigator>
    </SafeAreaView>
  );
};

export default CredentialLists;
