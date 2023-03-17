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
    
    password.add(domain, username, password);
    clickEventPassword();
    saveCheck();

    popups();
});

$("popups popup#addPassword button#submit2").click(() => {
    var domain = $("popups popup#addPassword input#domain").val(); $("popups popup#addPassword input#domain").val("");
    var username = $("popups popup#addPassword input#username").val(); $("popups popup#addPassword input#username").val("");
    var password = $("popups popup#addPassword input#password").val(); $("popups popup#addPassword input#password").val("");
    
    password.add(domain, username, password);
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
            password.remove();
        };
        $.each(passwords, function (key, value) {
            password.add(value.domain, value.username, value.password);
        });
        popups();
        saveCheck();
    } catch (error) {
        toasts('no-img', 'An error occured.');
    }
});