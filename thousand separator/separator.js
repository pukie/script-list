/**
 * Created by komalu1 on 2017-04-14.
 */
var input = document.getElementsByClassName('separator');

input[0].addEventListener("keyup", function(){

    var resetInput = this.value.replace(/\s/g, "");
    var transformedInput = resetInput.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    this.value=transformedInput ;
});