const settings = {
  "name": "my-frontity",
  "state": {
    "frontity": {
      "url": "https://perforis.com/",
      "title": "Perforis",
      "description": "Perforis"
    }
  },

  "packages": [
    {
      "name": "@frontity/mars-theme",
      "state": {
        "theme": {
          "menu": [
            [
              "Home",
              "/"
            ],
   [
              "About",
              "about"
            ],
            [
              "Nature",
              "/category/nature/"
            ],
            [
              "Travel",
              "/category/travel/"
            ],
            [
              "Japan",
              "/tag/japan/"
            ],
            [
              "Contact Us",
              "/contact/"
            ]
          ],
          "featured": {
            "showOnList": false,
            "showOnPost": false
          }
        }
      }
    },
    {
      "name": "@frontity/wp-source",
      "state": {
        "source": {
          "url": "https://perforis.com/"
        }
      }
    },
    "@frontity/tiny-router",
    "@frontity/html2react",
"frontity-contact-form-7"
  ]
};

export default settings;
