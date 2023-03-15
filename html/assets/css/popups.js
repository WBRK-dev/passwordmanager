$("popups > popup").hide();
$("popups").hide();

function popups(action, id) {
    if (action === 0) {
        $("popups > popup").hide();
        $("popups > popup#"+id).show();
        $("popups").show();
    } else {
        $("popups > popup").hide();
        $("popups").hide();
    }
}

$("popups popup button#hidePopup").click(() => {
    popups();
});

function addPasswordPopup() {
    saveCheck().then(promise => {
        if (promise) {
            popups(0, "confirmSave");
        } else {
            popups(0, "addPassword");
        }
    })
}




// Custom popup JS

$("popups popup#addPassword button#submit").click(() => {
    var domain = $("popups popup#addPassword input#domain").val(); $("popups popup#addPassword input#domain").val("");
    var username = $("popups popup#addPassword input#username").val(); $("popups popup#addPassword input#username").val("");
    var password = $("popups popup#addPassword input#password").val(); $("popups popup#addPassword input#password").val("");
    
    $("body > main").append('<div class="password-wrapper"><div class="wrapper"><div class="input-wrapper"><p>Domain:</p><input type="text" id="domain" onchange="saveCheck()" onkeypress="saveCheck()" oninput="saveCheck()" value="'+domain+'"></div><div class="input-wrapper"><p>Username:</p><input type="text" id="username" onchange="saveCheck()" onkeypress="saveCheck()" oninput="saveCheck()" value="'+username+'"><div class="side" id="copy"><img src="./assets/img/copy_full.svg" alt="copy password"></div></div><div class="input-wrapper"><p>Password:</p><input type="password" id="password" onchange="saveCheck()" onkeypress="saveCheck()" oninput="saveCheck()" value="'+password+'"><div class="side" id="passshow"><img src="./assets/img/visibility_full.svg" alt="password show"></div><div class="side" id="copy"><img src="./assets/img/copy_full.svg" alt="copy password"></div></div></div><div id="delete"><img src="./assets/img/delete_full.svg" alt="delete"></div></div>');
    clickEventPassword();
    saveCheck();

    popups();
});

$("popups popup#addPassword button#submit2").click(() => {
    var domain = $("popups popup#addPassword input#domain").val(); $("popups popup#addPassword input#domain").val("");
    var username = $("popups popup#addPassword input#username").val(); $("popups popup#addPassword input#username").val("");
    var password = $("popups popup#addPassword input#password").val(); $("popups popup#addPassword input#password").val("");
    
    $("body > main").append('<div class="password-wrapper"><div class="wrapper"><div class="input-wrapper"><p>Domain:</p><input type="text" id="domain" onchange="saveCheck()" onkeypress="saveCheck()" oninput="saveCheck()" value="'+domain+'"></div><div class="input-wrapper"><p>Username:</p><input type="text" id="username" onchange="saveCheck()" onkeypress="saveCheck()" oninput="saveCheck()" value="'+username+'"><div class="side" id="copy"><img src="./assets/img/copy_full.svg" alt="copy password"></div></div><div class="input-wrapper"><p>Password:</p><input type="password" id="password" onchange="saveCheck()" onkeypress="saveCheck()" oninput="saveCheck()" value="'+password+'"><div class="side" id="passshow"><img src="./assets/img/visibility_full.svg" alt="password show"></div><div class="side" id="copy"><img src="./assets/img/copy_full.svg" alt="copy password"></div></div></div><div id="delete"><img src="./assets/img/delete_full.svg" alt="delete"></div></div>');
    clickEventPassword();
    saveCheck();
});

$("popups > popup#settings button#import").click(function () {
    popups(0, 'import-passwords');
});

$("popups > popup#settings button#export").click(function () {
    navigator.clipboard.writeText(localStorage.getItem('passwords'));
    toasts('no-img', 'Copied passwords to clipboard.');
});

$("popups > popup#import-passwords button#submit").click(function () {
    try {
        var passwords = JSON.parse($("popups > popup#import-passwords input").val());
        $("popups > popup#import-passwords input").val('');
        if ($(this).attr('data-type') === 'replace') {
            $("main > *:not(#search)").remove();
        };
        $.each(passwords, function (key, value) {
            $("body > main").append('<div class="password-wrapper"><div class="wrapper"><div class="input-wrapper"><p>Domain:</p><input type="text" id="domain" onchange="saveCheck()" onkeypress="saveCheck()" oninput="saveCheck()" value="'+value.domain+'"></div><div class="input-wrapper"><p>Username:</p><input type="text" id="username" onchange="saveCheck()" onkeypress="saveCheck()" oninput="saveCheck()" value="'+value.username+'"><div class="side" id="copy"><img src="./assets/img/copy_full.svg" alt="copy password"></div></div><div class="input-wrapper"><p>Password:</p><input type="password" id="password" onchange="saveCheck()" onkeypress="saveCheck()" oninput="saveCheck()" value="'+value.password+'"><div class="side" id="passshow"><img src="./assets/img/visibility_full.svg" alt="password show"></div><div class="side" id="copy"><img src="./assets/img/copy_full.svg" alt="copy password"></div></div></div><div id="delete"><img src="./assets/img/delete_full.svg" alt="delete"></div></div>');
        });
        popups();
        saveCheck();
    } catch (error) {
        toasts('no-img', 'An error occured.');
    }
});