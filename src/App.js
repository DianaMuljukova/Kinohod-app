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
        if (localStorage.getItem('cityId') === null) {
            localStorage.setItem('cityId', '1');
        }

        if (localStorage.getItem('filter') === null) {
            localStorage.setItem('filter', 'title');
        }
        window.addEventListener('scroll', this.handleScroll);
        this.getListOfCities();
        let listOfCinemas = await this.getListOfCinemas();
        this.setState({
            cinemas: listOfCinemas,
            loading: false,
            page: 1
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
        const {latitude, longitude, limit, page} = this.state;
        let cityId = localStorage.getItem('cityId');
        let filter = localStorage.getItem('filter');
        const distanceFilter = filter === 'distance' ? `&latitude=${latitude}&longitude=${longitude}` : '';
       console.log(`https://api.kinohod.ru/api/restful/v1/cinemas?city=${cityId}&sort=${filter}${distanceFilter}&limit=${limit}&rangeStart=${limit * page}`)
        let response = await fetch(`https://api.kinohod.ru/api/restful/v1/cinemas?city=${cityId}&sort=${filter}${distanceFilter}&limit=${limit}&rangeStart=${0}`);
        let result = await response.json();
        //let oldCinemas = [...this.state.cinemas];
        return result.data;
    };

    getFilterWay = e => {
        localStorage.setItem('filter', e.target.value);
        this.setState({
            openPopup: e.target.value === 'distance',
            loading: true,
            page: 0
        },  e.target.value !== 'distance' ? this.getNewListOfCinemas : () => {})
    };

    getAnswer = str => {
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
        localStorage.setItem('cityId', e.target.value);
        let cityId = localStorage.getItem('cityId');
        this.setState({
            cityId: cityId,
            loading: true,
            page: 0
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
        //console.log(document.documentElement.scrollHeight - document.documentElement.scrollTop - document.documentElement.clientHeight <= this.state.offset)
        console.log(document.documentElement.scrollHeight);
        let block = false;
        if (document.documentElement.scrollHeight - document.documentElement.scrollTop - document.documentElement.clientHeight <= this.state.offset && block === false) {
            block = true;
            console.log('load')

            if (!this.state.loading) {
                let listOfCinemas = [...this.state.cinemas];
                let newListOfCinemas = await this.getListOfCinemas();
                this.setState({
                    page: this.state.page + 1,
                    cinemas: listOfCinemas.concat(newListOfCinemas)
                })
            }

        }
    };


    render() {
console.log(this.state.page)

        return (
            <>
                <div className="wrapper" style={{backgroundColor: this.state.openPopup ? '#222222' : '', width: this.state.openPopup ? '100%' : ''}}>
                </div>
                <div className="container">

                    <Header
                        cities={this.state.cities}
                        getFilterWay={this.getFilterWay}
                        getCity={this.getCity}
                        cityId={localStorage.getItem('cityId')}
                        filter={localStorage.getItem('filter')}
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
