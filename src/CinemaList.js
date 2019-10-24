import React from 'react';

const CinemaList = props => {

    const printSubway = (subway) => {
        if (subway.length > 0) {
            return  subway.map(item => item.name).join(', ');
        } else {
            return '';
        }
    };

    const renderCinemaList = () => {

        return props.cinemas.map((item, i) => {
            const attributes = item.attributes;
            return (
                <div className="cinema-item" key={i}>
                    <div className="cinema-item_header">
                        <div className="cinema-item_button"><img className="plus" src="/pngtree-vector-plus-icon-png-image_515260.png" alt="plus"/></div>
                        <a href="#" className="title">{attributes.shortTitle ? attributes.shortTitle : attributes.title}</a>
                        <a href="#" className="label">
                        {attributes.labels.map((item, i) => item.type === 'text' ? attributes.labels[i].text : '')}
                    </a>
                    </div>
                    <div>
                        <div className="map">
                            <i className="fas fa-map-marker-alt"></i>
                            <p className="address">{attributes.mall ? attributes.mall : attributes.address}</p>
                        </div>
                        <p className="subway">{printSubway(attributes.subway)}</p>
                    </div>
                </div>
            )
        })

    };

    return (
        <div className="cinema-list">
            {renderCinemaList()}
        </div>
    )
};

export default CinemaList;