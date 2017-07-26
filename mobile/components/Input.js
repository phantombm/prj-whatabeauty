import React, { Component } from 'react';
import { Text, TextInput, Animated, View } from 'react-native';
import PropTypes from 'prop-types';

export default class Input extends Component {
  static propTypes = {
    placeholder: PropTypes.string.isRequired,
    defaultValue: PropTypes.string,
    keyColor: PropTypes.string,
    marginTop: PropTypes.number,
    validator: PropTypes.func,
    keyboardType: PropTypes.string,
    maxLength: PropTypes.number,
    onChangeText: PropTypes.func,
    secureTextEntry: PropTypes.bool
  };

  static defaultProps = {
    defaultValue: '',
    keyColor: '#000000',
    marginTop: 0,
    validator: () => {
      return '';
    },
    keyboardType: 'default',
    maxLength: 50,
    onChangeText: () => {},
    secureTextEntry: false
  };

  state = {
    text: this.props.defaultValue,
    errorText: 'blank',
    overlaidBorderBottomStyle: {}
  };

  animatedValue = new Animated.Value(this.props.defaultValue ? 1 : 0);

  animatedTranslateY = this.animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -11]
  });

  animatedFontSize = this.animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [14, 10]
  });

  animatedColor = this.animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['#3c4f5e', '#cfcfcf']
  });

  animatedBorderBottomColor = this.animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['#dbdfe2', this.props.keyColor]
  });

  onFocus = () => {
    Animated.timing(this.animatedValue, {
      toValue: 1,
      duration: 200
    }).start();

    this.setState({
      overlaidBorderBottomStyle: {}
    });
  };

  onBlur = () => {
    if (!this.state.text) {
      Animated.timing(this.animatedValue, {
        toValue: 0,
        duration: 200
      }).start();
    }

    this.setState({
      overlaidBorderBottomStyle: {
        borderBottomColor: '#dbdfe2'
      }
    });
  };

  onChangeText = (text) => {
    let errorText = text ? this.props.validator(text) : 'blank';

    this.setState({
      text: text,
      errorText: errorText
    });

    this.props.onChangeText(text, errorText);
  };

  setText = (text) => {
    this.textInputRef.setNativeProps({
      text: text
    });

    this.onChangeText(text);
  };

  render() {
    return (
      <Animated.View style={[{ borderBottomWidth: 1, borderBottomColor: this.animatedBorderBottomColor, marginTop: this.props.marginTop }, this.state.overlaidBorderBottomStyle ]}>
        <Animated.View style={{ position: 'absolute', top: 15, transform: [{ translateY: this.animatedTranslateY }], flexDirection: 'row' }}>
          <Animated.Text style={{ fontSize: this.animatedFontSize, color: this.animatedColor }}>
            { this.props.placeholder }
          </Animated.Text>
          { this.state.errorText == 'blank' ||
            <Text style={{ fontSize: 10, color: '#fd614d', marginLeft: 5 }}>
              { this.state.errorText }
            </Text>
          }
        </Animated.View>
        <View>
          <TextInput
            ref={(ref) => { this.textInputRef = ref; }}
            onFocus={this.onFocus}
            onBlur={this.onBlur}
            onChangeText={this.onChangeText}
            style={{ height: 50, fontSize: 14, paddingTop: 10, color: '#3c4f5e' }}
            defaultValue={this.props.defaultValue}
            maxLength={this.props.maxLength}
            keyboardType={this.props.keyboardType}
            selectionColor={this.props.keyColor}
            secureTextEntry={this.props.secureTextEntry}
            autoCapitalize="none"
          />
        </View>
      </Animated.View>
    );
  }
}
