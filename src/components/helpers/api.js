import axios from "axios";

const coin_type = '501';

export function createDefault() {
  const options = {
    method: 'POST',
    url: 'http://localhost:8080/createdefault',
    headers: { 'Content-Type': 'application/json' },
    data: {
      _id: localStorage.getItem('masterAddress'),
      address: {
        '1': { default: '' },
        '60': { default: '' },
        coin_type: {
          default: 'wallet3'
        }
      }
    }
  };

  axios.request(options).then(function (response) {
    console.log(response.data);
  }).catch(function (error) {
    console.error(error);
  });
}

export function push(purpose) {
  const options = {
    method: 'POST',
    url: 'http://localhost:8080/pushaddress',
    headers: { 'Content-Type': 'application/json' },
    data: {
      address: localStorage.getItem('masterAddress'),
      chain: coin_type,
      purpose: purpose
    }
  };

  axios.request(options).then(function (response) {
    console.log(response.data);
  }).catch(function (error) {
    console.error(error);
  });
}


export function pull(purpose) {
  const options = {
    method: 'POST',
    url: 'http://localhost:8080/deleteaddress',
    headers: { 'Content-Type': 'application/json' },
    data: {
      address: 'master address',
      chain: coin_type,
      purpose: purpose
    }
  };

  axios.request(options).then(function (response) {
    console.log(response.data);
  }).catch(function (error) {
    console.error(error);
  });
}

export function search() {
  const body = {
    address: "master address",
    chain: "coint_type",
  }

  const res = {
    list_address: {
      default: "address 0",
      test: "address 1",
      adam: "address 2",
    },
    message: "Succeed",
    status: "Succeed",
    statusCode: 200
  }

  return res.list_address
}

// const hdwallet = {
//   'seed': 0x12391230,
//     'SOL': {
//       coin_type: 501,
//       master: address,
//       defaul_child : 2021,
//       child_indexes: [child_index1, child_index_2, ...],
//   },
// }

const wallet = {
  id: 'master address',
  address: {
    "501": {
      'default': 'address 0',
      'banking': 'address 1'
    }
  }
}

// id: master address
// coin_type:{
//   solana: {
//     wallet0: address0
//     wallet1: address1
//   }
// }