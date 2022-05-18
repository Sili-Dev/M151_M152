/**********************************************************/
  /*                    Cookie Management                   */
  /**********************************************************/

  //Create Cookie
  function createCookie(c_name, c_value, c_days) {
    if (c_days) {
      var c_date = new Date();
      c_date.setTime(c_date.getTime() + (c_days * 24 * 60 * 60 * 1000));
      var c_expires = "expires=" + c_date.toGMTString();
    } else {
      var c_expires = "";
    }
    document.cookie = c_name + '=' + c_value + ';' + c_expires + "; path=/";
  }

  function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }

  function eraseCookie(name) {
    createCookie(name, "", -1);
  }

  /**********************************************************/
  /*                   Cookie Preferences                   */
  /**********************************************************/

  //Make First Settings
  var cookiePreferences = readCookie('cookiePreferences');
  var CookieConsentOverlay = document.getElementById('cookie_consent_container');
  if (cookiePreferences != 'true') {
    openCookiePreferences();
    console.log('No Cookie Preferences yet...');
    console.log('Please set Cookie Preferences...');
  } else {
    loadCookies();
    console.log('Cookie Preferences loaded...');
  }



  function openCookiePreferences() {
    CookieConsentOverlay.classList.remove('cookie_hide');
    CookieConsentOverlay.classList.add('cookie_show_overlay');

    //If nothing is checked
    var TrackingCookiesCheckbox = document.getElementById('tracking_cookies');
    if (TrackingCookiesCheckbox.checked) {
      createCookie('trackingCookies', 'true', 14);
    }
  }

  //Cookies Consent Screen Buttons
  var Settings = document.getElementById('cookie_pop_up_settings');
  var General = document.getElementById('cookie_pop_up');
  var MoreInfo = document.getElementById('cookies_more_info');
  var TrackingCookiesCheckbox = document.getElementById('tracking_cookies');
  MoreInfo.addEventListener('click', function () {
    General.classList.add('cookie_hide');
    Settings.classList.remove('cookie_hide');
    Settings.classList.add('cookie_show');
    console.log('Opened Cookie Settings');
  });

  //Validate Checkbox of Tracking Cookies
  function validateTrackingCookies() {
    if (TrackingCookiesCheckbox.checked) {
      console.log('Tracking Cookies selected');
      createCookie('trackingCookies', 'true', 14);
    } else {
      console.log('Deselected Tracking Cookies');
      createCookie('trackingCookies', 'false', 14);
    }
  }

  //Save Cookie Settings
  var AcceptButton = document.getElementById('accept_cookie_settings');
  var SaveButton = document.getElementById('save_cookie_settings');
  var CookieConsentOverlay = document.getElementById('cookie_consent_container');
  AcceptButton.addEventListener('click', function () {
    CookieConsentOverlay.classList.add('cookie_hide');
    createCookie('cookiePreferences', 'true', 14);
    console.log('Accepted Cookie Usage');
    loadCookies();
  });

  SaveButton.addEventListener('click', function () {
    CookieConsentOverlay.classList.add('cookie_hide');
    createCookie('cookiePreferences', 'true', 14);
    console.log('Saved Cookie Settings');
    loadCookies();
  });

  /**********************************************************/
  /*                    Cookie Functions                    */
  /**********************************************************/

  //GA Function
  function activateGoogleAnalytics() {
    //GA Code
    console.log('Google Analytics loaded successfully...');
  }

  /**********************************************************/
  /*                   Cookie Categories                    */
  /**********************************************************/

  //Tracking Cookies
  function TrackingCookies() {
    var trackingCookies = readCookie('trackingCookies');
    switch (trackingCookies) {
      case 'true':
        //Google Analytics
        activateGoogleAnalytics();
        console.log('Tracking Cookies loaded successfully...');
        break;
      case 'false':
        console.log('Tracking Cookies not loaded... (not selected)');
        break;
    }
  }

  //Load Accepted Cookies
  function loadCookies() {
    TrackingCookies();
  }

  /*
  //Delete Cookies (Dev only)
  eraseCookie('cookiePreferences');
  eraseCookie('trackingCookies');
  */