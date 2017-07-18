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
signIn:
  signInWithEmail:
    verificationForCellPhoneNumberWithSms(repeated)
    enteringName(repeated)
  signInWithKakaotalk:
    verificationForCellPhoneNumberWithSms(repeated)
    enteringName(repeated)
  signInWithFacebook:
    verificationForCellPhoneNumberWithSms(repeated)
    enteringName(repeated)
  signInWithGoogle:
    verificationForCellPhoneNumberWithSms(repeated)
    enteringName(repeated)
  drawerMenu:
    main:
      reservations(virtual):
        reservationDetail:
          writingReview
      reservationsOfSsam(virtual):
        reservationDetailOfSsam:
          updatingDateTime
      serviceTypes(virtual):
        services:
          serviceDetail:
            selectingServiceQuantity
            reserving:
              selectingServiceQuantity(repeated)
              selectingAddress:
                addingAddress(virtual):
                  enteringAddress
                  enteringAddressDetail
              selectingDateTime
              writingRequest
            ssamsAvailable:
              ssamDetail:
                ssamPortfolio(holded)
            reservationSummary
            payment
      brands(virtual):
        brandDetail:
          chat(repeated)
      chat
    reservationHistory:
      reservationDetail(repeated):
        writingReview(repeated)
    notices
    faqs
    sharingWithFriends
    settings:
      terms
      privacyStatement
    account:
      updatingInformation
      updatingAddress(virtual):
        enteringAddressDetail(repeated)
        enteringAddress(repeated)
      addingAddress(virtual):
        enteringAddress(repeated)
        enteringAddressDetail(repeated)
      changingPassword
      deletingAccount
    applyingForSsam:
      chat(repeated)
    menuForSsam:
      noticesForSsam
      belonging(holded)
      ssamInformation:
        ssamPortfolio(hold, repeated)
        complainingReview
        updatingSsamInformation
      reservationHistoryOfSsam:
        reservationDetailOfSsam(repeated):
          updatingDateTime(repeated)
      balancingMoney:
        balancingMoneyDetail
        standardTableForBalancingMoney
        updatingBankAccount
      schedule
  notifications
signUp(virtual):
  verificationForCellPhoneNumberWithSms
  enteringEmailAndPassword
  enteringName
findingPassword
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

#### users
```
{
  email: [
    {
      email: String,
      verified: Boolean
    }
  ],
  password: String,
  profile: {
    name: String,
    cellPhoneNumber: String,
    addresses: [String],
    isSsam: Boolean,
    
  }
}
```
