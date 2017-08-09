import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';

export default class PaymentCompletion extends Component {
  static propTypes = {
    location: PropTypes.object.isRequired
  };

  state = {
    status: null
  };

  componentWillMount() {
    const queryParams = queryString.parse(this.props.location.search);

    if (queryParams.imp_success == 'false') {
      this.setState({
        status: 'fail'
      });

      return;
    }

    Meteor.call('completePayment', queryParams.merchant_uid, (error, status) => {
      if (error) {
        this.setState({
          status: 'fail'
        });

        return;
      }

      if (status == 'success') {
        this.setState({
          status: 'success'
        });
      }
      else {
        this.setState({
          status: 'fail'
        });
      }
    });
  }

  render() {
    if (!this.state.status) {
      return (
        <div />
      );
    }
    else {
      return (
        <div>
          { this.state.status == 'success' ?
            '결제가 완료되었습니다. 창을 닫아주세요.' :
            '결제에 실패했습니다. 창을 닫아주세요.'
          }
        </div>
      );
    }
  }
}
