import axios from "axios";

const coin_type = '501';

export function createDefault(defaultAddress) {
  const options = {
    method: 'POST',
    url: 'http://localhost:8080/createdefault',
    headers: { 'Content-Type': 'application/json' },
    data: {
      _id: localStorage.getItem('masterAddress'),
      address: {
        '1': { default: '' },
        '60': { default: '' },
        '501': {
          default: defaultAddress
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

export function push(purpose, address) {
  const options = {
    method: 'POST',
    url: 'http://localhost:8080/pushaddress',
    headers: { 'Content-Type': 'application/json' },
    data: {
      address: localStorage.getItem('masterAddress'),
      chain: coin_type,
      purpose: purpose,
      child_address: address
    }
  };

  axios.request(options).then(function (response) {
    console.log(response.data);
  }).catch(function (error) {
    console.error(error);
  });
}


export function pull(purpose, address) {
  const options = {
    method: 'POST',
    url: 'http://localhost:8080/deleteaddress',
    headers: { 'Content-Type': 'application/json' },
    data: {
      address: localStorage.getItem('masterAddress'),
      chain: coin_type,
      purpose: purpose,
      child_address: address
    }
  };

  axios.request(options).then(function (response) {
    console.log(response.data);
  }).catch(function (error) {
    console.error(error);
  });
}

export async function search(masterAddress) {
  const options = {
    method: 'POST',
    url: 'http://localhost:8080/getaddress',
    headers: { 'Content-Type': 'application/json' },
    data: {
      address: masterAddress,
      chain: coin_type
    }
  };

  let result = await axios.request(options).then(function (response) {
    const listAddress = response.data.list_address;
    return listAddress;
  }).catch(function (error) {
    console.error("thing", error);
  });

  return result;
}

// const hdwallet = {
//   'seed': 0x12391230,
//     'SOL': {
//       coin_type: 501,
//       master: address,
//       default_child : 2021,
//       child_indexes: [child_index1, child_index_2, ...],
//   },
// }

// const wallet = {
//   id: 'master address',
//   address: {
//     "501": {
//       'default': 'address 0',
//       'banking': 'address 1'
//     }
//   }
// }

// id: master address
// coin_type:{
//   solana: {
//     wallet0: address0
//     wallet1: address1
//   }
// }