define("DS/MyWidget/scripts/HelloWorld",["text!DS/MyWidget/assets/properties.json"],
        function (propertiesFile) {
            'use strict';
            var myWidget = {
                onLoad: function () {

                    var json = JSON.parse(propertiesFile);
                    console.log("propertiesFile Data ::"+json[0].text);

                    widget.addPreference({
                        name:"textFiled",
                        label:"Text Filed",
                        type:"text"
                    });

                    var typeName = widget.getPreference("types").value;
                    //alert("typeName : "+typeName);
                    widget.body.innerHTML = "<div class='main-Container' id='mainContainer'>Hello World!!!!!!!!!!!!----!"+
                    "Selected Type : "+typeName+"</div>";
                }
            };

            widget.addEvent('onLoad', myWidget.onLoad);
		
});
