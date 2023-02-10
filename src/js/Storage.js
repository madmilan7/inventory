export default class Storage {
  static getAllCategories() {
    const savedCategories = JSON.parse(localStorage.getItem("category")) || [];
    // sort Descending
    const sortedCategories = savedCategories.sort((a, b) => {
      return new Date(a.createdAt) > new Date(b.createdAt) ? -1 : 1;
    });
    return sortedCategories;
  }

  static saveCategory(categoryToSave) {
    const savedCategories = Storage.getAllCategories();
    const existedItem = savedCategories.find(
      (category) => category.id === categoryToSave.id
    );
    if (existedItem) {
      // edit
      existedItem.title = categoryToSave.title;
      existedItem.description = categoryToSave.description;
    } else {
      // new
      categoryToSave.id = new Date().getTime();
      categoryToSave.createdAt = new Date().toISOString();
      savedCategories.push(categoryToSave);
    }
    localStorage.setItem("category", JSON.stringify(savedCategories));
  }

  static getAllProducts(sort = "newest") {
    const savedProducts = JSON.parse(localStorage.getItem("product")) || [];
    // sort Descending Default
    const sortedProducts = savedProducts.sort((a, b) => {
      if (sort === "newest") {
        return new Date(a.createdAt) > new Date(b.createdAt) ? -1 : 1;
      } else if (sort === "oldest") {
        return new Date(a.createdAt) > new Date(b.createdAt) ? 1 : -1;
      }
    });
    return sortedProducts;
  }

  static saveProduct(productToSave) {
    const savedProducts = Storage.getAllProducts();
    const existedItem = savedProducts.find(
      (product) => product.id === productToSave.id
    );
    if (existedItem) {
      // edit
      existedItem.title = productToSave.title;
      existedItem.quantity = productToSave.quantity;
      existedItem.category = productToSave.category;
    } else {
      // new
      productToSave.id = new Date().getTime();
      productToSave.createdAt = new Date().toISOString();
      savedProducts.push(productToSave);
    }
    localStorage.setItem("product", JSON.stringify(savedProducts));
  }

  static deleteProduct(id) {
    const savedProducts = Storage.getAllProducts();
    const filteredProducts = savedProducts.filter(
      (product) => product.id !== parseInt(id)
    );
    localStorage.setItem("product", JSON.stringify(filteredProducts));
  }
}
