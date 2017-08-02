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
global.ddpServerIp = '221.167.202.216:3000';

Meteor.connect(`ws://${global.ddpServerIp}/websocket`);

// TODO: custom default props
global.keyColor = '#fd614d';

Header.defaultProps.titleColor = '#3c4f5e';
Header.defaultProps.backgroundColor = '#ffffff';

Input.defaultProps.keyColor = global.keyColor;

Button.defaultProps.backgroundColor = global.keyColor;
