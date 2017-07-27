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
    verificationForPhoneNumberWithSms(repeated)(:method)
    enteringName(repeated)(:method)
  signInWithFacebook:
    verificationForPhoneNumberWithSms(repeated)(:method)
    enteringName(repeated)(:method)
  signInWithGoogle:
    verificationForPhoneNumberWithSms(repeated)(:method)
    enteringName(repeated)(:method)
signUp(abstract):
  verificationForPhoneNumberWithSms(:method)
  enteringEmailAndPassword(:method, :cellPhoneNumber)
  enteringName(:method, :cellPhoneNumber, :email, :password)
recoveringPassword
main
  reservations(abstract)
    reservation(:id)
      writingReview(:id)
  reservationsOfSsam(abstract)
    reservationOfSsam(:id)
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
  chat
  reservations(:forWhom)
    reservation(:forWhom, :id)
      writingReview(repeated)(:id)
  notices(:forWhom)
    notice(:forWhom, :id)
  faqs
  sharing
  settings
    terms
    privacyStatement
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
    notices(repeated)(:forWhom)
      notice(repeated)(:forWhom, :id)
    belonging
    informationForSsam
      portfolio(repeated)(:id)
      complainingReview(:id)
      updatingInformationForSsam
    reservations(repeated)(:forWhom)
      reservation(repeated)(:forWhom, :id)
        changingDateTime(repeated)
    balancedMoney:
      balancedMoneyDetail(:id)
      standardTableForBalancingMoney
      updatingBankAccount
    schedule
      reservation(repeated)(:forWhom, :id)
  notifications
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

### DB Schema

#### users.profile collection
```
{
  name: String,
  cellPhoneNumber: String,
  addresses: [addressSchema],
  servicesOfUser: [servicesOfUserSchema],
  isAdministrator: Boolean,
  isSsam: Boolean,
  region: String,
  career: Number
}
```

#### address schema
```
{
  address: String,
  detail: String
}
```

#### services schema
```
{
  ssam: ssamSchema,
  service: serviceDefinitionsSchema,
  relatedServices: [serviceDefinitionsSchema],
  quantity: Number,
  price: Number,
  address: addressSchema,
  progress: {
    type: String,
    allowedValues: [
      'not paid',
      'reserved',
      'refunded',
      'completed'
    ]
  }
}
```

#### serviceDefinitions collection / schema
```
{
  type: String,
  name: String,
  detail: String,
  imageUrl: String,
  galleryImageUrls: [String],
  price: Number,
  relatedService: [serviceDefinitionsSchema]
}
```
