import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';

import Button from '../components/Button';
import Layout from '../layouts/Layout';
import Input from '../components/Input';

export default class EnteringEmailAndPassword extends Component {
  componentDidMount() {
    console.log(global.signUp.phoneNumber);
  }

  render() {
    return (
      <Layout title="E-mail 계정">
        <View style={{ flex: 1, padding: 30 }}>
          <View style={{ flex: 55 }} />
          <View style={{ flex: 140 }}>
            <Input
              placeholder="이메일주소"
              validator={(text) => {
                if (/-/.test(text)) {
                  return '-를 제외하고 입력해주세요.';
                }
              }}
              onChangeText={(text) => { this.setState({ email: text }); }}
            />
            <Input placeholder="비밀번호" wrapperStyle={{ marginTop: 5 }} onChangeText={(text) => { this.setState({ password: text }); }} />
          </View>
          <View style={{ flex: 70 }}>
            <Button onPress={this.onPressNex}>다음</Button>
          </View>
          <View style={{ flex: 210 }} />
        </View>
      </Layout>
    );
  }
}
