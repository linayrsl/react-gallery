import React from 'react';
import './App.css';

import {galleryResponse } from "./mock";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            albums: [],
            currentAlbumPics: []
        }
    }

    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/albums')
            .then((data) => data.json())
            .then((albums) => {
                console.log(albums);
                this.setState({
                    albums
                });
            });

    }

    displayAlbum(event) {
        let albumId = event.target.value;
        if (albumId >= 0) {
            fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${event.target.value}`)
                .then((data) => data.json())
            // galleryResponse
                .then((currentAlbumPics) => {
                    console.log(currentAlbumPics)
                    this.setState({
                       currentAlbumPics
                    });
                });
        }
    }

    render() {
    return (
        <div className="App">
          <h1>Select an album:</h1>
            <select onChange={this.displayAlbum.bind(this)}>
                <option value={'-1'}>Select album</option>
                {this.state.albums.map((album, index) =>
                    <option key={index} value={album.id}>{album.title}</option>
                )}
            </select>
            <div className={'albumPics'}>{this.state.currentAlbumPics.map((pic, index) => <img key={index} alt={pic.title} src={pic.thumbnailUrl}/>)}</div>
        </div>
    );
  }

}

export default App;
