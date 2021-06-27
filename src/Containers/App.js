import React, { Component } from 'react';
import Cardlist from '../Components/Cardlist';
import SearchBox from '../Components/SearchBox';
import ErrorBoundaries from '../Components/ErrorBoundaries';
import './App.css';
import Scroll from '../Components/Scroll';


class App extends Component {
    constructor() {
        super()
        this.state = {
            robots: [],
            searchfield: ''
        }
    }
    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/users').then(response => response.json()).then(users => this.setState({ robots: users }))
    }
    onSearchChange = (event) => {
        this.setState({ searchfield: event.target.value })

    }
    render() {
        const filteredrobot = this.state.robots.filter(robots => {
            return robots.name.toLowerCase().includes(this.state.searchfield.toLowerCase())
        })
        if (this.state.robots.length === 0) { return <h1>Loading</h1> }
        else {

            return (
                <div className='tc'>
                    <h1 className='f1'>RobotFriends</h1>
                    <SearchBox searchChange={this.onSearchChange} />
                    <Scroll>
                        <ErrorBoundaries>
                        <Cardlist robots={filteredrobot} />
                        </ErrorBoundaries>
                    </Scroll>
                </div>
            );
        }

    }
}
export default App;