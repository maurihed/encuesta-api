
loginRouter.route('/login')
  .post(LoginController.login);

loginRouter.route('/logged-user')
  .post(LoginController.loggedUser as any);

loginRouter.route('/logout')

### Login roues
|METHOD|ROUTE|DESCRIPTION|AUTHENTICATION REQUIRED|DATA|
|--|--|--|--|--|
| POST | /login | authenticate user | no | { email: "", password: ""} |
| POST | /logout | get specific user | yes | NA |
| POST | /logged-user | retrieve the logged user | no | NA |

### Base route /api/users
|METHOD|ROUTE|DESCRIPTION|AUTHENTICATION REQUIRED|DATA|
|--|--|--|--|--|
| GET | / | get all the users| yes | NA |
| GET | /:id | get specific user | yes | NA |
| POST | / | create a user | yes | { email: "", firstName: "", lastName: "", password: "", role: 0 } |
| PUT | /:id | update a user | yes | { email?: "", firstName?: "", lastName?: "", password?: "", role?: 0 } |
| DELETE | /:id | delete a user | yes | NA |

### Base route /api/role
|METHOD|ROUTE|DESCRIPTION|AUTHENTICATION REQUIRED|DATA|
|--|--|--|--|--|
| GET | / | get all the roles| yes | NA |
| GET | /:id | get specific role | yes | NA |
| POST | / | create a role | yes | { name: "" } |
| PUT | /:id | update a role | yes | { name?: "" } |
| DELETE | /:id | delete a role | yes | NA |
