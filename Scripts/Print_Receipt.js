function Print_Receipt() { 

    log("in receiptttttt")
     const txn = generateReceiptHTML(Arr_Purchases);
    html2canvas(document.querySelector("#receipt")).then(canvas => {
        const imgData = canvas.toDataURL("image/png");
        $('#modalReceiptImage').html(`<img src="${imgData}" alt="Receipt Image" style="max-width:100%;" />`);
        $('#receiptModal').fadeIn(200);

        // Attach save functionality
        $('#saveImage').off('click').on('click', function () {
            const link = document.createElement('a');
            link.download = 'receipt.png';
            link.href = imgData;
            link.click();
        });
    });
}



$('#closeModal, #btnContinue').on('click', function () {
    $('#receiptModal').fadeOut();
});


$('#btnWallet').on('click', function () {
    location.reload();
    $('#receiptModal').fadeOut();
});



/// Logic
var PM_Name = "Win Martin"
        const Arr_Purchases = [
            { Item_Name: 'Busta Lila', Quantity: 1, UnitPrice: 2, TotalCost: 2 },
            { Item_Name: 'Movie Ticket - Djaluna Sambil', Quantity: 1, UnitPrice: 8, TotalCost: 8 },
            { Item_Name: 'DJI Mavic 4 Pro', Quantity: 20, UnitPrice: 5379.95, TotalCost: 107599 }
        ];

        function formatCurrency(amount) {
            return '$' + amount.toFixed(2);
        }

        function getRandomTemplate() {
            const templates = ['template1', 'template2', 'template3'];
            return templates[Math.floor(Math.random() * templates.length)];
        }

        const logoUrls = [
                "https://www.shopcostuless.com/wp-content/themes/fp-wp-b-costuless/resources/images/logo/logo.png",
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4wYRgNDn2-ZtjTJ7HPjHCHNXYRI7Uuuh9pA&s",
                "https://esperamos.net/img/esperamos-logo-web.svg",
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNRQB3KUGCs6_8onjAs5dle_5vsqJ9HKk4jw&s",
                "https://1000logos.net/wp-content/uploads/2017/06/Target-Logo-1974.png",
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyi0K_FxR0wFKEN0a48mydafOvX2kQhbwEug&s",
                "https://cdn.shopify.com/s/files/1/0558/6413/1764/files/7-Eleven_Logo_Design_History_Evolution_8_1024x1024.jpg?v=1692805941"
            ];

            // Helper function to pick random logo URL
            function getRandomLogoUrl() {
                const idx = Math.floor(Math.random() * logoUrls.length);
                return logoUrls[idx];
            }

        function generateReceiptHTML(purchases) {
            const template = getRandomTemplate();
            const now = new Date();
            const dateStr = now.toLocaleString();
            const taxRate = 0.06;

            const subtotal = purchases.reduce((sum, item) => sum + item.TotalCost, 0);
            const tax = subtotal * taxRate;
            const total = subtotal + tax;
            const transactionID = Math.floor(Math.random() * 999999999);
            const approvalCode = Math.floor(100000 + Math.random() * 899999);
            const last4 = Math.floor(1000 + Math.random() * 8999);

            let html = `<img src="${getRandomLogoUrl()}" alt="Store Logo" class="store-logo" />`;
             html += `<div class="center">Prime Minister: ${PM_Name}</div>`;
            html += `<div class="store-name center">Walmart Supercenter</div>`;
            html += `<div class="center">Save money. Live better.</div>`;
            html += `<div class="center">123 Commerce Blvd, Anywhere, USA</div>`;
            html += `<div class="center">Manager: J. Doe</div>`;
            html += `<div class="center">${dateStr}</div>`;
            html += `<div class="line"></div>`;
            html += `<pre>ITEM                  QTY   PRICE</pre>`;
            html += `<div class="line"></div>`;

            purchases.forEach(item => {

                const nameLimit = 20; // adjust if needed
                const name = item.Item_Name.length > nameLimit
                    ? item.Item_Name.slice(0, nameLimit - 1) + "…"
                    : item.Item_Name.padEnd(nameLimit, ' ');

                const qty = String(item.Quantity).padStart(3, ' ');
                const price = formatCurrency(item.UnitPrice);

                // Align price to far right of 40-character width
                const line = `${name}${qty}`.padEnd(33, ' ') + price.padStart(7, ' ');

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
            html += `<div class="center"># ITEMS SOLD ${purchases.length}</div>`;
            html += `<div class="center barcode-container"><svg id="barcode"></svg></div>`;
            html += `<div class="center">Low Prices You Can Trust. Every Day.</div>`;
            html += `<div class="center">${now.toLocaleDateString()}  ${now.toLocaleTimeString()}</div>`;
            html += `<div class="center">*** CUSTOMER COPY ***</div>`;

            $('#receipt')
                .removeClass('template1 template2 template3 template4 template5')
                .addClass(template)
                .html(html);

            JsBarcode("#barcode", String(transactionID), {
                format: "CODE128",
                width: 2,
                height: 40,
                displayValue: false
            });

            return transactionID;
        }