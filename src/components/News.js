import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'

export default class News extends Component {
  static defaultProps={
    country: 'in',
    pageSize: 8,
    category: 'general',
  }
static propsTypes={
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
}
capitalize=(str)=>{
  return str = str.charAt(0).toUpperCase() + str.slice(1);
}
  constructor(props){
    super(props);
    this.state={
      articles: [],
      loading: false,
      page:1,
    }
    document.title=`${this.capitalize(this.props.category)}-NewsMonkey`;
  }
async updateNews(){
  const url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=e0a2aa04d74445bfb219fa7a31a63965&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({loading:true})
    let data= await fetch(url);
    let parseData= await data.json();
    console.log(parseData);
    this.setState({articles: parseData.articles,
      totalResults:parseData.totalResults,
       loading:false
  });
}

  async componentDidMount(){
this.updateNews();
  }
handleNextClick= async()=>{
this.setState({page:this.state.page+1});
this.updateNews();
}
handlePreClick= async()=>{
this.setState({page:this.state.page-1});
this.updateNews();
}

  render() {
    return (
      <div className="container my-2">
        <h1 className="text-center" >NewsMonkey-Top {this.capitalize(this.props.category)} HeadLines</h1>
        {this.state.loading && <Spinner/>}
        <div className="row">
          {!this.state.loading && this.state.articles.map((element)=>{
          return <div className="col-md-4" key={element.url}>
            <NewsItem title={element.title} description={element.description8} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
                </div>
          })}
        </div>
        <div className="container d-flex justify-content-between">
        <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePreClick}>&larr; Previous</button>
        <button disabled={this.state.page+1> Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
        </div>
      </div>
    )
  }
}
