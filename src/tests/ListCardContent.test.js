import React from 'react';
// import { render, screen } from '@testing-library/react';
import { shallow } from 'enzyme';
import ListCardContent from './ListCardContent';

test('CheckboxWithLabel changes the text after click', () => {
  // Render a checkbox with label in the document
  const listCard = shallow(
    <ListCardContent labelOn="On" labelOff="Off" />,
  );

  expect(listCard.text()).toEqual('Off');

  listCard.find('input').simulate('change');

  expect(listCard.text()).toEqual('On');
});
