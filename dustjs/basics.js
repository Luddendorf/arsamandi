8) Custom filters
We can create our own filters.

dust.filters.custom-filter = function(value, fallback, forceHttps) {
    
   let image = "";
   if(value) {
      image = value;
   } else {
       image = fallback;
   }
    
   if(forceHttps) {
       if(image.indexOf("https") === -1) {
           image = image.replace("http", "https");
       }
   }
    
    return image;
}

In template: {key | custom-filter}

dust.filters.textLength = function(value) {
    
   return "value : " + value + ", length : " + value.length;
}

json: {name:"jack"};

// dust_tl.dust ////////////////////////////
{name}<br> // value without filter
// jack
    
{name|textLength} // value with filter
// value : jack, length : 9

{name}<br>
{name|textLength}

// index.html
<script type="text/javascript">
   $.ajax("templates/dust_tl.dust",
          success: function(response) {
      
    var compiled = dust.compile(response, "dust_tl");
    
    dust.loadSource(compiled);
    
    dust.render("dust_tl", {name:"Jack"}, function(err, out) {
      $("#dust-content").html();   
      });
    });
// custom filter:
dust.filters.textLength = function(value) {
    
  return `value : ${value}, length: ${value.length}`;
}    

</script>

// 9) Traversing of data:

{key.key}

{#key}
     {#key2}{/key2}
{/key}
 
 Example:
 
 {
   A : "A world",
   B : {
       content: "B world",
       C : {
           content: "C World"
       }
   }
 }

 1) <br>
  A : {A}<br>
  B : {B.content}<br>
  C : {B.C.content}<br>
      
 2) <br>
 {#B}
  B : {content}<br>
  C : {C.content}<br>
 {/B}
  
  3)<br>
    {#B}
     B : {content}<br>
     C : {#C}{content}{/C}<br> // context
    {/B}
     
 4) {#B.C}
    
    B : {B.content}<br> // dot reference
    C : {content}<br>   // context
    {/B.C}
     

<script type="text/javascript">
  $.ajax("templates/dust_tl.dust", {
     success: function(reponse) {
      
      var compiled = dust.compile(response, "dust_tl");
         
      dust.loadSource(compiled);
         
      var jsonData = {
          
        A : "A world",
        B : {
            content: "B world",
            C : {
                content: "C world"
            }
        }
      };
         
dust.render("dust_tl", jsonData, function(err, out) {
    $("#dust-content").html(out);
});    
     }
    });
</script>
