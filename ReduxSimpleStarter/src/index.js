import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
import _ from 'lodash';

import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';

const API_KEY = 'AIzaSyAVRRRTs0yPoLSKxWawf6_gW_y5mGnDnOs';


YTSearch({key : API_KEY,term : 'Shahrukh Khan'},(data) => {
    console.log(data);
})

class App extends Component{

    constructor(props){
        super(props)
        this.state = { 
            videos : [],
            selectedVideo : null
        };
        this.videoSearch('Shahrukh Khan');
    }

    videoSearch(term){
        YTSearch({key : API_KEY,term : term},(data) => {
            this.setState({ 
                videos : data,
                selectedVideo : data[0]
            });
        })
    }

    render(){
        const videoSearch = _.debounce((term) => this.videoSearch(term),300);

        return (<div>
            <SearchBar onSearchTermChange={videoSearch}/>
            <VideoDetail video={this.state.selectedVideo}/>
            <VideoList onVideoSelect={selectedVideo => this.setState({selectedVideo})} videos={this.state.videos}/>
        </div>)
    }
}

ReactDOM.render(<App/>,document.querySelector('.container'));