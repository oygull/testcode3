$(document).ready(function () {

    //* header marquee script start =============
    try {
        const qtyOfElement = Math.floor($('.marquee').width() / 200) + 1;
        const marqueeContent = $('ul.marquee-content');
        $('.marquee').css(
            '--marquee-elements',
            marqueeContent.children().length,
        );

        for (let i = 0; i < qtyOfElement; i++) {
            $(marqueeContent).append(
                $(marqueeContent).children().eq(i).clone(),
            );
        }
    } catch (error) {
        console.warn(error);
    }
    //? header marquee script end =============

    //* user left navigation active script start =======
    const leftNavOpen = () => {
        $('.main-header #btn-nav-toggle').addClass('nav-displayed');
        $('.navigation-area .nav-main').addClass('active');
        $('body').addClass('overflowY-hidden');
    };

    const leftNavClose = () => {
        $('.main-header #btn-nav-toggle').removeClass('nav-displayed');
        $('.navigation-area .nav-main').removeClass('active');
        $('body').removeClass('overflowY-hidden');
    };

    $(document).on('click', '.main-header #btn-nav-toggle', function () {
        if ($(this).hasClass('nav-displayed')) {
            leftNavClose();
        } else {
            leftNavOpen();
        }
    });

    $(document).on(
        'click',
        '.navigation-area nav.nav-main:not(dl > *)',
        function (e) {
            if (!$(e.target).is('dt *')) leftNavClose();
        },
    );
    //* user left navigation active script end =======

    $(document).on('click', '.input-group .eye-icon', function () {
        const inputId = $(this).attr('for');
        if ($(this).find('.fa-eye-slash').length) {
            $(this).html(`<i class="fa-regular fa-eye"></i>`);
            $(`#${inputId}`).attr('type', 'text');
        } else {
            $(this).html(`<i class="fa-regular fa-eye-slash"></i>`);
            $(`#${inputId}`).attr('type', 'password');
        }
    });

    $(document).on('click', '.faq-section .btn-collapse', function () {
        $(this)
            .toggleClass('active')
            .closest('.card')
            .find('.card-body')
            .slideToggle();

        const svg = $(this).find('svg')[0];
        if (svg.classList.contains('fa-plus')) {
            svg.classList.remove('fa-plus');
            svg.classList.add('fa-minus');
            svg.setAttribute('data-icon', 'minus');
            svg.querySelector('path').setAttribute(
                'd',
                'M400 256H48c-17.7 0-32 14.3-32 32s14.3 32 32 32h352c17.7 0 32-14.3 32-32s-14.3-32-32-32z',
            );
        } else {
            svg.classList.remove('fa-minus');
            svg.classList.add('fa-plus');
            svg.setAttribute('data-icon', 'plus');
            svg.querySelector('path').setAttribute(
                'd',
                'M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z',
            );
        }
    });

    const onVisible = (element, callback) => {
        new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (entry.intersectionRatio > 0) {
                    callback(element);
                    observer.disconnect();
                }
            });
        }).observe(element);
        if (!callback) return new Promise((r) => (callback = r));
    };

    if ($('.trade-counter').length > 0) {
        onVisible($('.trade-counter')[0], () => {
            const $items = $('.trade-counter .item');
            const duration = 1500; // Default duration
    
            $items.each(function(index) {
                const $this = $(this).find('span[value]');
                const $thisValue = parseFloat($this.attr('value'));
                const $startWith = $this.attr('startWith') || '';
                const $endWith = $this.attr('endWith') || '';
    
                if ($thisValue <= 0) return; // Skip if value is 0 or less
    
                // Determine increment based on decimal places
                let increment;
                const decimalPlaces = ($thisValue.toString().split('.')[1] || '').length;
    
                if (decimalPlaces === 0) {
                    increment = 1;           // Whole number
                } else if (decimalPlaces === 1) {
                    increment = 0.1;         // One decimal place
                } else if (decimalPlaces === 2) {
                    increment = 0.05;       // Two decimal places
                }
    
                // Set custom speed factor for each counter
                let speedFactor;
                if (index === 0) {
                    speedFactor = 0.8;  // Slow speed for the first counter
                } else if (index === 1) {
                    speedFactor = 1.8;  // Medium speed for the second counter
                } else if (index === 2) {
                    speedFactor = 1.8;  // Fast speed for the third counter
                } else {
                    speedFactor = 1.0;  // Default speed for other counters
                }
    
                const adjustedDuration = duration / speedFactor;
                const intervalTime = adjustedDuration / ($thisValue / increment);
    
                let count = 0.0;
                const interval = setInterval(() => {
                    if (count < $thisValue) {
                        // Display the count, formatting based on the decimal places
                        $this.text($startWith + count.toFixed(decimalPlaces) + $endWith);
                        count += increment;
                    } else {
                        clearInterval(interval);
                        // Display final value with the appropriate decimal formatting
                        $this.text($startWith + $thisValue.toFixed(decimalPlaces) + $endWith);
                    }
                }, intervalTime);
            });
        });
    }
    

    if( $('.time-zone').length > 0 ) {
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        document.getElementById('time-zone').value = timezone;
    }

});

function getRandomAmount() {
    return Math.floor(Math.random() * (35000 - 15000 + 1)) + 1000;
}

function showPopup() {
    const randomIndex = Math.floor(Math.random() * countries.length);
    const randomCountry = countries[randomIndex];
    const randomAmount = getRandomAmount();

    document.getElementById('popup-country').textContent = randomCountry;
    document.getElementById('amount').textContent = `$${randomAmount.toLocaleString()}`;
    document.getElementById('profit-popup').style.display = 'block';
    setTimeout(closePopup, 10000);
}

function closePopup() {
    document.getElementById('profit-popup').style.display = 'none';
}

// Optionally, trigger popup when page loads
window.onload = function() {
    if( jQuery('#profit-popup').length > 0 ) {
        // Show popup every 30 seconds
        setInterval(showPopup, 30000);
        showPopup();
    }
};