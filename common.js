const nav = document.querySelector('header > nav');

// 검색기능
const searchBtn = document.querySelector('.searchBtn');
searchBtn.addEventListener('click', async () => {
  const searchInput = document.querySelector('.inputText input');
  const searchValue = searchInput.value;
  console.log(searchValue);
  const url = new URL(
    `http://api.kcisa.kr/openapi/API_CNV_061/request?serviceKey=6a14b3d4-21f2-4b07-b66c-1a1bd3197ba3&numOfRows=10&q=${searchValue}&pageNo=1`
  );
  fetchDataAndRender(url);
});

// const getNewList = async (category) => {
//   const url = new URL(
//     `http://api.kcisa.kr/openapi/API_CNV_061/request?serviceKey=6a14b3d4-21f2-4b07-b66c-1a1bd3197ba3&numOfRows=10&category=${category}&pageNo=1`
//   );
//   fetchDataAndRender(url);
// };

// nav.addEventListener('click', (e) => {
//   if (e.target.tagName !== 'BUTTON') return;
//   console.log(e.target.dataset.cate);
//   let category = e.target.dataset.cate;
//   getNewList(category);
// });

const fetchDataAndRender = async (url) => {
  //gpt 도움 받아서 정리..

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }

    const data = await response.json();
    const dataList = data.response.body.items.item;

    renderTrip(dataList);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

const createHtml = (item) => {
  const imageUrl = item.image ? item.image : './img/none.png';
  return `<li>
    <div>
    <img src="${imageUrl}" alt="" />
    <p class="text_title">${item.title}</p>
    <span class="text_point">${item.spatialCoverage}</span>
    <p class="text_main">${item.description}</p>
    <a class='more' href="${item.url}">자세히 보기</a>
    </div>
 </li>`;
};

const renderTrip = (dataList) => {
  console.log(dataList);
  const tripList = dataList.map((item) => createHtml(item)).join('');
  document.querySelector('.listCon').innerHTML = tripList;
};

const lodeData = async () => {
  const url = new URL(
    'http://api.kcisa.kr/openapi/API_CNV_061/request?serviceKey=6a14b3d4-21f2-4b07-b66c-1a1bd3197ba3&numOfRows=10&pageNo=1'
  );

  fetchDataAndRender(url);
};

lodeData();
