/*!
* Start Bootstrap - Freelancer v7.0.7 (https://startbootstrap.com/theme/freelancer)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-freelancer/blob/master/LICENSE)
*/
//
// Scripts
// 

//API Integration - Grabs Joke from Jokeapi
document.addEventListener("DOMContentLoaded", function() {
    const apiKey = "YOUR_API_KEY";

    function fetchJoke() {
        const apiUrl = "https://v2.jokeapi.dev/joke/Any";

        fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => {
                if (data.error) {
                    console.error("Error fetching joke", data.message);
                    document.getElementById("joke").innerText = "Error occurred while fetching a joke.";
                } else if (
                    data.flags.nsfw || data.flags.racist || data.flags.sexist || data.flags.explicit
                ) {
                    console.error("Joke not allowed", data.message);
                    document.getElementById("joke").innerText = "Joke contained innapropriate content. Refresh or wait for a different joke.";
                } else {
                    const joke = data.joke || `${data.setup} ${data.delivery}`;
                    document.getElementById("joke").innerText = joke;
                }
            })
            .catch((error) => {
                console.error("Error fetching joke", data.message);
                document.getElementById("joke").innerText = "Error occurred while fetching a joke.";
            });
    }

    fetchJoke();

    setInterval(fetchJoke, 60000);
});

// Function to set or retrieve the value of a cookie
function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(";");
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === " ") c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0)
          return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function displayWelcomeMessage() {
    var lastVisit = getCookie("lastVisit");
    if (!lastVisit) {
        setCookie("lastVisit", new Date().toISOString(), 30); // Set cookie to expire in 30 days
        alert("Welcome to my homepage for the first time!");
      } else {
        // Returning visit
        var lastVisitDate = new Date(lastVisit);
        alert(
          "Welcome back! Your last visit was " +
            lastVisitDate.toLocaleString()
        );
        setCookie("lastVisit", new Date().toISOString(), 30);
    }
}
window.onload = displayWelcomeMessage;

window.addEventListener('DOMContentLoaded', event => {

    // Navbar shrink function
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
        }

    };

    // Shrink the navbar 
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            rootMargin: '0px 0px -40%',
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

});
