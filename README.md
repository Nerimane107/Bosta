# Bosta

before anything , please create a .env file containing :
Database_URL = 'mongodb://nerimaneelrefai:nerimaneBosta@ac-gib2dpy-shard-00-00.j4i8jps.mongodb.net:27017,ac-gib2dpy-shard-00-01.j4i8jps.mongodb.net:27017,ac-gib2dpy-shard-00-02.j4i8jps.mongodb.net:27017/?ssl=true&replicaSet=atlas-le63zm-shard-0&authSource=admin&retryWrites=true&w=majority'
JWT_KEY ="secret"
--------------------------------------------------------------------------
to run this server, you need to run the "npm run devStart"
then first of all signup using the POST http://localhost:3000/user/signup, enter your credentials in the body then send the request
copy the token and use it in the header to access everything.


to get all checks : GET http://localhost:3000/bosta
to post a check : POST http://localhost:3000/bosta
to delete a check : DELETE http://localhost:3000/bosta/id
to get a check : GET http://localhost:3000/bosta/id



