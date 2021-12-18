import React, { useState } from 'react';
import ReactDom from 'react-dom';
import Button from '../Button/Button';
import { search } from '../helpers/api';

import './Modal.css';

// const mockData = {
//   default: "Asduwm2EYJHgmKR2WEbD4Kutcx5wicH4wRTVpadFhacG",
//   buss: "H9S1fPPNSw2T3CUKeSRmi72AF9rq7h9sGVchsMHyRCxS",
//   buss1: "H9S1fPPNSw2T3CUKeSRmi72AF9rq7h9sGVchsMHyRCxS",
//   buss2: "H9S1fPPNSw2T3CUKeSRmi72AF9rq7h9sGVchsMHyRCxS",
//   buss3: "H9S1fPPNSw2T3CUKeSRmi72AF9rq7h9sGVchsMHyRCxS",
//   buss4: "H9S1fPPNSw2T3CUKeSRmi72AF9rq7h9sGVchsMHyRCxS",
//   buss5: "H9S1fPPNSw2T3CUKeSRmi72AF9rq7h9sGVchsMHyRCxS",
//   buss6: "H9S1fPPNSw2T3CUKeSRmi72AF9rq7h9sGVchsMHyRCxS",
//   buss7: "H9S1fPPNSw2T3CUKeSRmi72AF9rq7h9sGVchsMHyRCxS",
//   buss8: "H9S1fPPNSw2T3CUKeSRmi72AF9rq7h9sGVchsMHyRCxS",
//   buss9: "H9S1fPPNSw2T3CUKeSRmi72AF9rq7h9sGVchsMHyRCxS",
// }

const SendModal = ({ children, open, onClose, onConfirm }) => {
  const [receiverAddress, setrReceiverAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResult, setSearchResult] = useState([]);

  const handleOnConfirm = () => {
    onConfirm(receiverAddress, amount);
    setrReceiverAddress('');
    setAmount('');
    onClose();
  }

  const handleOnClose = () => {
    setrReceiverAddress('');
    setAmount('');
    onClose();
  }

  const handleSearch = async (event) => {
    if (event.key === 'Enter') {
      // if (searchTerm.length < 3) return;
      // console.log(searchTerm)
      const res = await search(searchTerm);
      console.log(res)
      const dataArr = Object.entries(res).map(([purpose, address]) => {
        return { purpose: purpose, address: address };
      });
      console.log('Data: ', dataArr);
      setSearchResult(dataArr);
    }
  }

  if (!open) return null;

  const SearchBox = () => {
    return <div className="scroll-box">
      <ul>
        {searchResult.map((result, index) =>
          <li key={index}>{result.purpose}: {result.address}</li>
        )}
      </ul>
    </div>
  }

  return ReactDom.createPortal(<div className="modal-background">
    <div className="modal-container">
      <h1>{children}</h1>
      <br />
      <p>You can search for a child wallet's address here</p>
      <input
        type="text"
        placeholder="Search..."
        onChange={event => setSearchTerm(event.target.value)}
        onKeyDown={handleSearch}
        value={searchTerm}
      />

      {searchResult.length && <SearchBox />}

      <br />
      <label htmlFor="receiver">Receiver's address:</label>
      <input
        id="receiver"
        type="text"
        onChange={event => setrReceiverAddress(event.target.value)}
        value={receiverAddress}
      />

      <label htmlFor="amount">Amount:</label>
      <input
        id="amount"
        type="text"
        onChange={event => setAmount(event.target.value)}
        value={amount}
      />

      <div className="modal-btns">
        <Button className='btn'
          buttonStyle='btn--outline'
          buttonSize='btn--medium'
          onClick={handleOnClose}
        >
          Cancel
        </Button>
        <Button
          className='btn'
          buttonStyle='btn--primary'
          buttonSize='btn--medium'
          onClick={handleOnConfirm}
        >
          Confirm
        </Button>
      </div>

    </div>
  </div>, document.getElementById("portal-root"))
}

export default SendModal;
