import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Payment extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired
  };

  componentDidMount() {
    const IMP = window.IMP;

    IMP.init('imp92860925');

    IMP.request_pay({
      pg : 'nice',
      pay_method : this.props.match.params.payMethod,
      merchant_uid : this.props.match.params.merchantUid,
      name : this.props.match.params.name,
      amount : this.props.match.params.amount,
      buyer_email : this.props.match.params.buyerEmail,
      buyer_name : this.props.match.params.buyerName,
      buyer_tel : this.props.match.params.buyerTel,
      buyer_addr : this.props.match.params.buyerAddr,
      buyer_postcode : '000-000',
      m_redirect_url : Meteor.absoluteUrl('paymentCompletion')
    });
  }

  render() {
    return (
      <div>결제가 완료되면 창을 닫아주세요.</div>
    );
  }
}
