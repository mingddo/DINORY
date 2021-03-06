import React, {Component, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {changePWForLost} from '../../api/accounts/login';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import Layout from '../../components/elements/Layout';
import BasicButton from '../../components/elements/BasicButton';
import Header from '../../components/elements/Header';
import AuthBackGround from '../../components/authorization/AuthBackGround';
import AuthTextInput from '../../components/authorization/AuthTextInput';
import AuthTitle from '../../components/authorization/AuthTitle';
import AlertModal from '../../components/elements/AlertModal'; // static variable
const windowSize = Dimensions.get('window');
const windowWidth = windowSize.width; // 1280
const windowHeight = windowSize.height; // 768
const layoutWidth = windowWidth * 0.3718;
const layoutHeight = windowHeight * 0.755;
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
export default function ModifyPassword({navigation, route}) {
  const [userWritePassword, setUserWritePassword] = useState('');
  const [userCheckPassword, setUserCheckPassword] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [dmodalVisible, setdModalVisible] = useState(false);
  const [pmodalVisible, setpModalVisible] = useState(false);
  const userID = route.params.user_ID;

  const submitHandler = async () => {
    if (!chkPW(userWritePassword) && !chkPW(userCheckPassword)) {
      pchangeModalState();
      return;
    }
    let ChangePasswordForm = new FormData();
    ChangePasswordForm.append('password', userWritePassword);
    ChangePasswordForm.append('password_confirmation', userCheckPassword);

    changePWForLost(
      userID,
      ChangePasswordForm,
      (res) => {
        changeModalState();
        setTimeout(() => {
          navigation.navigate('LoginScreen');
        }, 2000);
      },
      (error) => {
        dchangeModalState();
      },
    );
  };
  const chkPW = (password) => {
    const chk1 = /^[a-zA-Z0-9]{8,20}$/;
    const chk2 = /[a-z]/;
    const chk3 = /[A-Z]/;
    const chk4 = /\d/;

    return chk1.test(password) &&
      chk2.test(password) &&
      chk3.test(password) &&
      chk4.test(password)
      ? true
      : false;
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
  const pcloseModal = () => {
    setTimeout(() => {
      setpModalVisible(!pmodalVisible);
    }, 2000);
  };
  const pchangeModalState = () => {
    setpModalVisible(!pmodalVisible);
  };
  return (
    <AuthBackGround>
      <Header logoHeader={true} />
      <View style={styles.container}>
        <View style={styles.view}>
          <AuthTitle title={'???????????? ??????'} />
        </View>
        <View style={styles.body}>
          <AuthTextInput
            text={'????????? ??????????????? ??????????????????'}
            width={windowWidth * 0.3}
            height={windowHeight * 0.08}
            size={hp(2.8)}
            setFunction={setUserWritePassword}
            secureTextEntry={true}
            autoFocus={false}
            marginBottom={windowHeight * 0.043}
          />
          <AuthTextInput
            text={'??? ??? ??? ??????????????????.'}
            width={windowWidth * 0.3}
            height={windowHeight * 0.08}
            size={hp(2.8)}
            setFunction={setUserCheckPassword}
            secureTextEntry={true}
            autoFocus={false}
          />
          {userWritePassword.length < 8 || !chkPW(userWritePassword) ? (
            <Text style={styles.alertMessage}>
              ???,????????? ??????+????????? 8?????? ?????? ???????????????.
            </Text>
          ) : null}
          {userWritePassword !== userCheckPassword ? (
            <Text style={styles.alertMessage}>
              ??????????????? ???????????? ????????????.
            </Text>
          ) : null}
        </View>
        <View style={styles.view}>
          <BasicButton
            text="??????"
            customFontSize={hp(3.5)}
            paddingHorizon={0}
            paddingVertical={11}
            btnWidth={windowWidth * 0.3}
            btnHeight={windowHeight * 0.08}
            borderRadius={14}
            onHandlePress={() => {
              submitHandler();
            }}
          />
        </View>
        <AlertModal
          modalVisible={modalVisible}
          onHandleCloseModal={() => changeModalState()}
          text={'??????????????? ??????????????????!'}
          iconName={'smileo'}
          color={'green'}
          setTimeFunction={() => closeModal()}
        />
        <AlertModal
          modalVisible={dmodalVisible}
          onHandleCloseModal={() => dchangeModalState()}
          text={'??????????????? ????????? ?????? ???????????????!'}
          iconName={'frowno'}
          color={'red'}
          setTimeFunction={() => dcloseModal()}
        />
        <AlertModal
          modalVisible={pmodalVisible}
          onHandleCloseModal={() => pchangeModalState()}
          text={'??????????????? ?????? ???,????????? + ????????? ????????? 8?????? ???????????????!'}
          iconName={'frowno'}
          color={'red'}
          setTimeFunction={() => pcloseModal()}
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
    width: windowWidth * 0.4,
    height: windowHeight * 0.803,
    borderRadius: 30,
    elevation: 7,
  },
  text: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#707070',
  },
  text_Pin: {
    fontSize: 18,
    width: windowWidth * 0.3,
    color: '#707070',
  },
  view: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  body: {
    flex: 2,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: windowWidth * 0.3,
  },
  alertMessage: {
    color: 'red',
    fontSize: hp(2.8),
    marginBottom: windowHeight * 0.043,
    marginTop: windowHeight * 0.02,
    alignSelf: 'flex-start',
  },
});
