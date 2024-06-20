import NewsItems from "./NewsItems";
import React, {useEffect,useState} from "react";


import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const [articles, setarticles] = useState([])
  const [page, setpage] = useState(1)
  const [totalResults, settotalresults] = useState(0)
  
  
  const capitaliseString=(string)=>{
    return string.charAt(0).toUpperCase()+string.slice(1);
    
  }
  
  const updatenews = async() =>{
  props.setProgress(10);
  let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=c794dfa4015a48a89118d8bb7824b6d5&page=${page}pageSize=${props.pageSize}`;
  let data= await fetch(url);
  props.setProgress(30);
  let passeddata=await data.json()
  props.setProgress(70);
  setarticles(passeddata.articles)
  settotalresults(passeddata.totalResults)
  props.setProgress(100);

}

useEffect(()=>{ 
  document.title=`${capitaliseString(props.category)} - NewsNova`;  
  updatenews();
  // eslint-disable-next-line
},[])

const fetchMoreData = async () => {
 setpage(page+1)
 let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=c794dfa4015a48a89118d8bb7824b6d5&page=${page}pageSize=${props.pageSize}`;
let data= await fetch(url);
let passeddata=await data.json()
setarticles(articles.concat(passeddata.articles))
settotalresults(passeddata.totalResults)
};

  
    return (
      <>
        <h1 className="text-center" style={{margin:"40px 0px",marginTop:"90px"}}>NewsNova-Top {capitaliseString(props.category)} Headlines</h1>
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length!== totalResults}
          loader={<h4>Loading...</h4>}
        >
        <div className="container">
        <div className="row">
          {articles.map((element)=>{
            return <div className="col-md-4" key={element.url}>
            <NewsItems source={element.source.name} author={element.author} date={element.publishedAt} title={element.title?element.title:""} description={element.description?element.description:""} imgurl={element.urlToImage} url={element.url}/>
          </div>
          })}
          </div>
          </div>
          </InfiniteScroll>
         
      </>
    );
  
}
News.defaultProps={
  country:'in',
  pageSize:8,
  category:'general'

}
 News.propTypes={
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string

}

export default News;
