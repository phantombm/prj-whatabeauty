import Header from '../components/Header';
import Input from '../components/Input';
import Button from '../components/Button';

global.keyColor = '#fd614d';

Header.defaultProps.titleColor = '#3c4f5e';
Header.defaultProps.backgroundColor = '#fafcfb';

Input.defaultProps.keyColor = global.keyColor;

Button.defaultProps.backgroundColor = global.keyColor;
