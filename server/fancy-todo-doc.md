# My Assets App Server
My Assets App is an application to manage your assets. It performs standard CRUD actions based on RESTful concept.

This app has : 
* RESTful endpoint for asset's CRUD operation
* JSON formatted response

&nbsp;

Tech Stack used to build this app :
* Node JS
* Express JS framework
* PostgreSQL
* Sequelize JS


&nbsp;

## Global Responses
> These responses are applied globally on all endpoints

_Response (500 - Internal Server Error)_
```
{
  "message": "<your message for 400>"
}
```

_Response (401 - Unauthorized)_
```
{
  "message": "<your message for 401>"
}
```


&nbsp;

## RESTful endpoints
---
---


# USER
---
### POST /login

> Create new asset

_Request Header_
```
not needed
```

_Request Params_
```
not needed
```

_Request Body_
```
{
  "email": "<email to get insert into>",
  "password": "<pasword to get insert into>"
}
```

_Response (200 - OK)_
```
  access_token    

```


_Respone (400 - Bad Request)_
```
[
    {
        "message": "Eamil cannot empty"
    },
    {
        "message": "Password cannot empty"
    }
]
```

_Respone (401 - Unauthorized)_
```
[
    { message : 'Invalid email / password'}
]
```
### POST /register

> Create new asset

_Request Header_
```
not needed
```

_Request Params_
```
not needed
```

_Request Body_
```
{
  "fullname": "<fullname to get insert into>",
  "email": "<email to get insert into>",
  "password": "<pasword to get insert into>"
}
```

_Response (200 - OK)_
```
{
    "message" : "succesfully added new user"
}   
```

_Respone (400 - Bad Request)_
```
[
    {
        "message": "Name cannot empty"
    },
    {
        "message": "Eamil cannot empty"
    },
    {
        "message": "Password cannot empty"
    },
    {
        "message": "email must be unique",
    }
]
```
### POST /googleLogin

> Create new asset

_Request Header_
```
not needed
```

_Request Params_
```
not needed
```

_Request Body_
```
{
    googleToken : <"id_token from google">
}
```

_Response (200 - OK)_
```
{
    access_token, 
    userId, 
    name
}   
```

_Response (200 - OK)_
```
{
    access_token, 
    userId, 
    name
}   
```


---
# TODO
### GET /todos

> Get all asset as defined by the id provided in req.currenUser

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
not needed
```

_Response (200)_
```
[
    {
        "id": <given id by system>,
        "title": "<asset title>",
        "description": "<asset description>",
        "status": "<asset status>",
        "due_date": "<asset due_date>",
        "createdAt": "2021-03-01T07:15:12.149Z",
        "updatedAt": "2021-03-01T07:15:12.149Z",
    }
]
```
### POST /todos

> Create new asset

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
{
  "title": "<title to get insert into>",
  "description": "<description to get insert into>"
  "status": "<status to get insert into>"
  "due_date": "<description to get insert into>"
}
```

_Response (201 - Created)_
```
{
  "id": <given id by system>,
  "title": "<asset title>",
  "description": "<asset description>",
  "status": "<asset status>",
  "due_date": "<asset due_date>",
  "createdAt": "2021-03-01T07:15:12.149Z",
  "updatedAt": "2021-03-01T07:15:12.149Z",
}
```


_Respone (401 - Bad Request)_
```
[
    {
        "msg": "Title cannot empty"
    },
    {
        "msg": "Description cannot empty"
    },
    {
        "msg": "Status cannot empty"
    },
    {
        "msg": "Date must be today"
    }
]
```
### GET /todos/:id

> Get single asset as defined by the id provided in req.params

_Request Header_
```
{
  "access_token": "<your access token>"
}
```
_Request Params_
```
{
  "id": <given id by system>
}
```
_Request Body_
```
not needed
```

_Response (200)_
```
[
    {
        "id": <given id by system>,
        "title": "<asset title>",
        "description": "<asset description>",
        "status": "<asset status>",
        "due_date": "<asset due_date>",
        "createdAt": "2021-03-01T07:15:12.149Z",
        "updatedAt": "2021-03-01T07:15:12.149Z",
    }
]
```

### PUT /todos/:id

> Update an asset defined by the id provided

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Params_
```
{
  "id": <given id by system>
}
```

_Request Body_
```
{
  "title": "<title to get insert into>",
  "description": "<description to get insert into>"
  "status": "<status to get insert into>"
  "due_date": "<description to get insert into>"
}
```

_Response (200 - OK)_
```
{
  "id": <given id by system>,
  "title": "<asset title>",
  "description": "<asset description>",
  "status": "<asset status>",
  "due_date": "<asset due_date>",
  "createdAt": "2021-03-01T07:15:12.149Z",
  "updatedAt": "2021-03-01T07:15:12.149Z",
}
```

_Respone (401 - Bad Request)_
```
[
    {
        "msg": "Title cannot empty"
    },
    {
        "msg": "Description cannot empty"
    },
    {
        "msg": "Status cannot empty"
    },
    {
        "msg": "Date must be today"
    }
]
```

### PATCH /todos/:id

> Update an asset defined by the id provided

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Params_
```
{
  "id": <given id by system>
}
```


_Request Body_
```
{
  "status": "<status to get insert into>"
}
```

_Response (200 - OK)_
```
{
  "id": <given id by system>,
  "title": "<asset title>",
  "description": "<asset description>",
  "status": "<asset status>",
  "due_date": "<asset due_date>",
  "createdAt": "2021-03-01T07:15:12.149Z",
  "updatedAt": "2021-03-01T07:15:12.149Z",
}
```

---
### DELETE /todos/:id

> Delete an asset defined by the id provided

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Params_
```
{
  "id": <given id by system>
}
```

_Request Body_
```
not needed
```

_Response (200 - OK)_
```
{
  "message": "todo successfully deleted"
}
```