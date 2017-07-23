import React, { Component } from 'react';
import { View, Text, ScrollView, Dimensions, Animated, TouchableWithoutFeedback } from 'react-native';
import { Constants } from 'expo';
import PropTypes from 'prop-types';

export default class Tutorial extends Component {
  static propTypes = {
    children: PropTypes.array.isRequired,
    backgroundColor: PropTypes.string.isRequired,
    onPressSkip: PropTypes.func.isRequired
  };

  state = {
    pageCount: this.props.children.length,
    width: Dimensions.get('window').width,
    isLastPage: false
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

  animatedScrollX = new Animated.Value(0);

  animatedValue = this.animatedScrollX.interpolate({
    inputRange: [0, this.state.width * (this.state.pageCount - 1)],
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
          <View key={index} style={{ flex: 1, width: this.state.width }}>
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
      outputRange: [0, this.state.width * 2]
    });

    const animatedPageDescriptionTranslateX = this.animatedValue.interpolate({
      inputRange: [index, index + 1],
      outputRange: [0, -250]
    });

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        { page.props.children[0] }
        <Animated.View style={{ position: 'absolute', transform: [{ translateX: animatedPageTitleTranslateX }, { translateY: 75 }] }}>
          { page.props.children[1] }
        </Animated.View>
        <Animated.View style={{ position: 'absolute', transform: [{ translateX: animatedPageBarTranslateX }, { translateY: 100 }], width: 60, height: 2, backgroundColor: '#fd614d' }} />
        <Animated.View style={{ position: 'absolute', transform: [{ translateX: animatedPageDescriptionTranslateX }, { translateY: 140 }] }}>
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

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: this.props.backgroundColor }}>
        <View style={{ height: Constants.statusBarHeight }} />
        <View style={{ flex: 1, paddingVertical: 30 }}>
          <View style={{ flex: 450 }}>
            <ScrollView showsHorizontalScrollIndicator={false} horizontal pagingEnabled onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: this.animatedScrollX } } }], { listener: this.onScrollScrollView })}>
              { this.renderPages() }
            </ScrollView>
          </View>
          <View style={{ flex: 35, flexDirection: 'row' }}>
            <View style={{ flex: 1, alignItems: 'flex-end' }}>
              { this.state.isLastPage ||
                <TouchableWithoutFeedback onPress={this.props.onPressSkip}>
                  <View style={{ width: 50, height: '100%', alignItems: 'center', justifyContent: 'center' }}>
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
                  <View style={{ width: 50, height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ color: '#ffffff' }}>Done</Text>
                  </View>
                </TouchableWithoutFeedback>
              }
            </View>
          </View>
          <View style={{ flex: 20 }} />
        </View>
      </View>
    );
  }
}
