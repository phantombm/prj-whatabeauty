import React from 'react';
import { Ionicons } from '@expo/vector-icons';

import Header from '../components/Header';

Header.defaultProps.backgroundColor = '#fafcfb';
Header.defaultProps.leftIcon = <Ionicons name="ios-arrow-round-back" color="#3c4f5e" size={32} />;
Header.defaultProps.titleColor = '#3c4f5e';
