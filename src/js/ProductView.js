import Storage from "./Storage.js";

const productTitle = document.querySelector("#product-title");
const productQuantity = document.querySelector("#product-quantity");
const productCategory = document.querySelector("#product-category");
const addNewProductBtn = document.querySelector("#add-new-product");

class ProductView {
  constructor() {
    addNewProductBtn.addEventListener("click", (e) => this.addNewProduct(e));
    this.products = [];
  }

  addNewProduct(e) {
    e.preventDefault();
    const title = productTitle.value;
    const quantity = productQuantity.value;
    const category = productCategory.value;
    if (!title || !quantity || !category) return;
    Storage.saveProduct({ title, quantity, category });
    this.products = Storage.getAllProducts();
    // update DOM
    this.createProductsList();
  }

  setApp() {
    this.products = Storage.getAllProducts();
  }

  createProductsList() {
    let result = "";
    this.products.forEach((item) => {
      const selectedCategory = Storage.getAllCategories().find(
        (c) => c.id == item.category
      );
      result += `<div class="flex items-center justify-between mb-2">
        <span class="text-slate-400">${item.title}</span>
        <div class="flex items-center gap-3">
          <span class="text-slate-400">${new Date().toLocaleDateString("fa-IR")}</span>
          <span class="text-slate-400 border border-slate-400 px-3 py-0.5 rounded-2xl">${selectedCategory.title}</span>
          <span class="flex items-center justify-center w-7 h-7 rounded-full bg-slate-500 text-slate-300 border-2 border-slate-400">${item.quantity}</span>
          <button class="px-3 py-0.5 rounded-2xl border text-red-400 border-red-400" data-id=${item.id}>delete</button>
        </div>
      </div>`;
    });
    document.getElementById("products-list").innerHTML = result;
  }
}

export default new ProductView();
