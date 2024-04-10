let bagItems;
onLoad();

function onLoad(){
    setBagItemsOnLoad();
    displayItemOnHomePage();
    displayBagItemCount();
}


function setBagItemsOnLoad(){
   let bagItemsStr = localStorage.getItem("bagItems");
   bagItems = bagItemsStr? JSON.parse(bagItemsStr):[];
}


function addToBag(id){
    // console.log('function called');
    // console.log(id);
  bagItems.push(id);
//   console.log(bagItems);
localStorage.setItem("bagItems", JSON.stringify(bagItems));
displayBagItemCount();
}

function displayBagItemCount(){
    let bagItemCountElement = document.querySelector('.bag-item-count');
    bagItemCountElement.innerText = bagItems.length > 0 ? bagItems.length : '';
    bagItemCountElement.style.visibility = bagItems.length > 0 ? 'visible' : 'hidden';
}


function displayItemOnHomePage(){
    let itemContainerElement = document.querySelector('.items-container');

    if(!itemContainerElement) return;
let innerHTML = '';
items.forEach(item => {    
    innerHTML += `
    <div class="item-container">                   
                    <img class="item-image" src="${item.image}" alt="item - image">
                    <div class="rating">
                    ${item.rating.stars} &#9733 | ${item.rating.count}
                    </div>
                    <div class="company-name">${item.company}</div>
                    <div class="item-name">
                        ${item.item_name}
                    </div>
                    <div class="price">
                        <span class="current-price">RM ${item.current_price}</span>
                        <span class="original-price">RM ${item.original_price}</span>
                        <span class="discount">(${item.discount_percentage}%)</span>
                    </div>
                    <button class="btn-add-bag" onclick="addToBag(${item.id})">Add to bag</button>                   
                </div>
    `   
});


itemContainerElement.innerHTML = innerHTML;

}

