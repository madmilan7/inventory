import Storage from "./Storage.js";

const categoryTitle = document.querySelector("#category-title");
const categoryDescription = document.querySelector("#category-description");
const addNewCategoryBtn = document.querySelector("#add-new-category");
const categoryWrapper = document.querySelector("#category-wrapper");
const toggleAddCategoryBtn = document.querySelector("#toggle-add-category");
const cancelAddCategoryBtn = document.querySelector("#cancel-new-category");

class CategoryView {
  constructor() {
    addNewCategoryBtn.addEventListener("click", (e) => this.addNewCategory(e));
    toggleAddCategoryBtn.addEventListener("click", (e) =>
      this.toggleAddCategory(e)
    );
    cancelAddCategoryBtn.addEventListener("click", (e) =>
      this.cancelAddCategory(e)
    );
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

  toggleAddCategory(e) {
    e.preventDefault();
    categoryWrapper.classList.remove("hidden");
    toggleAddCategoryBtn.classList.add("hidden");
  }

  cancelAddCategory(e) {
    e.preventDefault();
    categoryWrapper.classList.add("hidden");
    toggleAddCategoryBtn.classList.remove("hidden");
  }
}

export default new CategoryView();
