import React,{Component} from 'react';

class SearchBar extends Component{

    constructor(props){
        super(props);
        this.state = {term : 'Starting Value'};
    }

    render() {
        return (<div className="search-bar">
                <input 
                value={this.state.term}
                onChange={(event) => this.onInputChange(event.target.value)}/>
                Value of Input : {this.state.term}
            </div>);;
    }

    onInputChange(term){
        this.setState({term});
        this.props.onSearchTermChange(term);
    }

}

export default SearchBar;