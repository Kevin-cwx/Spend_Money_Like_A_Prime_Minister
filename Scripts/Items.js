var selectedPMIndex;

for (var i = 0; i < Items_JSON.length; i++) {

    $(".ParentItemCard").append('<div class=\"ItemCard\">\n          <img class=\"ItemImage \" id=\"ItemImageID_' + i + '\" >\n <div class=\"FirstChildItemcard\">\n          <div id=\"ItemName_' + i + '\" class=\"ItemNameClass\"></div>\n           <br><div id=\"ItemPrice_' + i + '\" class=\"ItemPriceClass\"></div>\n\n          </div>\n          <div class=\"ChildItemcard\">\n            <input type=\"number\" class=\"ItemCountInputClass\" id=\"ItemCountInput_' + i + '\">\n            <button id=\"BuyItemBtn\" class=\"BuyItemBtnClass\" onclick=\"BuyItemBtn()\">BUY </button>\n          </div>\n          <div class=\"BottomSelectAmmountBtn\">\n            <button class=\"SelectAmmountBtn\" type=\"button\" onclick=\"SelectAmmountBtn(\'' + i + '\',this.value)\" value=\'5\'>5\n            </button>\n            <button class=\"SelectAmmountBtn\" type=\"button\" onclick=\"SelectAmmountBtn(\'' + i + '\',this.value)\" value=\"20\">20\n            </button>\n            <button class=\"SelectAmmountBtn\" type=\"button\" onclick=\"SelectAmmountBtn(\'' + i + '\',this.value)\"\n              value=\"50\">50</button>\n            <button class=\"SelectAmmountBtn\" type=\"button\" onclick=\"SelectAmmountBtn(\'' + i + '\',this.value)\" value=\"100\">100\n            </button>\n\n          </div>');
    $("#ItemName_" + i).text(Items_JSON[i]['Item_Name']);
    $("#ItemPrice_" + i).text(Items_JSON[i]['Item_Price']);
    $("#ItemImageID_" + i).attr("src", Items_JSON[i]['Img_Url'])
}

$(".ItemPriceClass").prepend("XCG")



function initializeItems() {
    $(".ParentItemCard").empty();
    
    for (var i = 0; i < Items_JSON.length; i++) {
        $(".ParentItemCard").append(`
            <div class="ItemCard">
                <img class="ItemImage" id="ItemImageID_${i}">
                <div class="FirstChildItemcard">
                    <div id="ItemName_${i}" class="ItemNameClass"></div>
                    <br>
                    <div id="ItemPrice_${i}" class="ItemPriceClass"></div>
                </div>
                <div class="ChildItemcard">
                    <input type="number" class="ItemCountInputClass" id="ItemCountInput_${i}" min="0" value="0">
                    <button class="BuyItemBtnClass" onclick="buyItem(${i})">BUY</button>
                </div>
                <div class="BottomSelectAmmountBtn">
                    <button class="SelectAmmountBtn" type="button" onclick="selectAmountBtn(${i}, 5)">5</button>
                    <button class="SelectAmmountBtn" type="button" onclick="selectAmountBtn(${i}, 20)">20</button>
                    <button class="SelectAmmountBtn" type="button" onclick="selectAmountBtn(${i}, 50)">50</button>
                    <button class="SelectAmmountBtn" type="button" onclick="selectAmountBtn(${i}, 100)">100</button>
                </div>
            </div>
        `);
        
        $("#ItemName_" + i).text(Items_JSON[i]['Item_Name']);
        $("#ItemPrice_" + i).text("XCG " + Items_JSON[i]['Item_Price']);
        $("#ItemImageID_" + i).attr("src", Items_JSON[i]['Img_Url']);
    }
}

initializeItems();
// Set amount in input field
function selectAmountBtn(itemIndex, amount) {
    $("#ItemCountInput_" + itemIndex).val(amount);
}

// Buy item function
function buyItem(itemIndex) {
    if (selectedPMIndex === null) return;
    
    const quantity = parseInt($("#ItemCountInput_" + itemIndex).val()) || 1;
    const itemPrice = parseFloat(Items_JSON[itemIndex].Item_Price);
    const totalCost = itemPrice * quantity;
    
    if (currentWalletAmount >= totalCost) {
        // Animate the wallet amount decrease
        animateWalletDecrease(totalCost);
    } else {
        alert("Not enough money!");
    }
}

// Animate wallet decrease
function animateWalletDecrease(amount) {
    const startAmount = currentWalletAmount;
    const endAmount = currentWalletAmount - amount;
    const duration = 1000; 
    const startTime = performance.now();
    
    function updateAmount(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const currentValue = startAmount - (amount * progress);
        
        // Update display with formatted number
         currentWalletAmount = Math.max(0, parseFloat(currentValue.toFixed(2)));
        updateWalletDisplay();
        
        if (progress < 1) {
            requestAnimationFrame(updateAmount);
        } else {
            currentWalletAmount = endAmount;
            updateWalletDisplay();
        
        }
    }
    
    requestAnimationFrame(updateAmount);
}

// Update wallet display in UI
function updateWalletDisplay() {
    const formatted = numberWithCommas(currentWalletAmount.toFixed(2));
    $('#stickyWalletAmount').text(numberWithCommas(currentWalletAmount));
    $(`#WalletAmmount_${selectedPMIndex + 1}`).text(numberWithCommas(currentWalletAmount));
}