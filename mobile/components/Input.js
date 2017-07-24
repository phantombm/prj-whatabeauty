import React, { Component } from 'react';
import { Text, TextInput, Animated, View } from 'react-native';
import PropTypes from 'prop-types';

export default class Input extends Component {
  static propTypes = {
    type: PropTypes.string,
    defaultValue: PropTypes.string,
    textInputStyle: PropTypes.object,
    placeholder: PropTypes.string,
    placeholderStyle: PropTypes.object,
    placeholderStartColor: PropTypes.string,
    placeholderEndColor: PropTypes.string,
    borderBottomStartColor: PropTypes.string,
    borderBottomEndColor: PropTypes.string,
    validator: PropTypes.func,
    keyboardType: PropTypes.string,
    selectionColor: PropTypes.string,
    maxLength: PropTypes.number,
    wrapperStyle: PropTypes.object,
    onChangeText: PropTypes.func
  };

  static defaultProps = {
    defaultValue: '',
    type: 'goingUpPlaceholder',
    textInputStyle: {},
    placeholder: '',
    placeholderStyle: {},
    placeholderStartColor: '#3c4f5e',
    placeholderEndColor: '#cfcfcf',
    borderBottomStartColor: '#dbdfe2',
    borderBottomEndColor: '#3c4f5e',
    validator: () => {
      return '';
    },
    keyboardType: 'default',
    selectionColor: null,
    maxLength: 20,
    wrapperStyle: {},
    onChangeText: () => {}
  };

  state = {
    text: this.props.defaultValue,
    errorText: '',
    overlaidBorderBottomColor: {}
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
    outputRange: [this.props.placeholderStartColor, this.props.placeholderEndColor]
  });

  animatedBorderBottomColor = this.animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [this.props.borderBottomStartColor, this.props.borderBottomEndColor]
  });

  onFocus = () => {
    Animated.timing(this.animatedValue, {
      toValue: 1,
      duration: 200
    }).start();

    this.setState({
      overlaidBorderBottomColor: {}
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
      overlaidBorderBottomColor: {
        borderBottomColor: this.props.borderBottomStartColor
      }
    });
  };

  onChangeText = (text) => {
    this.setState({
      text: text,
      errorText: this.props.validator(text)
    });

    this.props.onChangeText(text);
  };

  render() {
    return (
      <Animated.View style={[{ borderBottomWidth: 1, borderBottomColor: this.animatedBorderBottomColor }, this.state.overlaidBorderBottomColor, this.props.wrapperStyle ]}>
        { this.props.type == 'goingUpPlaceholder' &&
          <Animated.View style={{ position: 'absolute', top: 15, transform: [{ translateY: this.animatedTranslateY }], flexDirection: 'row' }}>
            <Animated.Text style={[{ fontSize: this.animatedFontSize, color: this.animatedColor }, this.props.placeholderStyle ]}>
              { this.props.placeholder }
            </Animated.Text>
            { !!this.state.text &&
              <Text style={{ fontSize: 10, color: '#fd614d', marginLeft: 5 }}>
                { this.state.errorText }
              </Text>
            }
          </Animated.View>
        }
        <View>
          <TextInput
            onFocus={this.onFocus}
            onBlur={this.onBlur}
            onChangeText={this.onChangeText}
            style={[
              {
                height: 50,
                fontSize: 14,
                paddingTop: this.props.type == 'goingUpPlaceholder' ? 10 : 0,
                color: '#3c4f5e'
              },
              this.props.textInputStyle
            ]}
            defaultValue={this.props.defaultValue}
            maxLength={this.props.maxLength}
            keyboardType={this.props.keyboardType}
            selectionColor={this.props.selectionColor}
          />
        </View>
      </Animated.View>
    );
  }
}
