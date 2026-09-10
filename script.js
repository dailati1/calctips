/* If you're feeling fancy you can add interactivity 
    to your site with Javascript */


    const headers = document.querySelectorAll("h4, .toppart");
    headers.forEach((header) => console.log(header));
    
    const observer = new IntersectionObserver(
      (entries) => {
        console.log(entries)
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
          } else {
            entry.target.classList.remove("show"); // RESET AS OUT OF SIGHT
          }
        });
      },
      {
        threshold: 0.4 // % NEEDED TO TRIGGER ANIMATION
      }
    );
    
    headers.forEach((header) => observer.observe(header));
    
    console.log(navbarSupportedContent)
    // SETTER CODE
    $('.nav-redirects').children().each(function(index, item) {
      if (!$('.nav-container').children()[index]) {return}
      if (item.classList.contains('exclude') || $('.nav-container').children()[index].classList.contains('exclude')) {return}
      $('.nav-container').children()[index].querySelector('a').innerText = item.querySelector('h4').innerText
      $('.nav-container').children()[index].querySelector('a').href = "#" + item.id
    });
    
    // CAROUSEL CODE
    let debounced = false
    console.log("Hello, world!");
    $('.carousel-btn').each(function(index, item) {
      
      $(item).on("click", function() {
        if (debounced) { return }
        let num = $('.carousel-img').css('translate').match(new RegExp(/\D?\d+/g))
        if (num) {
          num = Number(num[0])
        } else {
          num = 0
        }
        if ($(item).attr('id') == 'carousel-right') {
          if  (num/100 > -($('.carousel-img').length-1)) {
            num -= 100
            $('.carousel-img').each(function(index2,item2){
    
              $(item2).css('translate', `${num}%`)
            })
          } else {
            return
          }
        }
        if ($(item).attr('id') == 'carousel-left') {
          if (num/100 < 0) {
            num += 100
            $('.carousel-img').each(function(index2,item2){
    
              $(item2).css('translate', `${num}%`)
            })
          } else {
            return
          }
        }
        
        debounced = true
        setTimeout(function() {
          debounced = false
        }, 420)
      })
    })
    
    
    // SCROLL CODE
    let rotate_value;
    let prevElement;
    let nav_container = $('.nav-container').children()
    let prevNavElement;
    let prevIndex;
    let prevImg;
    const threshold = .24
    
    window.onscroll = (event) => {
      // console.log(event.target.scrollingElement.scrollTop)
      $('.nav-redirects').children().each(function(index, item) {
      index = $('.nav-redirects').children().length - index-1
      item = $('.nav-redirects').children()[index]
      if(item.getBoundingClientRect().top < $(window).height()*threshold) {
        if (prevElement == item) {return false}
        if (prevElement) {
          prevNavElement.classList.remove('active')
          prevImg.style.scale = .3
          let prev_rotate_value = rotate_value
          console.log(prev_rotate_value)
          
          if (index > prevIndex) {
             prev_rotate_value -= 90
    
          } else {
            prev_rotate_value += 90
    
          }
          prevImg.style.rotate = prev_rotate_value + "deg"
          
        }
        let img = nav_container[index].querySelector('img')
        img.style.scale = 1
        rotate_value = Number($(img).css('rotate').match(new RegExp(/\d+/g))[0])
    
        if (index > prevIndex) {
          rotate_value -= 90
    
        } else {
          rotate_value += 90
    
        }
    
        img.style.rotate = rotate_value + "deg"
    
        nav_container[index].classList.add('active')
        prevNavElement = nav_container[index]
        prevElement = item
        prevIndex = index
        prevImg = img
    
        return false
      }
    })
    }
    
    
    