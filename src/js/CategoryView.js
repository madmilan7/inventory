import Storage from "./Storage.js";

const categoryTitle = document.querySelector("#category-title");
const categoryDescription = document.querySelector("#category-description");
const addNewCategoryBtn = document.querySelector("#add-new-category");

class CategoryView {
  constructor() {
    addNewCategoryBtn.addEventListener("click", (e) => this.addNewCategory(e));
    this.categories = [];
  }

  addNewCategory(e) {
    e.preventDefault();
    const title = categoryTitle.value;
    const description = categoryDescription.value;
    if (!title || !description) return;
    Storage.saveCategory({ title, description });
    this.categories = Storage.getAllCategories();
    // update DOM
    this.createCategoriesList();
    categoryTitle.value = "";
    categoryDescription.value = "";
  }

  setApp() {
    this.categories = Storage.getAllCategories();
  }

  createCategoriesList() {
    let result = `<option value="" class="bg-slate-700">select a category</option>`;
    this.categories.forEach((element) => {
      result += `<option value=${element.id} class="bg-slate-700">${element.title}</option>`;
    });
    document.getElementById("product-category").innerHTML = result;
  }
}

export default new CategoryView();
