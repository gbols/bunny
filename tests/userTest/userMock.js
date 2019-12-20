import { getHash } from "../../src/utils/helpers"

export const listOfUsers = [
  {
    "email": "gbols@example.com",
    "password": getHash("UcheIam"),
    "firstname": "TheUche",
    "lastname": "Gbolahan",
    "role":"standard"
  },
  {
    "email": "uche@example.com",
    "password": "UcheIam",
    "firstname": "TheUche",
    "lastname": "Akogwu",
    "role":"standard"
  },
  {
    "email": "admin@admin.com",
    "password": "UcheIam",
    "firstname": "TheUche",
    "lastname": "Gbolahan",
    "role":"admin"
  }
]

export const validUser = {
	"email": "uche@eamp.com",
	"password": "UcheIam",
	"firstname": "TheUche",
  "lastname": "Gbolahan",
  "role": "standard"
}

export const invalidUser = {
	"email": "uche@eamp.com",
  "firstname": "TheUche",
  "password": "UcheIam",
	"lastname": "Gbolahan",
}

export const invalidEmail = {
  "email": "uche@eamp",
  "firstname": "TheUche",
  "password": "UcheIam",
	"lastname": "Gbolahan",
	"role":"standard"
}