import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
import contents from './mock/contents';

import ListCardContent from '../components/ListCardContent/ListCardContent';

configure({ adapter: new Adapter() });

it('ListCardContent render no cards when listContents is empty', () => {
  const listContents = shallow(
    <ListCardContent listContents={[]} />,
  );

  expect(listContents.find('li').length).toBe(0);
});

it('ListCardContent renders cards', () => {
  const listContents = shallow(
    <ListCardContent listContents={contents} />,
  );

  expect(listContents.find('li').length).toBe(contents.length);
});
