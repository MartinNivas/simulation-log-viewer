import React from "react";
import { shallow } from "enzyme";
import toJSON from "enzyme-to-json";
import Header from './Header';
import constants from '../../data/constants';

describe('Header Component', () => {
    it('should render without crashing', () => {
       shallow(<Header />);
     });


    it("should match snapshot", () => {
        const wrapper = shallow(<Header />);

        expect(toJSON(wrapper)).toMatchSnapshot(); 
    })

    it('should display Header title equal to the text', () => {
        const wrapper = shallow(<Header />);
        const headerTitle = wrapper.find('h2');
        const result = headerTitle.text()

        expect(result).toBe('Simulation Log Viewer');

    });

    it('should display Header title equal to text in constants file', () => {
        const wrapper = shallow(<Header />);
        const headerTitle = wrapper.find('h2');
        const result = headerTitle.text()

        expect(result).toBe(constants.HEADER.TITLE);
 
    });

});