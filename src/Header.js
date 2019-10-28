import React from 'react';

const Header = props => {
    const renderCitiesSelect = () => {
        return props.cities.map((item, i) => {
            return <option value={item.id} key={i}>
                {item.attributes.name}
            </option>
        })
    };

    const sendValue = e => {
        props.getFilterWay(e)
    };

    const sendCity = e => {
        props.getCity(e)
    };

    return (
        <div className="header row">
            <a href="#" className="logo">Киноход</a>
            <select onChange={sendCity} value={props.cityId}>
                {renderCitiesSelect()}
            </select>

            <select onChange={sendValue} value={props.filter}>
                <option value="title">По заголовку</option>
                <option value="distance">По расстоянию</option>
            </select>
        </div>
    )
};

export default Header;