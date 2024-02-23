import React, { useEffect, useMemo, useState } from "react";
import { ImageBackground, StyleSheet, Text, View, Image, Dimensions, Button } from "react-native";
import RadioGroup from "react-native-radio-buttons-group";
import SelectDropdown from "react-native-select-dropdown";
//Import moment for date and time
import moment from "moment";
import axios from "axios";

export default function App() {
    const [q1, setQ1] = useState();
    const [q2, setQ2] = useState();
    const [q3, setQ3] = useState();
    const [school, setSchool] = useState();
    const [currentDate, setCurrentDate] = useState("");
    const schoolList = ["SOET", "SOE", "SOLB", "SOBAS", "SOBE", "SOLACS", "SOLJ", "SOMC", "SOMS", "SOSA"];

    useEffect(() => {
        setTimeout(() => {
            var date = moment().utcOffset("+05:30").format(" hh:mm:ss a");
            setCurrentDate(date);
        }, 1000);
    }, [currentDate]);

    
function getFormattedTime() {
  const date = new Date(Date.now());
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var seconds = date.getSeconds();

  return hours + ":" + minutes + ":" + seconds;
}

function getFormattedDate() {
  const date = new Date(Date.now());
  var day = date.getDate() ;
  var month = date.getMonth();
  var year = date.getFullYear();

  return day + "-" + month + "-" + year;
}


    async function handleSubmit() {
      const URL = "https://script.google.com/macros/s/AKfycbzW-4mozWei2sp5ysCovrh7i6eneZMV9ofPJIQNYE14W4K8FMWZmvFe_J--w0tOvlnm/exec"
      const payload = {
        school: school,
        q1: q1,
        q2: q2,
        q3: q3,
        date: getFormattedDate(),
        time: getFormattedTime()
    }
    const formData = new FormData();
    const keys = Object.keys(payload)
    for (let i = 0; i < keys.length; i++) {
      const element = keys[i];
      formData.append(element, payload[element])
    }
    console.log(payload)
      axios.post(URL, formData)
        .then(function (response) {
            console.log("Success",response.data);
        })
        .catch(function (error) {
            console.log("Error", error.stack);
        });
    }

    return (
        <ImageBackground source={require("./assets/background.jpg")} resizeMode="cover" style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.time}>{currentDate}</Text>
                <Image style={styles.logo} source={require("./assets/logo.png")} />
                <View style={styles.school}>
                    <SelectDropdown
                        data={schoolList}
                        onSelect={(selectedItem, index) => {
                            console.log(selectedItem, index);
                            setSchool(selectedItem);
                        }}
                        buttonStyle={styles.time}
                        rowStyle={styles.time}
                        dropdownStyle={styles.time}
                        searchInputStyle={styles.time}
                        selectedRowStyle={styles.time}
                    />
                </View>
            </View>
            <Image style={styles.mainHeading} source={require("./assets/fb.jpg")} />
            <Question question={"How satisfied are you with the overall experience?"} setState={setQ1} state={q1} />
            <Question question={"How satisfied are you with the overall experience?"} setState={setQ2} state={q2} />
            <Question question={"How satisfied are you with the overall experience?"} setState={setQ3} state={q3} />
            <Button style={styles.button} title="Submit" onPress={handleSubmit}></Button>
        </ImageBackground>
    );
}

function Question({ question, setState, state }) {
    const radioButtons = useMemo(
        () => [
            {
                id: "1", // acts as primary key, should be unique and non-empty string
                label: "Excellent",
                value: "Excellent",
            },
            {
                id: "2",
                label: "Good",
                value: "Good",
            },
            {
                id: "3",
                label: "Average",
                value: "Average",
            },
            {
                id: "4",
                label: "Poor",
                value: "Poor",
            },
            {
                id: "5",
                label: "Worst",
                value: "Worst",
            },
        ],
        []
    );

    return (
        <View style={styles.questionContainer}>
            <Text style={styles.question}>{question}</Text>
            <RadioGroup radioButtons={radioButtons} onPress={setState} selectedId={state} containerStyle={styles.row} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    row: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
    },
    header: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
        width: "100%",
    },
    mainHeading: {
        height: 70,
        objectFit: "contain",
        marginTop: 20,
        marginBottom: 70,
    },
    questionContainer: {
        marginBottom: 30,
    },
    question: {
        fontWeight: "bold",
        fontSize: 18,
        marginBottom: 15,
    },
    school: {
        width: 200,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: "hidden"
    },
    time:{
      fontSize: 24,
      width: 200
    },
    button:{
      color: "#fff"
    }

});
