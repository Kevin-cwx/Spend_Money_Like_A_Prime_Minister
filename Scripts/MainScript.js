var log = console.log;

var JSON_PM = [
  {
    name: "Ivar Asjes",
    img_url: "/Media/FacePictures/ivar.png",
    wallet_amount: 1611240,
  },
  {
    name: "Pik Pisas",
    img_url: "/Media/FacePictures/pik.png",
    wallet_amount: 7758121,
  },
  {
    name: "Gerrit Schotte",
    img_url: "/Media/FacePictures/gerrit.png",
    img_url2: "/Media/FacePictures/gerrit-sad.png",
    wallet_amount: 2236053,
  },
  {
    name: "Eugene Rhuggenaath",
    img_url: "/Media/FacePictures/eugene.png",
    wallet_amount: 5315998,
  },
];

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

for (let i = 0; i < JSON_PM.length; i++) {
  const index = i + 1;
  $(`#IDNamePrimeMinister_${index}`).text(JSON_PM[i].name);
  $(`#ImagePrimeMinister_${index}`).attr("src", JSON_PM[i].img_url);
  $(`#WalletAmmount_${index}`).text(numberWithCommas(JSON_PM[i].wallet_amount));
}


//
//
//
var currentWalletAmount;
SelectPM = (ID_Clicked) => {
  log("PM_Card_Clicked: " + ID_Clicked);

  // Remove classes from all PMCards and their children
  // $(".PMCard")
  //   .removeClass("SelectedPMCard")
  //   .children()
  //   .removeClass("TextWithinPMCard_LargeFont");


  selectedPMIndex = ID_Clicked-1;
  currentWalletAmount = JSON_PM[selectedPMIndex].wallet_amount;

  // Add classes to clicked PMCard and children
  $(`#PMCard_${ID_Clicked}`)
    .addClass("SelectedPMCard")
    .children()
    .addClass("TextWithinPMCard_LargeFont");

  // Update sticky header content
  $("#stickyPmFace").attr("src", JSON_PM[selectedPMIndex].img_url);
  $("#stickyWalletAmount").text(
    numberWithCommas(JSON_PM[selectedPMIndex].wallet_amount)
  );
  $("#stickyHeader").css("display", "flex");

  // Scroll smoothly to items section
  $("html, body").animate(
    {
      scrollTop: $(".ChooseItemsCard").offset().top,
    },
    500
  );
};

var WalletAmmount = $("#WalletAmmount").text();
var Original_WalletAmmount = $("#WalletAmmount").text();

/* ItemCard */

function SelectAmmountBtn(InputID, MyValue) {
  log("InputID: " + InputID + " " + "Value: " + MyValue);
  $("#ItemCountInput_" + InputID).val(MyValue);
}

/* */

$(document).ready(function () {
  $("img").each(function () {
    $(this).attr("draggable", "false").css({
      "user-select": "none",
      "-webkit-user-drag": "none",
      "-webkit-user-select": "none",
      "-moz-user-select": "none",
      "-ms-user-select": "none",
    });
  });
});

$(document).ready(function () {
  $(".PMCard").click(function () {
    // Remove the selected class from all PM cards
    $(".PMCard").removeClass("SelectedPMCard");

    // Add the selected class to the clicked PM card
    $(this).addClass("SelectedPMCard");
  });
});
