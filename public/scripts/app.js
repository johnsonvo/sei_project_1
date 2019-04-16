console.log('sanity check');

// Reveal Market
$('#landingPage').click( () => {
    $('.marketPlace').css('display', 'block');
    $('#landingPage').css('display', 'none');
    $('main').css('display', 'block');
});

$('#navMarket').click( () => {
    $('.marketPlace').css('display', 'block');
    $('.userCreatePage').css('display', 'none');
    $('.flowerCreatePage').css('display', 'none');
    $('.profilePage').css('display', 'none');
});

// Reveal User Create
$('#navCreateUser').click( () => {
    $('.userCreatePage').css('display', 'block');
    $('.marketPlace').css('display', 'none');
    $('.flowerCreatePage').css('display', 'none');
    $('.profilePage').css('display', 'none');
});

// Reveal Profile
$('#navProfile').click( () => {
    $('.profilePage').css('display', 'block');
    $('.userCreatePage').css('display', 'none');
    $('.marketPlace').css('display', 'none');
    $('.flowerCreatePage').css('display', 'none');
});

// Reveal Flower Create
$('#navCreateFlower').click( () => {
    $('.flowerCreatePage').css('display', 'block');
    $('.marketPlace').css('display', 'none');
    $('.userCreatePage').css('display', 'none');
    $('.profilePage').css('display', 'none');
});