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
const dataBord = document.querySelector('.listCon');

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

const inputText = document.querySelector('.inputText>input');

// 나중에 검색 기능이나 페이지네이션 기능 추가 하기 위해서는 api 요청 parameter 정보를 변수로 빼서 사용하는 것이 좋아요
const API_KEY = '6a14b3d4-21f2-4b07-b66c-1a1bd3197ba3';
let numOfRows = 10;
let pageNo = 1;
let keyword = '';

let totalCount = 0;
let pageSize = 2;
let page = 1;
let groupSize = 10;

const pagination = () => {
  let pageGroup = Math.ceil(page / groupSize);
  let lastPage = Math.min(
    Math.ceil(totalCount / pageSize),
    pageGroup * groupSize
  );
  let firstPage = (pageGroup - 1) * groupSize + 1;

  let paginationhtml = `<button class="prev">이전</button>`;
  for (let i = firstPage; i <= lastPage; i++) {
    paginationhtml += `<button>${i}</button>`;
  }
  paginationhtml += `<button class="next">다음</button>`;
  document.querySelector('.pgcon').innerHTML = paginationhtml;
};

const moveToPage = async (pageNum, category) => {
  console.log('moveToPage', category);
  page = pageNum;
  lodeData(numOfRows, pageNo, keyword, pageSize);
};

// 검색어를 입력하고 엔터를 누르면 검색어를 가져와서 api 요청을 보내는 함수
inputText.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    keyword = e.target.value;
    lodeData(numOfRows, pageNo, keyword, pageSize);
  }
});

const fetchData = async (url) => {
  console.log('url 확인', url.href);
  try {
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        accept: 'accept: application/json',
      },
    });
    const data = await res.json();
    totalCount = data.response.body.totalCount;
    // console.log('전체 데이터 구조 확인', data);
    console.log('전체 데이터 구조 확인', totalCount);
    renderTrip(data.response.body.items.item);
    pagination();
  } catch (error) {
    console.log(error);
  }
};

//동적으로 prameter를 변경해서 api 요청을 보내는 함수
const lodeData = async (numOfRows, pageNo, keyword, pageSize) => {
  const url = new URL(`http://api.kcisa.kr/openapi/API_CNV_061/request`);
  url.searchParams.append('serviceKey', API_KEY);
  url.searchParams.append('numOfRows', numOfRows);
  url.searchParams.append('pageNo', pageNo);
  url.searchParams.append('keyword', keyword);
  url.searchParams.append('pageSize', pageSize);

  fetchData(url);
};

const renderTrip = (dataList) => {
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedData = dataList.slice(startIndex, endIndex);
  const dataHtml = dataList.map((item) => createHtml(item)).join('');
  dataBord.innerHTML = dataHtml;
};

lodeData(numOfRows, pageNo, keyword, pageSize); // 초기 셋팅값으로 api 요청
