function getCategories(data){
  let cat=[];
  for(var i in data.data) {
    if(!cat.includes(data.data[i]['category'])) {
      cat.push(data.data[i]['category']);
    }
  }
  return cat;
}

function displayBlog(data) {
  let img='',path='/images/';
  let blogData='';
  for(var i in data.data) {
    console.log(data.data[i]['category']);
    if(data.data[i].image == '') {
      img='building.gif';
    }
    blogData+=`<div class="col-md-2"><div class="panel panel-default"><div class="panel-heading">Posted by:${data.data[i].name} on ${data.data[i].date}</div>
      <div class="panel-body">
      <p>Category:${data.data[i].category}</p>
        <img class="blog-image" src=${path+img} width="60" height="60" />
        <p>${data.data[i].message}</p>
      </div></div></div>`;
    }
    return blogData;
}

$(document).ready(function(){
  var data={limit: 5, fetch:"all"};
  $.ajax({
    url:'/getBlogs',
    type: "post",
    contentType: 'application/json',
    data: JSON.stringify(data),
    success: function(data) {
      console.log(data);
      let response,cat=[];
      if(data.status) {
      response=displayBlog(data);
      cat=getCategories(data);
          if(cat.length>0) {
            let option='';
            for(var i of cat){
              option+='<option>'+i+'</option>';
            }
            $(".blog").append(option);
          }
      }
      else {
        response="<p>Error in retrieving records</p>";
      }
      $(".blog-section").append(response);
    },
    error:function(err) {
      console.log(err);
    }
  })

$(document).on("change",".blog",function(){
  let cat=$(this).val();
  var data={fetch: "cat", cat: cat};
  fetch('/getBlogs',{
    method: "POST",
    body: JSON.stringify({
    data: data
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    }
  })
  .then(result=>result.json())
  .then(data=>{
    let body=document.getElementById("blog-section");
    let result=displayBlog(data);
    $("#blog-section").html(result);
  })
  .catch(err=>console.log(err))
})

$(document).on("submit","form",function(e){
  e.preventDefault();
  var form=document.getElementById("blog-form");
  var formdata=new FormData(form);
  let data={};
  for (var [key, value] of formdata) {
    data[key]=value;
  }

  fetch('/addBlog', {
    method: 'POST',
    body: JSON.stringify({
    data: data,
  }),
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  }
  })
  .then(function(response){
  return response.json()})
  .then(function(data)
    {
      if(data.status)  {
        $(".message").html("Blog is added successfully");
      }
    }).catch(error => console.error('Error:', error));
  });
});
