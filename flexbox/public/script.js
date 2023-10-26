(function() {
  var content=[
    {'picture' : 'slide1.jpg', 'info' : 'text1'},
    {'picture' : 'slide2.jpg', 'info' : 'text2'},
    {'picture' : 'slide3.jpg','info': 'text3'}
  ];
  let path='/assets/';
  let i=0;

  setInterval(function() {
      if(i == content.length) {
        i=0;
      }
      let image=`<img class='slider-image' src=${path+content[i]['picture']} alt='image' /><br/><br/><center><p>${content[i]['info']}</p></center>`;
      i++;
      $(".slider").html(image)
    }, 3000);
})();

$(document).ready(function() {
  let date=new Date();
  document.getElementById("today").innerHTML=date;
})
