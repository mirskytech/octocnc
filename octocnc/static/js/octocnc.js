/*
 * View model for OctoCNC
 *
 * Author: Andrew Mirsky
 * License: AGPLv3
 */
$(function() {
    function OctocncViewModel(parameters) {
        var self = this;

        self.settings = parameters[0];

        // this will hold the URL currently displayed by the iframe
        self.currentUrl = ko.observable();

        // this will hold the URL entered in the text field
        self.newUrl = ko.observable();

        // this will be called when the user clicks the "Go" button and set the iframe's URL to
        // the entered URL
        self.goToUrl = function() {
            self.currentUrl(self.newUrl());
        };

        // This will get called before the HelloWorldViewModel gets bound to the DOM, but after its
        // dependencies have already been initialized. It is especially guaranteed that this method
        // gets called _after_ the settings have been retrieved from the OctoPrint backend and thus
        // the SettingsViewModel been properly populated.
        self.onBeforeBinding = function() {
            // self.newUrl(self.settings.settings.plugins.helloworld.url());
            self.goToUrl();
        };

        self.bindToImage = function() {
            var a = document.getElementById("lathe_control");

            var svgDoc = a.contentDocument;

            var svgItem = svgDoc.getElementById("pos_x_anchor");
            $(svgItem).on("click", function() { console.log('click my x'); });
            $(svgItem).hover(function(){ $(svgDoc.getElementById("pos_x-2")).fadeTo(0.1, 0);}, function() { $(svgDoc.getElementById("pos_x-2")).fadeTo(0.1, 1); });
            console.log("OctoCNC: binding to control image");
        };



        self.onAfterBinding = function() {
            if($('#lathe_control').complete && $('#lathe_control').naturalHeight !== 0) {
                self.bindToImage();
            } else {
                $('#lathe_control').on('load', function () {
                    self.bindToImage();
                });
            }
        };

        console.log('loading octocnc view model');
    }

    // view model class, parameters for constructor, container to bind to
    OCTOPRINT_VIEWMODELS.push([
       // This is the constructor to call for instantiating the plugin
        OctocncViewModel,

        // This is a list of dependencies to inject into the plugin, the order which you request
        // here is the order in which the dependencies will be injected into your view model upon
        // instantiation via the parameters argument
        ["settingsViewModel"],

        // Finally, this is the list of selectors for all elements we want this view model to be bound to.
        ["#tab_plugin_helloworld"]
    ]);
});
