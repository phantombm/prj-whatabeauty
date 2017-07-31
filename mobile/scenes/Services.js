import React, { Component } from 'react';
import { View, FlatList, Image, Text, TouchableWithoutFeedback } from 'react-native';
import PropType from 'prop-types';
import { Actions } from 'react-native-router-flux';

import Layout from '../layouts/Layout';

export default class Services extends Component {
  static propTypes = {
    serviceType: PropType.object.isRequired,
    services: PropType.array,
  };

  static defaultProps = {
    services: [
      {
        _id: '1',
        imageUrl: 'http://cfile4.uf.tistory.com/image/2554843C5905D7B211D7E9',
        title: '촬영 메이크업',
        description: '전통 혼례 포함',
        price: {
          amount: 25000,
          unit: '원'
        }
      },
      {
        _id: '2',
        imageUrl: 'http://cfile4.uf.tistory.com/image/2554843C5905D7B211D7E9',
        title: '촬영 메이크업',
        description: '전통 혼례 포함',
        price: {
          amount: 25000,
          unit: '원'
        }
      },
      {
        _id: '3',
        imageUrl: 'http://cfile4.uf.tistory.com/image/2554843C5905D7B211D7E9',
        title: '촬영 메이크업',
        description: '전통 혼례 포함',
        price: {
          amount: 25000,
          unit: '원'
        }
      },
      {
        _id: '4',
        imageUrl: 'http://ntry.com/data/editor/1511/c28d086434c11e4cc76670f44aa8a7c6_KiYjF4Q6hLUuHiowxc5.png',
        title: '촬영 메이크업',
        description: '전통 혼례 포함',
        price: {
          amount: 25000,
          unit: '원'
        }
      },
      {
        _id: '5',
        imageUrl: 'http://www.peopletimes.net/files/attach/images/152/694/418/13a781ef41cd318f0f3e48c070685f32.png',
        title: '촬영 메이크업',
        description: '전통 혼례 포함',
        price: {
          amount: 25000,
          unit: '원'
        }
      },
      {
        _id: '6',
        imageUrl: 'http://www.matcl.com/files/attach/images/2791205/244/951/002/a90ae656c9a6d1dcec575d04c7f2fc23.jpg',
        title: '촬영 메이크업',
        description: '전통 혼례 포함',
        price: {
          amount: 25000,
          unit: '원'
        }
      },
      {
        _id: '7',
        imageUrl: 'http://cdn.sketchpan.com/member/s/sss455/draw/1406884151781/0.png',
        title: '촬영 메이크업',
        description: '전통 혼례 포함',
        price: {
          amount: 25000,
          unit: '원'
        }
      },
      {
        _id: '8',
        imageUrl: 'http://post.phinf.naver.net/MjAxNzAzMTBfNjMg/MDAxNDg5MTExODg1NzY2.lWqivT-Ys0fog8SPrAme2x9kouljyNQGor52-SJe_0Eg.ny3eUc84yReXYZC4jyc3JspAYgWaoPsQAcQqU6yhuRcg.PNG/2.PNG?type=w1200',
        title: '촬영 메이크업',
        description: '전통 혼례 포함',
        price: {
          amount: 25000,
          unit: '원'
        }
      },
      // {
      //   _id: '9',
      //   imageUrl: 'http://mblogthumb1.phinf.naver.net/20160808_48/tnsenqn3379_14706664639875Dwm0_PNG/2013-01-15_063B153B32.png?type=w800',
      //   title: '촬영 메이크업',
      //   description: '전통 혼례 포함',
      //   price: {
      //     amount: 25000,
      //     unit: '원'
      //   }
      // },
      // {
      //   _id: '71',
      //   imageUrl: 'http://cogly.net/xe/files/attach/images/23381/067/861/1e8190260402b4284fe0d23c46863acd.png',
      //   title: '촬영 메이크업',
      //   description: '전통 혼례 포함',
      //   price: {
      //     amount: 25000,
      //     unit: '원'
      //   }
      // },
      // {
      //   _id: '81',
      //   imageUrl: 'http://cfile4.uf.tistory.com/image/2554843C5905D7B211D7E9',
      //   title: '촬영 메이크업',
      //   description: '전통 혼례 포함',
      //   price: {
      //     amount: 25000,
      //     unit: '원'
      //   }
      // },
      // {
      //   _id: '91',
      //   imageUrl: 'http://cfile4.uf.tistory.com/image/2554843C5905D7B211D7E9',
      //   title: '촬영 메이크업',
      //   description: '전통 혼례 포함',
      //   price: {
      //     amount: 25000,
      //     unit: '원'
      //   }
      // },
      // {
      //   _id: '72',
      //   imageUrl: 'http://cfile4.uf.tistory.com/image/2554843C5905D7B211D7E9',
      //   title: '촬영 메이크업',
      //   description: '전통 혼례 포함',
      //   price: {
      //     amount: 25000,
      //     unit: '원'
      //   }
      // },
      // {
      //   _id: '82',
      //   imageUrl: 'http://cfile4.uf.tistory.com/image/2554843C5905D7B211D7E9',
      //   title: '촬영 메이크업',
      //   description: '전통 혼례 포함',
      //   price: {
      //     amount: 25000,
      //     unit: '원'
      //   }
      // },
      // {
      //   _id: '92',
      //   imageUrl: 'http://cfile4.uf.tistory.com/image/2554843C5905D7B211D7E9',
      //   title: '촬영 메이크업',
      //   description: '전통 혼례 포함',
      //   price: {
      //     amount: 25000,
      //     unit: '원'
      //   }
      // },
      // {
      //   _id: '73',
      //   imageUrl: 'http://cfile4.uf.tistory.com/image/2554843C5905D7B211D7E9',
      //   title: '촬영 메이크업',
      //   description: '전통 혼례 포함',
      //   price: {
      //     amount: 25000,
      //     unit: '원'
      //   }
      // },
      // {
      //   _id: '83',
      //   imageUrl: 'http://cfile4.uf.tistory.com/image/2554843C5905D7B211D7E9',
      //   title: '촬영 메이크업',
      //   description: '전통 혼례 포함',
      //   price: {
      //     amount: 25000,
      //     unit: '원'
      //   }
      // },
      // {
      //   _id: '93',
      //   imageUrl: 'http://cfile4.uf.tistory.com/image/2554843C5905D7B211D7E9',
      //   title: '촬영 메이크업',
      //   description: '전통 혼례 포함',
      //   price: {
      //     amount: 25000,
      //     unit: '원'
      //   }
      // },
      // {
      //   _id: '74',
      //   imageUrl: 'http://cfile4.uf.tistory.com/image/2554843C5905D7B211D7E9',
      //   title: '촬영 메이크업',
      //   description: '전통 혼례 포함',
      //   price: {
      //     amount: 25000,
      //     unit: '원'
      //   }
      // },
      // {
      //   _id: '84',
      //   imageUrl: 'http://cfile4.uf.tistory.com/image/2554843C5905D7B211D7E9',
      //   title: '촬영 메이크업',
      //   description: '전통 혼례 포함',
      //   price: {
      //     amount: 25000,
      //     unit: '원'
      //   }
      // },
      // {
      //   _id: '94',
      //   imageUrl: 'http://cfile4.uf.tistory.com/image/2554843C5905D7B211D7E9',
      //   title: '촬영 메이크업',
      //   description: '전통 혼례 포함',
      //   price: {
      //     amount: 25000,
      //     unit: '원'
      //   }
      // },
      // {
      //   _id: '75',
      //   imageUrl: 'http://cfile4.uf.tistory.com/image/2554843C5905D7B211D7E9',
      //   title: '촬영 메이크업',
      //   description: '전통 혼례 포함',
      //   price: {
      //     amount: 25000,
      //     unit: '원'
      //   }
      // },
      // {
      //   _id: '85',
      //   imageUrl: 'http://cfile4.uf.tistory.com/image/2554843C5905D7B211D7E9',
      //   title: '촬영 메이크업',
      //   description: '전통 혼례 포함',
      //   price: {
      //     amount: 25000,
      //     unit: '원'
      //   }
      // },
      // {
      //   _id: '95',
      //   imageUrl: 'http://cfile4.uf.tistory.com/image/2554843C5905D7B211D7E9',
      //   title: '촬영 메이크업',
      //   description: '전통 혼례 포함',
      //   price: {
      //     amount: 25000,
      //     unit: '원'
      //   }
      // },
      // {
      //   _id: '76',
      //   imageUrl: 'http://cfile4.uf.tistory.com/image/2554843C5905D7B211D7E9',
      //   title: '촬영 메이크업',
      //   description: '전통 혼례 포함',
      //   price: {
      //     amount: 25000,
      //     unit: '원'
      //   }
      // },
      // {
      //   _id: '86',
      //   imageUrl: 'http://cfile4.uf.tistory.com/image/2554843C5905D7B211D7E9',
      //   title: '촬영 메이크업',
      //   description: '전통 혼례 포함',
      //   price: {
      //     amount: 25000,
      //     unit: '원'
      //   }
      // },
      // {
      //   _id: '96',
      //   imageUrl: 'http://cfile4.uf.tistory.com/image/2554843C5905D7B211D7E9',
      //   title: '촬영 메이크업',
      //   description: '전통 혼례 포함',
      //   price: {
      //     amount: 25000,
      //     unit: '원'
      //   }
      // },
      // {
      //   _id: '77',
      //   imageUrl: 'http://cfile4.uf.tistory.com/image/2554843C5905D7B211D7E9',
      //   title: '촬영 메이크업',
      //   description: '전통 혼례 포함',
      //   price: {
      //     amount: 25000,
      //     unit: '원'
      //   }
      // },
      // {
      //   _id: '87',
      //   imageUrl: 'http://cfile4.uf.tistory.com/image/2554843C5905D7B211D7E9',
      //   title: '촬영 메이크업',
      //   description: '전통 혼례 포함',
      //   price: {
      //     amount: 25000,
      //     unit: '원'
      //   }
      // },
      // {
      //   _id: '97',
      //   imageUrl: 'http://cfile4.uf.tistory.com/image/2554843C5905D7B211D7E9',
      //   title: '촬영 메이크업',
      //   description: '전통 혼례 포함',
      //   price: {
      //     amount: 25000,
      //     unit: '원'
      //   }
      // }
    ]
  };

