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
  
  state = {
    clickNumber: 0
  };
  
  animatedValue = new Animated.Value(0);
  
  componentDidMount() {
    // initialization when mounted
  }
  
  render() {
    return (
      <View>
        <Text onPress={ this.onPress }>{ this.props.text }</Text>
      </View>
    );
  }
  
  onPress = () => {
    this.setState((previousState) => {
      return {
        clickNumber: previousState.clickNumber + 1
      };
    });
  }
}
```

### Router Keys
```
tutorial
signIn
  signInWithEmail
  signInWithKakaotalk:
    verificationForCellPhoneNumberWithSms(repeated)(:type)
    enteringName(repeated)(:type)
  signInWithFacebook:
    verificationForCellPhoneNumberWithSms(repeated)(:type)
    enteringName(repeated)(:type)
  signInWithGoogle:
    verificationForCellPhoneNumberWithSms(repeated)(:type)
    enteringName(repeated)(:type)
signUp(virtual):
  verificationForCellPhoneNumberWithSms(:type)
  enteringEmailAndPassword(:type, :cellphoneNumber)
  enteringName(:type, :cellphoneNumber, :email, :password)
recoveringPassword
main
  reservations(virtual)
    reservation(:id)
      writingReview(:id)
  reservationsOfSsam(virtual)
    reservationOfSsam(:id)
      changingDateTime(:id)
  serviceTypes(virtual)
    services(:id)
      service(:id)
        selectingServiceQuantity(:id)
          reserving(:id, :quantity)
            selectingServiceQuantity(repeated)
            selectingAddress
              addingAddress(virtual)
                enteringAddress
                enteringAddressDetail
            selectingDateTime
            writingRequest
            
            ssams
              ssam(:id)
                portfolio(:id)
                
                reservationSummary
                payment
  brands(virtual)
    brand(:id)
      chat(repeated)
  chat
  reservations
    reservation(repeated)(:id)
      writingReview(repeated)
  notices
    notice(:id)
  faqs
  sharing
  settings
    terms
    privacyStatement
  account
    updatingInformation
    updateAddress(virtual)
      enteringAddress(repeated)
        enteringAddressDetail(repeated)
    addingAddress(virtual)
      enteringAddress(repeated)
        enteringAddressDetail(repeated)
    changingPassword
    deletingAccount
  applyingForSsam
    chat(repeated)
  menuForSsam
    noticesForSsam
      notice(repeated)(:id)
    belonging
    ssamInformation
    portfolio(repeated)
    complainingReview
    updatingSsamInformation
    reservationsOfSsam
      reservationOfSsam(repeated)(:id)
        changingDateTime(repeated)
    balancingMoney:
      balancingMoneyDetail
      standardTableForBalancingMoney
      updatingBankAccount
    schedule
  notifications
```

### Routing Table For Administrator App
- /chats
- /chatBoilerplates
- /servicesForReview
- /servicesForReview/:id/reviews
- /notices
- /notices/:id
- /faqs
- /faqs/:id
- /terms
- /ssams
- /ssams/:id
- /users
- /users/:id
- /partners
- /partners/:id
- /services
- /services/:id
- /portfoilos
- /portfoilos/:id
- /sales
- /balancedMoney
- /events
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
