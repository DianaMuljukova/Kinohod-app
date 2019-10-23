import React, {Component} from 'react';
import './styles/App.scss';
import Header from "./Header";
import CinemaList from "./CinemaList";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cities: [],
            cinemas: [],
            cityId: 0,
            filter: 'title',
            latitude: '',
            longitude: '',
            limit: 10,
            page: 0
        }
    }

    componentDidMount() {
        this.getListOfCities();
        this.getListOfCinemas();
    }

    async getListOfCities () {
        let response = await fetch('https://api.kinohod.ru/api/restful/v1/cities');
        let result = await response.json();

        let oldCities = [...this.state.cities];
        for (let i = 0; i < result.data.length; i++) {
            oldCities.push(result.data[i])
        }
        this.setState({
            cities: oldCities
        })
    }

    async getListOfCinemas () {
        const {cityId, filter, latitude, longitude, limit, page} = this.state;
        const distanceFilter = filter === 'distance' ? `&latitude=${latitude}&longitude=${longitude}` : '';
        let response = await fetch(`https://api.kinohod.ru/api/restful/v1/cinemas?city=${cityId}&sort=${filter}${distanceFilter}&limit=${limit}&rangeStart=${limit * page + 1}`);
        let result = await response.json();
        console.log(result);
        let oldCinemas = [...this.state.cinemas];

        this.setState({
            cinemas: oldCinemas.concat(result.data)
        })
    }


    getFilterWay = e => {
        let latitude;
        let longitude;

        if (e.target.value === 'distance') {
            navigator.geolocation.getCurrentPosition(  (position) => {
                latitude = position.coords.latitude;
                longitude = position.coords.longitude;

                this.setState({
                    filter: 'distance',
                    latitude: latitude,
                    longitude: longitude,
                });
            });
        } else {
            this.setState({
                filter: e.target.value
            })
        }
    };

    getCity = e => {
        this.setState({
            cityId: e.target.value
        }, () => {
            this.getListOfCinemas()
            //здесь приходят новые синемас и стейт синемас меняется
        });
    };


    render() {
       // console.log(this.state);
        return (
            <div className="container">

                <Header
                    cities={this.state.cities}
                    getFilterWay={this.getFilterWay}
                    getCity={this.getCity}
                />

                <div>
                    <CinemaList
                        cinemas={this.state.cinemas}
                    />
                </div>
            </div>
        );
    }
}



export default App;
