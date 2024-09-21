import { showModal } from "./modal.js";

const BASE_URL = "https://api.coingecko.com/api/";

const getData = async (path) => {
try {
    const url = `${BASE_URL}${path}`;
    const response = await fetch(url);
    const result = await response.json();
    return result;
} catch (error) {
  showModal("An Error Occured")
}
};

export { getData };
