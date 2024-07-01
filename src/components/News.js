import React, { Component } from 'react'
import NewsItems from './NewsItems'

export class News extends Component {
  articles = [
          {
            "source": {
              "id": "bbc-sport",
              "name": "BBC Sport"
            },
            "author": null,
            "title": "T20 World Cup final: India's thrilling win gives tournament its Hollywood ending",
            "description": "In a tournament billed as cricket's attempt to break into the US, India's dramatic win provides a Hollywood ending, writes Matthew Henry.",
            "url": "http://www.bbc.co.uk/sport/cricket/articles/c51yw4vrkjxo",
            "urlToImage": "https://ichef.bbci.co.uk/news/1024/branded_sport/8a60/live/02c63740-366b-11ef-bbe0-29f79e992ddd.jpg",
            "publishedAt": "2024-06-29T23:52:09.4438403Z",
            "content": "Elsewhere others will roll their eyes.\r\nThe Rocky theme played at the Kensington Oval when England met USA last week but this was not an underdog story.\r\nIndia, already the dominant force in the worl… [+1693 chars]"
          },
          {
            "source": {
              "id": "espn-cric-info",
              "name": "ESPN Cric Info"
            },
            "author": null,
            "title": "PCB hands Umar Akmal three-year ban from all cricket | ESPNcricinfo.com",
            "description": "Penalty after the batsman pleaded guilty to not reporting corrupt approaches | ESPNcricinfo.com",
            "url": "http://www.espncricinfo.com/story/_/id/29103103/pcb-hands-umar-akmal-three-year-ban-all-cricket",
            "urlToImage": "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1099495_800x450.jpg",
            "publishedAt": "2020-04-27T11:41:47Z",
            "content": "Umar Akmal's troubled cricket career has hit its biggest roadblock yet, with the PCB handing him a ban from all representative cricket for three years after he pleaded guilty of failing to report det… [+1506 chars]"
          },
          {
            "source": {
              "id": "espn-cric-info",
              "name": "ESPN Cric Info"
            },
            "author": null,
            "title": "What we learned from watching the 1992 World Cup final in full again | ESPNcricinfo.com",
            "description": "Wides, lbw calls, swing - plenty of things were different in white-ball cricket back then | ESPNcricinfo.com",
            "url": "http://www.espncricinfo.com/story/_/id/28970907/learned-watching-1992-world-cup-final-full-again",
            "urlToImage": "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1219926_1296x729.jpg",
            "publishedAt": "2020-03-30T15:26:05Z",
            "content": "Last week, we at ESPNcricinfo did something we have been thinking of doing for eight years now: pretend-live ball-by-ball commentary for a classic cricket match. We knew the result, yes, but we tried… [+6823 chars]"
          }
        ]
  constructor(){
    super()
    this.state = {
      articles: this.articles,
      loading: false
    }
  }
  render() {
    return (
      <div className='container my-3'>
      <h2>NewsMonkey -- Top Headlines</h2>
        <div className='row'>
          {this.state.articles.map((element) => {
            return <div key={element.url} className='col-md-3'>
              <NewsItems title= {element.title} description={element.description.slice(0, 88)} imageUrl={element.urlToImage} newsUrl={element.url}/>
            </div>
          })}
        </div>
      </div>
    )
  }
}

export default News
