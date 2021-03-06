import React from 'react';
import style from './styles.module.css';

export const Button = ({ text, type }) => {
  return <button className={`${style.btn} ${type}`}>{text}</button>;
};