  keyExtractor = (service) => {
    return service._id;
  };

  renderService = ({ item }) => {
    return (
      <TouchableWithoutFeedback onPress={() => { this.onPressService(item); }}>
        <View style={{ width: '50%', height: 185, paddingLeft: 16, marginTop: 16 }}>
          <View>
            <Image source={{ uri: item.imageUrl }} style={{ width: '100%', height: 130 }} />
          </View>
          <View style={{ borderBottomLeftRadius: 5, borderBottomRightRadius: 5, borderWidth: 1, borderColor: '#eeeeee', padding: 10, flex: 1 }}>
            <View>
              <Text style={{ fontSize: 13, color: '#666666' }}>{ item.title }</Text>
            </View>
            <View style={{ flexDirection: 'row', marginTop: 5 }}>
              <Text style={{ fontSize: 10, color: '#919191' }}>{ item.description } | </Text>
              <Text style={{ fontSize: 10, color: '#fd614d' }}>{ this.renderPrice(item) }</Text>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  };

  renderPrice = (item) => {
    return item.price.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + item.price.unit;
  };

  onPressService = (service) => {
    Actions.service({
      service: service
    });
  };

  render() {
    return (
      <Layout title={this.props.serviceType.title} isKeyboardDismissedOnTouched={false}>
        <FlatList data={this.props.services} keyExtractor={this.keyExtractor} renderItem={this.renderService} numColumns={2} contentContainerStyle={{ paddingRight: 16, paddingBottom: 16 }} />
      </Layout>
    );
  }
}
