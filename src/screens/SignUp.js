import React, { useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import useGeneralContext from '../store/GeneralContext';
import { useTranslate } from '../utils/language';
import PropTypes from 'prop-types';
import CenteredLayout from '../components/templates/CenteredLayout';
import Input from '../components/atoms/Input';
import SubmitButton from '../components/atoms/SubmitButton';
import ErrorDisplayer from '../components/atoms/ErrorDisplayer';
import LogoWithSlogan from '../components/molecules/LogoWithSlogan';
import { signUp } from '../services/authService';
import { useToast } from 'react-native-styled-toast';
import { useFormik } from 'formik';
import { string, object, ref } from 'yup';
import getError from '../utils/getError';

/**
 * @param {object} navigation
 * @returns {component}
 */

const styles = StyleSheet.create({
  inputsContainer: { marginTop: 35, marginBottom: 10 },
});

export const SignUpScreen = ({ navigation }) => {
  const t = useTranslate();
  const { toast } = useToast();
  const [loading, setLoading] = useGeneralContext();
  const ref_input2 = useRef();
  const ref_input3 = useRef();
  const ref_input4 = useRef();
  const ref_input5 = useRef();
  const formik = useFormik({
    initialValues: { firstName: '', lastName: '', email: '', password: '', repeatPassword: '' },
    onSubmit: (values) => registerUser(values),
    validationSchema: object().shape({
      firstName: string().required(t('error_empty_required_fields')),
      lastName: string().required(t('error_empty_required_fields')),
      email: string().email(t('error_invalid_email_format')).required(t('error_empty_required_fields')),
      password: string()
        .required(t('error_empty_required_fields'))
        .min(8, t('error_password_min_length'))
        .max(40, t('error_password_max_length')),
      repeatPassword: string()
        .required(t('error_empty_required_fields'))
        .oneOf([ref('password'), null], t('error_passwords_dont_match')),
    }),
  });

  const registerUser = async ({ email, password, firstName, lastName }) => {
    setLoading(true);
    try {
      let userRegistered = await signUp({
        email,
        password,
        firstName,
        lastName,
      });
      if (userRegistered) {
        toast({
          intent: 'SUCCESS',
          message: t('success_sign_up'),
          duration: 5000,
          closeIconColor: 'rgba(0,0,0,0)',
        });
        navigation.navigate('login');
      }
    } catch (error) {
      toast({
        intent: 'ERROR',
        message: error.message ? t(error.message) : t(error),
        duration: 5000,
        closeIconColor: 'rgba(0,0,0,0)',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <CenteredLayout>
      <LogoWithSlogan />
      <View style={styles.inputsContainer}>
        <Input
          onSubmitEditing={() => ref_input2.current.focus()}
          placeholder={t('first_name')}
          value={formik.values.firstName}
          onChangeText={formik.handleChange('firstName')}
          onBlur={formik.handleBlur('firstName')}
          error={formik.errors.firstName && formik.touched.firstName}
          autoCapitalize="words"
          textContentType="givenName"
          required={true}
        />
        <Input
          ref={ref_input2}
          onSubmitEditing={() => ref_input3.current.focus()}
          placeholder={t('last_name')}
          value={formik.values.lastName}
          onChangeText={formik.handleChange('lastName')}
          onBlur={formik.handleBlur('lastName')}
          error={formik.errors.lastName && formik.touched.lastName}
          autoCapitalize="words"
          textContentType="familyName"
          required={true}
        />
        <Input
          ref={ref_input3}
          onSubmitEditing={() => ref_input4.current.focus()}
          type="email"
          placeholder={t('email')}
          value={formik.values.email}
          onChangeText={formik.handleChange('email')}
          onBlur={formik.handleBlur('email')}
          error={formik.errors.email && formik.touched.email}
          required={true}
        />
        <Input
          ref={ref_input4}
          onSubmitEditing={() => ref_input5.current.focus()}
          type="password"
          placeholder={t('password')}
          value={formik.values.password}
          onChangeText={formik.handleChange('password')}
          onBlur={formik.handleBlur('password')}
          error={formik.errors.password && formik.touched.password}
          required={true}
        />
        <Input
          ref={ref_input5}
          type="password"
          returnKeyType="done"
          placeholder={t('repeat_password')}
          value={formik.values.repeatPassword}
          onChangeText={formik.handleChange('repeatPassword')}
          onBlur={formik.handleBlur('repeatPassword')}
          error={formik.errors.repeatPassword && formik.touched.repeatPassword}
          required={true}
        />
      </View>
      <ErrorDisplayer errorMessage={getError(formik.errors, formik.touched)} />
      <SubmitButton onPress={formik.handleSubmit} disabled={!!getError(formik.errors, formik.touched)}>
        {t('sign_up')}
      </SubmitButton>
    </CenteredLayout>
  );
};

SignUpScreen.propTypes = {
  navigation: PropTypes.object,
};
