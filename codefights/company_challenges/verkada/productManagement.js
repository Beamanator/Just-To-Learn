/**
 * Name: Product Management
 * Difficulty: Medium (10 min)
 * Time: 15 min
 * Note: The goal is to only make a few edits and fix the code
 */
function ProductManager() {
    this.products = [];
    
    this.createProduct = function (id, title) {
        // return false if the product id already exists
        if (this.findProductById(id)) return false;
    
        let product = new Object();
        product.id = id;
        product.title = title;
        this.products = [...this.products, product];
        return true;
    };
  
    this.updateProduct = function (id, title) {
        // return false if the product doesn't exist
        if (!this.findProductById(id)) return false;
    
        this.products = this.products.map(product => {
            if (product.id === id) {
                return {
                    id: id, title: title
                }
            } else return product          
        });
        return true;
    };
  
    this.deleteProduct = function (id) {
        // return false if the product doesn't exist
        if (!this.findProductById(id)) return false
    
        const product = this.products.find(product => product.id === id);
        delete product;
        return true;
    };
  
    this.findProductById = function (id) {
        return this.products.find(product => product.id === id);
    };
  
    this.findProductByTitle = function (title) {
        return this.products.find(product => product.title === title);
    };
}
  
const productManager = new ProductManager();

function productManagement(operations) {
    // Calls corresponding methods of productManager based on the input
    return operations.map(operation => {
        const [methodName, ...params] = operation;
        let result = productManager[methodName].call(productManager, ...params);
        return result === undefined ? "null" : JSON.stringify(result);
    });
}
  