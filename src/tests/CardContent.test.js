import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
// import contents from './mock/contents';

import CardContent from '../components/CardContent/CardContent';

configure({ adapter: new Adapter() });

it('CardContent render contents ', () => {
  const cardContent = shallow(
    <CardContent technology="Angular" />,
  );
  expect(cardContent.text().toLocaleLowerCase().includes('angular')).toEqual(true);
});
