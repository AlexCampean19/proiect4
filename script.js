document.addEventListener('DOMContentLoaded', (event) => {
    let dropDown = document.querySelector('.navbuton');
    dropDown.addEventListener('click', () => {
        dropDown.classList.toggle('showmenu');

    });

    if (sessionStorage.getItem('users')) {
        document.querySelector('#userLogin').setAttribute("style", "color:#059E67;");
        document.querySelector('#userLogin').setAttribute("href", "#");

        let dropDownUsers = document.querySelector('#userLogin');
        dropDownUsers.addEventListener('click', () => {
            dropDownUsers.classList.toggle('showusersmenu');
        });
    } else {

        document.querySelector('#userLogin').setAttribute("style", "color:black;");
        document.querySelector('#userLogin').setAttribute("href", "https://alexcampean19.github.io/proiect4/login.html");
    }
    if (window.innerWidth > 1024) {
        $("#userLogin").hover(function() {
            var isHovered = $(this).is(":hover");
            if (isHovered) {
                $('#userLogin').addClass('showusersmenu')
            } else {
                setTimeout(function() {
                    $('#userLogin').removeClass('showusersmenu')
                }, 2000)
            }
        });
        $(".navbuton").hover(function() {
            var isHovered = $(this).is(":hover");
            if (isHovered) {
                $('.navbuton').addClass('showmenu')
            } else {
                setTimeout(function() {
                    $('.navbuton').removeClass('showmenu')
                }, 2000)
            }
        });
    }

    let dropDownMobile = document.querySelector('.mobilebtn');
    let dropDownMenuMobile = document.querySelector('.navigation');
    dropDownMobile.addEventListener('click', () => {

        if (dropDownMobile.classList.toggle('navigation-active')) {
            if (document) {
                document.body.classList.add('scrollblock');
            }
        } else {
            document.body.classList.remove('scrollblock')
        }
    })
})

jQuery('#btnlogout').click(function() {
    sessionStorage.removeItem('users');
    sessionStorage.removeItem('cartId');
    sessionStorage.removeItem('quoteId')
    window.history.back()
})

jQuery('.cart.buttoncart').click(function() {
    jQuery("body").addClass('scrollblock');
    jQuery('.cart.buttoncart').addClass('showshop')
})
jQuery('button.close').click(function() {
    jQuery('body').removeClass('scrollblock');
    jQuery('.cart.buttoncart').removeClass('showshop')
})
jQuery('#cart').click(function() {
    jQuery('body').removeClass('scrollblock');
    jQuery('.cart.buttoncart').removeClass('showshop')
})
if (sessionStorage.getItem('users')) {
    jQuery('.checkoutbtn').removeClass('checkoutbtnof')
    jQuery('.checkoutbtn').addClass('checkoutbtn')
} else {
    jQuery('.checkoutbtn').addClass('checkoutbtnof')
    jQuery('.checkoutbtn').removeClass('checkoutbtn')
}



function WindowResize() {
    if (window.innerWidth > 1024) {
        let navigation = document.querySelector('.navigation-active'),
            scrollblock = document.querySelector('.scrollblock');


        if (navigation) {
            document.querySelector('.navigation-active').classList.remove('navigation-active');

        }
        if (scrollblock) {
            document.querySelector('.scrollblock').classList.remove('scrollblock');
        }
    }
}
window.addEventListener('resize', WindowResize);