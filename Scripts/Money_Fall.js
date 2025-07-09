$(document).ready(function () {
    initializeItems(); // generate your dynamic buttons

    $(document).on('click', '.BuyItemBtnClass', function (e) {
        const $btn = $(this);
        const numPixels = 30;

        // Ensure the button is relatively positioned
        $btn.css('position', 'relative');

        // Create container inside the button
        const $fallContainer = $('<div class="fall-container"></div>').css({
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
        }).appendTo($btn);

        // ✅ Get click position relative to the button
        const btnOffset = $btn.offset();
        const clickX = e.pageX - btnOffset.left;
        const clickY = e.pageY - btnOffset.top;

        // Randomized pixel fall order
        const indices = [...Array(numPixels).keys()];
        for (let i = indices.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [indices[i], indices[j]] = [indices[j], indices[i]];
        }

        for (let i = 0; i < numPixels; i++) {
            const index = indices[i];
            const $pixel = $('<div class="falling-pixel"></div>');
            const colors = ['#FFD700', '#FF4500', '#32CD32', '#1E90FF', '#FF69B4'];
            const color = colors[Math.floor(Math.random() * colors.length)];

            const xOffset = (Math.random() - 0.5) * 20; // Optional: small random spread

            const duration = 1500 + Math.random() * 800;
            const delay = index * 30 + Math.random() * 100;

            $pixel.css({
                backgroundColor: color,
                position: 'absolute',
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                top: clickY + 'px',         // ✅ start at mouse Y position
                left: (clickX + xOffset) + 'px', // ✅ start at mouse X + optional offset
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
        }
    });
});
