console.log('sanity check');

// Reveal Landing Page
$('#navLogo').click ( () => {
    $('#landingPage').css('display', 'flex');
    $('main').css('display', 'none');
    $('footer').css('display', 'none');
})

// Reveal Market
$('#landingPage').click( () => {
    $('.marketPlace').css('display', 'block');
    $('#landingPage').css('display', 'none');
    $('main').css('display', 'block');
    $('footer').css('display', 'flex');
});

$('#navMarket').click( () => {
    $('.marketPlace').css('display', 'block');
    $('.userCreatePage').css('display', 'none');
    $('.flowerCreatePage').css('display', 'none');
    $('.profilePage').css('display', 'none');
});

// Reveal User Create
$('#navCreateUser').click( () => {
    $('.userCreatePage').css('display', 'flex');
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
    $('.flowerCreatePage').css('display', 'flex');
    $('.marketPlace').css('display', 'none');
    $('.userCreatePage').css('display', 'none');
    $('.profilePage').css('display', 'none');
});

// Reveal Profile Products
$('#showProduct').click( () => {
    $('.products').css('display', 'flex');
    $('.favorites').css('display', 'none');
});

// Reveal Profile Favorites
$('#showFavorite').click( () => {
    $('.favorites').css('display', 'flex');
    $('.products').css('display', 'none');
});

// Reveal Shopping Cart
$('#navCart').click( () => {
    $('.cart').css('display', 'flex');
})

$('#hide').click( () => {
    $('.cart').css('display', 'none');
})

// Submit Create User Directs to Profiles
$('#register').click( () => {
    $('.profilePage').css('display', 'block');
    $('.userCreatePage').css('display', 'none');
})

// Submit Create Flower Directs to Market
$('#registerFlower').click( () => {
    $('.marketPlace').css('display', 'block');
    $('.flowerCreatePage').css('display', 'none');
})

// Hault Reloading the Page on Click
$('#searchButton').click( (e) => {
    e.preventDefault();
})

var usersList;
var allUsers = [];

$(document).ready(function(){
    $usersList = $('#userTarget');
    $.ajax({
        method: 'GET',
        url: '/api/users',
        success: handleSuccess,
        error: handleError
    });

// this.  will work on ES5 
    $('#newUserForm').on('submit', function(e) {
        console.log($(this).serialize());
        e.preventDefault();
        console.log('submit and get new user.....!!!!!!!!!');
    $.ajax({
        method: 'POST',
        url: '/api/users',
        data: $(this).serialize(),
        success: newUserSuccess,
        error: newUserError
        });
    });



    $usersList.on('click', '.deleteBtn', (function () {
        // console.log($(this));
        console.log('clicked delete button to', '/api/users/'+$(this).attr('data-id'));
    $.ajax({
        method: 'DELETE',
        url: '/api/users/'+$(this).attr('data-id'),
        success: deleteUserSuccess,
        error: deleteUserError
        });
    }));


});

function getUserHtml(user){
    return `<hr>
            <p>
            <strong>${user. fullName}</strong>
            <strong>${user. email}</strong>
            <strong>${user. avatar}<strong>
            <strong>${user. dateOfBirth}<strong>
            <strong>${user. products}<strong>
            <button type="button" name="button" class="deleteBtn btn btn-danger pull-right" data-id=${user._id}>Delete</button>
            </p>`;

};

function getAllUsersHtml(users){
    console.log(users)
    return users.map(getUserHtml).join("");
};

// helper function to render all posts to view
// note: we empty and re-render the collection each time our post data changes
function render() {
    $usersList.empty();
    var usersHtml = getAllUsersHtml(allUsers);
    $usersList.append(usersHtml);
};


function handleSuccess(json){
    allUsers = json;
    render();
};

function handleError (e) {
    console.log('uh oh');
    $('#userTarget').text('Failed to load users, is the server working?');
};

function newUserSuccess(json){
    console.log(json)
    $('#newUserForm input').val('');
    allUsers.push(json);
    render();
}

function newUserError(){
    console.log('newUser error!');
}


function deleteUserSuccess(json){
    var user = json;
    console.log(json);
    var userId = user._id;
    console.log('delete user', userId);
    // find the user with the correct ID and remove it from our allUsers array
    for(var i = 0; i< allUsers.length; i++) {
        if(allUsers[i]._id === userId) {
        allUsers.splice(i, 1);
        break;  // we found our user - no reason to keep searching (this is why we didn't use forEach)
        }
    }
    render();
};

function deleteUserError(){
    console.log('deleteuser error!');
};
