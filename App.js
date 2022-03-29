/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type {Node} from 'react';
import {useState, useEffect} from 'react';
import {Button, Image, Alert} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {RadioButton} from 'react-native-paper';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
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
import {Picker} from '@react-native-picker/picker';
import {green50} from 'react-native-paper/lib/typescript/styles/colors';

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
  const [gender, setGender] = useState('');
  const [selectedVaxValue, setSelectedVaxValue] = useState('');
  const [sideEffect, onChangeSideEffect] = useState('');
  const [checkedPosCase, setCheckedPosCase] = useState('');
  const [symptoms, setSymptoms] = useState('');
  const [disabled, setDisabled] = useState(false);
  const months = {
    0: 'Jan',
    1: 'Feb',
    2: 'Mar',
    3: 'Apr',
    4: 'May',
    5: 'June',
    6: 'July',
    7: 'Aug',
    8: 'Sep',
    9: 'Oct',
    10: 'Nov',
    11: 'Dec',
  };
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  const isDisabled = () => {
    if (name === '') {
      return false;
    }
    if (surname === '') {
      return false;
    }
    if (!date) {
      return false;
    }
    if (city === '') {
      return false;
    }
    if (gender === '') {
      return false;
    }
    if (selectedVaxValue === '') {
      return false;
    }
    if (checkedPosCase === '') {
      return false;
    }
    return true;
  }
  const createAlert = () => {
    let alertMessage = '';
    const emptyFields = [];
    if (name === '') {
      emptyFields.push('Name');
    }
    if (surname === '') {
      emptyFields.push('Surname');
    }
    if (!date) {
      emptyFields.push('Birthday');
    }
    if (city === '') {
      emptyFields.push('City');
    }
    if (gender === '') {
      emptyFields.push('Gender');
    }
    if (selectedVaxValue === '') {
      emptyFields.push('Vaccine Type');
    }
    if (checkedPosCase === '') {
      emptyFields.push('Positive cases after 3rd vaccination');
    }
    if (emptyFields.length == 0) {
      onChangeName('');
      onChangeSurname('');
      setDate(new Date());
      setCity('');
      setGender('');
      setSelectedVaxValue('');
      setCheckedPosCase('');
      Alert.alert('Your answers were successfully submitted');
    } else {
      for (let i = 0; i < emptyFields.length; i++) {
        if (i == 0) {
          alertMessage += 'Fill the following fields: ' + emptyFields[i];
        } else {
          alertMessage += ', ' + emptyFields[i];
        }
      }
      Alert.alert('Missing Fields', alertMessage);
    }
  };

  useEffect(() => {
    console.log(date.getDate());
    console.log(date.getFullYear());
    console.log(date.getMonth());
    setDisabled(isDisabled());
  }, [name, surname, date, city, gender, selectedVaxValue, checkedPosCase]);
  return (
    <SafeAreaView style={styles.background}>
      <ScrollView>
        <View style={{alignItems: 'center'}}>
          <Image
            source={{
              uri: 'https://reactnative.dev/docs/assets/p_cat2.png',
            }}
            style={{width: 100, height: 100}}
          />
          <Text
            style={{
              marginLeft: 20,
              marginRight: 30,
              marginTop: 20,
              fontSize: 25,
              fontWeight: 'bold',
            }}>
            Covid-19 Vaccine Survey
          </Text>
        </View>
        <TextInput
          accessibilityLabel={'namebox'}
          style={styles.input}
          onChangeText={onChangeName}
          value={name}
          placeholder="Name"
        />
        <TextInput
          accessibilityLabel={'surnamebox'}
          style={styles.input}
          onChangeText={onChangeSurname}
          value={surname}
          placeholder="Surname"
        />
        <View style={styles.button}>
          <Button
            title="Select Birthday"
            onPress={() => setModelOpen(true)}
            accessibilityLabel={'bdayButton'}
          />
          <Text
            style={{
              marginTop: 10,
              fontStyle: 'normal',
              fontSize: 17,
              fontWeight: 'bold',
            }}>
            {date ? (
              'Your Birthday: ' +
              months[date.getMonth()] +
              '. ' +
              date.getDate() +
              ', ' +
              date.getFullYear()
            ) : (
              <></>
            )}
          </Text>
        </View>
        <View style={styles.picker}>
          <Picker
            accessibilityLabel={'cityPicker'}
            selectedValue={city}
            style={{height: 50, width: 250}}
            onValueChange={(itemValue, itemIndex) => setCity(itemValue)}>
            <Picker.Item label="---Select Your City---" value="" />
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
        <View style={styles.radios}>
          <View style={{flex: 0.1}}>
            <RadioButton
              accessibilityLabel={'male'}
              value="male"
              status={gender === 'male' ? 'checked' : 'unchecked'}
              onPress={() => setGender('male')}
            />
          </View>
          <View style={{flex: 0.2}}>
            <Text style={{fontSize: 24}}>Male</Text>
          </View>
          <View style={{flex: 0.1}}>
            <RadioButton
              accessibilityLabel={'female'}
              value="female"
              status={gender === 'female' ? 'checked' : 'unchecked'}
              onPress={() => setGender('female')}
            />
          </View>
          <View style={{flex: 0.3}}>
            <Text style={{fontSize: 24}}>Female</Text>
          </View>
          <View style={{flex: 0.1}}>
            <RadioButton
              accessibilityLabel={'other'}
              value="other"
              status={gender === 'other' ? 'checked' : 'unchecked'}
              onPress={() => setGender('other')}
            />
          </View>
          <View style={{flex: 0.25}}>
            <Text style={{fontSize: 24}}>Other</Text>
          </View>
        </View>

        <DatePicker
          maximumDate={new Date()}
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
            accessibilityLabel={'vaxPicker'}
            selectedValue={selectedVaxValue}
            style={{height: 50, width: 250}}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedVaxValue(itemValue)
            }>
            <Picker.Item label="---Select Vaccine Type---" value="" />
            <Picker.Item label="Biontech" value="biontech" />
            <Picker.Item label="Sinovac" value="sinovac" />
            <Picker.Item label="Turkovac" value="turkovac" />
          </Picker>
        </View>
        <View style={styles.textAreaContainer}>
          <TextInput
            accessibilityLabel={'sideEffects'}
            style={styles.textArea}
            onChangeText={onChangeSideEffect}
            value={sideEffect}
            underlineColorAndroid="transparent"
            placeholder="Any side effects after vaccination"
            placeholderTextColor="red"
            numberOfLines={2}
            multiline={true}
          />
        </View>
        <View>
          <Text
            style={{
              marginLeft: 50,
              marginRight: 30,
              marginTop: 20,
              fontSize: 15,
              fontWeight: 'bold',
            }}>
            Any PCR positive cases after 3rd vaccination?
          </Text>
        </View>
        <View style={styles.radios}>
          <View style={{flex: 0.1}}>
            <RadioButton
              accessibilityLabel={'yes'}
              value="Yes"
              status={checkedPosCase === 'yes' ? 'checked' : 'unchecked'}
              onPress={() => setCheckedPosCase('yes')}
            />
          </View>
          <View style={{flex: 0.2}}>
            <Text style={{fontSize: 20}}>Yes</Text>
          </View>
          <View style={{flex: 0.1}}>
            <RadioButton
              accessibilityLabel={'no'}
              value="No"
              status={checkedPosCase === 'no' ? 'checked' : 'unchecked'}
              onPress={() => setCheckedPosCase('no')}
            />
          </View>
          <View style={{flex: 0.3}}>
            <Text style={{fontSize: 20}}>No</Text>
          </View>
        </View>
        {checkedPosCase === 'yes' ? (
          <View style={styles.textAreaContainer} accessibilityLabel={'symptomstextbox'}>

            <TextInput
              accessibilityLabel={'symptoms'}
              style={styles.textArea}
              onChangeText={setSymptoms}
              value={symptoms}
              underlineColorAndroid="transparent"
              placeholder="Enter your symptoms"
              placeholderTextColor="red"
              numberOfLines={2}
              multiline={true}
            />
          </View>
        ) : (
          <></>
        )}
        <View style={styles.submitButton}>
          <Button
            title="Send"
            disabled={!disabled}
            accessibilityLabel={'sendButton'}
            color="#32cd32"
            onPress={createAlert}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: Colors.white,
  },
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
    flexDirection: 'row',
    height: 50,
    padding: 10,
    marginLeft: 40,
    marginRight: 40,
  },
  picker: {
    marginLeft: 40,
    marginRight: 40,
  },
  textAreaContainer: {
    borderColor: Colors.green,
    marginLeft: 40,
    marginRight: 40,

    borderWidth: 1,
    padding: 5,
  },
  textArea: {
    height: 100,
    justifyContent: 'flex-start',
  },
  submitButton: {
    marginLeft: 40,
    marginRight: 40,
    marginBottom: 20,
  },
});

export default App;
