const username = localStorage.getItem("user");

if (username) {
  document.getElementsByClassName(
    "card"
  )[0].innerHTML = `<h2 class="my-3">New Post</h2> <div class="card-body"> <form action="/"
  method="post"> <div class="input-group mb-3"> <span class="input-group-text"
  id="basic-addon1">Title</span> <input id="title" name="title" type="text"
  class="form-control" aria-label="Username" aria-describedby="basic-addon1" maxlength="30" required />
  </div> <div class="input-group mb-3"> <span class="input-group-text"
  id="inputGroup-sizing-default" >Description</span> <input id="description" name="description"
  type="text" class="form-control" aria-label="Sizing example input"
  aria-describedby="inputGroup-sizing-default" maxlength="60" required /> </div> <input hidden name="user" value=${localStorage.getItem(
    "user"
  )} /> <button id="submit" class="btn
  btn-danger">Publicar</button> </form> </div>`;
} else {
  document.getElementsByClassName("card")[0].innerHTML = ` <div class="alert
  alert-danger" role="alert" style="margin-bottom: 0"> Hacer el favor de <a
  href="/login" class="alert-link">loguearse</a> antes de realizar una
  publicación. </div> `;
}
