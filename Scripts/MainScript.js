var log = console.log;

var JSON_PM = [
  {
    name: "Ivar Asjes",
    img_url: "/Media/FacePictures/ivar.png",
    wallet_amount: 1611240.91,
  },
  {
    name: "Pik Pisas",
    img_url: "/Media/FacePictures/pik.png",
    wallet_amount: 7758121.72,
  },
  {
    name: "Gerrit Schotte",
    img_url: "/Media/FacePictures/gerrit.png",
    img_url2: "/Media/FacePictures/gerrit-sad.png",
    wallet_amount: 2236053.14,
  },
  {
    name: "Eugene Rhuggenaath",
    img_url: "/Media/FacePictures/eugene.png",
    wallet_amount: 5315998.52,
  },
];

// function numberWithCommas(x) {
//   return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
// }

function numberWithCommas(x) {
  const parts = x.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
}

for (let i = 0; i < JSON_PM.length; i++) {
  const index = i + 1;
  $(`#IDNamePrimeMinister_${index}`).text(JSON_PM[i].name);
  $(`#ImagePrimeMinister_${index}`).attr("src", JSON_PM[i].img_url);
  $(`#WalletAmount_${index}`).text(numberWithCommas(JSON_PM[i].wallet_amount));
}

//
//
//
var currentWalletAmount;
var PM_Name;
var PM_Face_Receipt;
SelectPM = (ID_Clicked) => {
  //log("PM_Card_Clicked: " + ID_Clicked);

  // Remove classes from all PMCards and their children
  // $(".PMCard")
  //   .removeClass("SelectedPMCard")
  //   .children()
  //   .removeClass("TextWithinPMCard_LargeFont");

  selectedPMIndex = ID_Clicked - 1;
  currentWalletAmount = JSON_PM[selectedPMIndex].wallet_amount;
  PM_Name = JSON_PM[selectedPMIndex].name;
  PM_Face_Receipt = JSON_PM[selectedPMIndex].img_url;
  // Add classes to clicked PMCard and children
  $(`#PMCard_${ID_Clicked}`)
    .addClass("SelectedPMCard")
    .children()
    .addClass("TextWithinPMCard_LargeFont");

  // Update sticky header content
  $("#stickyPmFace").attr("src", JSON_PM[selectedPMIndex].img_url);
  // $("#stickyWalletAmount").text(
  //   numberWithCommas(JSON_PM[selectedPMIndex].wallet_amount)
  // );
  $("#stickyWalletAmount").text(
    numberWithCommas(
      currentWalletAmount ?? JSON_PM[selectedPMIndex].wallet_amount
    )
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
var Original_WalletAmmount = WalletAmmount;

/* ItemCard */

function SelectAmmountBtn(InputID, MyValue) {
  //log("InputID: " + InputID + " " + "Value: " + MyValue);
  $("#ItemCountInput_" + InputID).val(MyValue);
}

/* */

$(document).ready(function () {
  $(".PMCard").click(function () {
    // Remove the selected class from all PM cards
    $(".PMCard").removeClass("SelectedPMCard");

    // Add the selected class to the clicked PM card
    $(this).addClass("SelectedPMCard");
  });
});

//Scroll to top
$(document).ready(function () {
  const $btn = $("#scrollToTopBtn");

  $(window).scroll(function () {
    const scrollTop = $(this).scrollTop();
    const docHeight = $(document).height();
    const winHeight = $(window).height();

    if (scrollTop > (docHeight - winHeight) * 0.3) {
      $btn.fadeIn();
    } else {
      $btn.fadeOut();
    }
  });

  $btn.click(function () {
    $("html, body").animate({ scrollTop: 0 }, 600);
    return false;
  });
});

window.onload = function () {
  $("html, body").animate({ scrollTop: 0 }, "slow");
};

$("#Change_Items").on("click", function () {
  initializeItems("go");
});


//
function canRenderEmoji(emoji) {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  ctx.font = "32px Arial";
  const baseline = ctx.measureText("a").width;
  const emojiWidth = ctx.measureText(emoji).width;
  return emojiWidth !== baseline;
}


function replaceUnsupportedEmoji(selector, emoji, fallback) {
  const $el = $(selector);
  if (canRenderEmoji(emoji)) {
    $el.text(emoji);
  } else {
    $el.text(fallback);
  }
}

$(document).ready(function () {
  replaceUnsupportedEmoji("#Change_Items", "😈", ";-) Maluuu");
  replaceUnsupportedEmoji("#Print_Receipt", "🧾 Print Resibu", "Print Resibu");
});

/// max value inn input
$(document).ready(function () {
  $(".ItemCountInputClass").on("input", function () {
    const val = $(this).val();

    // Only allow up to 3 digits (numbers only)
    if (val.length > 3) {
      $(this).val(val.slice(0, 3));
    }
  });

  // Prevent typing non-numeric characters
  $(".ItemCountInputClass").on("keypress", function (e) {
    const char = String.fromCharCode(e.which);
    if (!/[0-9]/.test(char)) {
      e.preventDefault();
    }
  });

  // Optional: prevent pasting longer or invalid values
  // $(".ItemCountInputClass").on("paste", function (e) {
  //   const paste = (e.originalEvent || e).clipboardData.getData('text');
  //   if (!/^\d{1,3}$/.test(paste)) {
  //     e.preventDefault();
  //   }
  // });
});
