jQuery(function () {
    var next_quote = -1;
    var quote_index;
  
    var quotes = jQuery(".quote-container");
    var no_of_quotes = quotes.length;
  
    /* DUPLICATE DOTS */
    var cloned = jQuery(".nav__item");
    for (let i = 1; i < no_of_quotes; i++) {
      cloned.clone().insertAfter(cloned);
    }
  
    // add click listeners
    jQuery(".nav__item").each(function (i, btn) {
      let $btn = jQuery(btn);
      $btn.on("click", () => {
        next_quote = i; //set the index of button that was clicked
        quotes.eq(quote_index).finish();//stop animation
      });
    });
  
    /* RANDOM NUMBER */
    function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
  
    /* SHOW ELEMENT */
    function showRandomQuotes() {
      /* UPDATE/DISPLAY NUMBER */
      jQuery(".quote-number .total").text(no_of_quotes);
      jQuery(".quote-number-bg .total").text(no_of_quotes);
  
      /* SHOW NEXT QUOTE */
      function showNextQuote() {
        var fade_in_delay = 2000;
        var fade_out_delay = 2000;
        var reading_time = 5000;
  
        if (next_quote == -1) {
          quote_index = Math.floor(Math.random() * no_of_quotes); //choose quote randomly
        } else {
          quote_index = next_quote; //get the index of button that was clicked
          next_quote = -1; //make choice of next quote random
        }
  
        let $buttons = jQuery(".nav__item");
        $buttons.removeClass("nav__item--current");
        $buttons.trigger("blur");
        $buttons.eq(quote_index).addClass("nav__item--current");
  
        /* UPDATE/DISPLAY NUMBER */
        // console.log("quote_index/current: " + quote_index);
  
        var current = quote_index + 1;
        if (current.toString().length < 2) {
          current = `0${current}`;
        }
        jQuery(".quote-number .current").text(current);
        jQuery(".quote-number-bg .current").text(current);
  
        /* TRANSITION */
        quotes
          .eq(quote_index)
          .fadeIn(fade_in_delay)
          .delay(reading_time)
          .fadeOut(fade_out_delay, showNextQuote);
      }
  
      showNextQuote();
    }
  
    showRandomQuotes();
  });
  