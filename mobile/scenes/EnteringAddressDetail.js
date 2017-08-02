import React, { Component } from 'react';
import { View } from 'react-native';

import Layout from '../layouts/Layout';
import Button from '../components/Button';

export default class EnteringAddressDetail extends Component {
  render() {
    return (
      <Layout title="자세한 주소">
        <View style={{ flex: 1 }}>

        </View>
        <View>
          <Button>확인</Button>
        </View>
      </Layout>
    );
  }
}
