import React from 'react';
import { shallow } from 'enzyme';
import Page from 'Pages/Page';
import Nav from 'Components/Nav/Nav';


describe('Page', () => {

    it('renders without error', () => {
		const wrapper = shallow(<Page />);
		expect(wrapper.length).toEqual(1);
	});

    it('should render the Page Component correctly', () => {   
        const child = "Hello"
        const wrapper = shallow(<Page>{child}</Page>);
        expect(wrapper).toMatchSnapshot();
    });

    it('should render a <Nav /> component', () => {
        const wrapper = shallow(<Page />);
        expect(wrapper.find(Nav)).toHaveLength(1);
    });

});