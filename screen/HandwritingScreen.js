

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from "react-native";
import { launchCameraAsync } from "expo-image-picker";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Button } from "react-native-paper";



const alphabetList = "AbCdEfGHIJKlMNOpQRSTUVWXYZ".split("");

const generateRandomAlphabets = () => {
  const randomAlphabets = [];
  while (randomAlphabets.length < 2) {
    const randomIndex = Math.floor(Math.random() * alphabetList.length);
    const randomLetter = alphabetList[randomIndex];
    if (!randomAlphabets.includes(randomLetter)) {
      randomAlphabets.push(randomLetter);
    }
  }
  return randomAlphabets;
};

const DyslexiaTestScreen = ({ navigation }) => {
  const [alphabets, setAlphabets] = useState([]);
  const [showCaptureButton, setShowCaptureButton] = useState(false);
  const [imageUri, setImageUri] = useState(null);
  const [clickCount, setClickCount] = useState(0);

  useEffect(() => {
    setAlphabets(generateRandomAlphabets());
  }, []);

  const handleNextClick = () => {
    setClickCount((prevCount) => prevCount + 1);
    if (clickCount < 4) {
      
      setAlphabets(generateRandomAlphabets());
      setShowCaptureButton(false); 
    } else {
      setShowCaptureButton(true); 
    }
  };

  const handleCaptureClick = async () => {
    const result = await launchCameraAsync();
    if (!result.canceled) {
      setImageUri(result.uri);
    } else {
      Alert.alert("Capture Cancelled", "No image was captured.");
    }
  };

  const takeImageWithCamera = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: false, 
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.grid}>
        {alphabets.map((alphabet, index) => (
          <View key={index} style={styles.alphabetBox}>
            <Text style={styles.alphabetText}>{alphabet}</Text>
          </View>
        ))}
      </View>
      <View style={styles.buttonContainer}>
        {/* <Button
          mode="contained"
          onPress={handleNextClick}
          style={styles.button}
        >
          Next
        </Button> */}
        {/* {showCaptureButton && ( */}
          <Button
            style={styles.button1}
            mode="text"
            onPress={() => navigation.navigate("Capture")}
          >
            Capture
          </Button>
        {/* )} */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginBottom: 20,
  },
  alphabetBox: {
    width: 60,
    height: 60,
    margin: 5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#4682B4",
    borderRadius: 5,
  },
  alphabetText: {
    fontSize: 32,
    color: "#fff",
  },
  buttonContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    width: "90%",
    borderRadius: 30,
    marginBottom: 20,
    gap: 20,
  },
  capturedImage: {
    width: 200,
    height: 200,
    marginTop: 20,
    borderRadius: 10,
  },
  button: {
    backgroundColor: "blue",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  button1: {
    paddingVertical: 10,
    backgroundColor: 'white',
    color: 'red',
    borderStyle: "dashed",
    borderWidth:3

  }
});

export default DyslexiaTestScreen;
