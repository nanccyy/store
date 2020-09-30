import React from 'react';
import './List.scss';

export const List = ({
  goodsFromServer,
  setCurrentProduct,
  setToBeRemoved }) => {

  const checkOptionValue = (value) => {
    return (value === 'Have')
      ? 'Run Out'
      : 'Have';
  };

  return (
    <table className="list__table table">
      <thead className="table__head">
        <tr>
          <th>Product</th>
          <th>Priority</th>
          <th>Status</th>
          <th></th>
        </tr>
      </thead>
      <tbody className="table__body">
        {goodsFromServer.map(product => (
          <tr className="table__row" key={product.id}>
            <td className="table__cell" >{product.name}</td>
            <td>{product.priority}</td>
            <td>
              <select
                className="table__select"
                onChange={(event) => {
                  setCurrentProduct({
                    name: product.name,
                    status: event.target.value
                  })
                }}>
                <option value={product.status}>{product.status}</option>
                <option value={checkOptionValue(product.status)}>
                  {checkOptionValue(product.status)}
                </option>
              </select>
            </td>
            <td>
              <button type="button"
                className="table__button"
                onClick={() => {
                  setToBeRemoved(product.name)
                }}>
                X
            </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
};