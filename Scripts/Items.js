var Items_JSON = [

    {
        Item_Name: "Double Cheese Burger",
        Item_Price: "14.20",
        Img_Url: "/Media/ItemPictures/Burger.png"
    },
    {
        Item_Name: "Pastechi di keshi",
        Item_Price: "2.50",
        Img_Url: "/Media/ItemPictures/Pastechi.png"
    },
    {
        Item_Name: "Roasted Bone Marrow",
        Item_Price: "133",
        Img_Url: "/Media/ItemPictures/BoneMarrow.png"
    },
    {
        Item_Name: "Salt Bae's Steak",
        Item_Price: "155",
        Img_Url: "/Media/ItemPictures/SaltBae.png"
    },
    {
        Item_Name: "",
        Item_Price: "",
        Img_Url: "/Media/ItemPictures/.png"
    },
];



for (var i = 0; i < Items_JSON.length; i++) {

    $(".ParentItemCard").append('<div class=\"ItemCard\">\n          <img class=\"ItemImage \" id=\"ItemImageID_' + i + '\" >\n <div class=\"FirstChildItemcard\">\n          <div id=\"ItemName_' + i + '\" class=\"ItemNameClass\"></div>\n           <br><div id=\"ItemPrice_' + i + '\" class=\"ItemPriceClass\"></div>\n\n          </div>\n          <div class=\"ChildItemcard\">\n            <input type=\"number\" class=\"ItemCountInputClass\" id=\"ItemCountInput_' + i + '\">\n            <button id=\"BuyItemBtn\" class=\"BuyItemBtnClass\" onclick=\"BuyItemBtn()\">BUY </button>\n          </div>\n          <div class=\"BottomSelectAmmountBtn\">\n            <button class=\"SelectAmmountBtn\" type=\"button\" onclick=\"SelectAmmountBtn(\'' + i + '\',this.value)\" value=\'5\'>5\n            </button>\n            <button class=\"SelectAmmountBtn\" type=\"button\" onclick=\"SelectAmmountBtn(\'' + i + '\',this.value)\" value=\"20\">20\n            </button>\n            <button class=\"SelectAmmountBtn\" type=\"button\" onclick=\"SelectAmmountBtn(\'' + i + '\',this.value)\"\n              value=\"50\">50</button>\n            <button class=\"SelectAmmountBtn\" type=\"button\" onclick=\"SelectAmmountBtn(\'' + i + '\',this.value)\" value=\"100\">100\n            </button>\n\n          </div>');
    $("#ItemName_" + i).text(Items_JSON[i]['Item_Name']);
    $("#ItemPrice_" + i).text(Items_JSON[i]['Item_Price']);
    $("#ItemImageID_" + i).attr("src", Items_JSON[i]['Img_Url'])
}

$(".ItemPriceClass").prepend("XCG")