import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Platform,
  Button,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
// import {DatePickerInput} from 'react-native-paper
import DatePicker from 'react-native-date-picker';

const {width, height} = Dimensions.get('window');

const isLargeScreen = width > 600;
const isWeb = Platform.OS === 'web';

const locations = ['Chennai', 'Trichy', 'Muhavur', 'Thaeni'];
const suggestionText = [
  'Show me travellers going to mumbai',
  'Top 10 must see places in Mumbai',
  'Prepare 3 trip itinerary for Goa',
  'Show me hot travel related deals',
  'List out local events in Mumbai',
];

const LocationSelect = ({label, selectedValue, onValueChange}) => (
  <View style={styles.newUserItem}>
    <Text style={styles.label}>{label}:</Text>
    <Picker
      selectedValue={selectedValue}
      style={styles.homeSelect}
      onValueChange={onValueChange}>
      {locations.map((location, index) => (
        <Picker.Item key={index} label={location} value={location} />
      ))}
    </Picker>
  </View>
);

const IconSwap = () => (
  <View style={styles.swapIcon}>
    <Ionicons name="swap-horizontal" size={24} color="black" />
  </View>
);

const Home = () => {
  ///
  ///
  const [selectedFromLocation, setSelectedFromLocation] = useState('');
  const [selectedToLocation, setSelectedToLocation] = useState('');
  const [mode, setMode] = useState('');
  const [status, setStatus] = useState('');
  const [inputFromDate, setInputFromDate] = useState(undefined);
  const [inputToDate, setInputToDate] = useState(undefined);
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  return (
    <ScrollView contentContainerStyle={styles.homeContainer}>
      <View style={{backgroundColor: 'white', height: 40}}>
        <Text>Navbar</Text>
      </View>
      <View style={styles.homeContent}>
        <Text style={styles.title}>
          Find your next travel companion right here!
        </Text>
        <View style={styles.homeSuggestions}>
          {suggestionText.map((value, i) => (
            <Text key={i} style={styles.suggestionText}>
              {value}
            </Text>
          ))}
        </View>
        <View style={styles.inputContainer}>
          <View style={styles.locationDate}>
            {/* Location Section */}
            <View style={styles.locationSection}>
              <View style={styles.location}>
                <View style={styles.fromLocation}>
                  <Text style={styles.label}>From:</Text>
                  <Picker
                    selectedValue={selectedFromLocation}
                    onValueChange={itemValue =>
                      setSelectedFromLocation(itemValue)
                    }
                    style={styles.picker}
                    itemStyle={styles.pickerItem}>
                    <Picker.Item label="Chennai" value="Chennai" />
                    <Picker.Item label="Madurai" value="Madurai" />
                    <Picker.Item label="Mumbai" value="Mumbai" />
                  </Picker>
                </View>
                <IconSwap />
                <View style={styles.fromLocation}>
                  <Text style={styles.label}>To:</Text>
                  <Picker
                    selectedValue={selectedToLocation}
                    onValueChange={itemValue =>
                      setSelectedToLocation(itemValue)
                    }
                    style={styles.picker}
                    itemStyle={styles.pickerItem}>
                    <Picker.Item label="Chennai" value="Chennai" />
                    <Picker.Item label="Madurai" value="Madurai" />
                    <Picker.Item label="Mumbai" value="Mumbai" />
                  </Picker>
                </View>
              </View>
            </View>

            {/* Date Section */}
            <View style={styles.dateSection}>
              <View style={styles.date}>
                <Button title="Open" onPress={() => setOpen(true)} />
                <DatePicker
                  modal
                  open={open}
                  date={date}
                  onConfirm={date => {
                    setOpen(false);
                    setDate(date);
                  }}
                  onCancel={() => {
                    setOpen(false);
                  }}
                />

                {/* <DatePickerInput
                  locale="en"
                  label="Date"
                  value={inputFromDate}
                  onChange={d => setInputFromDate(d)}
                  inputMode="start"
                  style={styles.datePicker}
                />
                <IconSwap />
                <DatePickerInput
                  locale="en"
                  label="Date"
                  value={inputToDate}
                  onChange={d => setInputToDate(d)}
                  inputMode="start"
                  style={styles.datePicker}
                /> */}
              </View>
            </View>
          </View>
          <View style={styles.modestatus}>
            <View style={styles.fromLocation}>
              <Text style={styles.label}>Mode:</Text>
              <Picker
                selectedValue={mode}
                onValueChange={itemValue => setMode(itemValue)}
                style={styles.picker}
                itemStyle={styles.pickerItem}>
                <Picker.Item label="Flight" value="Flight" />
                <Picker.Item label="Train" value="Train" />
                <Picker.Item label="Bus" value="Bus" />
                <Picker.Item label="Car" value="Car" />
              </Picker>
            </View>
            <View style={styles.fromLocation}>
              <Text style={styles.label}>Status:</Text>
              <Picker
                selectedValue={status}
                onValueChange={itemValue => setStatus(itemValue)}
                style={styles.picker}
                itemStyle={styles.pickerItem}>
                <Picker.Item label="Booked my trip" value="Booked my trip" />
                <Picker.Item
                  label="Trip in Progress"
                  value="Trip in Progress"
                />
                <Picker.Item label="Dream List" value="Dream List" />
              </Picker>
            </View>
          </View>
          <TouchableOpacity style={styles.roundedButton}>
            <Text style={styles.buttonText}>Search</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    backgroundImage: `linear-gradient(180deg, #E0F7FF -4.92%, #89B3BF 284.25%)`,
  },
  homeContent: {
    padding: isLargeScreen ? 50 : 20,
    paddingHorizontal: isLargeScreen ? 60 : 20,
    elevation: 3,
    marginBottom: 20,
    textAlign: 'center',
  },
  title: {
    fontSize: isLargeScreen ? 24 : 20,
    margin: isLargeScreen ? 40 : 20,
    color: '#333',
    fontWeight: 'bold',
  },
  homeSuggestions: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignContent: 'center',
  },
  suggestionText: {
    padding: isLargeScreen ? 12 : 8,
    backgroundColor: 'white',
    borderRadius: 10,
    fontSize: isLargeScreen ? 16 : 14,
    margin: isLargeScreen ? 10 : 5,
    color: '#555',
  },
  inputContainer: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: isLargeScreen ? 30 : 15,
    marginHorizontal: isLargeScreen ? 40 : 20,
    backgroundColor: '#E4EFF3',
    padding: 20,
  },
  locationDate: {
    flex: 1,
    gap: 20,
  },
  locationSection: {
    marginBottom: 20,
  },
  location: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  fromLocation: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: isLargeScreen ? 15 : 10,
    borderWidth: 1,
    paddingHorizontal: isLargeScreen ? 15 : 10,
    borderRadius: 5,
    backgroundColor: 'white',
    maxHeight: 50,
    gap: 10,
  },
  picker: {
    flex: 1,
    height: 40,
    backgroundColor: 'transparent',
    borderWidth: 0,
    borderColor: 'transparent',
    borderRadius: 5,
    fontSize: isLargeScreen ? 16 : 14,
    color: '#555',
    width: isLargeScreen ? 200 : 150,
    paddingHorizontal: isLargeScreen ? 25 : 15,
    outlineWidth: isWeb ? 0 : undefined, // Only apply outlineWidth for web
  },
  pickerItem: {
    fontSize: isLargeScreen ? 18 : 16,
    color: '#333',
    marginHorizontal: isLargeScreen ? 60 : 30,
  },
  date: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  datePicker: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 5,
    color: '#555',
    paddingVertical: 0,
    maxHeight: isLargeScreen ? 40 : 40,
    paddingHorizontal: isLargeScreen ? 15 : 10,
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
  },
  label: {
    fontSize: isLargeScreen ? 18 : 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  swapIcon: {
    padding: isLargeScreen ? 8 : 8,
    marginHorizontal: isLargeScreen ? 10 : 5,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
  },
  modestatus: {
    flex: 1,
    alignItems: 'center',
    gap: 20,
  },
  statusContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    paddingHorizontal: isLargeScreen ? 15 : 10,
    borderRadius: 5,
    backgroundColor: 'white',
    maxHeight: 50,
  },
  roundedButton: {
    backgroundColor: '#007BFF',
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Home;
