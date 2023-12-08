import { PermissionsAndroid, Platform } from 'react-native';
import Geolocation from 'react-native-geolocation-service';

import {LOADING_STATUS} from './enums';

const isLoadingOrCompletedOrFailed = (...args: LOADING_STATUS[]) =>
  args.some(
    (state: LOADING_STATUS) =>
      state === LOADING_STATUS.LOADING ||
      state === LOADING_STATUS.COMPLETED ||
      state === LOADING_STATUS.FAILED,
  );

const isLoading = (...args: LOADING_STATUS[]) =>
  args.some((state: LOADING_STATUS) => state === LOADING_STATUS.LOADING);

const isLastProfileCard = (cardsArray, currentProfileData) => {
  const lastIndex = cardsArray.length - 1;
  const currentIndex = cardsArray.findIndex(
    data => data.id === currentProfileData.id,
  );
  const isLastCard = currentIndex === lastIndex;
  return [isLastCard, currentIndex];
};

const getLocationPermissions =  () => new Promise( async (resolve, reject) => {
  if(Platform.OS === 'ios'){
    try {
       const permissionStatus = await Geolocation.requestAuthorization('whenInUse')
       if(permissionStatus === 'granted'){
        return resolve('granted')
       }
       return reject('permission not grantes')
    } catch (error) {
      return reject(error)
    }
  } 
  return PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
  ).then((granted) => {
    if(granted === PermissionsAndroid.RESULTS.GRANTED){
      resolve('granted')
    } else {
      reject('permission not granted')
    }

  }).catch((error) => {
    reject('permission not granted')
  })

}) 


export {isLoadingOrCompletedOrFailed, isLoading, isLastProfileCard, getLocationPermissions};
