import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Snackbar from 'react-native-snackbar';

import {currencyByRupee} from './constants';

const CurrencyConvertor = () => {
  const [inputValue, setInputValue] = useState('');
  const [resultValue, setResultValue] = useState('');
  const [targetCurrency, setTargetCurrency] = useState('');

  const buttonPressed = targetValue => {
    if (!inputValue) {
      return Snackbar.show({
        text: 'Enter value to convert',
        backgroundColor: '#EA7773',
        textColor: '#000000',
      });
    }

    const inputAmount = parseFloat(inputValue);
    if (!isNaN(inputAmount)) {
      const convertedValue = inputAmount * targetValue.value;
      const result = `${targetValue.symbol} ${convertedValue.toFixed(2)}`;
      setResultValue(result);
      setTargetCurrency(targetValue.name);
    } else {
      return Snackbar.show({
        text: 'Not a valid number to convert',
        backgroundColor: '#F4BE2C',
        textColor: '#000000',
      });
    }
  };

  const convertorItem = ({item}) => {
    return (
      <Pressable
        style={[
          styles.countryListContainer,
          targetCurrency === item.name && styles.selected,
        ]}
        onPress={() => buttonPressed(item)}>
        <Text style={styles.listItemText}>
          {item.flag} {item.name}
        </Text>
      </Pressable>
    );
  };
  const ListHeaderComponent = () => {
    return (
      <View style={styles.totalAmountContainer}>
        <View style={styles.inputContainer}>
          <View style={styles.inputCurrencyLabel}>
            <Text style={styles.currencyText}>₹</Text>
          </View>
          <TextInput
            style={styles.inputStyle}
            value={inputValue}
            maxLength={14}
            // clearButtonMode="always" // ios only
            onChangeText={setInputValue}
            placeholder="100"
            placeholderTextColor={'#CCC'}
            keyboardType="number-pad"
          />
        </View>
        {resultValue && <Text style={styles.resultTxt}>{resultValue}</Text>}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headingText}>CurrencyConvertor</Text>
      <View style={styles.mainContainer}>
        <FlatList
          data={currencyByRupee}
          renderItem={convertorItem}
          keyExtractor={item => item.name}
          ListHeaderComponent={ListHeaderComponent}
          numColumns={3}
        />
      </View>
    </View>
  );
};

export default CurrencyConvertor;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  headingText: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  mainContainer: {
    // alignItems: 'center',
    justifyContent: 'center',
  },
  countryListContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'space-evenly',
    margin: 8,
    borderRadius: 4,
  },
  selected: {
    backgroundColor: '#ffeaa7',
  },
  listItemText: {
    color: '#333',
    fontWeight: '600',
    alignSelf: 'center',
    padding: 8,
  },
  totalAmountContainer: {
    alignItems: 'center',
    marginVertical: 18,
  },
  inputStyle: {
    paddingVertical: 8,
    width: '80%',
    borderRadius: 4,
    color: '#333',
    backgroundColor: '#FFFFFF',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  currencyText: {
    color: '#CCC',
    fontSize: 15,
    fontWeight: 'bold',
    padding: 4,
  },
  resultTxt: {
    fontSize: 32,
    color: '#FFFFFF',
    fontWeight: '800',
  },
});
