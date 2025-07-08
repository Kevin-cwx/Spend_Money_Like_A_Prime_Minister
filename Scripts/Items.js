var selectedPMIndex;

function initializeItems() {
    $(".ParentItemCard").empty();
    
    for (var i = 0; i < Items_JSON.length; i++) {
        $(".ParentItemCard").append(`
            <div class="ItemCard">
                <img class="ItemImage" id="ItemImageID_${i}">
                <div class="FirstChildItemcard">
                    <div id="ItemName_${i}" class="ItemNameClass"></div>
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

    const inputSelector = "#ItemCountInput_" + itemIndex;
    const quantityVal = $(inputSelector).val();

    const quantity = parseInt(quantityVal, 10);

    // Highlighted Fix: check if quantity is a valid number and positive
    if (isNaN(quantity) || quantity <= 0) {
        alert("Please enter a valid quantity.");
        return;
    }

    const itemPrice = parseFloat(Items_JSON[itemIndex].Item_Price);
    const totalCost = itemPrice * quantity;

    if (currentWalletAmount >= totalCost) {
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