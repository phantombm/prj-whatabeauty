import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base'

import { ServiceTypes } from '../../api/serviceTypes/serviceTypes';
import { Services } from '../../api/services/services';
import { Reviews } from '../../api/reviews/reviews';

Meteor.startup(() => {
  const reviewIds = [];

  if (Reviews.find({}).count() == 0) {
    const reviews = [
      {
        userId: '',
        name: '자이내이름',
        grade: 3.5,
        comment: '믿고 맡기는 김활란 뮤지네프 13년째 단골로 다니고 있어요. 제 결혼식은 물론이고, 각종 가족행사에서부터 가끔 기분전환하고 싶을 때도 역시 김활란 뮤제네프에 예약한답니다. 제가 원래 빈말을 잘 못하는데…네 맞아요, 이런거 지어내느라고 아주 그냥 죽겠어여 :)',
        isVisible: true,
        isActive: true,
        createAt: new Date()
      },
      {
        userId: '',
        name: '고객은 왕이다.',
        grade: 0,
        comment: '믿고 맡기는 김활란 뮤지네프 13년째 단골로 다니고 있어요. 제 결혼식은 물론이고, 각종 가족행사에서부터 가끔 기분전환하고 싶을 때도 역시 김활란 뮤제네프에 예약한답니다. 제가 원래 빈말을 잘 못하는데…네 맞아요, 이런거 지어내느라고 아주 그냥 죽겠어여 :)',
        isVisible: true,
        isActive: true,
        createAt: new Date()
      },
      {
        userId: '',
        name: '자이내이름2',
        grade: 3.5,
        comment: '믿고 맡기는 김활란 뮤지네프 13년째 단골로 다니고 있어요. 제 결혼식은 물론이고, 각종 가족행사에서부터 가끔 기분전환하고 싶을 때도 역시 김활란 뮤제네프에 예약한답니다. 제가 원래 빈말을 잘 못하는데…네 맞아요, 이런거 지어내느라고 아주 그냥 죽겠어여 :)',
        isVisible: true,
        isActive: true,
        createAt: new Date()
      },
      {
        userId: '',
        name: '자이내이름3',
        grade: 0.5,
        comment: '믿고 맡기는 김활란 뮤지네프 13년째 단골로 다니고 있어요. 제 결혼식은 물론이고, 각종 가족행사에서부터 가끔 기분전환하고 싶을 때도 역시 김활란 뮤제네프에 예약한답니다. 제가 원래 빈말을 잘 못하는데…네 맞아요, 이런거 지어내느라고 아주 그냥 죽겠어여 :)',
        isVisible: true,
        isActive: true,
        createAt: new Date()
      },
      {
        userId: '',
        name: '자이내이름4',
        grade: 4,
        comment: '믿고 맡기는 김활란 뮤지네프 13년째 단골로 다니고 있어요. 제 결혼식은 물론이고, 각종 가족행사에서부터 가끔 기분전환하고 싶을 때도 역시 김활란 뮤제네프에 예약한답니다. 제가 원래 빈말을 잘 못하는데…네 맞아요, 이런거 지어내느라고 아주 그냥 죽겠어여 :)',
        isVisible: true,
        isActive: true,
        createAt: new Date()
      }
    ];

    reviews.forEach((review) => {
      reviewIds.push(Reviews.insert(review));
    });
  }

  if (Meteor.users.find({
      'profile.isSsam': true
    }).count() == 0) {
    let userId = Accounts.createUser({
      email: 'ssam4@test.com',
      password: '123456',
      profile: {
        name: '쌤1',
        email: 'ssam1@test.com',
        phoneNumber: '01028331122'
      }
    });

    Meteor.users.update({
      _id: userId
    }, {
      $set: {
        'profile.isSsam': true,
        'profile.informationForSsam.name': '잘하는 쌤',
        'profile.informationForSsam.imageUrl': 'http://file.mk.co.kr/meet/neds/2014/10/image_readtop_2014_1297012_14128986651568541.jpg',
        'profile.informationForSsam.region': '서울',
        'profile.informationForSsam.career': 26,
        'profile.informationForSsam.comment': '신부화장의 끝판왕',
        'profile.informationForSsam.description': '“ 나다운 것이 가장 예쁘다 .”뷰티 숍 김활란 뮤제네프의 원장이자 성신여대 메이크업 디자인학과 교수이기도 한 김활란은 메이크업을 시작한 지 올해로 20년 차인 베테랑 메이크업 아티스트다. 지금까지 김활란 원장은 김효진, 신세경, 하지원, 강혜정 등 핫한 여배우들의 메이크업을 책임지고 있을 뿐 아니라 뷰티 프로그램 ‘겟잇뷰티’ ‘스토리:진’에 출연하며 뷰티 멘토로 자리매김해왔다.',
        'profile.informationForSsam.reviews': [
          {
            id: reviewIds[0],
            grade: 3.5
          },
          {
            id: reviewIds[1],
            grade: 0
          },
          {
            id: reviewIds[2],
            grade: 3.5
          },
          {
            id: reviewIds[3],
            grade: 0.5
          }
        ],
        'profile.informationForSsam.portfolios': [
          {
            imageUrl: 'http://file.mk.co.kr/meet/neds/2014/10/image_readtop_2014_1297012_14128986651568541.jpg',
            description: '어제 했어요'
          },
          {
            imageUrl: 'http://cfile4.uf.tistory.com/image/2554843C5905D7B211D7E9',
            description: '그제 했어요'
          },
          {
            imageUrl: 'http://cfile29.uf.tistory.com/image/2648023A5466928F2ECAB5',
            description: '3일전 했어요'
          }
        ],
        'profile.informationForSsam.notAvailableDates': [new Date()],
        'profile.informationForSsam.isAvailable': true,
        'profile.informationForSsam.bankAccount': {
          bank: '국민',
          number: '010-2833-1122',
          owner: '쌤1'
        }
      }
    });

    userId = Accounts.createUser({
      email: 'ssam2@test.com',
      password: '123456',
      profile: {
        name: '쌤2',
        email: 'ssam2@test.com',
        phoneNumber: '01028331122'
      }
    });

    Meteor.users.update({
      _id: userId
    }, {
      $set: {
        'profile.isSsam': true,
        'profile.informationForSsam.name': '잘하는 쌤2',
        'profile.informationForSsam.imageUrl': 'http://file.mk.co.kr/meet/neds/2014/10/image_readtop_2014_1297012_14128986651568541.jpg',
        'profile.informationForSsam.region': '서울',
        'profile.informationForSsam.career': 26,
        'profile.informationForSsam.comment': '신부화장의 끝판왕',
        'profile.informationForSsam.description': '“ 나다운 것이 가장 예쁘다 .”뷰티 숍 김활란 뮤제네프의 원장이자 성신여대 메이크업 디자인학과 교수이기도 한 김활란은 메이크업을 시작한 지 올해로 20년 차인 베테랑 메이크업 아티스트다. 지금까지 김활란 원장은 김효진, 신세경, 하지원, 강혜정 등 핫한 여배우들의 메이크업을 책임지고 있을 뿐 아니라 뷰티 프로그램 ‘겟잇뷰티’ ‘스토리:진’에 출연하며 뷰티 멘토로 자리매김해왔다.',
        'profile.informationForSsam.reviews': [
          {
            id: reviewIds[4],
            grade: 4
          },
          {
            id: reviewIds[0],
            grade: 3.5
          },
          {
            id: reviewIds[1],
            grade: 0
          },
          {
            id:reviewIds[2],
            grade: 3.5
          },
          {
            id: reviewIds[3],
            grade: 0.5
          }
        ],
        'profile.informationForSsam.portfolios': [
          {
            imageUrl: 'http://file.mk.co.kr/meet/neds/2014/10/image_readtop_2014_1297012_14128986651568541.jpg',
            description: '어제 했어요'
          },
          {
            imageUrl: 'http://cfile4.uf.tistory.com/image/2554843C5905D7B211D7E9',
            description: '그제 했어요'
          },
          {
            imageUrl: 'http://cfile29.uf.tistory.com/image/2648023A5466928F2ECAB5',
            description: '3일전 했어요'
          }
        ],
        'profile.informationForSsam.notAvailableDates': [new Date()],
        'profile.informationForSsam.isAvailable': true,
        'profile.informationForSsam.bankAccount': {
          bank: '국민',
          number: '010-2833-1122',
          owner: '쌤2'
        }
      }
    });

    userId = Accounts.createUser({
      email: 'ssam3@test.com',
      password: '123456',
      profile: {
        name: '쌤3',
        email: 'ssam3@test.com',
        phoneNumber: '01028331122'
      }
    });

    Meteor.users.update({
      _id: userId
    }, {
      $set: {
        'profile.isSsam': true,
        'profile.informationForSsam.name': '잘하는 쌤3',
        'profile.informationForSsam.imageUrl': 'http://file.mk.co.kr/meet/neds/2014/10/image_readtop_2014_1297012_14128986651568541.jpg',
        'profile.informationForSsam.region': '서울',
        'profile.informationForSsam.career': 26,
        'profile.informationForSsam.comment': '신부화장의 끝판왕',
        'profile.informationForSsam.description': '“ 나다운 것이 가장 예쁘다 .”뷰티 숍 김활란 뮤제네프의 원장이자 성신여대 메이크업 디자인학과 교수이기도 한 김활란은 메이크업을 시작한 지 올해로 20년 차인 베테랑 메이크업 아티스트다. 지금까지 김활란 원장은 김효진, 신세경, 하지원, 강혜정 등 핫한 여배우들의 메이크업을 책임지고 있을 뿐 아니라 뷰티 프로그램 ‘겟잇뷰티’ ‘스토리:진’에 출연하며 뷰티 멘토로 자리매김해왔다.',
        'profile.informationForSsam.reviews': [],
        'profile.informationForSsam.portfolios': [
          {
            imageUrl: 'http://file.mk.co.kr/meet/neds/2014/10/image_readtop_2014_1297012_14128986651568541.jpg',
            description: '어제 했어요'
          },
          {
            imageUrl: 'http://cfile4.uf.tistory.com/image/2554843C5905D7B211D7E9',
            description: '그제 했어요'
          },
          {
            imageUrl: 'http://cfile29.uf.tistory.com/image/2648023A5466928F2ECAB5',
            description: '3일전 했어요'
          }
        ],
        'profile.informationForSsam.notAvailableDates': [],
        'profile.informationForSsam.isAvailable': true,
        'profile.informationForSsam.bankAccount': {
          bank: '국민',
          number: '010-2833-1122',
          owner: '쌤3'
        }
      }
    });
  }



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
        ],
        relatedServiceIds: [],
        price: {
          amount: 50,
          unit: '원'
        },
        duration: 20,
        ordering: 1,
        isVisible: true,
        isActive: true,
        createAt: new Date()
      },
      {
        serviceTypeId: serviceTypeIds[0],
        name: '웨딩 본식 메이크업',
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
        relatedServiceIds: [],
        price: {
          amount: 100,
          unit: '원'
        },
        duration: 60,
        ordering: 2,
        isVisible: true,
        isActive: true,
        createAt: new Date()
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
        ],
        relatedServiceIds: [],
        price: {
          amount: 30,
          unit: '원'
        },
        duration: 30,
        ordering: 3,
        isVisible: true,
        isActive: true,
        createAt: new Date()
      }
    ];

    const serviceIds = [];

    services.forEach((service) => {
      serviceIds.push(Services.insert(service));
    });

    Services.update({
      _id: serviceIds[0]
    }, {
      $push: {
        relatedServiceIds: serviceIds[1]
      }
    });

    Services.update({
      _id: serviceIds[0]
    }, {
      $push: {
        relatedServiceIds: serviceIds[2]
      }
    });
  }
});
