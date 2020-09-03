import React, { useState, useRef, useEffect } from 'react';
import { useApolloClient, gql } from '@apollo/client';
import { Platform, View, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import useGeneralContext from '../store/GeneralContext';
import { useTranslate } from '../utils/language';
import PropTypes from 'prop-types';
import TopCenteredLayout from '../components/templates/TopCenteredLayout';
import Input from '../components/atoms/Input';
import { CheckBox, Avatar, Text, Icon } from '@ui-kitten/components';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import { white, primary, error } from '../../assets/colorsPalette';
import uploadImage from '../services/uploadImage';
import ScheduleCard from '../components/molecules/ScheduleCard';
import StepWizard from '../components/molecules/StepWizard';
import MapView, { Marker } from 'react-native-maps';
import GooglePlacesAutocomplete from '../components/molecules/GooglePlacesAutocomplete';
import ErrorDisplayer from '../components/atoms/ErrorDisplayer';
import deepcopy from 'deepcopy';
import useUserContext from '../store/UserContext';
import { useToast } from 'react-native-styled-toast';
import { useFormik } from 'formik';
import { string, object, array } from 'yup';
import getError from '../utils/getError';

/**
 * @param {object} navigation
 * @returns {component}
 */

const styles = StyleSheet.create({
  logoContainer: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    alignItems: 'center',
    marginLeft: Dimensions.get('window').width / 2 - 150,
    maxWidth: 300,
    maxHeight: 100,
  },
  logoTouchable: { flexDirection: 'row', alignItems: 'flex-end' },
  logo: { width: 100, height: 100, borderWidth: 2, borderColor: primary },
  logoWithError: { width: 100, height: 100, borderWidth: 2, borderColor: error },
  storeName: { marginLeft: 10, flexShrink: 1 },
  inputsContainer: { marginTop: 0, marginBottom: 10 },
  checkbox: { marginLeft: 10 },
  attentionSchedulesContainer: { alignItems: 'center' },
  attentionSchedulesTitle: { marginTop: 10 },
  mapContainer: {
    backgroundColor: white,
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: -20,
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height / 2.8,
  },
  addressAutocompleteContainer: { width: 300, height: 300, marginBottom: -240 },
  phoneNumberContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  phoneNumberInputContainer: { maxWidth: 200 },
  phoneNumberInput: { maxWidth: 170 },
  availableOnWhatsAppContainer: { maxWidth: 130, marginTop: 12 },
});

