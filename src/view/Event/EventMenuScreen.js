import React, { Component } from "react";
import { Alert, StyleSheet, Text, View, TouchableOpacity, TouchableHighlight, Modal, TextInput } from "react-native";
import {
  Agenda,
  DateData,
  AgendaEntry,
  AgendaSchedule,
} from "react-native-calendars";
import DatePicker from "react-native-date-picker";
import firestore from "@react-native-firebase/firestore";


interface State {
  items?: AgendaSchedule;
  visible?: boolean;
  date?: Date;
  dateBirth?: Date;
  show?: boolean;
  text?: string;
}

export default class EventMenuScreen extends Component<State> {
  state: State = { 
    items: undefined,
    visible: false,
    show: false,
    date: new Date(),
    dateBirth: new Date(),
    text:""
  };

  // reservationsKeyExtractor = (item, index) => {
  //   return `${item?.reservation?.day}${index}`;
  // };

  onSend = (event) => {
    const ref = firestore().collection("events");
    ref.add({
      content: this.state.text,
      date: this.state.date
    })
    .then( response => {
      console.log(response.status)
    })
    .catch((error) => {
      console.log(error);
    });
  }

  onSubmit = (item, index) => {
      return `${item?.reservation?.day}${index}`;
     };
  
     inputValueUpdate = (val, prop) => {
      const state = this.state;
      state[prop] = val;
      this.setState(state);
  }


  render() {
    return (
      <View style={{flex:1}}>
        <View style={{ flex:1}}>
        <Agenda
          items={this.state.items}
          loadItemsForMonth={this.loadItems}
          selected={"2023-07-05"}
          renderItem={this.renderItem}
          renderEmptyDate={this.renderEmptyDate}
          rowHasChanged={this.rowHasChanged}
          showClosingKnob={true}
          // markingType={'period'}
          markedDates={{
            "2023-07-04": { textColor: "#43515c" },
            "2023-07-05": { textColor: "#43515c" },
            "2023-07-14": { startingDay: true, endingDay: true, color: "blue" },
            "2023-07-21": { startingDay: true, color: "blue" },
            "2023-07-22": { endingDay: true, color: "gray" },
            "2023-07-24": { startingDay: true, color: "gray" },
            "2023-07-25": { color: "gray" },
            "2023-07-26": { endingDay: true, color: "gray" },
          }}
          // monthFormat={'yyyy'}
          theme={{ calendarBackground: "#022537", agendaKnobColor: "#EE6D00" }}
          //renderDay={(day, item) => (<Text>{day ? day.day: 'item'}</Text>)}
          // hideExtraDays={false}
          // showOnlySelectedDayItems
          // reservationsKeyExtractor={this.reservationsKeyExtractor}
        />
        </View>
        <TouchableOpacity 
          onPress={()=>this.setState({visible: !this.state.visible})}
          style={{ padding:10, 
            backgroundColor:"#EE6D00", 
            position:"absolute", 
            width:50, 
            height:50, 
            borderRadius:100,
            justifyContent:"center",
            alignItems:"center", 
            flex:0,
            bottom:20,
            right:20}}>
          <Text style={{fontSize:20, fontWeight:"bold", color:"white"}}>+</Text>
        </TouchableOpacity>
        <Modal
        animationType="slide"
        transparent={true}
        visible={this.state.visible}
        onRequestClose={() => {
          this.setState({
            visible: false
          });
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
                marginBottom: 10,
              }}
            >
              Ajouter un evenement
            </Text>
            <TouchableOpacity
            style={{
              ...styles.loginInput,
              color: "white",
            }}
            onPress={() => this.setState({show:true})}
          >
            <Text style={{ color: "gray" }}>
              {this.state.dateBirth.getDate() +
                "-" +
                (this.state.dateBirth.getMonth() + 1) +
                "-" +
                this.state.dateBirth.getFullYear()}
            </Text>
          </TouchableOpacity>
          <TextInput
          style={{
            backgroundColor: "white",
            alignSelf: "flex-start",
            width: "86%",
            borderRadius: 5,
            paddingHorizontal: "4%",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            borderBottomWidth:1,
            marginBottom:15
          }}
          placeholder="Ecrire quelque chose ici..."
          multiline={true}
          onChangeText={(val) => this.inputValueUpdate(val, 'text')}
          value={this.text}
        />
            <TouchableHighlight
              style={{ ...styles.openButton, backgroundColor: "#022537" }}
              onPress={() => this.onSend}
            >
              <Text style={{ ...styles.textStyle }}>Valider</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
      {this.state.show && (
            <DatePicker
              modal
              open={this.state.show}
              date= {this.state.dateBirth}
              mode="date"
              onConfirm={(date) => {
                this.setState({dateBirth: date, show:false})
              }}
              onCancel={() => {
                this.setState({show:false})
              }}
            />
          )}
      </View>
    );
  }

  loadItems = (day: DateData) => {
    const items = this.state.items || {};

    setTimeout(() => {
      for (let i = 0; i < 30; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = this.timeToString(time);
        console.log(time);
        if (!items[strTime]) {
          items[strTime] = [];

          const numItems = Math.floor(Math.random() * 3 + 1);
          for (let j = 0; j < numItems; j++) {
            items[strTime].push({
              name: "Item for " + strTime + " #" + j,
              height: Math.max(50, Math.floor(Math.random() * 150)),
              day: strTime,
            });
          }
        }
      }

      const newItems: AgendaSchedule = {};
      Object.keys(items).forEach((key) => {
        newItems[key] = items[key];
      });
      this.setState({
        items: newItems,
      });
    }, 1000);
  };

  renderItem = (reservation: AgendaEntry, isFirst: boolean) => {
    const fontSize = isFirst ? 16 : 14;
    const color = isFirst ? "white" : "white";

    return (
      <TouchableOpacity
        style={[styles.item, { height: reservation.height }]}
        onPress={() => Alert.alert(reservation.name)}
      >
        <Text style={{ fontSize, color }}>{reservation.name}</Text>
      </TouchableOpacity>
    );
  };

  renderEmptyDate = () => {
    return (
      <View style={styles.emptyDate}>
        <Text>This is empty date!</Text>
      </View>
    );
  };

  rowHasChanged = (r1: AgendaEntry, r2: AgendaEntry) => {
    return r1.name !== r2.name;
  };

  timeToString(time: number) {
    const date = new Date(time);
    return date.toISOString().split("T")[0];
  }
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: "#1F9EBC",
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 3000,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
},
modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
},
openButton: {
  backgroundColor: "#022537",
  borderRadius: 20,
  padding: 10,
  elevation: 2
},
textStyle: {
  color: "white",
  fontWeight: "bold",
  textAlign: "center",
  fontSize: 12
},

loginInput: {
  borderWidth: 1,
  marginBottom: 10,
  marginTop: 7,
  width: "100%",
  paddingLeft: 10,
  borderRadius:10,
  borderColor:"white",
  paddingVertical:10,
  color:"white"

},
});