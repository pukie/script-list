.directive('symbolInput', function($browser) {
    return {
        require: 'ngModel',
        priority: 1,
        link: function($scope, $element, $attrs, ngModelCtrl) {
            var listener = function() {
                $element.val($element.val().replace(/[^0-9]/g, '')+' '+$attrs.symbol);
            };

            // This runs when we update the text field
            ngModelCtrl.$parsers.push(function(viewValue) {
              var value = viewValue.replace(/[^0-9]/g, '');
                return value
            });
            ngModelCtrl.$render = function() {
                $element.val(ngModelCtrl.$viewValue+' '+$attrs.symbol);
            };
            $element.bind('change', listener);
            $element.bind('keydown', function(e) {
  						 if (e.which === 8 && e.target.nodeName === "INPUT") { 
               $element.val($element.val().replace(/[^0-9]/g, ''));
      				}
                $browser.defer(listener); 
            });

        }

    };
});





//http://jsfiddle.net/pukie/SAWsA/9663/
