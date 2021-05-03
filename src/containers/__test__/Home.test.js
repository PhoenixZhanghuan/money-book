import React from 'react';
import {mount} from 'enzyme';
import Home, {items, newItem} from '../Home';

import {
    LIST_VIEW,
    CHART_VIEW,
    TYPE_INCOME,
    TYPE_OUTCOME,
    parseToYearAndMonth,
    padLeft
} from "../../utility";
import PriceList from "../../components/PriceList";
import ViewTab from "../../components/ViewTab";
import MonthPicker from "../../components/MonthPicker";
import TotalPrice from "../../components/TotalPrice";
import CreateBtn from "../../components/CreateBtn";

let wrapper;

describe('test Home container component', () => {
    beforeEach(() => {
        wrapper = mount(<Home />)
    })
    it('should render the default layout', () => {
        const currentDate = parseToYearAndMonth('2018/10/01');
        expect(wrapper.find(PriceList).length).toEqual(1);
        expect(wrapper.find(ViewTab).props().activeTab).toEqual(LIST_VIEW);
        expect(wrapper.find(MonthPicker).props().year).toEqual(currentDate.year);
        expect(wrapper.find(MonthPicker).props().month).toEqual(currentDate.month);
        expect(wrapper.find(PriceList).props().items.length).toEqual(1)
    })

    it('click the another view tab, should change the default view', () => {
        wrapper.find('.nav-item a').last().simulate('click');
        expect(wrapper.find(PriceList).length).toEqual(0);
        expect(wrapper.find('.chart-title').length).toEqual(0);
        expect(wrapper.find(ViewTab).props().activeTab).toEqual(CHART_VIEW)
    })

    it('click the new month item, should switch to the correct items', () => {
        wrapper.find('.dropdown-toggle').simulate('click');
        wrapper.find('.months-range .dropdown-item').at(2).simulate('click');
        expect(wrapper.find(MonthPicker).props().month).toEqual(3)
        expect(wrapper.find(PriceList).props().items.length).toEqual(0)
    })

    it('click the create button, should create the new item', () => {
        wrapper.find(CreateBtn).simulate('click');
        expect(wrapper.find(PriceList).props().items.length).toEqual(2);
        expect(wrapper.state('items')[0]).toEqual(newItem)
    })
})

