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

        console.log(props);
        return props.cinemas.map((item, i) => {
            const attributes = item.attributes;
            return (
                <div className="cinema-list" key={i}>
                    <div className="cinema-item">
                        <div className="cinema-item_header">
                            <div className="cinema-item_button">+</div>
                            <a href="#" className="title">{attributes.shortTitle ? attributes.shortTitle : attributes.title}</a>
                            <a href="#" className="label">
                                {attributes.labels.map((item, i) => item.type === 'text' ? attributes.labels[i].text : '')}
                            </a>
                        </div>
                        <div>
                            <p>{attributes.mall ? attributes.mall : attributes.address}</p>
                            <p>{printSubway(attributes.subway)}</p>
                        </div>
                    </div>
                </div>
            )
        })

    };

    return (
        renderCinemaList()
    )
};

export default CinemaList;