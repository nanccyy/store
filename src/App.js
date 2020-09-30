import React, { useEffect, useState } from 'react';
import './App.scss';
import { List } from './List/List';
let goodsFromServer = [];

function App() {

  const [name, setName] = useState('');
  const [priority, setPriority] = useState(0);
  const [status, setStatus] = useState(0);
  const [removed, setToBeRemoved] = useState('');
  const [productList, setProductList] = useState(goodsFromServer);
  const [currentProduct, setCurrentProduct] = useState(null);

  const addToList = (event) => {
    event.preventDefault();
    const productName = name.toLowerCase().trim();

    if (productName && priority && status) {
      const isAlreadyOnTheList = goodsFromServer
        .find(product => product.name.toLowerCase() === productName);

      if (isAlreadyOnTheList) {
        return;
      }

      goodsFromServer = [...goodsFromServer, {
        name,
        priority: +priority,
        id: name,
        status
      }]
        .sort((a, b) => a.name.localeCompare(b.name))
        .sort((a, b) => (a.priority - b.priority));

      setProductList(goodsFromServer);
      setName('');
      setPriority(0);
      setStatus(0);
    }
  };

  useEffect(() => {
    if (removed) {
      goodsFromServer = goodsFromServer.filter(product => (
        product.name !== removed
      ));
    }
    setProductList(goodsFromServer);
  }, [removed]);

  useEffect(() => {
    if (currentProduct) {
      productList.map(product => {
        if (product.name === currentProduct.name) {
          product.status = currentProduct.status;
        }
        return product;
      });
    }
  }, [currentProduct]);

  const filterGoods = (option) => {
    if (option === 'All') {
      setProductList(goodsFromServer);
    } else {
      setProductList(goodsFromServer
        .filter(product => product.status === option))
    }
  };

  return (
    <div className="App">
      <section className="top">
        <input
          type="text"
          value={name}
          placeholder="Entry product"
          className="top__input"
          onChange={(event) => {
            setName(event.target.value)
          }}
        >
        </input>
        <div>
          <label htmlFor="priority">Select priority: </label>
          <select
            className="top__priority"
            value={priority}
            name="priority"
            onChange={(event) => {
              setPriority(event.target.value)
            }}>
            <option></option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>
        <div>
          <label htmlFor="status">Select status: </label>
          <select
            className="top__status"
            name="status"
            value={status}
            onChange={(event) => {
              setStatus(event.target.value)
            }}>
            <option></option>
            <option value="Have">Have</option>
            <option value="Run Out">Run Out</option>
          </select>
        </div>

        <button type="submit"
          className="top__button"
          onClick={(event) => {
            addToList(event)
          }}
        >
          Add to list
       </button>
      </section>

      {productList.length > 0 &&
        <section className="list">
          <div>
            <label htmlFor="filter">Choose goods </label>
            <select
              className="top__filter"
              name="filter"
              onChange={(event) => {
                filterGoods(event.target.value);
              }}>
              <option>All</option>
              <option>Have</option>
              <option>Run Out</option>
            </select>
          </div>
          <List
            goodsFromServer={productList}
            setStatus={setStatus}
            setToBeRemoved={setToBeRemoved}
            setCurrentProduct={setCurrentProduct}
          />
        </section>
      }
    </div>
  );
}

export default App;
