const User = require("./user/index.js")
const Employee = require('./employee/index.js')
const Publisher = require('./publisher/index.js')
const Product = require('./product/index.js')
const Cart = require('./cart/index.js')
const Order = require('./order/index.js')
const Image = require('./image/index.js')
const ReturnProduct = require("./returnProduct/index.js")

module.exports = {
    User: User.User,
    Employee: Employee.Employee,
    Publisher: Publisher.Publisher,
    Product: Product.Product,
    Cart: Cart.Cart,
    Order: Order.Order,
    OrderItem: Order.OrderItem,
    Image: Image.Image,
    ReturnProduct: ReturnProduct.ReturnProduct,
};