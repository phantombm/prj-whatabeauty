import { Platform } from 'react-native';
import Meteor from 'react-native-meteor';
import { setCustomText, setCustomTextInput } from 'react-native-global-props';

import Header from '../components/Header';
import Input from '../components/Input';
import Button from '../components/Button';

setCustomTextInput({
  underlineColorAndroid: 'transparent'
});

setCustomText({
  style: {
    fontFamily: Platform.OS == 'ios' ? 'Apple SD Gothic Neo' : 'sans-serif'
  }
});

// TODO: ddp server ip
Meteor.connect('ws://192.168.0.36:3000/websocket');

// TODO: custom default props
global.keyColor = '#fd614d';

Header.defaultProps.titleColor = '#3c4f5e';
Header.defaultProps.backgroundColor = '#fafcfb';

Input.defaultProps.keyColor = global.keyColor;

Button.defaultProps.backgroundColor = global.keyColor;
