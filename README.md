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
  
  onPress = () => {
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
  signInWithKakaotalk:
    verificationForPhoneNumberWithSms(repeated)(:signInType)
    enteringName(repeated)(:signInType)
  signInWithFacebook:
    verificationForPhoneNumberWithSms(repeated)(:signInType)
    enteringName(repeated)(:signInType)
  signInWithGoogle:
    verificationForPhoneNumberWithSms(repeated)(:signInType)
    enteringName(repeated)(:signInType)
  signUp(abstract):
    verificationForPhoneNumberWithSms(:signInType)
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
    services(:id)
      service(:id)
        selectingServiceQuantity(:id)
          reserving(:id, :quantity)
            selectingServiceQuantity(repeated)
            selectingAddress
              addingAddress(abstract)
                enteringAddress
                enteringAddressDetail
            selectingDateTime
            writingRequest
            
            ssams(:reservationInformation)
              ssam(:id)
                portfolio(:id)
                
                reservationSummary(:reservationInformation, :ssamId)
                payment
  brands(abstract)
    brand(:id)
      chat(repeated)
  notifications
  chat
  drawerMenu(abstract)
    reservations(:userType)
      reservation(:userType, :id)
        writingReview(repeated)(:id)
    notices(:userType)
      notice(:userType, :id)
    faqs
    sharing
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
      informationForSsam
        portfolio(repeated)(:id)
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
  name: String,
  cellPhoneNumber: String,
  addresses: [
    {
      address: String,
      addressDetail: String,
      memo: String
    }
  ],
  reservations: [String(_id)],
  isOwner: Boolean,
  isAdministrator: Boolean,
  isSsam: Boolean,
  informationForSsam: {
    name: String,
    region: String,
    career: Number(month),
    belonging: {
      brandId: String,
      name: String(brandName)
    },
    portfolios: [
      {
        imageUrl: String,
        description: String
      }
    ],
    notAvailableDates: [Date],
    isServiceAvailable: Boolean,
    reservations: [String(_id)],
    balancedMoney: [
      {
        yearMonth: Date,
        balancedMoney: {
          amount: Number,
          unit: String
        },
        reservations: [String(reservationId)],
        createAt: Date
      }
    ],
    bankAccount: {
      bank: String,
      number: String,
      owner: String
    }
  }
  isActive: Boolean,
  createAt: Date
}
```

#### reservations collections
```
{
  ssam: informationForSsam(schema),
  services: [
    {
      service: service(schema),
      quantity: Number
    }
  ],
  price: {
    amount: Number,
    unit: String
  },
  balancedMoney: {
    amount: Number,
    unit: String
  },
  isBalanced,
  address: addresses.0(schema),
  progress: {
    type: String,
    allowedValues: [
      'not paid',
      'reserved',
      'refunded',
      'wating for confirming payment',
      'completed'
    ]
  },
  requirement: String,
  scheduledAt: Date,
  createAt: Date
}
```

#### serviceTypes collection
```
{
  name: String,
  title: String,
  description: String,
  imageUrl: String,
  ordering: Number
}
```

#### services collection
```
{
  type: String(service type name),
  name: String,
  description: [
    {
      title: String,
      contents: String
    }
  ],
  imageUrl: String,
  galleryImageUrls: [String],
  price: Number,
  relatedService: [String(serviceId)],
  ordering: Number,
  duration: Number,
  isActive: Boolean
}
```

#### notifications
```
{
  type: {
    type: String,
    allowedValues: [
      'chat',
      'reservation'
    ]
  },
  reservationId: String,
  title: String,
  description: String,
  createAt: Date
}
```

#### notificationsToAll
```
{
  title: String,
  description: String,
  createAt: Date
}
```

#### chats
```
{
  type: String('text', 'image'),
  from: String(userId),
  to: String(userId),
  message: String,
  imageUrl: String,
  createAt: Date
}
```

#### documentsForManagement collection
```
{
  type: 'notices',
  title: String,
  contents: String,
  createAt: Date
}

{
  type: 'faqs',
  title: String,
  contents: String,
  ordering: Number
  createAt: Date
}

{
  type: 'termsOfService',
  title: String,
  contents: String(html)
}

{
  type: 'privacyPolicy',
  title: String,
  contents: String(html)
}
```
