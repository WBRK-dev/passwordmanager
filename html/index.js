function clickEventPassword() {
    $("body > main > .password-wrapper .input-wrapper .side").off('click');
    document.querySelectorAll("body > main > .password-wrapper div#passshow").forEach(elem => {elem.addEventListener("click", e => {
        if (e.target.tagName === "IMG") {
            target = e.target.parentNode;
        } else {target = e.target};

        if (target.classList.contains("enabled")) {
            target.querySelector("img").setAttribute("src", "./assets/img/visibility_full.svg");
            target.parentNode.querySelector("input").setAttribute("type", "password");
            target.classList.remove("enabled");
        } else {
            target.querySelector("img").setAttribute("src", "./assets/img/visibility_off_full.svg");
            target.parentNode.querySelector("input").setAttribute("type", "text");
            target.classList.add("enabled");
        }
    })});

    $("body > main > .password-wrapper #delete").click(function() {
        $(this).parent().remove();
        saveCheck();
    });

    $("body > main > .password-wrapper .input-wrapper .side#copy").click(function() {
        var copy = this.parentNode.querySelector("input").value;
        navigator.clipboard.writeText(copy);
        toasts('no-img', 'Copied to clipboard.');
    });
};

function search() {
    var password_wrappers = document.querySelectorAll("body > main > .password-wrapper");
    $("body > main > .password-wrapper").css("display", "none");
    var search_input = $("body > main > .search input").val().toLowerCase();
    password_wrappers.forEach(wrapper => {
        domain = wrapper.querySelector("input#domain").value.toLowerCase();
        username = wrapper.querySelector("input#username").value.toLowerCase();

        if (domain.includes(search_input) || username.includes(search_input)) {
            wrapper.style.display = "flex";
        }
    });
};

async function saveCheck() {
    var password_wrappers = document.querySelectorAll("body > main > .password-wrapper");
    var changed = false;
    var passwords = JSON.parse(localStorage.getItem("passwords"));

    if (passwords.length !== password_wrappers.length) {
        changed = true;
    } else {
        for (let i = 0; i < passwords.length; i++) {
            if (passwords[i].domain !== password_wrappers[i].querySelector("input#domain").value || passwords[i].username !== password_wrappers[i].querySelector("input#username").value || passwords[i].password !== password_wrappers[i].querySelector("input#password").value) {
                changed = true;
            }
        }
    }
    
    if (changed === false) {
        $("body > main > .search button").css("display", "none");
        return false;
    } else {
        $("body > main > .search button").css("display", "block");
        return true;
    }
};

function saveJson() {
    var jsonObj = [];
    var password_wrappers = document.querySelectorAll("body > main > .password-wrapper");
    password_wrappers.forEach(wrapper => {
        jsonObj.push({
            domain: wrapper.querySelector("input#domain").value,
            username: wrapper.querySelector("input#username").value,
            password: wrapper.querySelector("input#password").value
        })
    });

    localStorage.setItem('passwords', JSON.stringify(jsonObj));
    saveCheck();
}

// Initialize all passwords
if (localStorage.getItem("passwords") !== null) {
    var passwords = JSON.parse(localStorage.getItem("passwords"));
    $.each(passwords, function (key, value) {
        $("body > main").append('<div class="password-wrapper"><div class="wrapper"><div class="input-wrapper"><p>Domain:</p><input type="text" id="domain" onchange="saveCheck()" onkeypress="saveCheck()" oninput="saveCheck()" value="'+value.domain+'"></div><div class="input-wrapper"><p>Username:</p><input type="text" id="username" onchange="saveCheck()" onkeypress="saveCheck()" oninput="saveCheck()" value="'+value.username+'"><div class="side" id="copy"><img src="./assets/img/copy_full.svg" alt="copy password"></div></div><div class="input-wrapper"><p>Password:</p><input type="password" id="password" onchange="saveCheck()" onkeypress="saveCheck()" oninput="saveCheck()" value="'+value.password+'"><div class="side" id="passshow"><img src="./assets/img/visibility_full.svg" alt="password show"></div><div class="side" id="copy"><img src="./assets/img/copy_full.svg" alt="copy password"></div></div></div><div id="delete"><img src="./assets/img/delete_full.svg" alt="delete"></div></div>')
    });
    clickEventPassword();
} else {
    localStorage.setItem('passwords', '[]');
};

document.onscroll = e => {
    if (document.documentElement.scrollTop > 50) {
        $("body > .searchBack").css("top", "0");
    } else {
        $("body > .searchBack").css("top", "-51px");
    }
}



// Update check
var version = "1.1";
$.ajaxSetup({ cache: false });
$.getJSON('http://wbrk.ddns.net/res/library/json/passwordmanager.json', function (data) {
    if (parseInt(version) + 1 <= data.version) {
        popups(0, 'update-required');
    } else if (version !== data.version) {
        popups(0, 'update');
        $("header a#update-button").show();
    }
});
$.ajaxSetup({ cache: true });