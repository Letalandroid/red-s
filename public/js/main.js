const userMain = localStorage.getItem("user");
if (userMain !== null) {
  document.getElementsByClassName("navbar-nav")[0].innerHTML = ` <li
      class="nav-item"> <a class="nav-link" href="/logout">Logout</a> </li> `;
} else {
  document.getElementsByClassName("navbar-nav")[0].innerHTML = `<li><a
      class="dropdown-item" href="/login">Login</a></li> <li><a
      class="dropdown-item" href="/register">Register</a></li>`;
}
