import * as products from "./utils/products.js";

const product = products.productList;

const productID = product.map(({ id }) => id);

const productAmount = product.map(({ amount }) => amount);

const productImage = product.map(({ image }) => image);

const productContainer = document.querySelector(".product-container");

const formatCurrency = price => {
  let format = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(price.toFixed(2));

  return format;
};

const getTotalValue = product.reduce((sum, acc) => {
  return (sum += acc.price);
}, 0);

const cartAmountItems = document.querySelector(".cart-amount");
cartAmountItems.textContent = ` ${product.length} items.`;

const productImageContainer = document.createElement("div");
productImageContainer.classList.add("product-image-container");

const productDetailsGroup = document.createElement("div");
productDetailsGroup.classList.add("product-details-group");

const displayProductImage = productImage.forEach((img, index) => {
  const image = document.createElement("img");
  image.src = img;
  image.style.width = "104px";
  image.style.height = "104px";
  image.alt = `ID DO PRODUTO: ${productID[index]}`;
  image.classList.add("product-image");
  image.fetchPriority = "high";
  productImageContainer.appendChild(image);
  productContainer.appendChild(productImageContainer);
});

const displayProductInfo = product.forEach(({ name, price }, index) => {
  const productTitle = document.createElement("h1");
  productTitle.classList.add("product-name");
  productTitle.textContent = name;
  productDetailsGroup.appendChild(productTitle);

  const handleChangeAmountContainer = document.createElement("span");
  handleChangeAmountContainer.classList.add("increase-or-decrease");

  const priceTag = document.createElement("p");
  priceTag.classList.add("product-price");
  priceTag.textContent = `${formatCurrency(price)}`;
  handleChangeAmountContainer.appendChild(priceTag);

  const decreaseButton = document.createElement("button");
  decreaseButton.id = "minus";
  decreaseButton.disabled = true;
  decreaseButton.innerHTML =
    '<img src="./assets/Minus.svg" alt="Decrease Quantity" fetchpriority="high" aria-label="Diminuir Quantidade">';
  handleChangeAmountContainer.appendChild(decreaseButton);

  const displayAmount = document.createElement("p");
  displayAmount.textContent = `${productAmount[index]}`;
  handleChangeAmountContainer.appendChild(displayAmount);

  const increaseButton = document.createElement("button");
  increaseButton.id = "plus";
  increaseButton.innerHTML =
    '<img src="./assets/Plus.svg" alt="Increase Quantity" fetchpriority="high" aria-label="Aumentar Quantidade">';
  increaseButton.style.cursor = "pointer";
  handleChangeAmountContainer.appendChild(increaseButton);

  productDetailsGroup.appendChild(handleChangeAmountContainer);
  productContainer.appendChild(productDetailsGroup);
});

const totalPrice = document.getElementById("total");
totalPrice.textContent = formatCurrency(getTotalValue);

const showCart = () => { displayProductImage, displayProductInfo };

showCart();
