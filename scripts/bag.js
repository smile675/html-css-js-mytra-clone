const CONVENIENT_AMOUNT = 10;

let bagItemObjects;
onLoad();
function onLoad(){
    loadBagItemObjects();
    displayBagItems();
    displayBagSummary();
}

function loadBagItemObjects(){
    // console.log(bagItems);
   bagItemObjects = bagItems.map(itemId => {
    return items.find(val =>val.id == itemId);
   });

//    console.log(bagItemObjects);
}

function displayBagItems(){

    let containerEllement = document.querySelector('.bag-items-container');
    let innerHTML ='';

    console.log(bagItems.length);

    if(bagItems.length == 0){
      innerHTML += `
      <p>NO ITEM ADDED TO BAG</p>
      `;
      containerEllement.innerHTML = innerHTML;
      return; // Exit the function early
    }

    bagItemObjects.forEach(bagItem=>{
      // console.log(bagItem.image);
      innerHTML += generateItemHtml(bagItem);
  })

    containerEllement.innerHTML = innerHTML;

}


function removeFromBag(id){

  bagItems = bagItems.filter(bagItemId => bagItemId != id);
  localStorage.setItem("bagItems", JSON.stringify(bagItems));
 
  onLoad();
  displayBagItemCount();
}

function generateItemHtml(item){

    return `
    <div class="bag-item-container">
            <div class="item-left-part">
              <img class="bag-item-img" src="../${item.image}">
            </div>
            <div class="item-right-part">
              <div class="company">${item.company}</div>
              <div class="item-name">${item.item_name}</div>
              <div class="price-container">
                <span class="current-price">RM ${item.current_price}</span>
                <span class="original-price">RM ${item.original_price}</span>
                <span class="discount-percentage">(${item.discount_percentage}% OFF)</span>
              </div>
              <div class="return-period">
                <span class="return-period-days">${item.return_period} days</span> return available
              </div>
              <div class="delivery-details">
                Delivery by
                <span class="delivery-details-days">${item.delivery_date}</span>
              </div>
            </div>

            <div class="remove-from-cart" onclick="removeFromBag(${item.id})">&#10060</div>
          </div>
    `;

}

function displayBagSummary(){

  let bagSummaryElement = document.querySelector('.bag-summary');
  let totalItems = bagItems.length;
  let totalMRP = 0;
  let totalDiscount =0;
  // let finalAmount =0;

  bagItemObjects.forEach(bagItem =>{
    totalMRP += bagItem.original_price;
  });

  bagItemObjects.forEach(bagItem =>{
    discountAmount = (bagItem.original_price -bagItem.current_price)
    totalDiscount += discountAmount;
  });

  let finalAmount = totalMRP - totalDiscount + CONVENIENT_AMOUNT; 


  bagSummaryElement.innerHTML = `
  <div class="bag-details-container">
  <div class="price-header">PRICE DETAILS (${totalItems} Items) </div>
  <div class="price-item">
    <span class="price-item-tag">Total MRP</span>
    <span class="price-item-value">RM ${totalMRP}</span>
  </div>
  <div class="price-item">
    <span class="price-item-tag">Discount on MRP</span>
    <span class="price-item-value priceDetail-base-discount">-RM ${totalDiscount}</span>
  </div>
  <div class="price-item">
    <span class="price-item-tag">Convenience Fee</span>
    <span class="price-item-value">RM ${CONVENIENT_AMOUNT}</span>
  </div>
  <hr>
  <div class="price-footer">
    <span class="price-item-tag">Total Amount</span>
    <span class="price-item-value">RM ${finalAmount}</span>
  </div>
</div>
<button class="btn-place-order">
  <div class="css-xjhrni" onclick="placeOrder()">PLACE ORDER</div>
</button>
  `
}


function placeOrder(){
  if(bagItems.length ==0){
    alert('No Item Found to complete order');
    return;
  }
  bagItems.forEach(id=> removeFromBag(id));
  alert("Order Completed");

}