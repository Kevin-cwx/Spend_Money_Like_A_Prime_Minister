$(document).ready(function () {
    let selectedPM = null;
    let stickyHeader = $('#stickyHeader');

    // Function to show the sticky header
    function showStickyHeader(pmId) {
        // Get the PM data
        const pmFace = $('#ImagePrimeMinister_' + pmId).attr('src');
        const pmAmount = $('#WalletAmmount_' + pmId).text();
        const pmName = $('#IDNamePrimeMinister_' + pmId).text();

        // Set the sticky header content
        $('#stickyPmFace').attr('src', pmFace);
        $('#stickyWalletAmount').text(pmAmount);

        // Show the sticky header
        stickyHeader.css('display', 'flex');
        selectedPM = pmId;
    }

    // Function to hide the sticky header
    function hideStickyHeader() {
        stickyHeader.css('display', 'none');
        selectedPM = null;
    }

    // Check scroll position to show/hide sticky header
    $(window).scroll(function () {
        if (selectedPM) {
            const scrollTop = $(window).scrollTop();
            if (scrollTop === 0) {
                hideStickyHeader();
            }
        }
    });

    // Expose these functions to the global scope so they can be called from MainScript.js
    window.showStickyHeader = showStickyHeader;
    window.hideStickyHeader = hideStickyHeader;
});