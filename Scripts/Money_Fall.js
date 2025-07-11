$(document).ready(function () {
    //initializeItems(); // generate your dynamic buttons

    const Item_Fall = "pixels"; // change to "pixels" or "money"

    $(document).on('click', '.BuyItemBtnClass', function (e) {
        const $btn = $(this);
        // Set numItems based on Item_Fall type
        const numItems = (Item_Fall === "money") ? 10 : 30;

        $btn.css('position', 'relative');

        const $fallContainer = $('<div class="fall-container"></div>').css({
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
        }).appendTo($btn);

        const btnOffset = $btn.offset();
        const clickX = e.pageX - btnOffset.left;
        const clickY = e.pageY - btnOffset.top;

        const indices = [...Array(numItems).keys()];
        for (let i = indices.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [indices[i], indices[j]] = [indices[j], indices[i]];
        }

        for (let i = 0; i < numItems; i++) {
            const index = indices[i];
            const xOffset = (Math.random() - 0.5) * 20;
            const duration = 1500 + Math.random() * 800;
            const delay =0; //Math.random() * 1;

            if (Item_Fall === "pixels") {
                const $pixel = $('<div class="falling-pixel"></div>');
                const colors = ['#FFD700', '#FF4500', '#32CD32', '#1E90FF', '#FF69B4'];
                const color = colors[Math.floor(Math.random() * colors.length)];

                $pixel.css({
                    backgroundColor: color,
                    position: 'absolute',
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    top: clickY + 'px',
                    left: (clickX + xOffset) + 'px',
                    animationName: 'fall',
                    animationDuration: duration + 'ms',
                    animationDelay: delay + 'ms',
                    animationTimingFunction: 'ease-in',
                    animationFillMode: 'forwards',
                    opacity: 1,
                });

                $fallContainer.append($pixel);

                setTimeout(() => {
                    $pixel.remove();
                    if ($fallContainer.children().length === 0) {
                        $fallContainer.remove();
                    }
                }, duration + delay);

            } else if (Item_Fall === "money") {
                // Only coins, no bills (so all circular)
                const $coin = $('<div class="falling-coin"></div>');

                const size = 10 + Math.random() * 10;
                const rotation = Math.random() * 360;

                $coin.css({
                    position: 'absolute',
                    width: size + 'px',
                    height: size + 'px',
                    top: clickY + 'px',
                    left: (clickX + xOffset) + 'px',
                    transform: `rotate(${rotation}deg)`,
                    animationName: 'money-fall',
                    animationDuration: duration + 'ms',
                    animationDelay: delay + 'ms',
                    animationTimingFunction: 'ease-in',
                    animationFillMode: 'forwards',
                    opacity: 1,
                    backgroundSize: 'contain',
                    backgroundRepeat: 'no-repeat',
                    pointerEvents: 'none',
                });

                $fallContainer.append($coin);

                setTimeout(() => {
                    $coin.remove();
                    if ($fallContainer.children().length === 0) {
                        $fallContainer.remove();
                    }
                }, duration + delay);
            }
        }
    });
});
