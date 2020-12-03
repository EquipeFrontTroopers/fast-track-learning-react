import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';

import FormContent from '../components/FormContent/FormContent';

configure({ adapter: new Adapter() });

const simulateChangeOnInput = (component, inputSelector, newValue) => {
  const input = component.find(inputSelector);
  input.simulate('change', { target: { value: newValue } });
  return component.find(inputSelector);
};

it('Não envia formulario sem campos obrigatorios preenchidos', () => {
  let submited = false;
  const component = shallow(<FormContent onSubmit={() => {
    submited = true;
  }}
  />);
  simulateChangeOnInput(component, '#content', 'Teste');
  component.find('form')
    .simulate('submit', { preventDefault() {} });
  expect(submited).toBe(false);
});

it('Envia formulario sem campos obrigatorios preenchidos', () => {
  let submited = false;

  const component = shallow(<FormContent onSubmit={() => {
    submited = true;
  }}
  />);
  simulateChangeOnInput(component, '#content', 'Teste');
  simulateChangeOnInput(component, '#url', 'https://pt-br.reactjs.org/docs/test-utils.html');
  simulateChangeOnInput(component, '#type', 1);
  simulateChangeOnInput(component, '#technology', 1);
  simulateChangeOnInput(component, '#priority', 1);

  component.find('form')
    .simulate('submit', { preventDefault() {} });

  expect(submited).toBe(true);
});
