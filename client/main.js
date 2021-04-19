let server = 'https://simplify-life-with-todo.herokuapp.com'

  $(document).ready( () =>{

    $('#register-form').hide()
  
    $('#btn-go-register').on('click', (e) =>{
      e.preventDefault()
      $('#login-form').hide()
      $('#register-form').show()
    })
    
    $('#btn-register').on('click', (e)=>{
      e.preventDefault()
      regiter()
      $('#login-form').show()
      $('#register-form').hide()
    })
    
    $('#btn-back-login').on('click', (e) =>{
      e.preventDefault()
      $('#login-form').show()
      $('#register-form').hide()
    })
    
    $('#btn-login').on('click', (e)=>{
      e.preventDefault()
      login()
    })
    
    $('#todo-list').on('click', (e)=>{
      e.preventDefault()
      listTodoUser()
    })
    
    $('#add-todo').on('click', (e) =>{
      e.preventDefault()
      $('#btn-add-todo').show()
      $('#btn-edit-todo').hide()
    })
    
    $('#btn-add-todo').on('click', (e) =>{
      e.preventDefault()
      addTodo()
    })
    
    $('#btn-edit-todo').on('click', (e) =>{
      e.preventDefault()
      editTodo()
    })
    
    $('#btn-src-todo').on('click', (e) =>{
      e.preventDefault()
      searchTodo($('#src-todo').val())
    })
    
    $('#logout').on('click', (e) =>{
      e.preventDefault()
      $('#navbar').animate({
        height:"toggle"
      })
      logout()
    })
  
    checkLocalStorage()
})
  

function regiter() {
    let email = $('#reg-email').val()
    let password = $('#reg-password').val()
    let fullname = $('#reg-name').val()

    $.ajax({
        url: server+"/register",
        method: "POST",
        data: {
            email,
            password,
            fullname
        }
    })
    .done(response =>{
      Swal.fire({
        toast: true,
        icon: 'success',
        title: response.msg,
        position: 'top-left',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true
      })
    })
    .fail((xhr, text) =>{
        console.log(xhr, text);
    })
    .always(_ =>{
        $('#reg-email').val("")
        $('#reg-password').val("")
        $('#reg-name').val("")
    })
}

function checkLocalStorage() {
    if (!localStorage.access_token) {
        $('#contain-form').show()
        $('#navbar').hide()
        $('#content').hide()
    } else {
        $('#content').show()
        $('#contain-form').hide()
        $('#navbar').show()
        listTodoUser()
        weather()
    }
}

function onSignIn(googleUser) {
    var id_token = googleUser.getAuthResponse().id_token;

    $.ajax({
        url: server+'/googleLogin',
        method:"POST",
        data :{
            googleToken : id_token
        }
    })
    .done(response =>{
        localStorage.setItem('access_token', response.access_token)
        localStorage.setItem('userId', response.userId)
        checkLocalStorage()
        $('#add-edit-todo').hide()
    })
    .fail((xhr, text) =>{
        console.log(text);
    })

  }
  

function login() {
    let email = $('#emaillogin').val()
    let password = $('#passwordlogin').val()

    console.log(email, password);
    $.ajax({
        url: server+"/login",
        method: "POST",
        data: {
            email,
            password
        }
    })
    .done(response =>{
        localStorage.setItem('access_token', response.access_token)
        localStorage.setItem('userId', response.userId)
        checkLocalStorage()
        $('#add-edit-todo').hide()
    })
    .fail((xhr, text) =>{
        console.log(xhr);
        console.log(text, 'ini error');
    })
    .always(_ => {
        $('#email').val("")
        $('#password').val("")
    })
}

function weather() {
    $("#contain-weather").empty()
    $.ajax({
        url: `https://api.openweathermap.org/data/2.5/weather?q=JAKARTA&units=metric&appid=1e7d129bb8928d3868e6bcd5ca61be13`,
        method: 'GET',

    })
    .done(response => {
        $("#contain-weather").append(
        `
          <div class="card p-4 pt-5">
              <div class="d-flex">
                  <h6 class="flex">${response.name}</h6>
                  <h6>${new Date().getHours()}:${new Date().getMinutes() < 10 ? '0' + new Date().getMinutes() : new Date().getMinutes()}</h6>
              </div>

              <div class="d-flex">
                  <h1 class="mb-0 font-weight-bold" id="heading"> ${response.main.temp} ℃ </h1> <span class="small grey">${response.weather[0].main}</span>
              </div>

              <div class="d-flex">
                  <div class="temp-details">
                      <p class="my-1"><img src="https://i.imgur.com/B9kqOzp.png" height="17px"><span> ${response.wind.speed} mp/h </span> </p>
                      <p class="my-1"><span> ${response.main.humidity}% humidity </span></p>
                      <p class="my-1"><span> Feels like ${response.main.feels_like} ℃</span></p>
                  </div>

                  <div> <img src="http://openweathermap.org/img/w/${response.weather[0].icon}.png" alt="wheater-logo" width="100px"> </div>
                  </div>
              
          </div>
            `)
    })
    .fail((xhr, text) => {
        console.log(xhr, text)
    })
    .always(_=>{})
}

