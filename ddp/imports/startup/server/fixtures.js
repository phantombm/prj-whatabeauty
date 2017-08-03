import { Meteor } from 'meteor/meteor';
import { ServiceTypes } from '../../api/serviceTypes/serviceTypes';

Meteor.startup(() => {
  if (ServiceTypes.find({}).count() == 0) {
    const serviceTypes = [
      {
        name: 'WEDDING',
        imageUrl: 'http://file.mk.co.kr/meet/neds/2014/10/image_readtop_2014_1297012_14128986651568541.jpg',
        ordering: 1,
        isVisible: true,
        isActive: true,
        createAt: new Date()
      },
      {
        name: 'FAMILY',
        imageUrl: 'http://cfile202.uf.daum.net/image/176BFF3E4FBAF0921143E9',
        ordering: 2,
        isVisible: true,
        isActive: true,
        createAt: new Date()
      },
      {
        name: 'EVENT',
        imageUrl: 'https://i.ytimg.com/vi/r0QKiihUSfQ/maxresdefault.jpg',
        ordering: 3,
        isVisible: true,
        isActive: true,
        createAt: new Date()
      },
      {
        name: 'PROFILE',
        imageUrl: 'http://cphoto.asiae.co.kr/listimglink/6/2016020110091951094_1.jpg',
        ordering: 4,
        isVisible: true,
        isActive: true,
        createAt: new Date()
      }
    ];

    const serviceTypeIds = [];

    serviceTypes.forEach((serviceType) => {
      serviceTypeIds.push(ServiceTypes.insert(serviceType));
    });

    const services = [
      {
        serviceTypeId: serviceTypeIds[0],
        name: '웨딩 촬영 메이크업',
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
        ]
      },
      {
        serviceTypeId: serviceTypeIds[0],
        name: '웨딩 본 메이크업',
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
        ]
      },
      {
        serviceTypeId: serviceTypeIds[0],
        name: '리마인드 웨딩 메이크업',
        comment: '신랑 포함',
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
        ]
      }
    ];

    const serviceIds = [];

    services.forEach((service) => {
      serviceIds.push(Services.insert(service));
    });
  }
});
