import React from 'react';

const Loader = props => {
    return (
        <div className="loader-center">
            <div className="lds-roller">
                <div/>
                <div/>
                <div/>
                <div/>
                <div/>
                <div/>
                <div/>
                <div/>
            </div>
        </div>
    )
};

export default Loader;