import React, {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {signupInstance} from '../../api/accounts/signup';
import {StyleSheet, Text, View, Dimensions} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

// components
import BasicButton from '../../components/elements/BasicButton';
import Header from '../../components/elements/Header';
import AuthBackGround from '../../components/authorization/AuthBackGround';
import AuthTextInput from '../../components/authorization/AuthTextInput';
import AuthTitle from '../../components/authorization/AuthTitle';
import AlertModal from '../../components/elements/AlertModal';
import {getPixelSizeForLayoutSize} from 'react-native/Libraries/Utilities/PixelRatio';

// static variable
const windowSize = Dimensions.get('window');
const windowWidth = windowSize.width; // 1280
const windowHeight = windowSize.height; // 768

export default function PinCreate({navigation, route}) {
  const [userPinNumber, setUserPinNumber] = useState('');
  const [userPinNumberchk, setUserPinNumberchk] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [dmodalVisible, setdModalVisible] = useState(false);
  const [bmodalVisible, setbModalVisible] = useState(false);
  const UserInfo = route.params.userInfo;
  const submitHandler = async () => {
    if (userPinNumber.length === 6) {
      let pinAuthForm = new FormData();
      pinAuthForm.append('username', UserInfo.user_name);
      pinAuthForm.append('password', UserInfo.user_Pass);
      pinAuthForm.append('password_confirmation', UserInfo.user_Passchk);
      pinAuthForm.append('email', UserInfo.user_email);
      pinAuthForm.append('pin_code', userPinNumber);
      pinAuthForm.append('pin_code_confirmation', userPinNumberchk);

      signupInstance(
        pinAuthForm,
        (res) => {
          const token = res.data.token;
          AsyncStorage.removeItem('jwt');
          AsyncStorage.setItem('jwt', token);
          changeModalState();
          setTimeout(() => {
            navigation.navigate('SelectProfile');
          }, 2000);
        },
        (error) => {
          dchangeModalState();
        },
      );
    } else {
      bchangeModalState();
    }
  };
  const closeModal = () => {
    setTimeout(() => {
      setModalVisible(!modalVisible);
    }, 1500);
  };
  const changeModalState = () => {
    setModalVisible(!modalVisible);
  };
  const dcloseModal = () => {
    setTimeout(() => {
      setdModalVisible(!dmodalVisible);
    }, 2000);
  };
  const dchangeModalState = () => {
    setdModalVisible(!dmodalVisible);
  };
  const bcloseModal = () => {
    setTimeout(() => {
      setbModalVisible(!bmodalVisible);
    }, 2000);
  };
  const bchangeModalState = () => {
    setbModalVisible(!bmodalVisible);
  };
  return (
    <AuthBackGround>
      <Header logoHeader={true} />
      <View style={styles.container}>
        <AuthTitle marginBottom={hp(5)} title={'??? ?????? ??????'} />
        <View style={styles.body}>
          <AuthTextInput
            text={'??? ?????? ?????? 6????????? ??????????????????'}
            width={wp(30)}
            height={hp(8)}
            size={hp(2.8)}
            setFunction={setUserPinNumber}
            secureTextEntry={true}
            autoFocus={false}
            marginBottom={hp(5)}
          />
          <AuthTextInput
            text={'??? ??? ??? ??????????????????.'}
            width={wp(30)}
            height={hp(8)}
            size={hp(2.8)}
            setFunction={setUserPinNumberchk}
            secureTextEntry={true}
            autoFocus={false}
          />
          <View style={styles.alertContainer}>
            {userPinNumber.length !== 6 ? (
              <Text style={styles.alertMessage}>?????? 6????????? ???????????????.</Text>
            ) : null}
            {userPinNumber !== userPinNumberchk ? (
              <Text style={styles.alertMessage}>
                ??? ????????? ???????????? ????????????.
              </Text>
            ) : null}
          </View>
        </View>
        <Text style={styles.textPin}>
          * ??? ????????? ????????? ??????, ??????,?????? ?????? ???????????????.
        </Text>
        <View style={styles.view}>
          <BasicButton
            text="??????"
            customFontSize={hp(3.5)}
            paddingHorizon={wp(2)}
            paddingVertical={hp(5)}
            btnWidth={wp(30)}
            btnHeight={hp(8)}
            borderRadius={14}
            onHandlePress={() => {
              submitHandler();
            }}
          />
        </View>
        <AlertModal
          modalVisible={modalVisible}
          onHandleCloseModal={() => changeModalState()}
          text={'???????????? ???????????????.'}
          iconName={'smileo'}
          color={'green'}
          setTimeFunction={() => closeModal()}
        />
        <AlertModal
          modalVisible={dmodalVisible}
          onHandleCloseModal={() => dchangeModalState()}
          text={'??? ????????? ????????????????????????.'}
          iconName={'frowno'}
          color={'red'}
          setTimeFunction={() => dcloseModal()}
        />
        <AlertModal
          modalVisible={bmodalVisible}
          onHandleCloseModal={() => bchangeModalState()}
          text={'?????? 6????????? ??????????????????.'}
          iconName={'frowno'}
          color={'#FF0000'}
          setTimeFunction={() => bcloseModal()}
        />
      </View>
    </AuthBackGround>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    minWidth: wp(40),
    minHeight: hp(70),
    borderRadius: 30,
    elevation: 7,
    paddingVertical: hp(5),
  },
  textPin: {
    fontSize: hp(2.25),
    width: wp(30),
    color: '#707070',
    marginBottom: hp(5),
  },
  view: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  body: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: wp(30),
  },
  alertContainer: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: hp(8),
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    width: '100%',
    paddingTop: hp(1),
    marginBottom: hp(2),
  },
  alertMessage: {
    color: 'red',
    fontSize: hp(2.25),
    alignSelf: 'flex-start',
    marginVertical: hp(2),
  },
});
