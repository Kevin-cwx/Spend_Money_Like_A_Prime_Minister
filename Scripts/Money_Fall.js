$(document).ready(function () {
    initializeItems(); // generate your dynamic buttons

    // ✅ delegate click to dynamically created .BuyItemBtnClass buttons
    $('.ParentItemCard').on('click', '.BuyItemBtnClass', function (e) {
        const numPixels = 20;
        const startX = e.pageX;
        const startY = e.pageY;

        const $fallContainer = $('<div class="fall-container"></div>').appendTo('body');

        for (let i = 0; i < numPixels; i++) {
            const $pixel = $('<div class="falling-pixel"></div>');
            const colors = ['#FFD700', '#FF4500', '#32CD32', '#1E90FF', '#FF69B4'];
            const color = colors[Math.floor(Math.random() * colors.length)];
            const xOffset = (Math.random() - 0.5) * 80;

            const duration = 1000 + Math.random() * 800;
            const delay = Math.random() * 300;

            $pixel.css({
                backgroundColor: color,
                top: startY + 'px',
                left: (startX + xOffset) + 'px',
                animationDuration: duration + 'ms',
                animationDelay: delay + 'ms',
            });

            $fallContainer.append($pixel);

            setTimeout(() => {
                $pixel.remove();
                if ($fallContainer.children().length === 0) {
                    $fallContainer.remove();
                }
            }, duration + delay);
        }
    });
});
  