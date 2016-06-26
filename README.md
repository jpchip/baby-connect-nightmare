# baby-connect-nightmare

REST API Wrapper around some Baby Connect functionality using nightmare.js.

## Why

I love the [Baby Connect](https://www.baby-connect.com) app. I wanted a 
way to use it from my Pebble, but unfortunately they don't offer an API. 
So I decided to make my own! All it does it provide a few simple commands, 
all triggered via commands run via nightmare.js and PhantomJS. 

## Usage

You'll need to deploy this somewhere to use it. There are lots of 
places to deploy a node.js app for cheap.

Because this isn't a real API, it is fragile and could break anytime the 
baby connect site changes. **So use at your own risk!**

Since you are passing email and password in the POSTs, you'll probably want
to make sure your site uses SSL.

## Development

Check out the repo and run:
 
`npm install`. 

To start the web server, run: 

`node index.js`.

The API should then be available at `http://localhost:3000`.

## API

### Errors

If something goes wrong with nightmare.js, it will return a `500` status and the error, like:

`{ "error" : "This thing went wrong" }`

### DIAPER

Enters a diaper change at the current time.

`POST /diaper`

Example:
```
{
	"email": "something@something.com",
	"password": "password",
	"kidId": "kid124567890",
	"type": "bm"
}
```

Type is one of 'bm', 'bmWet', or 'wet'.


### BOTTLE

Enters a bottle taken at the current time.

`POST /bottle`

Example:
```
{
	"email": "something@something.com",
	"password": "password",
	"kidId": "kid124567890",
	"type": "formula",
	"quantity": 2
}
```

Type is one of 'formula' or 'milk'.

Quantity is a value in ounces.