var myApp   =   angular.module('myShoppingList', []);

myApp.controller('myCtrl', ['$scope', '$window', function($scopeNew, $window){
    
    $scopeNew.products  =   null;
    
    if($window.localStorage.products)
    {
        var products    =   angular.fromJson($window.localStorage.products); 
        
        if(products.length > 0)
            $scopeNew.products  =   products;
    }
    
    if( ! $scopeNew.products)
        $scopeNew.products  =   ["Milk", "Bread", "Cheese"];         
    
    $scopeNew.addItem  =   function() {
        $scopeNew.errorText    =   '';
        
        if( ! $scopeNew.item) {
			$scopeNew.errorText    =   'The item is empty!';
            return;
        }
        
        if($scopeNew.products.indexOf($scopeNew.item) === -1)
        {
            $scopeNew.products.push($scopeNew.item);
            $scopeNew.item  =   '';
            $window.localStorage.products   =   angular.toJson($scopeNew.products);
        }
        else
        {
             $scopeNew.errorText    =   'The item is already in your shopping list.';       
        }
    }
     
    $scopeNew.removeItem   =   function($itemIndex) {
        $scopeNew.errorText    =   '';
        $scopeNew.products.splice($itemIndex, 1);
        $window.localStorage.products   =   angular.toJson($scopeNew.products);
    }
	
	$scopeNew.customFn	=	function(){
		var arr = {0: 1, 1: 2, 2: 3};
		
		console.log(angular.toJson(arr));
		
		angular.forEach(arr, function(val, key){
			console.log(val);
		});
	}
}]);
