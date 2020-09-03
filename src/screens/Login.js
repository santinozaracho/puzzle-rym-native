import React, { useRef, useEffect } from 'react';
import { useApolloClient } from '@apollo/client';
import { View, StatusBar, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, Divider } from '@ui-kitten/components';
import { useTranslate } from '../utils/language';
import PropTypes from 'prop-types';
import useGeneralContext from '../store/GeneralContext';
import useUserContext from '../store/UserContext';
import CenteredLayout from '../components/templates/CenteredLayout';
import LogoWithSlogan from '../components/molecules/LogoWithSlogan';
import GoogleLoginButton from '../components/atoms/GoogleLoginButton';
import Input from '../components/atoms/Input';
import ErrorDisplayer from '../components/atoms/ErrorDisplayer';
import SubmitButton from '../components/atoms/SubmitButton';
import FacebookLoginButton from '../components/atoms/FacebookLoginButton';
import { divider, warning } from '../../assets/colorsPalette';
import { signIn, loadProfileFromStorageAsync } from '../services/authService';
import { Auth } from 'aws-amplify';
import { saveLocalUserProfileAsync } from '../store/localUserStorage';
import { useToast } from 'react-native-styled-toast';
import { useFormik } from 'formik';
import { string, object } from 'yup';
import getError from '../utils/getError';

/**
 * @param {object} navigation
 * @returns {component}
 */

const styles = StyleSheet.create({
  socialLoginContainer: { marginTop: 35 },

  dividerContainer: {
    marginVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },

  divider: { width: 130, height: 2 },

  dividerText: { color: divider, marginHorizontal: 10 },

  inputsContainer: { marginBottom: 10 },

  forgotPasswordContainer: { marginTop: 5 },

  forgotPassword: { fontFamily: 'Nunito' },

  dontHaveAnAccountContainer: { flexDirection: 'row', marginVertical: 10 },

  dontHaveAnAccount: { fontFamily: 'Nunito', fontSize: 17 },

  signUp: { fontFamily: 'Nunito', fontSize: 18, color: warning, marginLeft: 5 },
});

export const LoginScreen = ({ navigation }) => {
  const t = useTranslate();
  const { toast } = useToast();
  const apolloClient = useApolloClient();
  const [loading, setLoading] = useGeneralContext();
  const [user, setUser] = useUserContext();
  const ref_input2 = useRef();
  const formik = useFormik({
    initialValues: { email: '', password: '' },
    onSubmit: (values) => login(values),
    validationSchema: object().shape({
      email: string().email(t('error_invalid_email_format')).required(t('error_empty_required_fields')),
      password: string()
        .required(t('error_empty_required_fields'))
        .min(8, t('error_password_min_length'))
        .max(40, t('error_password_max_length')),
    }),
  });

  const retrieveAuth = async () => {
    const userSaved = await loadProfileFromStorageAsync();
    let userSession = '';
    try {
      userSession = await Auth.currentSession();
    } catch (e) {
      console.log(e.message);
    }
    if (userSaved) {
      if (userSession) {
        userSaved.token = userSession.idToken.jwtToken;
        if (userSession.refreshToken) userSaved.refreshToken = userSession.refreshToken.token;
        await saveLocalUserProfileAsync(userSaved);
      }
      setUser(userSaved);
      navigation.navigate('main');
    }
  };

  useEffect(() => {
    retrieveAuth();
  }, []);

  const login = async (values) => {
    setLoading(true);
    try {
      let userLogged = await signIn(
        'email',
        { email: values.email, password: values.password },
        apolloClient,
        setUser
      );
      if (userLogged) navigation.navigate('main');
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

  const facebookLogin = async () => {
    setLoading(true);
    try {
      let userLogged = await signIn('facebook', null, apolloClient, setUser);
      if (userLogged) navigation.navigate('main');
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

  const googleLogin = async () => {
    setLoading(true);
    try {
      let userLogged = await signIn('google', null, apolloClient, setUser);
      if (userLogged) navigation.navigate('main');
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
      <StatusBar style="auto" />
      <LogoWithSlogan />
      <View style={styles.socialLoginContainer}>
        <FacebookLoginButton onPress={facebookLogin} />
        <GoogleLoginButton onPress={googleLogin} />
      </View>
      <View style={styles.dividerContainer}>
        <Divider style={styles.divider} />
        <Text style={styles.dividerText}>{t('or')}</Text>
        <Divider style={styles.divider} />
      </View>
      <View style={styles.inputsContainer}>
        <Input
          onSubmitEditing={() => ref_input2.current.focus()}
          type="email"
          placeholder={t('email')}
          value={formik.values.email}
          onChangeText={formik.handleChange('email')}
          onBlur={formik.handleBlur('email')}
          error={formik.errors.email && formik.touched.email}
        />
        <Input
          ref={ref_input2}
          type="password"
          placeholder={t('password')}
          returnKeyType="done"
          value={formik.values.password}
          onChangeText={formik.handleChange('password')}
          onBlur={formik.handleBlur('password')}
          error={formik.errors.password && formik.touched.password}
        />
        <View style={styles.forgotPasswordContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('forgotPassword')}>
            <Text style={styles.forgotPassword}>{t('forgot_password')}</Text>
          </TouchableOpacity>
        </View>
      </View>
      <ErrorDisplayer errorMessage={getError(formik.errors, formik.touched)} />
      <SubmitButton onPress={formik.handleSubmit}>{t('login')}</SubmitButton>
      <View style={styles.dontHaveAnAccountContainer}>
        <Text style={styles.dontHaveAnAccount}>{t('dont_have_an_account')}</Text>
        <TouchableOpacity onPress={() => navigation.navigate('signup')}>
          <Text style={styles.signUp}>{t('sign_up')}</Text>
        </TouchableOpacity>
      </View>
    </CenteredLayout>
  );
};

LoginScreen.propTypes = {
  navigation: PropTypes.object,
};
