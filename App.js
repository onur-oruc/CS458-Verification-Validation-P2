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
    const [checked, setChecked] = React.useState('first');

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
        placeholder="NameDJKD"
      />
      <TextInput
        style={styles.input}
        onChangeText={onChangeSurname}
        value={surname}
        placeholder="Surname"
      />
        <View>
            <RadioButton
                value="first"
                status={ checked === 'first' ? 'checked' : 'unchecked' }
                onPress={() => setChecked('first')}
            >
                Male
            </RadioButton>
            <RadioButton
                value="second"
                status={ checked === 'second' ? 'checked' : 'unchecked' }
                onPress={() => setChecked('second')}
            >
                Female
            </RadioButton>
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
});

export default App;
