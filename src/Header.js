import React from 'react';

const Header = props => {
    const renderCitiesSelect = () => {
        return props.cities.map((item, i) => {
            return <option value="" key={i}>
                {item}
            </option>
        })
    };

    const sendValue = (e) => {
        props.getFilterWay(e)
    };

    return (
        <div className="header row">
            <a href="#" className="logo">Киноход</a>
            <select>
                {renderCitiesSelect()}
            </select>

            <select onChange={sendValue}>
                <option value="title">По заголовку</option>
                <option value="distance">По расстоянию</option>
            </select>
        </div>
    )
};

export default Header;