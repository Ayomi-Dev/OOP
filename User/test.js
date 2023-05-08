const items = {
    products: [{
        id: '1',
        name: 'hamburger',
        price: '$10'
    },
    {
        id: '2',
        name: 'spaghetti',
        price: '$100'
    },
    {
        id: '3',
        name: 'Fish',
        price: '$360'
    }],  
 
    labels: [{
        id: '4',
        name: 'Bread',
        price: '$110'
    },{
        id: '5',
    name: 'Doughnut',
    price: '$50'
    },{
        id: '6',
    name: 'Rice',
    price: '$80'
    }]  
}









const container = document.querySelector('.container');
// console.log(container)

const getProduct = () =>{
    
    return container.innerHTML =  items.products.map((y)=>{
        let {id,name,price} = y
        return `<div class="content">
        <p class="title">${name}</p>
        <p class="price">${price}</p>
        <div class="button">
            <button>Order now</button>
            <button class="addBtn" id=${id}>Add to cart</button>
        </div>
    </div>` 
    }).join('')
}
getProduct();


const label = document.querySelector('.latest')
const getLabel = ()=>{
    return label.innerHTML =  items.labels.map((y)=>{
        let {id,name,price} = y
        return `<div class="content">
        <p class="title">${name}</p>
        <p class="price">${price}</p>
        <div class="button">
            <button>Order now</button>
            <button class="addBtn" id=${id}>Add to cart</button>
        </div>
        <button class="addFav" id=${id}>Add To Favorites</button>
    </div>` 
    }).join('')
}
getLabel();

//REMOVING ITEM FROM CART PAGE
let removeBtn = document.querySelectorAll('.remove');
    const removeItem = () => {
        removeBtn.forEach((button) =>
        button.addEventListener('click', (event)=>{
        let button = event.target;
        button.parentElement.parentElement.remove();
        updateCart();
    }));
}
removeItem();






let addBtn = document.querySelectorAll('.addBtn');

addBtn.forEach((event)=>{ //looping through all buttons to add items and defining function to execute when clicked
    event.addEventListener('click', (el)=>{ //event listener to add new items to cart paage when each button is clicked
        let index = el.target //targetting each add button   
        let item = index.parentElement.parentElement;
        
        let itemName = item.getElementsByClassName('title')[0].innerText;
        let itemPrice = item.getElementsByClassName('price')[0].innerText;

        addToCart(itemName, itemPrice); //function to call in order to create the element to store new items
})});

function addToCart(itemName, itemPrice){ //defining the new element function
    let btnClicked = document.createElement('div');
    let showItem = document.getElementsByClassName('cartRow')[0];
    let name = showItem.getElementsByClassName('title');
    // console.log(name)
    for(var i = 0; i < name.length; i++){
        if(name[i].innerText === itemName){
            alert('item already added');
            return;
        }
        
    }
    let cartRowItem = `<div class="cartItems">
        <p class="title">${itemName}</p>
        <p class="price">${itemPrice}</p>
        <div class="button">
            <input type="number" value="1" class="quantity">
            <button class="remove">Remove</button>
        </div>
    </div>`
    // console.log(cartRowItem)
    btnClicked.innerHTML = cartRowItem;
    showItem.append(btnClicked);


    //DEFINING THE REMOVE FUNCTION FOR NEW ADDED ITEM
     let remove = btnClicked.querySelectorAll('.remove')
     remove.forEach((button) =>
        button.addEventListener('click', (event)=>{
        let button = event.target;
        button.parentElement.parentElement.remove();
        updateCart();
    }));

    //UPDATING QUANTITY WITH TOTAL PRICE OF NEW ITEM ADDED
    let quantity = btnClicked.querySelectorAll('.quantity')
    quantity.forEach((item) =>{
        item.addEventListener('change', (event)=> {
            let inputVal = event.target;
            if(isNaN(inputVal.value) || inputVal.value <= 0){
                inputVal.value = 1
            }
            console.log(inputVal);
            updateCart();
        });
    });
    updateCart();
}













//UPDATING CART INFORMATION PRICE AND QUANTITY
const updateCart = () => {
    let cartRow = document.getElementsByClassName('cartRow')[0];
    let cartItem = cartRow.getElementsByClassName('cartItems');
    let totalPrice = 0;

    for(var i = 0; i < cartItem.length; i++){
        let cartItems = cartItem[i];
        let price = cartItems.getElementsByClassName('price')[0];
        let quantity = cartItems.getElementsByClassName('quantity')[0];


        let itemPrice = parseFloat(price.innerText.replace('$', ''))
        let itemQuantity = quantity.value;
        
        totalPrice += (itemPrice * itemQuantity);
    }
    totalPrice = Math.round(totalPrice * 100) / 100
    document.querySelector('.total').innerText = '$'+ totalPrice
}
updateCart();




//UPDATING QUANTITY CHANGE UPDATE WITH TOTAL PRICE
let input = document.querySelectorAll('.quantity')
console.log(input)
const updateQuantity = () => {
    input.forEach((item) =>{
        item.addEventListener('change', (event)=> {
            let inputVal = event.target;
            if(isNaN(inputVal.value) || inputVal.value <= 0){
                inputVal.value = 1
            }
            console.log(inputVal);
            updateCart();
        })
    })    
}
updateQuantity();



let cartPage = document.querySelector('.cartPage');
let cartBtn = document.querySelector('.cart');
// console.log(cartBtn)
cartBtn.addEventListener('click', ()=>{
    cartPage.classList.toggle('active')
})

let favs = document.getElementsByClassName('addFav')
console.log(favs)
const addToFav = (event) => {
    let favBtn = event.target
    let favItem = favBtn.parentElement
    let title = favItem.getElementsByClassName('title')[0].innerText;
    let price = favItem.getElementsByClassName('price')[0].innerHTML;
    let identity = favItem.getElementsByClassName('addBtn')[0].id
    console.log(title, price, identity);

    favItemSelected(title, price);
}
const favItemSelected= (title, price, identity) => {
    let newItem = document.createElement('div');
    let newItemContianer = document.getElementsByClassName('favorite')[0];

    let itemContent = `<div class="content">
        <p class="title">${title}</p>
        <p class="price">${price}</p>
        <div class="button">
            <button>Order now</button>
            <button class="addBtn" id=${identity} >Add to cart</button>
        </div>
    </div>`

    newItem.innerHTML = itemContent;
    newItemContianer.append(newItem);
}


for (let i = 0; i < favs.length; i++) {
    let favorite = favs[i];
    favorite.addEventListener('click', addToFav)
}
