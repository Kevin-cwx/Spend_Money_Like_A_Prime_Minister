function formatCurrency(amount) {
  return "$" + amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function getRandomTemplate() {
  const templates = ["template1", "template2", "template3"];
  return templates[Math.floor(Math.random() * templates.length)];
}

const logoUrls = [
  "../Media/Company_Logo/Company_Logo_1.png",
  "../Media/Company_Logo/Company_Logo_2.png",
  "../Media/Company_Logo/Company_Logo_3.png",
  "../Media/Company_Logo/Company_Logo_4.png",
  "../Media/Company_Logo/Company_Logo_5.png",
  "../Media/Company_Logo/Company_Logo_6.png",
];

var SuperMarketName = [
  "Walmart Supercenter",
  "Goisco",
  "Centrum Piscadera",
  "Cost U Less",
  "Esperamos",
  "Mangusa",
  "Costco Wholesale",
  "Target",
  "Aldi",
  "Safeway",
  "Publix",
];
var SuperMarketName = [""];

const Slogan = [
  "Deficit spending",
  "Djis swipe e credit card di kompania",
  "Mi ta gasta mas ku mi tin",
  "The economy is doing wonderfully",
  "Gasta sen, biba dushi",
  "4 Credit card den saku",
  "Bo tin debe solamente si bo tin intenshon di page",
  "Ora mi kobra, mi ta wak kon ta hasi",
  "Ken tin un yotin fiami?",
  "Rolex na man pero pagatinu ta na 2",
  "Tur luna ta subi gasolin , pero salaris si ta keda meskos",
  "Min ta draai ku broke",
  "Brokieeee alert !!",
  "Min ta draai ku para mas, awor ta bou di awa mi sen ta",
  "Sen nobo di blub blub 🐟",
  "Spend like no one's watching.",
  "Money? Never heard of it.",
  "Financial regret starts here.",
  "Treat yourself... daily.",
  "Why save when you can splurge?",
  "Budgeting is for quitters.",
  "Swipe now, cry later.",
  "Because you deserve debt.",
  "Shop now, panic later.",
  "YOLO your wallet.",
  "Impulse buys welcome.",
  "Buy it. Just because.",
  "Frugal? Never met her.",
  "Broke looks good on you.",
  "Cha-ching! There goes rent.",
  "Pichiri tot en met"
];

// Helper functions
function getRandomLogoUrl() {
  const idx = Math.floor(Math.random() * logoUrls.length);
  return logoUrls[idx];
}

function getRandomSuperMarketName() {
  const idx = Math.floor(Math.random() * SuperMarketName.length);
  return SuperMarketName[idx];
}

function getRandomSlogan() {
  const idx = Math.floor(Math.random() * Slogan.length);
  return Slogan[idx];
}

function generateReceiptHTML(purchases) {
  const template = getRandomTemplate();
  const now = new Date();
  const options = {
    day: "2-digit",
    month: "long",
    year: "numeric",
  };
  const dateStr = now.toLocaleString("en-GB", options);
  const taxRate = 0.06;

  const subtotal = purchases.reduce((sum, item) => sum + item.TotalCost, 0);
  const tax = subtotal * taxRate;
  const total = subtotal + tax;

  const transactionID = Math.floor(Math.random() * 999999999);
  const approvalCode = Math.floor(100000 + Math.random() * 899999);
  const last4 = Math.floor(1000 + Math.random() * 8999);

  let html = `<img src="${getRandomLogoUrl()}" alt="Store Logo" class="store-logo" />`;
  html += `
    <div class="PM_Receipt_Container">
      <div class="PM_Name_Receipt">${PM_Name}</div>
      <img src="${PM_Face_Receipt}" class="PM_Face_Receipt" />
    </div>
  `;
  html += `<div class="store-name center">${getRandomSuperMarketName()}</div>`;
  html += `<div class="center">${getRandomSlogan()}</div>`;
  html += `<br><div class="center">Kaya La chincha 27</div>`;
  html += `<div class="center">${dateStr}</div>`;
  html += `<div class="line"></div>`;
  html += `<pre>ITEM                  QTY   PRICE</pre>`;
  html += `<div class="line"></div>`;

  purchases.forEach((item) => {
    const nameLimit = 20;
    const name =
      item.Item_Name.length > nameLimit
        ? item.Item_Name.slice(0, nameLimit - 1) + "…"
        : item.Item_Name.padEnd(nameLimit, " ");

    const qty = String(item.Quantity).padStart(3, " ");
    const price = formatCurrency(item.UnitPrice); // ✅ formatted with thousand separator

    const trimmedName = name.length > 25 ? name.slice(0, 14) + "..." : name;
    const line =
      `${trimmedName}${qty}`.padEnd(1, " ") + price.padStart(12, " ");

    html += `<pre>${line}</pre>`;
  });

  html += `<div class="line"></div>`;
  html += `<div class="summary-line"><div class="summary-label">SUBTOTAL:</div><div class="summary-value">${formatCurrency(subtotal)}</div></div>`;
  html += `<div class="summary-line"><div class="summary-label">TAX (6.00%):</div><div class="summary-value">${formatCurrency(tax)}</div></div>`;
  html += `<div class="summary-line"><div class="summary-label">TOTAL:</div><div class="summary-value">${formatCurrency(total)}</div></div>`;
  html += `<div class="line"></div>`;
  html += `<div class="visa-line"><div class="visa-label">VISA **** ${last4}</div><div class="visa-value">${formatCurrency(total)}</div></div>`;
  html += `<pre>APPROVAL #: ${approvalCode}</pre>`;
  html += `<div class="line"></div>`;
  html += `<div class="center"># ITEMS Bought ${purchases.length}</div>`;
  html += `<div class="center barcode-container"><svg id="barcode"></svg></div>`;
  html += `<div class="center">${now.toLocaleDateString()}  ${now.toLocaleTimeString()}</div>`;
  html += `<div class="center">*** CUSTOMER COPY ***</div>`;

  $("#receipt")
    .removeClass("template1 template2 template3 template4 template5")
    .addClass(template)
    .html(html);

  JsBarcode("#barcode", String(transactionID), {
    format: "CODE128",
    width: 2,
    height: 40,
    displayValue: false,
  });

  return transactionID;
}

function consolidatePurchases(purchases) {
  const consolidated = {};

  purchases.forEach(({ Item_Name, Quantity, UnitPrice }) => {
    if (!consolidated[Item_Name]) {
      consolidated[Item_Name] = {
        Item_Name,
        Quantity: 0,
        UnitPrice,
        TotalCost: 0,
      };
    }
    consolidated[Item_Name].Quantity += Quantity;
    consolidated[Item_Name].TotalCost =
      consolidated[Item_Name].Quantity * UnitPrice;
  });

  return Object.values(consolidated);
}

$("#receipt").hide();
function Print_Receipt() {
  $("#receipt").show();
  $("#Change_Items").show();

  const consolidatedPurchases = consolidatePurchases(Arr_Purchases);
  generateReceiptHTML(consolidatedPurchases);

  html2canvas(document.querySelector("#receipt"), {
    backgroundColor: "#ffffff",
  }).then((canvas) => {
    const img = canvas.toDataURL("image/png");

    $("#modalImageContainer").html(
      `<img id="receiptImage" src="${img}" alt="Receipt Image" />`
    );

    $("#receiptModal").removeClass("hidden");
  });

  $("#receipt").hide();
}

document.getElementById("closeModal").onclick = function () {
  $("#receiptModal").addClass("hidden");
  document.getElementById("Advertisement_Modal_ID").classList.add("hidden");
};

function Continue_Shopping() {
  document.getElementById("receiptModal").classList.add("hidden");
}

document.getElementById("pickWalletBtn").onclick = function () {
  location.reload();
};

document.getElementById("saveImageBtn").onclick = function () {
  const img = document.getElementById("receiptImage");
  const link = document.createElement("a");
  link.href = img.src;
  link.download = `Resibu.png`;
  link.click();
};
