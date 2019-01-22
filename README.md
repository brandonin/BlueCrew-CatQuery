This is made for the Take Home of BlueCrew
The react application can be reached at:
http://ec2-3-17-133-214.us-east-2.compute.amazonaws.com:5000/
with endpoints of /, /login and /register

The NodeJS API endpoints are located at:
http://ec2-3-17-133-214.us-east-2.compute.amazonaws.com:8000/
with the endpoints of /cat/login, /cat/register, /cats and /cats/random

I created the login/registration to make it easier to create a cat without having to structure the postman request.

Steps to reproduce:
1) git clone https://github.com/brandonin/BlueCrew-CatQuery.git
2) cd web
    2a) npm install
    2b) npm run start
3) cd ../server
    2a) npm install
    2b) npm run start
Both endpoints are now up and running. There are environment variables that I have created that I can provide as needed.

This uses AWS Elastic Beanstalk connected to an AWS RDS database.
