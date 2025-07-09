var selectedPMIndex;

function initializeItems(a) {
  $(".ParentItemCard").empty();

  
  if (a == "go") { 
    Items_JSON = Items_JSON.concat(Items_JSON_B);
    shuffleArray(Items_JSON);
  }

  for (var i = 0; i < Items_JSON.length; i++) {
    $(".ParentItemCard").append(`
            <div class="ItemCard">
                <img class="ItemImage" id="ItemImageID_${i}">
                <div class="FirstChildItemcard">
                    <div id="ItemName_${i}" class="ItemNameClass"></div>
                    <div id="ItemPrice_${i}" class="ItemPriceClass"></div>
                </div>
                <div class="ChildItemcard">
                    <input type="number" class="ItemCountInputClass" id="ItemCountInput_${i}" min="1" value="1">
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

    $("#ItemName_" + i).text(Items_JSON[i]["Item_Name"]);
    $("#ItemPrice_" + i).text(
      "XCG " +
        numberWithCommas(parseFloat(Items_JSON[i]["Item_Price"]).toFixed(2))
    );
    $("#ItemImageID_" + i).attr("src", Items_JSON[i]["Img_Url"]);
  }
}

initializeItems();
// Set amount in input field
function selectAmountBtn(itemIndex, amount) {
  $("#ItemCountInput_" + itemIndex).val(amount);
}

Arr_Purchases = [];
// Buy item function
function buyItem(itemIndex) {
  if (selectedPMIndex == null) {
    showToast("Please select a Prime Minister first", "error");
    $("html, body").animate({ scrollTop: 0 }, "slow");
    return;
  }

  const inputSelector = "#ItemCountInput_" + itemIndex;
  const quantityVal = $(inputSelector).val();

  const quantity = parseInt(quantityVal, 10);

  // // Highlighted Fix: check if quantity is a valid number and positive
  // if (isNaN(quantity) || quantity <= 0) {
  //     showToast("Not enough money", "error");
  //     return;
  // }

  const itemPrice = parseFloat(Items_JSON[itemIndex].Item_Price);
  const totalCost = itemPrice * quantity;

  if (currentWalletAmount >= totalCost) {
    animateWalletDecrease(totalCost);
    Arr_Purchases.push({
      Item_Name: Items_JSON[itemIndex].Item_Name,
      Quantity: quantity,
      UnitPrice: itemPrice,
      TotalCost: totalCost,
    });
  } else {
    showToast("Not enough money in your wallet🥺", "error");
  }
}

// Animate wallet decrease
function animateWalletDecrease(amount) {
  const startAmount = currentWalletAmount;
  const endAmount = currentWalletAmount - amount;
  const duration = 1600;
  const startTime = performance.now();

  function updateAmount(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const currentValue = startAmount - amount * progress;

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

  $("#stickyWalletAmount").text(formatted);
  $(`#WalletAmmount_${selectedPMIndex + 1}`).text(formatted);
}

// Block non numeric items from input field
$(document).on("keydown", ".ItemCountInputClass", function (e) {
  if (["e", "E", "+", "-", "."].includes(e.key)) {
    e.preventDefault();
  }
});


function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}