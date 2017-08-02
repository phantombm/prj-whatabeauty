import React, { Component } from 'react';
import { View, FlatList, Image, Text, TouchableWithoutFeedback } from 'react-native';
import PropType from 'prop-types';
import { Actions } from 'react-native-router-flux';
import moment from 'moment';
import _ from 'lodash';

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
        serviceTypeId: '1',
        name: '본식 메이크업',
        comment: '전통 혼례 포함',
        description: {
          content: '<div style="font-size: 12px; color: #9b9b9b">신랑 신부 모두에게 서비스를 제공하는 세트 상품으로 두사람의 본식 메이크업을 저렴하고 합리적으로 제공받을 수 있는 서비스 입니다. 등등의 서비스 내용이 적히는 공간입니다. 신랑 신부 모두에게 서비스를 제공하는 세트 상품으로 두사람의 본식 메이크업을 저렴하고 합리적으로 제공받을 수 있는 서비스 입니다. 등등의 서비스 내용이 적히는 공간입니다.</div>',
          progress: '<div style="font-size: 12px; color: #9b9b9b">상품을 등록하기 전에 채팅을 통해서 건 전화를 통해서 건 상담을 꼼꼼하게 받은 다음에 필요한 정보들을 차근차근 입력하고 예약하면 예약한 시간과 장소에 찾아가서 서비스를 진행한다는 일련의 과정들을 설명하는 공간입니다. 상품을 등록하기 전에 채팅을 통해서 건 전화를 통해서 건 상담을 꼼꼼하게 받은 다음에 필요한 정보들을 차근차근 입력하고 예약하면 예약한 시간과 장소에 찾아가서 서비스를 진행한다는 일련의 과정들을 설명하는 공간입니다. 상품을 등록하기 전에 채팅을 통해서 건 전화를 통해서 건 상담을 꼼꼼하게 받은 다음에 필요한 정보들을 차근차근 입력하고 예약하면 예약한 시간과 장소에 찾아가서 서비스를 진행한다는 일련의 과정들을 설명하는 공간입니다.</div>'
        },
        commentsForReserving: [
          {
            comment: '신랑, 신부 2인 모두에게 서비스 합니다.',
            ordering: 1
          },
          {
            comment: '전통혼례 역시 같은 가격입니다.',
            ordering: 2
          },
          {
            comment: '신랑, 신부 2인 모두에게 서비스 합니다.',
            ordering: 3
          }
        ],
        imageUrl: 'http://cfile4.uf.tistory.com/image/2554843C5905D7B211D7E9',
        gallery: [
          {
            imageUrl: 'http://cfile28.uf.tistory.com/image/2372783D577FD52D022E32',
            description: '2017년 07월 17일 논현동 스튜디오에서  제공된 서비스'
          },
          {
            imageUrl: 'http://upload2.inven.co.kr/upload/2017/06/09/bbs/i14754277015.jpg',
            description: '2017년 07월 17일 논현동 스튜디오에서  제공된 서비스'
          },
          {
            imageUrl: 'https://i.ytimg.com/vi/TRTquokWSCw/maxresdefault.jpg',
            description: '2017년 07월 17일 논현동 스튜디오에서  제공된 서비스'
          },
          {
            imageUrl: 'http://cfile29.uf.tistory.com/image/2648023A5466928F2ECAB5',
            description: '2017년 07월 17일 논현동 스튜디오에서  제공된 서비스'
          },
          {
            imageUrl: 'http://ppss.kr/wp-content/uploads/2017/04/%EB%8B%A4%EC%9A%B4%EB%A1%9C%EB%93%9C-8-540x245.png',
            description: '2017년 07월 17일 논현동 스튜디오에서  제공된 서비스'
          }
        ],
        relatedServices: [
          {
            _id: '31',
            serviceTypeId: '1',
            name: '본식 메이크업2',
            comment: '전통 혼례 포함',
            description: {
              content: '<div style="font-size: 12px; color: #9b9b9b">신랑 신부 모두에게 서비스를 제공하는 세트 상품으로 두사람의 본식 메이크업을 저렴하고 합리적으로 제공받을 수 있는 서비스 입니다. 등등의 서비스 내용이 적히는 공간입니다. 신랑 신부 모두에게 서비스를 제공하는 세트 상품으로 두사람의 본식 메이크업을 저렴하고 합리적으로 제공받을 수 있는 서비스 입니다. 등등의 서비스 내용이 적히는 공간입니다.</div>',
              progress: '<div style="font-size: 12px; color: #9b9b9b">상품을 등록하기 전에 채팅을 통해서 건 전화를 통해서 건 상담을 꼼꼼하게 받은 다음에 필요한 정보들을 차근차근 입력하고 예약하면 예약한 시간과 장소에 찾아가서 서비스를 진행한다는 일련의 과정들을 설명하는 공간입니다. 상품을 등록하기 전에 채팅을 통해서 건 전화를 통해서 건 상담을 꼼꼼하게 받은 다음에 필요한 정보들을 차근차근 입력하고 예약하면 예약한 시간과 장소에 찾아가서 서비스를 진행한다는 일련의 과정들을 설명하는 공간입니다. 상품을 등록하기 전에 채팅을 통해서 건 전화를 통해서 건 상담을 꼼꼼하게 받은 다음에 필요한 정보들을 차근차근 입력하고 예약하면 예약한 시간과 장소에 찾아가서 서비스를 진행한다는 일련의 과정들을 설명하는 공간입니다.</div>'
            },
            commentsForReserving: [
              {
                comment: '신랑, 신부 2인 모두에게 서비스 합니다.',
                ordering: 1
              },
              {
                comment: '전통혼례 역시 같은 가격입니다.',
                ordering: 2
              },
              {
                comment: '신랑, 신부 2인 모두에게 서비스 합니다.',
                ordering: 3
              }
            ],
            imageUrl: 'http://cfile4.uf.tistory.com/image/2554843C5905D7B211D7E9',
            gallery: [
              {
                imageUrl: 'http://cfile28.uf.tistory.com/image/2372783D577FD52D022E32',
                description: '2017년 07월 17일 논현동 스튜디오에서  제공된 서비스'
              },
              {
                imageUrl: 'http://upload2.inven.co.kr/upload/2017/06/09/bbs/i14754277015.jpg',
                description: '2017년 07월 17일 논현동 스튜디오에서  제공된 서비스'
              },
              {
                imageUrl: 'https://i.ytimg.com/vi/TRTquokWSCw/maxresdefault.jpg',
                description: '2017년 07월 17일 논현동 스튜디오에서  제공된 서비스'
              },
              {
                imageUrl: 'http://cfile29.uf.tistory.com/image/2648023A5466928F2ECAB5',
                description: '2017년 07월 17일 논현동 스튜디오에서  제공된 서비스'
              },
              {
                imageUrl: 'http://ppss.kr/wp-content/uploads/2017/04/%EB%8B%A4%EC%9A%B4%EB%A1%9C%EB%93%9C-8-540x245.png',
                description: '2017년 07월 17일 논현동 스튜디오에서  제공된 서비스'
              }
            ],
            relatedService: ['2', '3'],
            price: {
              amount: 300000,
              unit: '원'
            },
            quantity: 0,
            duration: 30,
            ordering: 31,
            isVisible: true,
            isActive: true,
            createAt: moment()
          },
          {
            _id: '32',
            serviceTypeId: '1',
            name: '본식 메이크업3',
            comment: '전통 혼례 포함',
            description: {
              content: '<div style="font-size: 12px; color: #9b9b9b">신랑 신부 모두에게 서비스를 제공하는 세트 상품으로 두사람의 본식 메이크업을 저렴하고 합리적으로 제공받을 수 있는 서비스 입니다. 등등의 서비스 내용이 적히는 공간입니다. 신랑 신부 모두에게 서비스를 제공하는 세트 상품으로 두사람의 본식 메이크업을 저렴하고 합리적으로 제공받을 수 있는 서비스 입니다. 등등의 서비스 내용이 적히는 공간입니다.</div>',
              progress: '<div style="font-size: 12px; color: #9b9b9b">상품을 등록하기 전에 채팅을 통해서 건 전화를 통해서 건 상담을 꼼꼼하게 받은 다음에 필요한 정보들을 차근차근 입력하고 예약하면 예약한 시간과 장소에 찾아가서 서비스를 진행한다는 일련의 과정들을 설명하는 공간입니다. 상품을 등록하기 전에 채팅을 통해서 건 전화를 통해서 건 상담을 꼼꼼하게 받은 다음에 필요한 정보들을 차근차근 입력하고 예약하면 예약한 시간과 장소에 찾아가서 서비스를 진행한다는 일련의 과정들을 설명하는 공간입니다. 상품을 등록하기 전에 채팅을 통해서 건 전화를 통해서 건 상담을 꼼꼼하게 받은 다음에 필요한 정보들을 차근차근 입력하고 예약하면 예약한 시간과 장소에 찾아가서 서비스를 진행한다는 일련의 과정들을 설명하는 공간입니다.</div>'
            },
            commentsForReserving: [
              {
                comment: '신랑, 신부 2인 모두에게 서비스 합니다.',
                ordering: 1
              },
              {
                comment: '전통혼례 역시 같은 가격입니다.',
                ordering: 2
              },
              {
                comment: '신랑, 신부 2인 모두에게 서비스 합니다.',
                ordering: 3
              }
            ],
            imageUrl: 'http://cfile4.uf.tistory.com/image/2554843C5905D7B211D7E9',
            gallery: [
              {
                imageUrl: 'http://cfile28.uf.tistory.com/image/2372783D577FD52D022E32',
                description: '2017년 07월 17일 논현동 스튜디오에서  제공된 서비스'
              },
              {
                imageUrl: 'http://upload2.inven.co.kr/upload/2017/06/09/bbs/i14754277015.jpg',
                description: '2017년 07월 17일 논현동 스튜디오에서  제공된 서비스'
              },
              {
                imageUrl: 'https://i.ytimg.com/vi/TRTquokWSCw/maxresdefault.jpg',
                description: '2017년 07월 17일 논현동 스튜디오에서  제공된 서비스'
              },
              {
                imageUrl: 'http://cfile29.uf.tistory.com/image/2648023A5466928F2ECAB5',
                description: '2017년 07월 17일 논현동 스튜디오에서  제공된 서비스'
              },
              {
                imageUrl: 'http://ppss.kr/wp-content/uploads/2017/04/%EB%8B%A4%EC%9A%B4%EB%A1%9C%EB%93%9C-8-540x245.png',
                description: '2017년 07월 17일 논현동 스튜디오에서  제공된 서비스'
              }
            ],
            relatedService: [],
            price: {
              amount: 300000,
              unit: '원'
            },
            quantity: 0,
            duration: 30,
            ordering: 32,
            isVisible: true,
            isActive: true,
            createAt: moment()
          }
        ],
        price: {
          amount: 300000,
          unit: '원'
        },
        quantity: 1,
        duration: 30,
        ordering: 1,
        isVisible: true,
        isActive: true,
        createAt: moment()
      },
      {
        _id: '2',
        serviceTypeId: '1',
        name: '본식 메이크업',
        comment: '전통 혼례 포함',
        description: {
          content: '<div style="font-size: 12px; color: #9b9b9b">신랑 신부 모두에게 서비스를 제공하는 세트 상품으로 두사람의 본식 메이크업을 저렴하고 합리적으로 제공받을 수 있는 서비스 입니다. 등등의 서비스 내용이 적히는 공간입니다. 신랑 신부 모두에게 서비스를 제공하는 세트 상품으로 두사람의 본식 메이크업을 저렴하고 합리적으로 제공받을 수 있는 서비스 입니다. 등등의 서비스 내용이 적히는 공간입니다.</div>',
          progress: '<div style="font-size: 12px; color: #9b9b9b">상품을 등록하기 전에 채팅을 통해서 건 전화를 통해서 건 상담을 꼼꼼하게 받은 다음에 필요한 정보들을 차근차근 입력하고 예약하면 예약한 시간과 장소에 찾아가서 서비스를 진행한다는 일련의 과정들을 설명하는 공간입니다. 상품을 등록하기 전에 채팅을 통해서 건 전화를 통해서 건 상담을 꼼꼼하게 받은 다음에 필요한 정보들을 차근차근 입력하고 예약하면 예약한 시간과 장소에 찾아가서 서비스를 진행한다는 일련의 과정들을 설명하는 공간입니다. 상품을 등록하기 전에 채팅을 통해서 건 전화를 통해서 건 상담을 꼼꼼하게 받은 다음에 필요한 정보들을 차근차근 입력하고 예약하면 예약한 시간과 장소에 찾아가서 서비스를 진행한다는 일련의 과정들을 설명하는 공간입니다.</div>'
        },
        commentsForReserving: [
          {
            comment: '신랑, 신부 2인 모두에게 서비스 합니다.',
            ordering: 1
          },
          {
            comment: '전통혼례 역시 같은 가격입니다.',
            ordering: 2
          },
          {
            comment: '신랑, 신부 2인 모두에게 서비스 합니다.',
            ordering: 3
          }
        ],
        imageUrl: 'http://cfile4.uf.tistory.com/image/2554843C5905D7B211D7E9',
        gallery: [
          {
            imageUrl: 'http://cfile28.uf.tistory.com/image/2372783D577FD52D022E32',
            description: '2017년 07월 17일 논현동 스튜디오에서  제공된 서비스'
          },
          {
            imageUrl: 'http://upload2.inven.co.kr/upload/2017/06/09/bbs/i14754277015.jpg',
            description: '2017년 07월 17일 논현동 스튜디오에서  제공된 서비스'
          },
          {
            imageUrl: 'https://i.ytimg.com/vi/TRTquokWSCw/maxresdefault.jpg',
            description: '2017년 07월 17일 논현동 스튜디오에서  제공된 서비스'
          },
          {
            imageUrl: 'http://cfile29.uf.tistory.com/image/2648023A5466928F2ECAB5',
            description: '2017년 07월 17일 논현동 스튜디오에서  제공된 서비스'
          },
          {
            imageUrl: 'http://ppss.kr/wp-content/uploads/2017/04/%EB%8B%A4%EC%9A%B4%EB%A1%9C%EB%93%9C-8-540x245.png',
            description: '2017년 07월 17일 논현동 스튜디오에서  제공된 서비스'
          }
        ],
        relatedServices: [],
        price: {
          amount: 300000,
          unit: '원'
        },
        quantity: 1,
        duration: 30,
        ordering: 2,
        isVisible: true,
        isActive: true,
        createAt: moment()
      },
      {
        _id: '3',
        serviceTypeId: '1',
        name: '본식 메이크업',
        comment: '전통 혼례 포함',
        description: {
          content: '<div style="font-size: 12px; color: #9b9b9b">신랑 신부 모두에게 서비스를 제공하는 세트 상품으로 두사람의 본식 메이크업을 저렴하고 합리적으로 제공받을 수 있는 서비스 입니다. 등등의 서비스 내용이 적히는 공간입니다. 신랑 신부 모두에게 서비스를 제공하는 세트 상품으로 두사람의 본식 메이크업을 저렴하고 합리적으로 제공받을 수 있는 서비스 입니다. 등등의 서비스 내용이 적히는 공간입니다.</div>',
          progress: '<div style="font-size: 12px; color: #9b9b9b">상품을 등록하기 전에 채팅을 통해서 건 전화를 통해서 건 상담을 꼼꼼하게 받은 다음에 필요한 정보들을 차근차근 입력하고 예약하면 예약한 시간과 장소에 찾아가서 서비스를 진행한다는 일련의 과정들을 설명하는 공간입니다. 상품을 등록하기 전에 채팅을 통해서 건 전화를 통해서 건 상담을 꼼꼼하게 받은 다음에 필요한 정보들을 차근차근 입력하고 예약하면 예약한 시간과 장소에 찾아가서 서비스를 진행한다는 일련의 과정들을 설명하는 공간입니다. 상품을 등록하기 전에 채팅을 통해서 건 전화를 통해서 건 상담을 꼼꼼하게 받은 다음에 필요한 정보들을 차근차근 입력하고 예약하면 예약한 시간과 장소에 찾아가서 서비스를 진행한다는 일련의 과정들을 설명하는 공간입니다.</div>'
        },
        commentsForReserving: [
          {
            comment: '신랑, 신부 2인 모두에게 서비스 합니다.',
            ordering: 1
          },
          {
            comment: '전통혼례 역시 같은 가격입니다.',
            ordering: 2
          },
          {
            comment: '신랑, 신부 2인 모두에게 서비스 합니다.',
            ordering: 3
          }
        ],
        imageUrl: 'http://cfile4.uf.tistory.com/image/2554843C5905D7B211D7E9',
        gallery: [
          {
            imageUrl: 'http://cfile28.uf.tistory.com/image/2372783D577FD52D022E32',
            description: '2017년 07월 17일 논현동 스튜디오에서  제공된 서비스'
          },
          {
            imageUrl: 'http://upload2.inven.co.kr/upload/2017/06/09/bbs/i14754277015.jpg',
            description: '2017년 07월 17일 논현동 스튜디오에서  제공된 서비스'
          },
          {
            imageUrl: 'https://i.ytimg.com/vi/TRTquokWSCw/maxresdefault.jpg',
            description: '2017년 07월 17일 논현동 스튜디오에서  제공된 서비스'
          },
          {
            imageUrl: 'http://cfile29.uf.tistory.com/image/2648023A5466928F2ECAB5',
            description: '2017년 07월 17일 논현동 스튜디오에서  제공된 서비스'
          },
          {
            imageUrl: 'http://ppss.kr/wp-content/uploads/2017/04/%EB%8B%A4%EC%9A%B4%EB%A1%9C%EB%93%9C-8-540x245.png',
            description: '2017년 07월 17일 논현동 스튜디오에서  제공된 서비스'
          }
        ],
        relatedServices: [],
        price: {
          amount: 300000,
          unit: '원'
        },
        quantity: 1,
        duration: 30,
        ordering: 3,
        isVisible: true,
        isActive: true,
        createAt: moment()
      },
      {
        _id: '4',
        serviceTypeId: '1',
        name: '본식 메이크업',
        comment: '전통 혼례 포함',
        description: {
          content: '<div style="font-size: 12px; color: #9b9b9b">신랑 신부 모두에게 서비스를 제공하는 세트 상품으로 두사람의 본식 메이크업을 저렴하고 합리적으로 제공받을 수 있는 서비스 입니다. 등등의 서비스 내용이 적히는 공간입니다. 신랑 신부 모두에게 서비스를 제공하는 세트 상품으로 두사람의 본식 메이크업을 저렴하고 합리적으로 제공받을 수 있는 서비스 입니다. 등등의 서비스 내용이 적히는 공간입니다.</div>',
          progress: '<div style="font-size: 12px; color: #9b9b9b">상품을 등록하기 전에 채팅을 통해서 건 전화를 통해서 건 상담을 꼼꼼하게 받은 다음에 필요한 정보들을 차근차근 입력하고 예약하면 예약한 시간과 장소에 찾아가서 서비스를 진행한다는 일련의 과정들을 설명하는 공간입니다. 상품을 등록하기 전에 채팅을 통해서 건 전화를 통해서 건 상담을 꼼꼼하게 받은 다음에 필요한 정보들을 차근차근 입력하고 예약하면 예약한 시간과 장소에 찾아가서 서비스를 진행한다는 일련의 과정들을 설명하는 공간입니다. 상품을 등록하기 전에 채팅을 통해서 건 전화를 통해서 건 상담을 꼼꼼하게 받은 다음에 필요한 정보들을 차근차근 입력하고 예약하면 예약한 시간과 장소에 찾아가서 서비스를 진행한다는 일련의 과정들을 설명하는 공간입니다.</div>'
        },
        commentsForReserving: [
          {
            comment: '신랑, 신부 2인 모두에게 서비스 합니다.',
            ordering: 1
          },
          {
            comment: '전통혼례 역시 같은 가격입니다.',
            ordering: 2
          },
          {
            comment: '신랑, 신부 2인 모두에게 서비스 합니다.',
            ordering: 3
          }
        ],
        imageUrl: 'http://cfile4.uf.tistory.com/image/2554843C5905D7B211D7E9',
        gallery: [
          {
            imageUrl: 'http://cfile28.uf.tistory.com/image/2372783D577FD52D022E32',
            description: '2017년 07월 17일 논현동 스튜디오에서  제공된 서비스'
          },
          {
            imageUrl: 'http://upload2.inven.co.kr/upload/2017/06/09/bbs/i14754277015.jpg',
            description: '2017년 07월 17일 논현동 스튜디오에서  제공된 서비스'
          },
          {
            imageUrl: 'https://i.ytimg.com/vi/TRTquokWSCw/maxresdefault.jpg',
            description: '2017년 07월 17일 논현동 스튜디오에서  제공된 서비스'
          },
          {
            imageUrl: 'http://cfile29.uf.tistory.com/image/2648023A5466928F2ECAB5',
            description: '2017년 07월 17일 논현동 스튜디오에서  제공된 서비스'
          },
          {
            imageUrl: 'http://ppss.kr/wp-content/uploads/2017/04/%EB%8B%A4%EC%9A%B4%EB%A1%9C%EB%93%9C-8-540x245.png',
            description: '2017년 07월 17일 논현동 스튜디오에서  제공된 서비스'
          }
        ],
        relatedServices: [],
        price: {
          amount: 300000,
          unit: '원'
        },
        quantity: 1,
        duration: 30,
        ordering: 4,
        isVisible: true,
        isActive: true,
        createAt: moment()
      },
      {
        _id: '5',
        serviceTypeId: '1',
        name: '본식 메이크업',
        comment: '전통 혼례 포함',
        description: {
          content: '<div style="font-size: 12px; color: #9b9b9b">신랑 신부 모두에게 서비스를 제공하는 세트 상품으로 두사람의 본식 메이크업을 저렴하고 합리적으로 제공받을 수 있는 서비스 입니다. 등등의 서비스 내용이 적히는 공간입니다. 신랑 신부 모두에게 서비스를 제공하는 세트 상품으로 두사람의 본식 메이크업을 저렴하고 합리적으로 제공받을 수 있는 서비스 입니다. 등등의 서비스 내용이 적히는 공간입니다.</div>',
          progress: '<div style="font-size: 12px; color: #9b9b9b">상품을 등록하기 전에 채팅을 통해서 건 전화를 통해서 건 상담을 꼼꼼하게 받은 다음에 필요한 정보들을 차근차근 입력하고 예약하면 예약한 시간과 장소에 찾아가서 서비스를 진행한다는 일련의 과정들을 설명하는 공간입니다. 상품을 등록하기 전에 채팅을 통해서 건 전화를 통해서 건 상담을 꼼꼼하게 받은 다음에 필요한 정보들을 차근차근 입력하고 예약하면 예약한 시간과 장소에 찾아가서 서비스를 진행한다는 일련의 과정들을 설명하는 공간입니다. 상품을 등록하기 전에 채팅을 통해서 건 전화를 통해서 건 상담을 꼼꼼하게 받은 다음에 필요한 정보들을 차근차근 입력하고 예약하면 예약한 시간과 장소에 찾아가서 서비스를 진행한다는 일련의 과정들을 설명하는 공간입니다.</div>'
        },
        commentsForReserving: [
          {
            comment: '신랑, 신부 2인 모두에게 서비스 합니다.',
            ordering: 1
          },
          {
            comment: '전통혼례 역시 같은 가격입니다.',
            ordering: 2
          },
          {
            comment: '신랑, 신부 2인 모두에게 서비스 합니다.',
            ordering: 3
          }
        ],
        imageUrl: 'http://cfile4.uf.tistory.com/image/2554843C5905D7B211D7E9',
        gallery: [
          {
            imageUrl: 'http://cfile28.uf.tistory.com/image/2372783D577FD52D022E32',
            description: '2017년 07월 17일 논현동 스튜디오에서  제공된 서비스'
          },
          {
            imageUrl: 'http://upload2.inven.co.kr/upload/2017/06/09/bbs/i14754277015.jpg',
            description: '2017년 07월 17일 논현동 스튜디오에서  제공된 서비스'
          },
          {
            imageUrl: 'https://i.ytimg.com/vi/TRTquokWSCw/maxresdefault.jpg',
            description: '2017년 07월 17일 논현동 스튜디오에서  제공된 서비스'
          },
          {
            imageUrl: 'http://cfile29.uf.tistory.com/image/2648023A5466928F2ECAB5',
            description: '2017년 07월 17일 논현동 스튜디오에서  제공된 서비스'
          },
          {
            imageUrl: 'http://ppss.kr/wp-content/uploads/2017/04/%EB%8B%A4%EC%9A%B4%EB%A1%9C%EB%93%9C-8-540x245.png',
            description: '2017년 07월 17일 논현동 스튜디오에서  제공된 서비스'
          }
        ],
        relatedServices: [],
        price: {
          amount: 300000,
          unit: '원'
        },
        quantity: 1,
        duration: 30,
        ordering: 5,
        isVisible: true,
        isActive: true,
        createAt: moment()
      },
      {
        _id: '6',
        serviceTypeId: '1',
        name: '본식 메이크업',
        comment: '전통 혼례 포함',
        description: {
          content: '<div style="font-size: 12px; color: #9b9b9b">신랑 신부 모두에게 서비스를 제공하는 세트 상품으로 두사람의 본식 메이크업을 저렴하고 합리적으로 제공받을 수 있는 서비스 입니다. 등등의 서비스 내용이 적히는 공간입니다. 신랑 신부 모두에게 서비스를 제공하는 세트 상품으로 두사람의 본식 메이크업을 저렴하고 합리적으로 제공받을 수 있는 서비스 입니다. 등등의 서비스 내용이 적히는 공간입니다.</div>',
          progress: '<div style="font-size: 12px; color: #9b9b9b">상품을 등록하기 전에 채팅을 통해서 건 전화를 통해서 건 상담을 꼼꼼하게 받은 다음에 필요한 정보들을 차근차근 입력하고 예약하면 예약한 시간과 장소에 찾아가서 서비스를 진행한다는 일련의 과정들을 설명하는 공간입니다. 상품을 등록하기 전에 채팅을 통해서 건 전화를 통해서 건 상담을 꼼꼼하게 받은 다음에 필요한 정보들을 차근차근 입력하고 예약하면 예약한 시간과 장소에 찾아가서 서비스를 진행한다는 일련의 과정들을 설명하는 공간입니다. 상품을 등록하기 전에 채팅을 통해서 건 전화를 통해서 건 상담을 꼼꼼하게 받은 다음에 필요한 정보들을 차근차근 입력하고 예약하면 예약한 시간과 장소에 찾아가서 서비스를 진행한다는 일련의 과정들을 설명하는 공간입니다.</div>'
        },
        commentsForReserving: [
          {
            comment: '신랑, 신부 2인 모두에게 서비스 합니다.',
            ordering: 1
          },
          {
            comment: '전통혼례 역시 같은 가격입니다.',
            ordering: 2
          },
          {
            comment: '신랑, 신부 2인 모두에게 서비스 합니다.',
            ordering: 3
          }
        ],
        imageUrl: 'http://cfile4.uf.tistory.com/image/2554843C5905D7B211D7E9',
        gallery: [
          {
            imageUrl: 'http://cfile28.uf.tistory.com/image/2372783D577FD52D022E32',
            description: '2017년 07월 17일 논현동 스튜디오에서  제공된 서비스'
          },
          {
            imageUrl: 'http://upload2.inven.co.kr/upload/2017/06/09/bbs/i14754277015.jpg',
            description: '2017년 07월 17일 논현동 스튜디오에서  제공된 서비스'
          },
          {
            imageUrl: 'https://i.ytimg.com/vi/TRTquokWSCw/maxresdefault.jpg',
            description: '2017년 07월 17일 논현동 스튜디오에서  제공된 서비스'
          },
          {
            imageUrl: 'http://cfile29.uf.tistory.com/image/2648023A5466928F2ECAB5',
            description: '2017년 07월 17일 논현동 스튜디오에서  제공된 서비스'
          },
          {
            imageUrl: 'http://ppss.kr/wp-content/uploads/2017/04/%EB%8B%A4%EC%9A%B4%EB%A1%9C%EB%93%9C-8-540x245.png',
            description: '2017년 07월 17일 논현동 스튜디오에서  제공된 서비스'
          }
        ],
        relatedServices: [],
        price: {
          amount: 300000,
          unit: '원'
        },
        quantity: 1,
        duration: 30,
        ordering: 6,
        isVisible: true,
        isActive: true,
        createAt: moment()
      },
      {
        _id: '7',
        serviceTypeId: '1',
        name: '본식 메이크업',
        comment: '전통 혼례 포함',
        description: {
          content: '<div style="font-size: 12px; color: #9b9b9b">신랑 신부 모두에게 서비스를 제공하는 세트 상품으로 두사람의 본식 메이크업을 저렴하고 합리적으로 제공받을 수 있는 서비스 입니다. 등등의 서비스 내용이 적히는 공간입니다. 신랑 신부 모두에게 서비스를 제공하는 세트 상품으로 두사람의 본식 메이크업을 저렴하고 합리적으로 제공받을 수 있는 서비스 입니다. 등등의 서비스 내용이 적히는 공간입니다.</div>',
          progress: '<div style="font-size: 12px; color: #9b9b9b">상품을 등록하기 전에 채팅을 통해서 건 전화를 통해서 건 상담을 꼼꼼하게 받은 다음에 필요한 정보들을 차근차근 입력하고 예약하면 예약한 시간과 장소에 찾아가서 서비스를 진행한다는 일련의 과정들을 설명하는 공간입니다. 상품을 등록하기 전에 채팅을 통해서 건 전화를 통해서 건 상담을 꼼꼼하게 받은 다음에 필요한 정보들을 차근차근 입력하고 예약하면 예약한 시간과 장소에 찾아가서 서비스를 진행한다는 일련의 과정들을 설명하는 공간입니다. 상품을 등록하기 전에 채팅을 통해서 건 전화를 통해서 건 상담을 꼼꼼하게 받은 다음에 필요한 정보들을 차근차근 입력하고 예약하면 예약한 시간과 장소에 찾아가서 서비스를 진행한다는 일련의 과정들을 설명하는 공간입니다.</div>'
        },
        commentsForReserving: [
          {
            comment: '신랑, 신부 2인 모두에게 서비스 합니다.',
            ordering: 1
          },
          {
            comment: '전통혼례 역시 같은 가격입니다.',
            ordering: 2
          },
          {
            comment: '신랑, 신부 2인 모두에게 서비스 합니다.',
            ordering: 3
          }
        ],
        imageUrl: 'http://cfile4.uf.tistory.com/image/2554843C5905D7B211D7E9',
        gallery: [
          {
            imageUrl: 'http://cfile28.uf.tistory.com/image/2372783D577FD52D022E32',
            description: '2017년 07월 17일 논현동 스튜디오에서  제공된 서비스'
          },
          {
            imageUrl: 'http://upload2.inven.co.kr/upload/2017/06/09/bbs/i14754277015.jpg',
            description: '2017년 07월 17일 논현동 스튜디오에서  제공된 서비스'
          },
          {
            imageUrl: 'https://i.ytimg.com/vi/TRTquokWSCw/maxresdefault.jpg',
            description: '2017년 07월 17일 논현동 스튜디오에서  제공된 서비스'
          },
          {
            imageUrl: 'http://cfile29.uf.tistory.com/image/2648023A5466928F2ECAB5',
            description: '2017년 07월 17일 논현동 스튜디오에서  제공된 서비스'
          },
          {
            imageUrl: 'http://ppss.kr/wp-content/uploads/2017/04/%EB%8B%A4%EC%9A%B4%EB%A1%9C%EB%93%9C-8-540x245.png',
            description: '2017년 07월 17일 논현동 스튜디오에서  제공된 서비스'
          }
        ],
        relatedServices: [],
        price: {
          amount: 300000,
          unit: '원'
        },
        quantity: 1,
        duration: 30,
        ordering: 7,
        isVisible: true,
        isActive: true,
        createAt: moment()
      }
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
              <Text style={{ fontSize: 13, color: '#666666' }}>{ item.name }</Text>
            </View>
            <View style={{ flexDirection: 'row', marginTop: 5 }}>
              <Text style={{ fontSize: 10, color: '#919191' }}>{ item.comment } | </Text>
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
    let services = this.props.services;

    services  = _.sortBy(services, [(service) => { return -service.ordering; }, 'createAt']);

    services.reverse();

    return (
      <Layout title={this.props.serviceType.name} isKeyboardDismissedOnTouched={false}>
        <FlatList data={services} keyExtractor={this.keyExtractor} renderItem={this.renderService} numColumns={2} contentContainerStyle={{ paddingRight: 16, paddingBottom: 16 }} />
      </Layout>
    );
  }
}
