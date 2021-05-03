import React, { Component, Fragment } from "react";
import logo from "../logo.svg";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import PriceList from "../components/PriceList";
import {
    LIST_VIEW,
    CHART_VIEW,
    TYPE_INCOME,
    TYPE_OUTCOME,
    parseToYearAndMonth,
    padLeft
} from "../utility";
import ViewTab from "../components/ViewTab";
import MonthPicker from "../components/MonthPicker";
import TotalPrice from "../components/TotalPrice";
import CreateBtn from "../components/CreateBtn";

export const categories = {
    1: {
        id: "1",
        name: "旅行",
        type: "outcome",
        iconName: "ios-plane",
    },
    2: {
        id: "2",
        name: "理财",
        type: "income",
        iconName: "logo-yen",
    },
};

export const items = [
    {
        id: 1,
        title: "去云南旅行",
        price: 200,
        date: "2018-09-10",
        cid: 1,
    },
    {
        id: 2,
        title: "去云南旅行",
        price: 400,
        date: "2018-09-10",
        cid: 1,
    },
    {
        id: 3,
        title: "理财收入",
        price: 200,
        date: "2018-10-10",
        cid: 2,
    },
];

export const newItem = {
    id: 4,
    title: "新添加的项目",
    price: 300,
    date: "2018-10-20",
    cid: 1,
};

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items,
            currentDate: parseToYearAndMonth('2018/10/01'),
            tabView: LIST_VIEW,
        };
    }

    changeView = (view) => {
        this.setState({
            tabView: view,
        });
    };

    changeDate = (year, month) => {
        this.setState({
            currentDate: {year, month}
        })
    };

    modifyItem = (modifyItem) => {
        const modifiedItems = this.state.items.map((item) => {
            if (item.id === modifyItem.id) {
                return {
                    ...item,
                    title: "更新后的标题",
                };
            } else {
                return item;
            }
        });
        this.setState({
            items: modifiedItems
        })
    };

    createItem = () => {
        this.setState({
            items: [newItem, ...this.state.items],
        });
    };

    deleteItem = (deletedItem) => {
        const filteredItems = this.state.items.filter(
            (item) => item.id !== deletedItem.id
        );
        this.setState({
            items: filteredItems,
        });
    };

    render() {
        const { items, currentDate, tabView } = this.state;
        const itemsWidthCategory = items.map((item) => {
            item.category = categories[item.cid];
            return item;
        }).filter(item => {
            return item.date.includes(`${currentDate.year}-${padLeft(currentDate.month)}`)
        });
        let totalIncome = 0,
            totalOutcome = 0;
        itemsWidthCategory.forEach((item) => {
            if (item.category.type === TYPE_OUTCOME) {
                totalOutcome += item.price;
            } else {
                totalIncome += item.price;
            }
        });
        return (
            <Fragment>
                <header className="App-header">
                    <div className="row mb-5">
                        <img src={logo} className="App-logo" alt="logo" />
                    </div>
                    <div className="row">
                        <div className="col">
                            <MonthPicker
                                year={currentDate.year}
                                month={currentDate.month}
                                onChange={this.changeDate}
                            />
                        </div>
                        <div className="col">
                            <TotalPrice
                                income={totalIncome}
                                outcome={totalOutcome}
                            />
                        </div>
                    </div>
                </header>
                <div className="content-area py-3 px-3">
                    <ViewTab
                        activeTab={tabView}
                        onTabChange={this.changeView}
                    />
                    <CreateBtn onClick={this.createItem} />

                    {tabView === LIST_VIEW && (
                        <PriceList
                            items={itemsWidthCategory}
                            onModifyItem={this.modifyItem}
                            onDeleteItem={this.deleteItem}
                        />
                    )}
                    {tabView === CHART_VIEW && <h1>这里是图表区域</h1>}
                </div>
            </Fragment>
        );
    }
}

export default Home;
