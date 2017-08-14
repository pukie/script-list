var fessmodule = angular.module('myModule', []);

fessmodule.controller('fessCntrl', function ($scope) {
    $scope.test = 0;

}) var fessmodule = angular.module('myModule', []);

fessmodule.controller('fessCntrl', function ($scope) {
    $scope.test = 3.232323;

}) .directive('symbolInput', function($browser) {
        return {
            	require: 'ngModel',
           	 //priority: 1,
		link: function($scope, $element, $attrs, ngModelCtrl) {

                var listener = function() {


                    var el = $element[0];
                    var value=$element.val().replace(/[^0-9.]/g, '');
                    var index  = value.indexOf('.');

                    if((value).substr(index).length>3){
                        value = parseFloat(value).toFixed(2);
                    }

                    $element.val(value.replace(/\B(?=(\d{3})+(?!\d))/g, " ")+' '+$attrs.symbol);
                    var cursorPos = el.selectionStart;
                    var countSeparator =  ($element.val().substr(0, cursorPos).match(/\s\d/g) || []).length;
                    var newCursorPos = cursorPos+countSeparator;
                    /* jshint ignore:start */
                    newCursorPos > $element.val().length-$attrs.symbol.length-1+countSeparator ?
                        el.setSelectionRange($element.val().length, $element.val().length-$attrs.symbol.length-1) :
                        el.setSelectionRange($element.val().length, newCursorPos);
                    /* jshint ignore:end */
                };
                ngModelCtrl.$parsers.push(function(viewValue) {
                    var value = viewValue.replace(/[^0-9.]/g, '');
                    return parseFloat($attrs.symbol=='%' ? value/100 : value).toFixed(4) ;
                });
                ngModelCtrl.$render = function() {

                    var value = ($attrs.symbol=='%' ? ngModelCtrl.$viewValue*100 || 0: ngModelCtrl.$viewValue || 0).toString();

                    if(value.indexOf('.') > 0){
                        value=(parseFloat(value)).toFixed(2);
                    }
                    $element.val(value.replace(/\B(?=(\d{3})+(?!\d))/g, " ")+' '+$attrs.symbol);
                };
                $element.bind('change', listener);
                $element.bind('keydown', function(e) {
                    if (e.which !== 8 && e.target.nodeName === "INPUT") {
                        $browser.defer(listener);
                    }

                });
            }
        };
    });
	
	//http://jsfiddle.net/SAWsA/9755/
