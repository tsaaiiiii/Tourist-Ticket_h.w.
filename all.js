// let data = [
//   {
//     id: 0,
//     name: "肥宅心碎賞櫻3日",
//     imgUrl:
//       "https://images.unsplash.com/photo-1522383225653-ed111181a951?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1655&q=80",
//     area: "高雄",
//     description: "賞櫻花最佳去處。肥宅不得不去的超讚景點！",
//     group: 87,
//     price: 1400,
//     rate: 10,
//   },
//   {
//     id: 1,
//     name: "貓空纜車雙程票",
//     imgUrl:
//       "https://images.unsplash.com/photo-1501393152198-34b240415948?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
//     area: "台北",
//     description:
//       "乘坐以透明強化玻璃為地板的「貓纜之眼」水晶車廂，享受騰雲駕霧遨遊天際之感",
//     group: 99,
//     price: 240,
//     rate: 2,
//   },
//   {
//     id: 2,
//     name: "台中谷關溫泉會1日",
//     imgUrl:
//       "https://images.unsplash.com/photo-1535530992830-e25d07cfa780?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
//     area: "台中",
//     description:
//       "全館客房均提供谷關無色無味之優質碳酸原湯，並取用八仙山之山冷泉供蒞臨貴賓沐浴及飲水使用。",
//     group: 20,
//     price: 1765,
//     rate: 7,
//   },
// ];

let data = [];
function getApi() {
  axios
    .get(
      "https://raw.githubusercontent.com/hexschool/js-training/main/travelApi.json"
    )
    .then(function (response) {
      data = response.data.data;
      render();
      load([
        ["高雄", 1],
        ["台北", 1],
        ["台中", 1],
      ]);
    })
    .catch((err) => {
      console.log(err);
    });
}

const ul = document.querySelector(".ticketCard-area");
let newColums = [];
function load(columns) {
  let chart = c3.generate({
    bindto: "#chart", // HTML 元素綁定
    data: {
      columns: columns,
      type: "donut",
      colors: {
        高雄: "#E68618",
        台中: "#5151D3",
        台北: "#26BFC7",
      },
    },
    donut: {
      title: "套票地區比重",
      label: {
        show: false,
      },
    },
  });
}

function render() {
  let str = "";
  data.forEach(function (item, index) {
    str += `<li class="ticketCard">
        <div class="ticketCard-img">
          <a href="#">
            <img src=${item.imgUrl} alt="">
          </a>
          <div class="ticketCard-region">${item.area}</div>
          <div class="ticketCard-rank">${item.rate}</div>
        </div>
        <div class="ticketCard-content">
          <div>
            <h3>
              <a href="#" class="ticketCard-name">${item.name}</a>
            </h3>
            <p class="ticketCard-description">
              ${item.description}
            </p>
          </div>
          <div class="ticketCard-info">
            <p class="ticketCard-num">
              <span><i class="fas fa-exclamation-circle"></i></span>
              剩下最後 <span id="ticketCard-num"> ${item.group} </span> 組
            </p>
            <p class="ticketCard-price">
              TWD <span id="ticketCard-price">$${item.price}</span>
            </p>
          </div>
        </div>
      </li>`;
  });

  ul.innerHTML = str;
  load(newColums);
}
getApi();

const searchResult_text = document.querySelector("#searchResult-text");
const addBtn = document.querySelector(".addTicket-btn");
const ticketName = document.querySelector("#ticketName");
const imgUrl = document.querySelector("#ticketImgUrl");
const price = document.querySelector("#ticketPrice");
const ticketNum = document.querySelector("#ticketNum");
const ticketRate = document.querySelector("#ticketRate");
const ticketDescription = document.querySelector("#ticketDescription");
const ticketRegion = document.querySelector("#ticketRegion");
const addTicket_form = document.querySelector(".addTicket-form");

addBtn.addEventListener("click", function (e) {
  if (
    ticketName.value == "" &&
    imgUrl.value == "" &&
    price.value == "" &&
    ticketNum.value == "" &&
    ticketRate.value == "" &&
    ticketDescription.value == "" &&
    ticketRegion.value == ""
  ) {
    alert("請填寫所有資料");
    return;
  }
  let obj = {
    //   name : ticketName.value,
    //  imgUrl : imgUrl.value,
    //  area : ticketRegion.value,
    //  description : ticketDescription.value,
    //  group : ticketNum.value,
    //  price : price.value,
    //  rate : ticketRate.value,
  };
  obj.name = ticketName.value;
  obj.imgUrl = imgUrl.value;
  obj.area = ticketRegion.value;
  obj.description = ticketDescription.value;
  obj.group = ticketNum.value;
  obj.price = price.value;
  obj.rate = ticketRate.value;

  console.log(obj);
  data.push(obj);
  console.log(data);
  searchResult_text.innerHTML = `本次搜尋共 ${data.length} 筆資料`;

  let donut = {};
  data.forEach(function (item) {
    if (donut[item.area] == undefined) {
      donut[item.area] = 1;
    } else {
      donut[item.area] += 1;
    }
  });
  //console.log(donut);

  Object.entries(donut).forEach(function (item) {
    newColums.push(item);
  });
  console.log(newColums);

  render();
  //  ticketName.value = "";
  //  imgUrl.value = "";
  //  ticketRegion.value = "";
  //  ticketDescription.value = "";
  //  ticketNum.value = "";
  //  price.value = "";
  //  ticketRate.value = "";
  newColums = [];
  addTicket_form.reset();
  // 以後請用這個方法！！！！！！
});

const regionSearch = document.querySelector(".regionSearch");

regionSearch.addEventListener("change", function (event) {
  let str = "";
  let newData = data.filter(function (item, index, arr) {
    let content = `<li class="ticketCard">
        <div class="ticketCard-img">
          <a href="#">
            <img src=${item.imgUrl} alt="">
          </a>
          <div class="ticketCard-region">${item.area}</div>
          <div class="ticketCard-rank">${item.rate}</div>
        </div>
        <div class="ticketCard-content">
          <div>
            <h3>
              <a href="#" class="ticketCard-name">${item.name}</a>
            </h3>
            <p class="ticketCard-description">
              ${item.description}
            </p>
          </div>
          <div class="ticketCard-info">
            <p class="ticketCard-num">
              <span><i class="fas fa-exclamation-circle"></i></span>
              剩下最後 <span id="ticketCard-num"> ${item.group} </span> 組
            </p>
            <p class="ticketCard-price">
              TWD <span id="ticketCard-price">$${item.price}</span>
            </p>
          </div>
        </div>
      </li>`;

    if (item.area == event.target.value) {
      str += content;
      console.log(str);

      return true;
    } else if (event.target.value == "") {
      str += content;
      console.log(str);

      return true;
    } else {
      return false;
    }
  });

  ul.innerHTML = str;
  searchResult_text.innerHTML = `本次搜尋共 ${newData.length} 筆資料`;
});
