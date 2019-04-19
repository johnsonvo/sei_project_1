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
    $('.ourTeam').css('display', 'none');
    $('footer').css('display', 'flex');
});

$('#navMarket').click( () => {
    $('.marketPlace').css('display', 'block');
    $('.userCreatePage').css('display', 'none');
    $('.flowerCreatePage').css('display', 'none');
    $('.profilePage').css('display', 'none');
    $('.ourTeam').css('display', 'none');
});

// Reveal User Create
$('#navCreateUser').click( () => {
    $('.userCreatePage').css('display', 'flex');
    $('.marketPlace').css('display', 'none');
    $('.flowerCreatePage').css('display', 'none');
    $('.profilePage').css('display', 'none');
    $('.ourTeam').css('display', 'none');
});

// Reveal Profile
$('#navProfile').click( () => {
    $('.profilePage').css('display', 'block');
    $('.userCreatePage').css('display', 'none');
    $('.marketPlace').css('display', 'none');
    $('.flowerCreatePage').css('display', 'none');
    $('.ourTeam').css('display', 'none');
});

// Reveal Flower Create
$('#navCreateFlower').click( () => {
    $('.flowerCreatePage').css('display', 'flex');
    $('.marketPlace').css('display', 'none');
    $('.userCreatePage').css('display', 'none');
    $('.profilePage').css('display', 'none');
    $('.ourTeam').css('display', 'none');
});

// Reveal Profile Products
$('#showProduct').click( () => {
    $('.products').css('display', 'flex');
    $('.favorites').css('display', 'none');
    $('.ourTeam').css('display', 'none');
});

// Reveal Profile Favorites
$('#showFavorite').click( () => {
    $('.favorites').css('display', 'flex');
    $('.products').css('display', 'none');
    $('.ourTeam').css('display', 'none');
});


// Reveal OurTeam
$('#navTeam').click( () => {
    $('.ourTeam').css('display', 'flex');
    $('.flowerCreatePage').css('display', 'none');
    $('.marketPlace').css('display', 'none');
    $('.userCreatePage').css('display', 'none');
    $('.profilePage').css('display', 'none');
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

// Adds Product Clicked to the Shopping Cart
$('.flowers').on('click', '#addToCart', (e) => {
    const itemList = 
`<li class="addedRose">${flower.name} ${flower.price}<button class="removeItemButton" id="removeItem">X</button></li>`;
    $('.shoppingList').prepend(itemList);
});

// Removes Product Clicked to the Shopping Cart
$('.shoppingList').on('click', '#removeItem', removeItem);
function removeItem() {
    $(this).parent().remove();
};

// Reveal Drop-Down Menu
$('.fa-bars').click( () => {
    $('.rightSide').css('display', 'flex');
});

// Hide Drop-Down Menu
$('#navCartHide').click( () => {
    $('.rightSide').css('display', 'none');
});


// ____________________________________ //

var usersList;
var allUsers = [];
var flowersList;
var allFlowers = [];



$(document).ready(function(){
    // ------------- user---------------
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

       // ------------- flower---------------
    $flowersList = $('#flowerTarget');
    $.ajax({
        method: 'GET',
        url: '/api/flowers',
        success: handleFlowerSuccess,
        error: handleFlowerError
    });
// this.  will work on ES5 
    $('#newFlowerForm').on('submit', function(e) {
        console.log($(this).serialize());
        e.preventDefault();
        console.log('submit and get new flower.....!!!!!!!!!');
    $.ajax({
        method: 'POST',
        url: '/api/flowers',
        data: $(this).serialize(),
        success: newFlowerSuccess,
        error: newFlowerError
        });
    });
    $flowersList.on('click', '.deleteBtnFlower', (function () {
        // console.log($(this));
        console.log('clicked delete button to', '/api/flowers/'+$(this).attr('data-id'));
    $.ajax({
        method: 'DELETE',
        url: '/api/flowers/'+$(this).attr('data-id'),
        success: deleteFlowerSuccess,
        error: deleteFlowerError
        });
    }));



});

function getUserHtml(user){
    return `
        <div class="card">
        <div class="userImgs"><img src="" alt="${user.fullName}" style="width:100%;"></div>
        <h1>${user.fullName}</h1>
        <p class="title">${user.email}</p>
        <p class="title">${user.dateOfBirth}</p>
        <p>Flower: ${user.flower}</p>
        <div>
            <a class="userLink" href="#"><i class="fab fa-dribbble"></i></a> 
            <a class="userLink" href="#"><i class="fab fa-twitter"></i></a>  
            <a class="userLink" href="#"><i class="fab fa-linkedin"></i></a>  
            <a class="userLink" href="#"><i class="fab fa-facebook"></i></a> 
        </div>
        
        <button type="button" name="button" class="deleteUser  deleteBtn btn btn-danger pull-right" data-id=${user._id}>Delete</button>
        </div>`;

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





// --------------------------- Flower -----------------------


function getFlowerHtml(flower){
    return `
    <div class="flowerCardImgs">
    <div class="flowerImgs"><img src="" alt="${flower.name}" style="width:100%;"></div>
    <h1>${flower.name}</h1>
    <p class="title">${flower.type}</p>
    <p class="title">${flower.season}</p>
    <p>Flower: ${flower.price}</p>
    
    <button class="productAddButton" id="addToCart">Add to Cart</button>
    <button type="button" name="button" class="deleteBtnFlower  deleteBtnFlower btn btn-danger pull-right productDeleteButton" data-id=${flower._id}>Delete</button>
    </div>`;

};

function getAllFlowersHtml(flowers){
    console.log(flowers)
    return flowers.map(getFlowerHtml).join("");
};

// helper function to render all posts to view
// note: we empty and re-render the collection each time our post data changes
function renderFlower() {
    $flowersList.empty();
    var flowersHtml = getAllFlowersHtml(allFlowers);
    $flowersList.append(flowersHtml);
};


function handleFlowerSuccess(json){
    allFlowers = json;
    renderFlower();
};

function handleFlowerError (e) {
    console.log('uh oh');
    $('#flowerTarget').text('Failed to load users, is the server working?');
};

function newFlowerSuccess(json){
    console.log(json)
    $('#newFlowerForm input').val('');
    allFlowers.push(json);
    renderFlower();
}

function newFlowerError(){
    console.log('newFlower error!');
}


function deleteFlowerSuccess(json){
    var flower = json;
    console.log(json);
    var flowerId = flower._id;
    console.log('delete flower', flowerId);
    // find the flower with the correct ID and remove it from our alllFowers array
    for(var i = 0; i< allFlowers.length; i++) {
        if(allFlowers[i]._id === flowerId) {
        allFlowers.splice(i, 1);
        break;  // we found our flower - no reason to keep searching (this is why we didn't use forEach)
        }
    }
    renderFlower();
};

function deleteFlowerError(){
    console.log('deleteflower error!');
};
