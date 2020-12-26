const fetchRandomWordArray = (callback) => {
  fetch(`https://random-word-api.herokuapp.com/word?number=100`, {
    crossDomain: true,
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  })
    .then((res) => res.json())
    .then(
      (result) => {
        callback(result);
      },
      (error) => console.log(error)
    );
};

const breakpointColumnsObj = {
  default: 2,
  1100: 3,
  900: 2,
  500: 1,
};

export { fetchRandomWordArray, breakpointColumnsObj };
