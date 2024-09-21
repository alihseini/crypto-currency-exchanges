const topCards = document.getElementById("top-cards");
const modalButton = document.getElementById("modal-button");

import { getData } from "../utils/httpreq.js";
import { closeModal, showModal } from "../utils/modal.js";
import { negPosDefiner } from "../utils/negPosDefiner.js";

const init = async () => {
  const data = await getData(
    "v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
  );
  if (data.error) {
    return showModal("An Error Occured");
  }
  const filteredData = data.slice(0, 4);
  showTopFour(filteredData);
};

const showTopFour = (data) => {
  if (!data) return;
  topCards.innerHTML = "";
  data.forEach((coin) => {
    const coinJSX = `
            <div class="card">
                <div class="names">
                    <img src="${coin.image}" alt="${coin.id}">
                    <div class="name">${coin.name}</div>
                    <div class="short">${coin.symbol}</div>
                </div>
                <div class="numbers">
                    <div class="price">$${coin.current_price.toLocaleString()}</div>
                    <div class="${negPosDefiner(coin.price_change_percentage_24h)}">$${coin.price_change_percentage_24h.toLocaleString()}</div>
                    <div class="market-cap">$${coin.market_cap.toLocaleString()}</div>
                </div>
            </div>
        `;
    topCards.innerHTML += coinJSX;
  });
};

window.addEventListener("DOMContentLoaded", init);
modalButton.addEventListener("click", closeModal);
