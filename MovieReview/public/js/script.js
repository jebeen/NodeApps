$(document).ready(function(){
  var btnClicked, rating=0;
  var form=document.getElementById('editForm');
  var frm=document.getElementById("deleteForm");
  var frm1=document.querySelector("#addForm");

  frm1.addEventListener("submit",(e)=>{
    e.preventDefault();
    var frmdata=new FormData(frm1);
    let data={};
    for(var [k,v] of frmdata) {
      data[k]=v;
    }
    $.ajax({
      url:"/add-comment",
      type:"post",
      contentType: "application/json",
      dataType: "json",
      data:JSON.stringify(data),
      success:function(response) {
        if(response.status) {
          $(".newcomment").html("Comment is added successfully");
        }
      },
      error: function(err) {
         console.log(err);
      }
    })
  })

  $(".rating").click((e)=>{
    const hasClass = e.target.classList.contains('glyphicon-star-empty');
    if(hasClass) {
      rating++;
      $("#"+e.target.id).removeClass('glyphicon-star-empty').addClass('glyphicon-star');
    } else {
      rating--;
      $("#"+e.target.id).removeClass('glyphicon-star').addClass('glyphicon-star-empty');
    }
    $("input[name='rating']").val(rating);
  });

  $("#deleteForm button").click(function (ev) {
        ev.preventDefault();
        btnClicked=$(this).val();
        if ($(this).val() == "Yes") {
          $("#deleteForm").submit();
          var frmdata=new FormData(frm);
          let data={};
          for(const [k,v] of frmdata) {
            data[k]=v;
          }
      }
});

  $("#deleteForm").on("submit", function(e){
   e.preventDefault();
   var frmdata=new FormData(frm);
   let data={};
   for(const [k,v] of frmdata){
     data[k]=v;
   }
   if (btnClicked == "Yes") {
     $.ajax ({
       url:"/delete-comment",
       type:"post",
       contentType: "application/json",
       dataType: "json",
       data:JSON.stringify(data),
       succes: function(response) {
         if(response.status) {
           $(".status").html("Success");
         }
      },
      error: function(err) {
        console.log(err);
      }
    })
  }
})

  form.addEventListener("submit", (e) => {
  e.preventDefault();
  let data={};
  var formdata = new FormData(form);
  for(var [k,v] of formdata) {
    data[k] = v;
  }
  $.ajax({
    url:'/save-comment',
    type:'post',
    contentType: 'application/json',
    data: JSON.stringify(data),
    dataType: 'json',
    success: function(response) {
      $(".status").html(response.status);
    },
     error: function(err) {
       console.log(err);
     }
  })
});
})
