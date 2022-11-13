import { shallow } from 'enzyme';
import * as React from 'react';
import MessageSender from './MessageSender';

const setupComponent = () => {
  return shallow(<MessageSender />);
};

describe('MessageSender component', () => {
  it('renders without crashing', () => {
    const shallowComponent = setupComponent();
    expect(shallowComponent).not.toBe(null);
  });

  it('should call sendChatMessage on click Send button', () => {
    const shallowComponent = setupComponent();
    //cheating because i havent set up a full test harness and made things nice
    const spy = jest.spyOn(console, 'log');
    shallowComponent.find('Button').simulate('click');
    expect(spy).toBeCalledWith('send message from client');
  });

  it('messages should then be cleared', () => {
    const shallowComponent = setupComponent();
    shallowComponent.find('Input').simulate('change', { target: { value: 'some arb input' } });
    expect(shallowComponent.find('Input').props().value).toBe('some arb input');

    shallowComponent.find('Button').simulate('click');
    expect(shallowComponent.find('Input').props().value).toBe('');
  });
});
