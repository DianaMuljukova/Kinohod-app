import React, {Component} from 'react';
import './styles/App.scss';
import Header from "./Header";
import CinemaList from "./CinemaList";
import Loader from "./Loader";
import Popup from "./Popup";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cities: [],
            cinemas: [],
            cityId: 1,
            filter: 'title',
            latitude: '',
            longitude: '',
            limit: 10,
            page: 0,
            loading: true,
            openPopup: false,
            offset: 600
        }
    }

    async componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
        this.getListOfCities();
        let listOfCinemas = await this.getListOfCinemas();
        this.setState({
            cinemas: listOfCinemas,
            loading: false
        })
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
        console.log(`https://api.kinohod.ru/api/restful/v1/cinemas?city=${cityId}&sort=${filter}${distanceFilter}&limit=${limit}&rangeStart=${limit * page + 1}`)
        let result = await response.json();
        //let oldCinemas = [...this.state.cinemas];
        return result.data;
    };

    getFilterWay = e => {
        if (e.target.value === 'distance') {
            this.setState({
                openPopup: true,
                filter: e.target.value
            })
        } else {
            this.setState({
                filter: e.target.value
            })
        }
    };

    getAnswer = str => {
        console.log(str);
        if (str === 'ok') {
            let latitude;
            let longitude;
            navigator.geolocation.getCurrentPosition(  (position) => {
                latitude = position.coords.latitude;
                longitude = position.coords.longitude;

                this.setState({
                    latitude: latitude,
                    longitude: longitude,
                    openPopup: false,
                    loading: true
                }, this.getNewListOfCinemas);
            });
        } else {
            this.setState({
                openPopup: false
            })
        }
    };

    getCity = e => {
        this.setState({
            cityId: e.target.value,
            loading: true
        }, this.getNewListOfCinemas);
    };



    async getNewListOfCinemas () {
        let listOfCinemas = await this.getListOfCinemas();
        this.setState({
            cinemas: listOfCinemas,
            loading: false
        })
    }

     handleScroll = async () => {
        if (window.pageYOffset >= this.state.offset) {
            console.log(window.pageYOffset)
            let listOfCinemas = [...this.state.cinemas];
            let newListOfCinemas = await this.getListOfCinemas();
            this.setState({
                limit: this.state.limit + 10,
                offset: this.state.offset + 600,
                cinemas:listOfCinemas.concat(newListOfCinemas)
            })
        }
    };



    render() {

        console.log(this.state);
        return (
            <>
                <div className="wrapper" style={{backgroundColor: this.state.openPopup ? '#222222' : '', width: this.state.openPopup ? '100%' : ''}}>
                </div>
                <div className="container">

                    <Header
                        cities={this.state.cities}
                        getFilterWay={this.getFilterWay}
                        getCity={this.getCity}
                        cityId={this.state.cityId}
                    />

                    {this.state.loading
                        ? <Loader/>
                        : <div>
                            <CinemaList
                                cinemas={this.state.cinemas}
                            />
                        </div>}
                    {
                        this.state.openPopup
                            ? <Popup
                                getAnswer={this.getAnswer}
                            />
                            : null
                    }
                </div>
            </>
        );
    }
}



export default App;
