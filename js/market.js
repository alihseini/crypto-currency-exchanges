import { getData } from "../utils/httpreq.js";
import { showModal, closeModal } from "../utils/modal.js";
import { negPosDefiner } from "../utils/negPosDefiner.js";

const market = document.getElementById("market");
const searchBox = document.getElementById("search");
const modalButton = document.getElementById("modal-button");

let allData = null;

const init = async () => {
  allData = await getData(
    "v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
  );
  if (allData.error || allData.status) {
    return showModal("An Error Occured");
  }
  console.log(allData);
  showCoins(allData);
};

const showCoins = (data) => {
  market.innerHTML = "";
  market.className = "";
  data.forEach((coin) => {
    const coinJSX = `
    <div class="cards">
      <div class="name">
        <img src="${coin.image}" alt="bitcoin">
        <p>${coin.name}</p>
      </div>
      <div class="short">${coin.symbol}</div>
      <div class="price">$${coin.current_price.toLocaleString()}</div>
      <div class="${negPosDefiner(
        coin.price_change_percentage_24h
      )}">$${coin.price_change_percentage_24h.toLocaleString()}</div>
      <div class="market-cap">$${coin.market_cap.toLocaleString()}</div>
    </div>
  `;
    market.innerHTML += coinJSX;
  });
};

const searchHandler = (event) => {
  const searchValue = event.target.value.trim().toLowerCase();
  const filteredData = allData.filter((coin) =>
    coin.name.toLowerCase().includes(searchValue)
  );
  showCoins(filteredData);
};

window.addEventListener("DOMContentLoaded", init);
searchBox.addEventListener("keyup", searchHandler);
modalButton.addEventListener("click", closeModal);
