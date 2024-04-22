const lodeData = async () => {
  const response = await fetch(
    'http://api.kcisa.kr/openapi/API_CNV_061/request?serviceKey=6a14b3d4-21f2-4b07-b66c-1a1bd3197ba3&numOfRows=10&pageNo=1',
    {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
  );
  const data = await response.json();
  const dataList = data.response.body.items.item;

  renderTrip(dataList);
};

const renderTrip = (dataList) => {
  console.log(dataList);
  const tripList = dataList
    .map(
      (item) => `<li>
         <div>
         <img src="./img/none.png" alt="" />
           <p>${item.title}</p>
           <p>${item.description}</p>
           <span>${item.title}</span>
           <span>${item.spatialCoverage}</span>
          <a href="${item.url}">자세히 보기</a>
         </div>
      </li>`
    )
    .join('');
  document.querySelector('.listCon').innerHTML = tripList;
};
lodeData();
