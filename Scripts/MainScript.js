var log = console.log;

var JSON_PM = [{

    name: "Ivar Asjes",
    img_url: "/Media/FacePictures/ivar.png",
    wallet_amount: 2528240
},
{
    name: "Pik Pisas",
    img_url: "/Media/FacePictures/pik.png",
    wallet_amount: 7758121
},
{
    name: "Gerrit Schotte",
    img_url: "/Media/FacePictures/gerrit.png",
    img_url2: "/Media/FacePictures/gerrit-sad.png",
    wallet_amount: 2236053
},
{
    name: "Eugene Rhuggenaath",
    img_url: "/Media/FacePictures/eugene.png",
    wallet_amount: 5315998
},

];


function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


//Add data from JSON_PM to HTML
//Just was lazyyyyy 😴 to make this joint dynamic
$("#IDNamePrimeMinister_1").text(JSON_PM[0]["name"]);
$("#IDNamePrimeMinister_2").text(JSON_PM[1]["name"]);
$("#IDNamePrimeMinister_3").text(JSON_PM[2]["name"]);
$("#IDNamePrimeMinister_4").text(JSON_PM[3]["name"]);

$("#ImagePrimeMinister_1").attr("src", JSON_PM[0]["img_url"]);
$("#ImagePrimeMinister_2").attr("src", JSON_PM[1]["img_url"]);
$("#ImagePrimeMinister_3").attr("src", JSON_PM[2]["img_url"]);
$("#ImagePrimeMinister_4").attr("src", JSON_PM[3]["img_url"]);

$("#WalletAmmount_1").text(numberWithCommas(JSON_PM[0]["wallet_amount"]));
//$("#WalletAmmount_1").text(JSON_PM[0]["wallet_amount"]);

$("#WalletAmmount_2").text(numberWithCommas(JSON_PM[1]["wallet_amount"]));
$("#WalletAmmount_3").text(numberWithCommas(JSON_PM[2]["wallet_amount"]));
$("#WalletAmmount_4").text(numberWithCommas(JSON_PM[3]["wallet_amount"]));


SelectPM = (ID_Clicked) => {
    log("PM_Card_Clicked: " + ID_Clicked);

    $("#PMCard_1").removeClass("SelectedPMCard");
    $("#PMCard_2").removeClass("SelectedPMCard");
    $("#PMCard_3").removeClass("SelectedPMCard");
    $("#PMCard_4").removeClass("SelectedPMCard");

    $("#PMCard_1").children().removeClass("TextWithinPMCard_LargeFont");
    $("#PMCard_2").children().removeClass("TextWithinPMCard_LargeFont");
    $("#PMCard_3").children().removeClass("TextWithinPMCard_LargeFont");
    $("#PMCard_4").children().removeClass("TextWithinPMCard_LargeFont");

    $("#PMCard_" + ID_Clicked).children().addClass('TextWithinPMCard_LargeFont');
    $("#PMCard_" + ID_Clicked).addClass("SelectedPMCard");

    // Show sticky header
    const pmIndex = ID_Clicked - 1; // Since your IDs start at 1 but array starts at 0
    $('#stickyPmFace').attr('src', JSON_PM[pmIndex]["img_url"]);
    $('#stickyWalletAmount').text(numberWithCommas(JSON_PM[pmIndex]["wallet_amount"]));
    $('#stickyHeader').css('display', 'flex');

    // Scroll to items section
    $('html, body').animate({
        scrollTop: $('.ChooseItemsCard').offset().top
    }, 500);
}

var WalletAmmount = $("#WalletAmmount").text();
var Original_WalletAmmount = $("#WalletAmmount").text();

function BuyItem() {
    log("fd")
    WalletAmmount = WalletAmmount - 13;

    $("#WalletAmmount").text(WalletAmmount);

}


/* ItemCard */
$("#ItemImageID_1").attr("src", "/Media/ItemPictures/Burger.png");

function SelectAmmountBtn(InputID, MyValue) {
    log("InputID: " + InputID + " " + "Value: " + MyValue);
    $("#ItemCountInput_" + InputID).val(MyValue);
}

/* */
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
        Img_Url:"/Media/ItemPictures/.png"
    },
];

for (var i = 0; i<Items_JSON.length; i++) { 
    
    $(".ParentItemCard").append('<div class=\"ItemCard\">\n          <img class=\"ItemImage \" id=\"ItemImageID_' + i + '\" >\n <div class=\"FirstChildItemcard\">\n          <div id=\"ItemName_' + i + '\" class=\"ItemNameClass\"></div>\n           <br><div id=\"ItemPrice_' + i + '\" class=\"ItemPriceClass\"></div>\n\n          </div>\n          <div class=\"ChildItemcard\">\n            <input type=\"number\" class=\"ItemCountInputClass\" id=\"ItemCountInput_' + i + '\">\n            <button id=\"BuyItemBtn\" class=\"BuyItemBtnClass\" onclick=\"BuyItemBtn()\">BUY </button>\n          </div>\n          <div class=\"BottomSelectAmmountBtn\">\n            <button class=\"SelectAmmountBtn\" type=\"button\" onclick=\"SelectAmmountBtn(\'' + i + '\',this.value)\" value=\'5\'>5\n            </button>\n            <button class=\"SelectAmmountBtn\" type=\"button\" onclick=\"SelectAmmountBtn(\'' + i + '\',this.value)\" value=\"20\">20\n            </button>\n            <button class=\"SelectAmmountBtn\" type=\"button\" onclick=\"SelectAmmountBtn(\'' + i +'\',this.value)\"\n              value=\"50\">50</button>\n            <button class=\"SelectAmmountBtn\" type=\"button\" onclick=\"SelectAmmountBtn(\'' +i +'\',this.value)\" value=\"100\">100\n            </button>\n\n          </div>');
    $("#ItemName_" + i).text(Items_JSON[i]['Item_Name']);
    $("#ItemPrice_" + i).text(Items_JSON[i]['Item_Price']);
    $("#ItemImageID_" + i).attr("src", Items_JSON[i]['Img_Url'])
}

$(".ItemPriceClass").prepend("XCG")


$(document).ready(function () {
    $('img').each(function () {
        $(this).attr('draggable', 'false')
            .css({
                'user-select': 'none',
                '-webkit-user-drag': 'none',
                '-webkit-user-select': 'none',
                '-moz-user-select': 'none',
                '-ms-user-select': 'none'
            });
    });
});


$(document).ready(function () {
    $('.PMCard').click(function () {
        // Remove the selected class from all PM cards
        $('.PMCard').removeClass('SelectedPMCard');

        // Add the selected class to the clicked PM card
        $(this).addClass('SelectedPMCard');
    });
});