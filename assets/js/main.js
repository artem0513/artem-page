(function ($) {
  "use strict";

  var invJs = {
    m: function (e) {
      invJs.d();
      invJs.methods();
    },

    d: function (e) {
      (this._window = $(window)),
        (this._document = $(document)),
        (this._body = $("body")),
        (this._html = $("html"));
    },

    methods: function (e) {
      invJs.serviceWidget();
      invJs.wowActive();
      invJs.stickyHeader();
      invJs.menuCurrentLink();
      invJs.popupMobileMenu();
      invJs.animationOnHover();
      invJs.odoMeter();
    },

    serviceWidget: function () {
      function serviceAnimation() {
        var $servicesWidget = $(".services-widget");
        var $activeBg = $servicesWidget.find(".active-bg");

        function updateActiveService($element) {
          if (!$element.length) return;

          var rect = $element[0].getBoundingClientRect();
          var topOff =
            rect.top - $servicesWidget[0].getBoundingClientRect().top;
          var height = $element.outerHeight();

          var $closestServiceItem = $element.closest(".service-item");
          if ($closestServiceItem.length) {
            $closestServiceItem.removeClass("mleave");
          }

          $servicesWidget.find(".service-item").each(function () {
            var $item = $(this);
            if (!$item.is($closestServiceItem)) {
              $item.addClass("mleave");
            }
          });

          $activeBg.css({
            top: topOff + "px",
            height: height + "px",
          });
        }

        $servicesWidget.on("mouseenter", ".service-item", function () {
          updateActiveService($(this));
        });

        $servicesWidget.on("mouseleave", function () {
          var $currentElement = $servicesWidget.find(".current");
          updateActiveService($currentElement);

          $servicesWidget.find(".service-item").each(function () {
            var $item = $(this);
            if (!$item.is($currentElement.closest(".service-item"))) {
              $item.removeClass("mleave");
            }
          });
        });

        // Initial call
        updateActiveService($servicesWidget.find(".current"));

        $servicesWidget.on("click", ".service-item", function () {
          $servicesWidget.find(".service-item").removeClass("current");
          $(this).addClass("current");
        });
      }

      // Initialize serviceAnimation
      serviceAnimation();
    },

    wowActive: function () {
      new WOW().init();
    },

    // sticky header activation
    menuCurrentLink: function () {
      var currentPage = location.pathname.split("/"),
        current = currentPage[currentPage.length - 1];
      $(".tmp-mainmenu li a").each(function () {
        var $this = $(this);
        if ($this.attr("href") === current) {
          $this.addClass("active");
          $this.parents(".has-dropdown").addClass("menu-item-open");
        }
      });
    },

    stickyHeader: function (e) {
      $(window).scroll(function () {
        if ($(this).scrollTop() > 150) {
          $(".header--sticky").addClass("sticky");
        } else {
          $(".header--sticky").removeClass("sticky");
        }

      });

    },

    popupMobileMenu: function (e) {
      $(".humberger_menu_active").on("click", function (e) {
        $(".tmp-popup-mobile-menu").addClass("active");
      });

      $(".close-menu").on("click", function (e) {
        $(".tmp-popup-mobile-menu").removeClass("active");
        $(".tmp-popup-mobile-menu .tmp-mainmenu .has-dropdown > a")
          .siblings(".submenu")
          .removeClass("active")
          .slideUp("400");
        $(".tmp-popup-mobile-menu .tmp-mainmenu .has-dropdown > a").removeClass(
          "open"
        );
      });

      $(".tmp-popup-mobile-menu .tmp-mainmenu .has-dropdown > a").on(
        "click",
        function (e) {
          e.preventDefault();
          $(this).siblings(".submenu").toggleClass("active").slideToggle("400");
          $(this).toggleClass("open");
        }
      );

      $(
        ".tmp-popup-mobile-menu, .tmp-popup-mobile-menu .tmp-mainmenu.onepagenav li a"
      ).on("click", function (e) {
        e.target === this &&
          $(".tmp-popup-mobile-menu").removeClass("active") &&
          $(".tmp-popup-mobile-menu .tmp-mainmenu .has-dropdown > a")
            .siblings(".submenu")
            .removeClass("active")
            .slideUp("400") &&
          $(
            ".tmp-popup-mobile-menu .tmp-mainmenu .has-dropdown > a"
          ).removeClass("open");
      });

      $(".onepagenav-click a").on("click", function (e) {
        $(".tmp-popup-mobile-menu").removeClass("active");
        invJs._html.css({
          overflow: "",
        });
      });
    },

    // two scroll spy

    animationOnHover: function () {
      let cards = document.querySelectorAll('.tmponhover');
        cards.forEach((tmpOnHover) => {
          tmpOnHover.onmousemove = function (e) {
            let rect = tmpOnHover.getBoundingClientRect();
            let x = e.clientX - rect.left; // element X position
            let y = e.clientY - rect.top;  // element Y position
            tmpOnHover.style.setProperty('--x', `${x}px`);
            tmpOnHover.style.setProperty('--y', `${y}px`);
          };
      });
    },

    odoMeter: function () {

      $(document).ready(function () {
        function isInViewport(element) {
          const rect = element.getBoundingClientRect();
          return (
            rect.top >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
          );
        }

        function triggerOdometer(element) {
          const $element = $(element);
          if (!$element.hasClass('odometer-triggered')) {
            const countNumber = $element.attr('data-count');
            $element.html(countNumber);
            $element.addClass('odometer-triggered'); // Add a class to prevent re-triggering
          }
        }

        function handleOdometer() {
          $('.odometer').each(function () {
            if (isInViewport(this)) {
              triggerOdometer(this);
            }
          });
        }

        // Check on page load
        handleOdometer();

        // Check on scroll
        $(window).on('scroll', function () {
          handleOdometer();
        });

      });

    },

  };

  invJs.m();
})(jQuery, window);

// Back To Top style here
function updateDimensions() {
  windowHeight = window.innerHeight;
  documentHeight = document.documentElement.scrollHeight - windowHeight;
}

// Initialize dimensions
updateDimensions();

// Add resize event listener to update dimensions
window.addEventListener('resize', updateDimensions);

document.addEventListener('DOMContentLoaded', function() {
  var box = document.querySelector(".scrollToTop");
  if (box) {
    var water = box.querySelector(".water");

    window.addEventListener('scroll', function() {
      var scrollPosition = window.scrollY;
      var percent = Math.min(
        Math.floor((scrollPosition / documentHeight) * 100),
        100
      );
      water.style.transform = "translate(0," + (100 - percent) + "%)";

      if (scrollPosition >= 200) {
        box.style.display = 'block';
      } else {
        box.style.display = 'none';
      }
    });

    // Add click event listener to scroll to top
    box.addEventListener('click', function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // Preloader functionality
  function removePreloader() {
    document.body.classList.remove("preloader-active");
  }

  document.body.classList.add("preloader-active");
  window.addEventListener('load', function() {
    removePreloader();
  });
});
