import React, { Component } from 'react';
import { View, Text, ScrollView, Dimensions, Animated, TouchableWithoutFeedback } from 'react-native';
import { Constants } from 'expo';
import PropTypes from 'prop-types';

export default class Tutorial extends Component {
  static propTypes = {
    children: PropTypes.array.isRequired,
    backgroundColor: PropTypes.string,
    onPressSkip: PropTypes.func
  };

  static defaultProps = {
    backgroundColor: '#c5c5c5',
    onPressSkip: () => {}
  };

  state = {
    pageCount: this.props.children.length,
    isLastPage: false
  };

  animatedScrollX = new Animated.Value(0);

  animatedValue = this.animatedScrollX.interpolate({
    inputRange: [0, global.width * (this.state.pageCount - 1)],
    outputRange: [0, this.state.pageCount - 1]
  });

  animatedBulletTranslateX = this.animatedValue.interpolate({
    inputRange: [0, this.state.pageCount - 1],
    outputRange: [0 - 14 * (this.state.pageCount / 2 - 0.5), 14 * (this.state.pageCount / 2 - 0.5)]
  });

  renderPages = () => {
    return (
      this.props.children.map((page, index) => {
        return (
          <View key={index} style={{ flex: 1, width: global.width }}>
            { this.renderPageItems(page, index) }
          </View>
        );
      })
    );
  };

  renderPageItems = (page, index) => {
    const animatedPageTitleTranslateX = this.animatedValue.interpolate({
      inputRange: [index, index + 1],
      outputRange: [0, -100]
    });

    const animatedPageBarTranslateX = this.animatedValue.interpolate({
      inputRange: [index, index + 1],
      outputRange: [0, global.width * 2]
    });

    const animatedPageDescriptionTranslateX = this.animatedValue.interpolate({
      inputRange: [index, index + 1],
      outputRange: [0, -250]
    });

    return (
      <View style={{ flex: 1, alignItems: 'center' }}>
        { page.props.children[0] }
        <Animated.View style={{ marginTop: 300, position: 'absolute', transform: [{ translateX: animatedPageTitleTranslateX }] }}>
          { page.props.children[1] }
        </Animated.View>
        <Animated.View style={{ marginTop: 330, position: 'absolute', transform: [{ translateX: animatedPageBarTranslateX }], width: 60, height: 2, backgroundColor: global.keyColor }} />
        <Animated.View style={{ marginTop: 340, position: 'absolute', transform: [{ translateX: animatedPageDescriptionTranslateX }] }}>
          { page.props.children[2] }
        </Animated.View>
      </View>
    );
  };

  renderPagination = () => {
    return (
      <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
        <Animated.View style={{ transform: [{ translateX: this.animatedBulletTranslateX }], width: 4, height: 4, borderRadius: 2, backgroundColor: '#ffffff', position: 'absolute' }} />
        { this.renderBullets() }
      </View>
    );
  };

  renderBullets = () => {
    return (
      this.props.children.map((page, index) => {
        return (
          <View key={index} style={{ width: 4, height: 4, borderRadius: 2, borderColor: '#ffffff', borderWidth: 1, marginLeft: 5, marginRight: 5 }} />
        );
      })
    );
  };

  onScrollScrollView = () => {
    const animatedValue = this.animatedValue.__getValue();

    if (/\./.test(animatedValue + '')) {
      return;
    }

    if (animatedValue == this.state.pageCount - 1) {
      this.setState({
        isLastPage: true
      });
    }
    else {
      this.setState({
        isLastPage: false
      });
    }
  };

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: this.props.backgroundColor }}>
        <View style={{ height: Constants.statusBarHeight }} />
        <View style={{ flex: 1, paddingVertical: 30 }}>
          <View style={{ flex: 10 }}>
            <ScrollView showsHorizontalScrollIndicator={false} horizontal pagingEnabled onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: this.animatedScrollX } } }], { listener: this.onScrollScrollView })} scrollEventThrottle={1}>
              { this.renderPages() }
            </ScrollView>
          </View>
          <View style={{ flex: 1, flexDirection: 'row', paddingHorizontal: 30 }}>
            <View style={{ flex: 1 }}>
              { this.state.isLastPage ||
                <TouchableWithoutFeedback onPress={this.props.onPressSkip}>
                  <View style={{ width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ color: '#ffffff' }}>Skip</Text>
                  </View>
                </TouchableWithoutFeedback>
              }
            </View>
            <View style={{ flex: 1 }}>
              { this.renderPagination() }
            </View>
            <View style={{ flex: 1 }}>
              { this.state.isLastPage &&
                <TouchableWithoutFeedback onPress={this.props.onPressSkip}>
                  <View style={{ width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ color: '#ffffff' }}>Done</Text>
                  </View>
                </TouchableWithoutFeedback>
              }
            </View>
          </View>
        </View>
      </View>
    );
  }
}
