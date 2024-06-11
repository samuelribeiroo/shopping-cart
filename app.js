import * as products from "./utils/products.js";

const product = products.productList;

const productID = product.map(({ id }) => id);

const productName = product.map(({ name }) => name);

const productPrice = product.map(({ price }) => price);

const productImage = product.map(({ image }) => image);

const mainContainer = document.querySelector("main");

const productContainer = document.querySelector(".product-container");

const productDetails = document.querySelector(".product-detail");

const formatCurrency = price => {
  let format = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(price.toFixed(2));

  return format;
};

const cartAmountItems = document.querySelector(".cart-amount");
cartAmountItems.textContent = `Seu carrinho tem ${product.length} items`;

const cartOpenButton = document.querySelector(".cart");
const cartCloseButton = document.querySelector(".close");

cartOpenButton.addEventListener("click", () => {
  mainContainer.style.display = "block";
});

cartCloseButton.addEventListener("click", () => {
  mainContainer.style.display = "none";
});

function showCart() {
  productImage.forEach((img, index) => {
    const image = document.createElement("img");
    image.style.width = "104px";
    image.style.height = "104px";
    image.alt = `ID DO PRODUTO: ${productID[index]}`;
    image.classList.add("product-image");
    image.src = img;

    productContainer.appendChild(image);
  });

  product.forEach(({ name, price }) => {
    const productTitle = document.createElement("h1");
    productTitle.classList.add("product-name");
    productTitle.textContent = name;
    productDetails.appendChild(productTitle);

    const priceTag = document.createElement("p");
    priceTag.classList.add("product-price");
    priceTag.textContent = `${formatCurrency(price)}`;
    productDetails.appendChild(priceTag);
  });
}

showCart();
