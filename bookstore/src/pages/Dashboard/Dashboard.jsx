import React, { Component } from 'react';
import Header from '../../Components/Home/Header';
import Footer from '../Footer/Footer';
import Card from "../../Components/Card/Card";
import user_services from "../../Services/user_services";
import { useEffect } from 'react';
import Paginations from "@material-ui/lab/Pagination";
import './Dashboard.scss'

import Pagination from '@material-ui/lab/Pagination';
import {
  Switch,
  Link
} from "react-router-dom";


export default function Dashboard() {

  const [books, setBooks] = React.useState([]);
  const [cart, setCart] = React.useState([]);
  const [perPage, setPerPage] = React.useState("8");
  const [currentPage, setCurrentPage] = React.useState("1");
  const [search, setSearchBook] = React.useState("");
  const [searchData, setSearchData] = React.useState([]);


  useEffect(() => {
    getAllBooks();
    getCartItem();
  },[],search);


  const getAllBooks = () => {
    user_services.getAllBooks().then((data) => {
      console.log(data);
      setBooks(data.data.result);
    }).catch(error => {
      console.log("error", error);
    })
  }

  const getCartItem = () => {
    user_services.getCartItem().then((data) => {
      console.log("cart data -----", data.data.result.length);
      setCart(data.data.result);
    }).catch(error => {
      console.log("error", error);
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
  const handlePagination = (e, newPages) => {
    // setPerPage(e.target.value);
    setCurrentPage(newPages);

  }

//   const searchBooks = (e) => {
//     setSearchBook(e.target.value);
//     console.log(e.target.value);
//     let filterBooks = books;
//     filterBooks = books.filter((val) => {
//       //return val.bookName.indexOf(e.target.value) != 1;
//       console.log("value---------->",val);
//        return val.description.toLowerCase().includes(e.target.value)
//               ||val.author.toLowerCase().includes(e.target.value)
//               ||val.bookName.toLowerCase().includes(e.target.value)
//               ||val.description.toUpperCase().includes(e.target.value)
//               ||val.author.toUpperCase().includes(e.target.value)
//               ||val.bookName.toUpperCase().includes(e.target.value)
//               ||val.description.includes(e.target.value)
//               ||val.author.includes(e.target.value)
//               ||val.bookName.includes(e.target.value)
//         })
//     if (e.target.value === ""){
//       setSearchData(filterBooks);
//       console.log( "aaaa",setSearchData(filterBooks))
//   }
//   else{
//     setSearchData(books)
//     console.log("search data", setSearchData(filterBooks))
//   }
// }

  const booksDetails = (book) => {
    return (<Card value={book} get={getAllBooks} getCard={getCartItem} />)
  }


  const LBook = currentPage * perPage;
  const FBook = LBook - perPage;
  const currentBooks = books.slice(FBook, LBook);

  return (
    <>
      <Header book={books} val={cart.length}  />
      <div className ="display-books">
        <div className="disp-sort">
          <div className="disp-title">
            <span className="books-show">Books</span>
            <span>(
            { search === "" ? (
                        currentBooks.length 

                    ) : (
                      searchData.length
                    )})Item</span>
          </div>
          <div >
            <select style={{ width: '157px', height: '47px' }} onChange={(e) => sort(e)} >
              <option selected >Sort by relevance</option>
              <option value="dsec" >Price: high to low</option>
              <option value="asec"  >Price: low to high</option>
              <option value="alp-asec" >Sort By: (A-Z)</option>
               <option value="alp-dsec"  >Sort By: (Z-A)</option>
            </select>
          </div>
        </div>
        <div className="disp-books">
          { search === "" ? (
                    currentBooks.map(booksDetails)

                    ) : (
                      searchData.map(booksDetails)
                    )}
        </div>
       

        <div className="paginationBlock">
          <Paginations
            count={Math.floor(books.length / perPage + 1)}
            variant="outlined"
            shape="rounded"
            onChange={handlePagination}
          />
        </div>
      </div>
      <Footer />
    </>
  );
}
