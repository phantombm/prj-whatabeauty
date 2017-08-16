### Bootstrapping
```
/ $ npm install -g exp
/ $ npm install
/ $ exp start --lan
```

### Component Style Guide
```
export default class MyComponent extends Compoent {
  constructor() {
    super();
    
    // initialization when constructed
  }
  
  // set propTypes with 'static' keyword
  static propTypes = {
    text: PropTypes.string
  };
  
  static defaultProps = {
    text: 'default'
  };
  
  state = {
    clickNumber: 0
  };
  
  animatedValue = new Animated.Value(0);
  
  componentDidMount() {
    // initialization when mounted
  }
  
  onPress = (event) => {
    this.setState((previousState) => {
      return {
        clickNumber: previousState.clickNumber + 1
      };
    });
  }
  
  render() {
    return (
      <View>
        <Text onPress={ this.onPress }>{ this.props.text }</Text>
      </View>
    );
  }
}
```

### Components
#### *Header*
##### propTypes
- title: PropTypes.string,
- titleColor: PropTypes.string,
- backgroundColor: PropTypes.string,
- leftIcon: PropTypes.element,
- onPressLeftIcon: PropTypes.func,
- rightIcon: PropTypes.element,
- onPressRightIcon: PropTypes.func

##### defaultProps
- title: '',
- titleColor: '#000000',
- backgroundColor: '#ffffff',
- leftIcon: <Ionicons name="ios-arrow-round-back" color="#3c4f5e" size={32} />,
- onPressLeftIcon: null,
- rightIcon: null,
- onPressRightIcon: null

#### *Button*
##### propTypes
- backgroundColor: PropTypes.string,
- textColor: PropTypes.string,
- inactiveBackgroundColor: PropTypes.string,
- inactiveTextColor: PropTypes.string,
- borderRadius: PropTypes.number,
- buttonStyle: PropTypes.object,
- textStyle: PropTypes.object,
- marginTop: PropTypes.number,
- isActive: PropTypes.bool,
- onPress: PropTypes.func,
- icon: PropTypes.element

##### defaultProps
- backgroundColor: '#000000',
- textColor: '#ffffff',
- inactiveBackgroundColor: '#efefef',
- inactiveTextColor: '#ffffff',
- borderRadius: 3,
- buttonStyle: {},
- textStyle: {},
- marginTop: 0,
- isActive: true,
- onPress: () => {},
- icon: null

#### *Input*
##### propTypes
- placeholder: PropTypes.string.isRequired,
- defaultValue: PropTypes.string,
- keyColor: PropTypes.string,
- marginTop: PropTypes.number,
- validator: PropTypes.func,
- keyboardType: PropTypes.string,
- maxLength: PropTypes.number,
- onChangeText: PropTypes.func,
- secureTextEntry: PropTypes.bool

##### defaultProps
- defaultValue: '',
- keyColor: '#000000',
- marginTop: 0,
- validator: () => {
  return '';
},
- keyboardType: 'default',
- maxLength: 50,
- onChangeText: () => {},
- secureTextEntry: false

#### *MagnetView*
##### propTypes
- style: PropTypes.object,
- offsetInIos: PropTypes.number,
- offsetInAndroid: PropTypes.number,
- isWorkingIos: PropTypes.bool,
- isWorkinginAndroid: PropTypes.bool

##### defaultProps
- style: {},
- offsetInIos: 0,
- offsetInAndroid: 0,
- isWorkingIos: true,
- isWorkinginAndroid: true

### Router Keys
```
tutorial
signIn
  signInWithEmail
  signInWithFacebook
    verifyingPhoneNumberWithSms(repeated)(:signInType)
  signInWithGoogle
    verifyingPhoneNumberWithSms(repeated)(:signInType)
  signUp(abstract)
    verifyingPhoneNumberWithSms(:signInType)
    enteringEmailAndPassword(:signInType, :phoneNumber)
    enteringName(:signInType, :phoneNumber, :email, :password)
  recoveringPassword
main
  reservations(abstract)
    reservation(:userType, :id)
      writingReview(:id)
  reservationsForSsam(abstract)
    reservation(:userType, :id)
      selectingDateTime(repeated)
  serviceTypes(abstract)
    services(:serviceTypeId)
      service(:service)
        selectingServiceQuantity(:flowType, :isMainService, :service, :relatedServiceIndex)
          reserving(:service)
            selectingServiceQuantity(repeated)(:flowType, :isMainService, :service, :relatedServiceIndex)
            selectingAddress(:service)
              addingAddress(abstract)
                enteringAddress
                enteringAddressDetail
            selectingDateTime(:service)
            writingMemo(:service)
            
            ssams(:service)
              ssam(:ssam, :service)
                
                reservation(repeated)(:flowType, :service, :ssam, :reservation)
                paying(:service, :ssam)
  brands(abstract)
    brand(:id)
      chat(repeated)
  notifications
  chat
  drawerMenu(abstract)
    reservations(:userType)
      reservation(repeated)(:flowType, :service, :ssam, :reservation)
        writingReview(repeated)(:id)
    notices(:userType)
      notice(:userType, :id)
    faqs
    settings
      termsOfService
      privacyPolicy
    account
      updatingInformation
      updatingAddress(abstract)
        enteringAddress(repeated)
          enteringAddressDetail(repeated)
      addingAddress(abstract)
        enteringAddress(repeated)
          enteringAddressDetail(repeated)
      changingPassword
      deletingAccount
    applyingForSsam
      chat(repeated)
    menuForSsam
      notices(repeated)(:userType)
        notice(repeated)(:userType, :id)
      belonging
      ssam(repeated)(:flowType, :ssam)
        complainingReview(:id)
        updatingInformationForSsam
      reservations(repeated)(:userType)
        reservation(repeated)(:userType, :id)
          changingDateTime(repeated)
      balancedMoney:
        balancedMoneyDetail(:id)
        standardTableForBalancingMoney
        updatingBankAccount
      schedule
        reservation(repeated)(:userType, :id)
```