export const CreateStoreScreen = ({ navigation }) => {
  const t = useTranslate();
  const { toast } = useToast();
  const [loading, setLoading] = useGeneralContext();
  const [user] = useUserContext();
  const client = useApolloClient();
  const [map, setMap] = useState();
  const [addressRef, setAddressRef] = useState();
  const [cityRef, setCityRef] = useState();
  const ref_input2 = useRef();
  const ref_input4 = useRef();
  const ref_input5 = useRef();
  const ref_input6 = useRef();
  const ref_input7 = useRef();
  const ref_input8 = useRef();
  const [currentStep, setCurrentStep] = useState(0);
  const steps = ['General', 'Contacto'];
  const formik1 = useFormik({
    initialValues: {
      logo: '',
      name: '',
      description: '',
      reservationEnabled: true,
      attentionSchedules: [{ days: [], hours: [{ since: null, until: null }] }],
    },
    onSubmit: () => setCurrentStep(currentStep + 1),
    validationSchema: object().shape({
      logo: string().required(t('error_empty_logo')),
      name: string().required(t('error_empty_required_fields')),
      attentionSchedules: array(
        object().shape({
          days: array().required(t('error_empty_required_fields')),
          hours: array(
            object().shape({
              since: string()
                .nullable()
                .matches(new RegExp('^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$'), t('error_hour_format'))
                .required(t('error_empty_required_fields')),
              until: string()
                .nullable()
                .matches(new RegExp('^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$'), t('error_hour_format'))
                .required(t('error_empty_required_fields')),
            })
          ).required(t('error_empty_required_fields')),
        })
      ).required(t('error_empty_required_fields')),
    }),
  });
  const formik2 = useFormik({
    initialValues: {
      coord: null,
      address: '',
      city: '',
      country: '',
      phoneNumber: '',
      availableOnWhatsApp: true,
      facebookUsername: '',
      instagramUsername: '',
    },
    onSubmit: () => createStore(),
    validationSchema: object().shape({
      address: string().required(t('error_empty_address')),
      city: string().required(t('error_empty_city')),
      country: string().required(t('error_empty_country')),
      phoneNumber: string().required(t('error_empty_required_fields')),
    }),
  });

  const getPermissionAsync = async () => {
    if (Platform.OS === 'ios') {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  };

  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });
      if (!result.cancelled) {
        formik1.setFieldValue('logo', result.uri);
      }
    } catch (err) {
      toast({
        intent: 'ERROR',
        message: err.message ? t(err.message) : t(err),
        duration: 5000,
        closeIconColor: 'rgba(0,0,0,0)',
      });
    }
  };

  const handleAddressSelection = (data, details) => {
    formik2.setFieldValue('coord', {
      latitude: details.geometry.location.lat,
      longitude: details.geometry.location.lng,
    });
    map.animateCamera(
      {
        center: {
          latitude: details.geometry.location.lat,
          longitude: details.geometry.location.lng,
        },
        zoom: 16,
      },
      { duration: 1500 }
    );
    let streetObject = details.address_components.find((element) => element.types.includes('route'));
    let streetNumberObject = details.address_components.find((element) =>
      element.types.includes('street_number')
    );
    let cityObject = details.address_components.find(
      (element) => element.types.includes('locality') || element.types.includes('administrative_area_level_3')
    );
    let countryObject = details.address_components.find((element) => element.types.includes('country'));
    if (streetObject) {
      if (streetNumberObject) {
        addressRef.setAddressText(streetObject.long_name + ' ' + streetNumberObject.long_name);
        formik2.setFieldValue('address', streetObject.long_name + ' ' + streetNumberObject.long_name);
      } else {
        addressRef.setAddressText(streetObject.long_name);
        formik2.setFieldValue('address', '');
      }
      if (cityObject) {
        cityRef.setAddressText(cityObject.long_name);
        formik2.setFieldValue('city', cityObject.long_name);
      }
      if (countryObject) {
        formik2.setFieldValue('country', countryObject.short_name);
      }
    }
  };

  const handleCitySelection = (data, details) => {
    let cityObject = details.address_components.find(
      (element) => element.types.includes('locality') || element.types.includes('administrative_area_level_3')
    );
    let countryObject = details.address_components.find((element) => element.types.includes('country'));
    if (cityObject && countryObject) {
      cityRef.setAddressText(cityObject.long_name);
      formik2.setFieldValue('city', cityObject.long_name);
      formik2.setFieldValue('country', countryObject.short_name);
    } else {
      console.log(t('error_you_must_select_a_valid_city_and_country'));
    }
  };

  const MUTATION_CREATESTORE = gql`
    mutation createStore($input: CreateStoreInput!) {
      createStore(input: $input)
    }
  `;

  const createStore = async () => {
    setLoading(true);
    try {
      let attentionSchedulesCopy = deepcopy(formik1.values.attentionSchedules);
      let { data, error } = await client.mutate({
        mutation: MUTATION_CREATESTORE,
        variables: {
          input: {
            storeName: formik1.values.name,
            description: formik1.values.description,
            reservationEnabled: formik1.values.reservationEnabled,
            attentionSchedules: attentionSchedulesCopy.map((schedule) => {
              schedule.days = schedule.days.map((day) => day.row);
              return schedule;
            }),
            coord: formik2.values.coord,
            address: formik2.values.address,
            city: formik2.values.country + '-' + formik2.values.city,
            phoneNumber: formik2.values.phoneNumber,
            availableOnWhatsApp: formik2.values.availableOnWhatsApp,
            managers: [{ id: user.id, role: 'owner' }],
            facebookUsername: formik2.values.facebookUsername,
            instagramUsername: formik2.values.instagramUsername,
          },
        },
      });
      let storeId = data.createStore;
      await uploadImage(formik1.values.logo, 'stores', storeId);
      if (data && !error) {
        toast({
          intent: 'SUCCESS',
          message: t('success_create_store'),
          duration: 5000,
          closeIconColor: 'rgba(0,0,0,0)',
        });
        navigation.navigate('home');
      }
    } catch (err) {
      toast({
        intent: 'ERROR',
        message: err.message ? err.message : err,
        duration: 5000,
        closeIconColor: 'rgba(0,0,0,0)',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPermissionAsync();
  }, []);

  return (
    <TopCenteredLayout>
      {currentStep == 0 && (
        <>
          <View style={styles.logoContainer}>
            <TouchableOpacity onPress={pickImage} style={styles.logoTouchable}>
              {formik1.values.logo ? (
                <Avatar style={styles.logo} source={{ uri: formik1.values.logo }} />
              ) : (
                <Avatar
                  style={formik1.errors.logo && formik1.touched.logo ? styles.logoWithError : styles.logo}
                  source={require('../../assets/img/addPicture.png')}
                />
              )}
            </TouchableOpacity>
            <Text style={styles.storeName} category="h2">
              {formik1.values.name}
            </Text>
          </View>
          <View style={styles.inputsContainer}>
            <Input
              onSubmitEditing={() => ref_input2.current.focus()}
              placeholder={t('store_name')}
              value={formik1.values.name}
              onChangeText={formik1.handleChange('name')}
              onBlur={formik1.handleBlur('name')}
              error={formik1.errors.name && formik1.touched.name}
              autoCapitalize="words"
              maxLength={25}
              required={true}
            />
            <Input
              ref={ref_input2}
              // onSubmitEditing={() => ref_input3.current.focus()}
              placeholder={t('description')}
              value={formik1.values.description}
              onChangeText={formik1.handleChange('description')}
              onBlur={formik1.handleBlur('description')}
              error={formik1.errors.description && formik1.touched.description}
              multiline={true}
              numberOfLines={2}
              maxLength={200}
            />
            <CheckBox
              checked={formik1.values.reservationEnabled}
              onChange={() => formik1.setFieldValue('reservationEnabled', !formik1.values.reservationEnabled)}
              style={styles.checkbox}
            >
              {t('accept_reservations')}
            </CheckBox>
            <View style={styles.attentionSchedulesContainer}>
              <Text style={styles.attentionSchedulesTitle}>{t('attention_schedule')}</Text>
              <ScheduleCard
                attentionSchedules={formik1.values.attentionSchedules}
                setAttentionSchedules={(value) => formik1.setFieldValue('attentionSchedules', value)}
                handleChange={formik1.handleChange}
                setFieldTouched={formik1.setFieldTouched}
                errors={formik1.errors.attentionSchedules}
                touched={formik1.touched.attentionSchedules}
              />
            </View>
          </View>
        </>
      )}
      {currentStep == 1 && (
        <>
          <View style={styles.mapContainer}>
            <MapView
              ref={(ref) => setMap(ref)}
              style={styles.map}
              initialRegion={{
                latitude: -34,
                longitude: -64,
                latitudeDelta: 10,
                longitudeDelta: 10,
              }}
            >
              {!!formik2.values.coord && (
                <Marker
                  coordinate={formik2.values.coord}
                  title={formik2.values.name}
                  description={formik2.values.description}
                />
              )}
            </MapView>
          </View>
          <View style={styles.inputsContainer}>
            <View style={styles.addressAutocompleteContainer}>
              <GooglePlacesAutocomplete
                ref={(ref) => setAddressRef(ref)}
                textInputProps={{
                  // eslint-disable-next-line
                  InputComp: ({ value, onChangeText }) => (
                    <Input
                      ref={ref_input4}
                      value={value}
                      onChangeText={onChangeText}
                      onBlur={formik2.handleBlur('address')}
                      error={formik2.errors.address && formik2.touched.address}
                      placeholder={t('address')}
                      required={true}
                      onSubmitEditing={() => ref_input5.current.focus()}
                    />
                  ),
                }}
                onPress={(data, details) => handleAddressSelection(data, details)}
                fetchDetails={true}
                minLength={4}
                query={{
                  key: 'AIzaSyA3XLEERakGU9hp7UNUb4frmv4ol3fQn9o',
                  language: 'es',
                  components: 'country:ar',
                  type: 'address',
                }}
              />
            </View>
            <View style={styles.addressAutocompleteContainer}>
              <GooglePlacesAutocomplete
                ref={(ref) => setCityRef(ref)}
                textInputProps={{
                  // eslint-disable-next-line
                  InputComp: ({ value, onChangeText }) => (
                    <Input
                      ref={ref_input5}
                      value={value}
                      onChangeText={onChangeText}
                      onBlur={formik2.handleBlur('city')}
                      error={formik2.errors.city && formik2.touched.city}
                      placeholder={t('city')}
                      required={true}
                      onSubmitEditing={() => ref_input6.current.focus()}
                    />
                  ),
                }}
                onPress={(data, details) => handleCitySelection(data, details)}
                fetchDetails={true}
                minLength={4}
                query={{
                  key: 'AIzaSyA3XLEERakGU9hp7UNUb4frmv4ol3fQn9o',
                  language: 'es',
                  components: 'country:ar',
                  type: '(cities)',
                }}
              />
            </View>
            <View style={styles.phoneNumberContainer}>
              <View style={styles.phoneNumberInputContainer}>
                <Input
                  style={styles.phoneNumberInput}
                  ref={ref_input6}
                  onSubmitEditing={() => ref_input7.current.focus()}
                  placeholder={t('phone_number')}
                  keyBoardType="phone-pad"
                  value={formik2.values.phoneNumber}
                  onChangeText={formik2.handleChange('phoneNumber')}
                  onBlur={formik2.handleBlur('phoneNumber')}
                  error={formik2.errors.phoneNumber && formik2.touched.phoneNumber}
                  required={true}
                />
              </View>
              <View style={styles.availableOnWhatsAppContainer}>
                <CheckBox
                  checked={formik2.values.availableOnWhatsApp}
                  onChange={() =>
                    formik2.setFieldValue('availableOnWhatsApp', !formik2.values.availableOnWhatsApp)
                  }
                  style={styles.checkbox}
                >
                  {t('available_on_whatsapp')}
                </CheckBox>
              </View>
            </View>
            <Input
              ref={ref_input7}
              onSubmitEditing={() => ref_input8.current.focus()}
              placeholder={t('facebook_username')}
              autoCapitalize="none"
              value={formik2.values.facebookUsername}
              onChangeText={formik2.handleChange('facebookUsername')}
              onBlur={formik2.handleBlur('facebookUsername')}
              error={formik2.errors.facebookUsername && formik2.touched.facebookUsername}
              accessoryLeft={() => <Icon pack="fontAwesome" name="facebook-square" size={20} />}
            />
            <Input
              ref={ref_input8}
              returnKeyType="done"
              placeholder={t('instagram_username')}
              autoCapitalize="none"
              value={formik2.values.instagramUsername}
              onChangeText={formik2.handleChange('instagramUsername')}
              onBlur={formik2.handleBlur('instagramUsername')}
              error={formik2.errors.instagramUsername && formik2.touched.instagramUsername}
              accessoryLeft={() => <Icon pack="fontAwesome" name="instagram" size={20} />}
            />
          </View>
        </>
      )}
      <ErrorDisplayer
        errorMessage={
          currentStep == 0
            ? getError(formik1.errors, formik1.touched)
            : getError(formik2.errors, formik2.touched)
        }
      />
      <StepWizard
        steps={steps}
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
        error={
          currentStep == 0
            ? !!getError(formik1.errors, formik1.touched)
            : !!getError(formik2.errors, formik2.touched)
        }
        onNextStep={currentStep == 0 ? formik1.handleSubmit : formik2.handleSubmit}
      />
    </TopCenteredLayout>
  );
};

CreateStoreScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};
