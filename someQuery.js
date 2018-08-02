
jQuery(function($) {

 $('input:focus');

 $('.grid_12 h2')
    .queue('newanima', function() {
      $(this).animate({'fontSize':'100px'});
      $(this).dequeue('newanima');
 })
    .delay(1000, 'newanima')
    .queue('newanima', function() {
  
      $(this).text('New age');
      $(this).dequeue('newanima');
 });
 
 $('.grid_12 h2).dequeue('newanima');
      
