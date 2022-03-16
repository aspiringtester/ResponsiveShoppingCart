const products = [
  {
    id: 0,
    name: 'T-shirt 1',
    price: 29.99,
    instock: 100,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores, error.',
    imgSrc: './img/t1.png',
  },
  {
    id: 1,
    name: 'T-shirt 2',
    price: 24.99,
    instock: 43,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores, error.',
    imgSrc: './img/t2.png',
  },
  {
    id: 2,
    name: 'T-shirt 3',
    price: 19.99,
    instock: 10,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores, error.',
    imgSrc: './img/t3.png',
  },
  {
    id: 3,
    name: 'T-shirt 4',
    price: 25.99,
    instock: 5,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores, error.',
    imgSrc: './img/t4.png',
  },
  {
    id: 4,
    name: 'T-shirt 5',
    price: 29.99,
    instock: 4,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores, error.',
    imgSrc: './img/t5.png',
  },
  {
    id: 5,
    name: 'T-shirt 6',
    price: 39.99,
    instock: 40,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores, error.',
    imgSrc: './img/t6.png',
  },
]

const productsEl = document.querySelector('.display')
const cartItemsEl = document.querySelector('.cart-items')
const subtotalEl = document.querySelector('.subtotal')
const totalItemsInCartEl = document.querySelector('.total-items-in-cart')
//displayEl.innerHTML = 'working here'
function renderProdcuts() {
  products.forEach((product) => {
    productsEl.innerHTML += `
              <div class="item">
                  <div class="item-container">
                  <button type="button" class="btn btn-info" onclick="addToCart(${product.id})">+</button>

                  <button type="button" class="btn btn-info" href="#" data-toggle="modal" data-target="#exampleModalLong"><i class='fas fa-cart-arrow-down'></i></button>
                      <div class="item-img">
                          <img src="${product.imgSrc}" class="img-fluid" alt="${product.name}">
                      </div>
                      <div class="desc">
                          <h2>${product.name}</h2>
                          
                          <h2><small>$</small>${product.price}</h2>
                          
                          <p>
                              ${product.description}
                          </p>
                      </div>
                      
                      
                  </div>
              </div>
          `
  })
}
renderProdcuts()

let cart = JSON.parse(localStorage.getItem('CART')) || []
updateCart()

// ADD TO CART
function addToCart(id) {
  // check if prodcut already exist in cart
  if (cart.some((item) => item.id === id)) {
    //alert('have to add number')
    changeNumberOfUnits('plus', id)
  } else {
    const item = products.find((product) => product.id === id)

    cart.push({
      ...item,
      numberOfUnits: 1,
    })
  }

  updateCart()
}

// updating cart
function updateCart() {
  renderCartItems()
  renderSubtotal()

  // save cart to local storage
  localStorage.setItem('CART', JSON.stringify(cart))
}
// calculatte subtotal
function renderSubtotal() {
  let totalPrice = 0,
    totalItems = 0
  cart.forEach((item) => {
    totalPrice += item.price * item.numberOfUnits
    totalItems += item.numberOfUnits
  })
  subtotalEl.innerHTML = `SubTotal:$${totalPrice.toFixed(
    2,
  )} TotalItems:${totalItems}`
  totalItemsInCartEl.innerHTML = `TotalItems:${totalItems}`
}
//render cart items
function renderCartItems() {
  cartItemsEl.innerHTML = '' // clear cart element
  cart.forEach((item) => {
    cartItemsEl.innerHTML += `
          <div class="cart-item">
           <div class="topInfo>
              <div class="item-info" onclick="removeItemFromCart(${item.id})">
                  <img src="${item.imgSrc}" class="img-fluid" alt="${item.name}">
                  <h4>${item.name}</h4>
              </div>
              <div class="unit-price">
                  <small>$</small>${item.price}
              </div>
              
              
                  <div class="btn minus" onclick="changeNumberOfUnits('minus', ${item.id})">-</div>
                  <div class="number">${item.numberOfUnits}</div>
                  <div class="btn plus" onclick="changeNumberOfUnits('plus', ${item.id})">+</div> 
                  <div><button type="button" class="btn btn-danger" onclick="removeItemFromCart(${item.id})">x</button></div>           
                  </div>
                  </div>`
  })
}
//remove item from cart

function removeItemFromCart(id) {
  cart = cart.filter((item) => item.id !== id)
  updateCart()
}

//changing no of units in cart
function changeNumberOfUnits(action, id) {
  cart = cart.map((item) => {
    let oldNoOfUnits = item.numberOfUnits
    if (item.id === id) {
      if (action == 'minus' && oldNoOfUnits > 1) {
        oldNoOfUnits--
      } else if (action == 'plus' && oldNoOfUnits < item.instock) {
        oldNoOfUnits++
      }
    }
    return {
      ...item,
      numberOfUnits: oldNoOfUnits,
    }
  })
  updateCart()
}