function listTodoUser() {
    $('#myUL').empty()
    $.ajax({
        url: server+"/todos",
        method: "GET",
        headers : { access_token : localStorage.access_token}
    })
    .done(response =>{
        response.forEach(todo => {
            let date = todo.due_date.split('T')[0]

            $('#myUL').append(`
            <li class="li-todo ${todo.status === true ? 'checked' : ''}" id="${todo.id}">
              <div><span>${todo.title}</span><br>
              <span style="font-size: 13px;"><i>${date}</i></span><hr>
              ${todo.description}<hr>
              <div class="d-flex justify-content-between">
              <label onclick="changeStatus(${todo.id}, ${todo.status})" for="success" class="btn btn-success">Success <input type="checkbox" id="success" class="badgebox"><span class="badge">&check;</span></label>
                <div class="d-flex justify-content-end">
                    <span data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo" onclick="setTodo(${todo.id},'${todo.title}','${todo.description}', '${date}')" class="btn btn-info"><i class="fas fa-user-edit"></i></span>
                    <span class="btn btn-warning" onclick="deleteTodo(${todo.id})" ><i class="fas fa-trash"></i></span>
                </div>
              </div>                
              </div>
            </li>
            `)
        });
    })
    .fail((xhr, text) =>{
        console.log(xhr, text);
    })
    .always(_ => {})
}

function addTodo() {
    let title = $('#title').val()
    let due_date = $('#due_date').val()
    let description = $('#description').val()
    let { userId }= localStorage

    $.ajax({
        url: server+'/todos',
        method :'POST',
        headers : { access_token : localStorage.access_token},
        data : {
            title,
            description,
            due_date,
            status: false,
            userId
        }
    })
    .done(_ =>{
        listTodoUser()
        Swal.fire({
          toast: true,
          icon: 'success',
          title: 'Add Successful',
          position: 'top-left',
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true
        })
        clearForm()
    })
    .fail((xhr, text) =>{
        console.log(xhr, text);
    })
    .always(_ =>{
        $('#title').val("")
        $('#due_date').val("")
        $('#description').val("")
    })
}

function searchTodo(id) {
    $.ajax({
        url : server+`/todos/${id}`,
        method : 'GET',
        headers : {access_token : localStorage.access_token},
    })
    .done(response =>{
        $('#myUL').empty()
        response.forEach(todo => {
            let date = todo.due_date.split('T')[0]
            $('#myUL').append(`
            <li class="li-todo ${todo.status === true ? 'checked' : ''}" id="${todo.id}" onclick="changeStatus(${todo.id}, ${todo.status})">
                <div><span>${todo.title}</span><br>
                <span style="font-size: 13px;"><i>${date}</i></span><hr>
                ${todo.description}<hr>
                <div>
                </div>
                <div class="row text-right">
                    <span class="btn btn-warning"><i class="fa fa-check-square"></i></span>
                    <span id="edit-todo" onclick="setTodo(${todo.id},'${todo.title}','${todo.description}', '${date}')" class="btn btn-info"><i class="fas fa-user-edit"></i></span>
                    <span class="btn btn-warning" onclick="deleteTodo(${todo.id})" ><i class="fas fa-trash"></i></span>
                </div>                
                </div>
            </li>
            <hr>
            <hr>
            `)
        });
    })
    .fail((xhr, text) =>{
        console.log(text);
    })
    .always(_=>{
        $('#src-todo').val("")
    })
}

function setTodo(id, title, description, date) {
    $('#btn-edit-todo').show()
    $('#btn-add-todo').hide()
    localStorage.setItem('id', id)
    $('#title').val(title);
    $('#due_date').val(date);
    $('#description').val(description);
}

function clearForm() {
  $('#title').val('')
  $('#due_date').val('')
  $('#description').val('')
}

function changeStatus(id, stat) {

    let status
    if (stat === true) status = false 
    else if(stat === false) status = true

    $.ajax({
        url : server+`/todos/${id}`,
        method : 'PATCH',
        headers : {access_token : localStorage.access_token},
        data : {
            status
        }
    })
    .done(response =>{
        listTodoUser()
    })
    .fail(err =>{
        console.log(err);
    })
}

function editTodo() {
    let title = $('#title').val();
    let due_date = $('#due_date').val();
    let description =$('#description').val();
    let { id } = localStorage

    $.ajax({
        url: server+`/todos/${id}`,
        method :'PUT',
        headers : { access_token : localStorage.access_token},
        data : {
            title,
            description,
            due_date,
        }
    })
    .done(response =>{
      Swal.fire({
        toast: true,
        icon: 'success',
        title: 'Edit Successful',
        position: 'top-left',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true
      })
        listTodoUser()
        clearForm()
    })
    .fail((xhr, text) =>{
      Swal.fire({
        toast: true,
        icon: 'error',
        title: 'Oppss! ceck your input',
        position: 'top-left',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true
      })
        console.log(text, xhr);
    })
    .always(_ =>{
        $('#title').val("")
        $('#due_date').val("")
        $('#description').val("")
    })
}

function deleteTodo(id) {
  Swal.fire({
    title: 'Are you sure?',
    text: 'You can\'t revert your action',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes Delete it!',
    cancelButtonText: 'No, Keep it!',
    showCloseButton: true,
    showLoaderOnConfirm: true
  }).then((result) => {
    if (result.value) {
      $.ajax({
          url: server+'/todos/'+id,
          method :'delete',
          headers : { access_token : localStorage.access_token}
      })
      .done(_ =>{
          Swal.fire('Deleted', 'You successfully deleted this file', 'success')
          listTodoUser()
      })
      .fail((xhr, err) =>{
          console.log(err);
          console.log(xhr);
      })
    } else {
      Swal.fire('Cancelled', 'Your todo is still intact', 'info')
    }
  })
}

function logout() {
    //*remove item localstorage
    Swal.fire({
      toast: true,
      icon: 'success',
      title: 'Logout Successful',
      position: 'top-right',
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true
    })
    localStorage.removeItem('access_token')

    //*sign out from google
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });

    checkLocalStorage()
}