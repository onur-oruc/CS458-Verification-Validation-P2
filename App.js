/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type {Node} from 'react';
import {useState} from 'react';
import {Button, Image} from 'react-native';
import DatePicker from 'react-native-date-picker';
import { RadioButton } from 'react-native-paper';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text, TextInput,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {Picker} from "@react-native-picker/picker";

const Section = ({children, title}): Node => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};

const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [name, onChangeName] = useState('');
  const [surname, onChangeSurname] = useState('');
  const [date, setDate] = useState(new Date());
  const [modelOpen, setModelOpen] = useState(false);
  const [city, setCity] = useState('');
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  const [checked, setChecked] = React.useState();
  const [value, setValue] = React.useState();
  const [selectedValue, setSelectedValue] = useState("none");
  const [selectedVaxValue, setSelectedVaxValue] = useState("none");

  return (
    <SafeAreaView style={backgroundStyle}>
      <Image
        source={{
          uri: 'https://reactnative.dev/docs/assets/p_cat2.png',
        }}
        style={{width: 200, height: 200}}
      />
      <TextInput
        style={styles.input}
        onChangeText={onChangeName}
        value={name}
        placeholder="Name"
      />
      <TextInput
        style={styles.input}
        onChangeText={onChangeSurname}
        value={surname}
        placeholder="Surname"
      />

        <View style={styles.radios}>

            <View style={{flex: 0.1 }}>
                <RadioButton
                    value="male"
                    status={ checked === 'male' ? 'checked' : 'unchecked' }
                    onPress={() => setChecked('male')}
                />
            </View>
            <View style={{flex: 0.2}}>
                <Text style={{fontSize: 24}}>Male</Text>
            </View>
            <View style={{flex: 0.1 }}>
                <RadioButton
                    value="female"
                    status={ checked === 'female' ? 'checked' : 'unchecked' }
                    onPress={() => setChecked('female')}
                />
            </View>
            <View style={{flex: 0.3}}>
                <Text style={{fontSize: 24}}>Female</Text>
            </View>
            <View style={{flex: 0.1 }}>
                <RadioButton
                    value="other"
                    status={ checked === 'other' ? 'checked' : 'unchecked' }
                    onPress={() => setChecked('other')}
                />
            </View>
            <View style={{flex: 0.25}}>
                <Text style={{fontSize: 24}}>Other</Text>
            </View>
        </View>


      <View style={styles.button}>
        <Button
          title="Select Birthday"
          onPress={() => setModelOpen(true)}
        />
      </View>
      <DatePicker
        modal
        mode="date"
        open={modelOpen}
        date={date}
        onConfirm={date => {
          setModelOpen(false);
          setDate(date);
        }}
        onCancel={() => {
          setModelOpen(false);
        }}
      />
        <View style={styles.picker}>
            <Picker
                selectedValue={selectedValue}
                style={{ height: 50, width: 250 }}
                onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
            >

                <Picker.Item label="---Select Your City---" value="none" />
                <Picker.Item label="Adana" value="adana" />
                <Picker.Item label="Ankara" value="ankara" />
                <Picker.Item label="Antalya" value="antalya" />
                <Picker.Item label="Bursa" value="bursa" />
                <Picker.Item label="Diyarbakır" value="diyarbakir" />
                <Picker.Item label="Erzurum" value="erzurum" />
                <Picker.Item label="Eskişehir" value="eskisehir" />
                <Picker.Item label="Gaziantep" value="antep" />
                <Picker.Item label="İstanbul" value="istanbul" />
                <Picker.Item label="İzmir" value="izmir" />
                <Picker.Item label="Kocaeli" value="kocaeli" />
                <Picker.Item label="Konya" value="konya" />
                <Picker.Item label="Mersin" value="mersin" />
                <Picker.Item label="Ordu" value="ordu" />
                <Picker.Item label="Samsun" value="samsun" />

            </Picker>
        </View>
        <View style={styles.picker}>
            <Picker
                selectedValue={selectedVaxValue}
                style={{ height: 50, width: 250 }}
                onValueChange={(itemValue, itemIndex) => setSelectedVaxValue(itemValue)}
            >
                <Picker.Item label="---Select Vaccine Type---" value="none" />
                <Picker.Item label="Biontech" value="biontech" />
                <Picker.Item label="Sinovac" value="sinovac" />
                <Picker.Item label="Turkovac" value="turkovac" />

            </Picker>
        </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  input: {
    height: 40,
    margin: 10,
    marginLeft: 40,
    marginRight: 40,
    borderWidth: 1,
    padding: 10,
  },
  button: {
    marginLeft: 40,
    marginRight: 40,
  },
  radios: {
    flexDirection: "row",
    height: 50,
    padding: 10,
    marginLeft: 40,
    marginRight: 40
  },
  picker: {
    marginLeft: 40,
    marginRight: 40
  }
});

export default App;
