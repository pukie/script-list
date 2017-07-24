var fessmodule = angular.module('myModule', []);

fessmodule.controller('fessCntrl', function ($scope) {
    $scope.test = 0;

}) .directive('symbolInput', function($browser) {
        return {
            require: 'ngModel',
            priority: 1,
            link: function($scope, $element, $attrs, ngModelCtrl) {

                var listener = function() {
                console.log($element.val())
               	
                 var el = $element[0];
                 
                 var cursorPos = el.selectionStart;
                 var stringLength = $element.val().length;
                
                     $element.val($element.val().replace(/[^0-9.]/g, '')
                     .replace(/\B(?=(\d{3})+(?!\d))/g, " ")+' '+$attrs.symbol);
                       var cursorPos = el.selectionStart;
                    var countSeparator =  ($element.val().substr(0, cursorPos).match(/\s\d/g) || []).length;
             
                     cursorPos+countSeparator > $element.val().length-$attrs.symbol.length-1+countSeparator ?
                     	el.setSelectionRange($element.val().length, $element.val().length-$attrs.symbol.length-1)
                     :
                     	el.setSelectionRange($element.val().length, cursorPos+countSeparator);
                };
                ngModelCtrl.$parsers.push(function(viewValue) {
                    var value = viewValue.replace(/[^0-9.]/g, '');
                    return $attrs.symbol=='%' ? value/100 : value ;
                });
                ngModelCtrl.$render = function() {
                    var value = $attrs.symbol=='%' ? ngModelCtrl.$viewValue*100 || 0: ngModelCtrl.$viewValue || 0;
                    $element.val(value+' '+$attrs.symbol);
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
	
	//http://jsfiddle.net/pukie/SAWsA/9684/