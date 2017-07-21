.directive('symbolInput', function($browser) {
        return {
            require: 'ngModel',
            //priority: 1,
            link: function($scope, $element, $attrs, ngModelCtrl) {

                var listener = function() {
                 var el = $element[0];
                 var cursorPos = el.selectionStart;
                     $element.val($element.val().replace(/[^0-9.]/g, '')+' '+$attrs.symbol);
                     cursorPos == $element.val().length ?
                     	el.setSelectionRange($element.val().length, $element.val().length-$attrs.symbol.length-1)
                     :
                     	el.setSelectionRange($element.val().length, cursorPos);
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
                    $browser.defer(listener);
                });
            }
        };
});





//http://jsfiddle.net/pukie/SAWsA/9663/
