import { Platform, Dimensions } from 'react-native';
import Meteor from 'react-native-meteor';
import { setCustomText, setCustomTextInput } from 'react-native-global-props';
import 'moment/locale/ko';

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

global.width = Dimensions.get('window').width;
global.height = Dimensions.get('window').height;

// TODO: ddp server ip
global.ddpServerIp = '221.167.202.216:3000';

Meteor.connect(`ws://${global.ddpServerIp}/websocket`);

Meteor.subscribe('serviceTypes', {});
Meteor.subscribe('ssams', {});
Meteor.subscribe('documentsForManagement', {});

// TODO: custom default props
global.keyColor = '#fd614d';

Header.defaultProps.titleColor = '#3c4f5e';
Header.defaultProps.backgroundColor = '#ffffff';

Input.defaultProps.keyColor = global.keyColor;

Button.defaultProps.backgroundColor = global.keyColor;
