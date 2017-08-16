import React, { Component } from 'react';
import { View, Text, TextInput, Keyboard } from 'react-native';
import { Actions } from 'react-native-router-flux';
import PropTypes from 'prop-types';

import Layout from '../layouts/Layout';
import Button from '../components/Button';
import MagnetView from '../components/MagnetView';

export default class WritingMemo extends Component {
  static propTypes = {
    service: PropTypes.object.isRequired
  };

  state = {
    memo: this.props.service.memo
  };

  onChangeMemo = (memo) => {
    this.setState({
      memo: memo
    });
  };

  onPressWritingMemo = () => {
    Keyboard.dismiss();

    this.props.service.memo = this.state.memo;

    Actions.pop({
      refresh: {
        service: this.props.service
      }
    });
  };

  render() {
    return (
      <Layout title="요청사항">
        <View style={{ flex: 1, padding: 16 }}>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 11, color: '#3c4f5e', textAlign: 'center' }}>
              특별히 요청하고 싶은 부분이 있나요?{'\n'}
              쌤이 미리 알고 파악하고 있으면 좋을만한 부분을 적어주세요.
            </Text>
            <TextInput
              selectionColor={global.keyColor}
              multiline
              autoCorrect={false}
              autoCapitalizer="none"
              placeholder="내용을 입력해주세요."
              style={{ backgroundColor: '#fafafa', height: 150, color: '#3c4f5e', padding: 12, fontSize: 14, marginTop: 20 }}
              placeholderTextColor="#cfcfcf"
              maxLength={500}
              onChangeText={this.onChangeMemo}
              defaultValue={this.props.service.memo}
            />
          </View>
          <View style={{ alignItems: 'center' }}>
            <Text style={{ fontSize: 11, color: '#3c4f5e' }}>상담이 필요하시면 실시간 채팅상담을 받아보세요.</Text>
          </View>
        </View>
        <MagnetView>
          <Button buttonStyle={{ borderRadius: 0 }} onPress={this.onPressWritingMemo}>요청사항 저장하기</Button>
        </MagnetView>
      </Layout>
    );
  }
}