### Routing Table For Administrator App
- /chats
- /chatBoilerplates
- /notices
- /notices/:id
- /notices/add
- /faqs
- /faqs/:id
- /faqs/add
- /terms
- /ssams
- /ssams/:id
- /users
- /users/:id
- /partners
- /partners/:id
- /partners/add
- /services
- /services/:id
- /services/add
- /portfoilos
- /sales
- /balancedMoney
- /events
- /events/:id
- /events/add
- /notifications

### Mongo Database Schema

#### users.profile collection
```
{
  signInType: String('password', 'facebook', 'google'),
  signInId: String,
  name: String,
  email: String,
  cellPhoneNumber: String,
  addresses: [ // embeded
    {
      address: String,
      detail: String,
      memo: String
    }
  ],
  reservations: [String(reservation id)], // child reference
  notificationTokens: [String],
  isOwner: Boolean,
  isManager: Boolean,
  isSsam: Boolean,
  informationForSsam: {
    name: String,
    imageUrl: String,
    region: String,
    career: Number(month),
    comment: String,
    introduction: String,
    reviews: [ // denormalized child reference
      {
        reviewId: String,
        grade: Number
      }
    ],
    belonging: {
      brandId: String,
      brandName: String
    },
    portfolios: [ // embeded
      {
        imageUrl: String,
        description: String
      }
    ],
    notAvailableAts: [Date],
    isAvailable: Boolean,
    reservations: [String(reservation id)], // child reference
    balancedMoneys: [String(balancedMoney id)], // child reference
    bankAccount: {
      bank: String,
      number: String,
      owner: String
    },
    registeredAt: Date
  },
  isGettingNotificationsOn: Boolean,
  isActive: Boolean,
  createdAt: Date
}
```

#### balancedMoneys collections
```
{
  yearMonth: Date,
  balancedMoney: {
    amount: Number,
    unit: String
  },
  reservations: [String(reservation id)], // child reference
  createdAt: Date
}
```

#### reservations collections
```
{
  user: { // denormalized parent reference
    userId: String,
    profile: {
      name: String,
      phoneNumber: String    
    }
  },
  ssamId: String, // parent reference
  service: Object, // embeded
  price: {
    amount: Number,
    unit: String
  },
  progress: String('not paid', 'paid', 'refunded', 'wating for approving payment', 'wating for writing review', 'completed'),
  reviewId: String, // child reference
  createdAt: Date
}
```

#### reviews collection
```
{
  userId: String,
  ssamId: String,
  reservationId: String,
  name: String,
  grade: Number,
  comment: String,
  isVisible: Boolean,
  isActive: Boolean,
  createdAt: Date
}
```

#### serviceTypes collection
```
{
  name: String,
  imageUrl: String,
  order: Number,
  isVisible: Boolean,
  isActive: Boolean,
  createdAt: Date
}
```

#### services collection
```
{
  serviceTypeId: String, // parent reference
  name: String,
  comment: String,
  description: {
    content: String,
    progress: String
  },
  commentsForReserving: [
    {
      comment: String,
      order: Number
    }
  ],
  imageUrl: String,
  gallery: [
    {
      imageUrl: String,
      description: String
    }
  ],
  relatedServices: [String(service id)], // child reference
  price: {
    amount: Number,
    unit: String
  },
  duration: Number(minutes),
  order: Number,
  isVisible: Boolean,
  isActive: Boolean,
  createdAt: Date
}
```

#### notifications
```
{
  type: String('chat', 'reservation'),
  userId: String, // parent reference
  reservationId: String, // parent reference
  title: String,
  content: String,
  isRead: Boolean,
  createdAt: Date
}
```

#### notificationsToAll
```
{
  title: String,
  description: String,
  createdAt: Date
}
```

#### chats
```
{
  type: String('text', 'image'),
  userId: String, // parent reference
  message: String,
  imageUrl: String,
  createdAt: Date
}
```

#### documentsForManagement collection
```
{
  type: 'notice',
  title: String,
  content: String(html),
  createdAt: Date
}

{
  type: 'faq',
  title: String,
  content: String(html),
  order: Number,
  createdAt: Date
}

{
  type: 'terms of service',
  title: String,
  content: String(html)
}

{
  type: 'privacy policy',
  title: String,
  content: String(html)
}
```
