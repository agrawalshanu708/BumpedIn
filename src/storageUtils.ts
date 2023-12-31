import AsyncStorage from '@react-native-async-storage/async-storage'

const getValueFromLocal = async (key, defaultValue = null) => {
  try {
    let value = await AsyncStorage.getItem(key)

    if (value !== null) {
      value = JSON.parse(value)
    }
    return value
  } catch (error) {
    // Error retrieving data
    console.log('Could not save data: ' + key, error)
  }
}

const setValueToLocal = async (key, value) => {
  try {
    return await AsyncStorage.setItem(key, JSON.stringify(value))
  } catch (error) {
    // Error saving data
    console.log('Could not save data: ' + key, error)
  }
  // return success;
}

const removeFromLocal = async key => {
  try {
    return await AsyncStorage.removeItem(key)
  } catch (error) {
    // Error saving data
    console.log('Could not remove data: ' + key, error)
  }
}

const clearLocal = async () => {
  try {
    return await AsyncStorage.clear(() => {
      console.log('cleared')
    })
  } catch (error) {
    // Error saving data
    console.log('Could not clear data ', error)
  }
}

export {getValueFromLocal, setValueToLocal, clearLocal, removeFromLocal}
