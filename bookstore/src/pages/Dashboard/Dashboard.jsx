import React from 'react';
import Header from '../../Components/Home/Header';
import Card from "../../Components/Card/Card";
import user_services from "../../Services/user_services";
import { useEffect } from 'react';
import './Dashboard.scss'
import Footer from '../../Pages/Footer/Footer'
import Paginations from "@material-ui/lab/Pagination";

export default function DashboardPage(){
    const [books, setBooks] = React.useState([]);
    useEffect(() => {
        getAllBooks();
      },[]);
    
    const booksDetails=(book)=>{
        return( <Card value={book} get = {getAllBooks}/>)
    }
    
    const getAllBooks=()=>{
        user_services.getAllBooks().then((data) =>{
            console.log(data);
            setBooks(data.data.result);      
        }).catch(error=>{
          console.log("error",error);
        })
    }
    const sort = (e) => {

      if (e.target.value === "asec") {
        let sortData = [...books].sort(function (a, b) {
          return a.price - b.price
        });
        setBooks(sortData);
      }
      else if (e.target.value === "dsec") {
        let sortData = [...books].sort(function (a, b) {
          return b.price - a.price
        });
        setBooks(sortData);
      }
      else if (e.target.value === "alp-asec") {
        let sortData = [...books].sort(function (a, b) {
          if (a.bookName < b.bookName) { return -1; }
          return 0;
        });
        setBooks(sortData);
      }
      else if (e.target.value === "alp-dsec") {
        let sortData = [...books].sort(function (a, b) {
          if (a.bookName > b.bookName) { return 1; }
          return 0;
        });
        setBooks(sortData);
      }
    }
   
    return (
        
        <div>
            <Header/>
            <div className='top-bar'>
            <div >
            <span className="books-show">Books</span>
            </div>
          <div className='sort'>
            <select style={{ width: '157px', height: '47px' }}onChange={(e) => sort(e)}  >
              <option selected >Sort by relevance</option>
              <option value="dsec" >Price: high to low</option>
              <option value="asec"  >Price: low to high</option>
              <option value="alp-asec" >Sort By: (A-Z)</option>
            </select>
          </div>
        </div>
                <div className="disp-books">
                {books.map(booksDetails)}
                </div>
                <div className="paginationBlock">
          <Paginations
            variant="outlined"
            shape="rounded"
          />
        </div>
                <Footer/>
        </div>
    );
}