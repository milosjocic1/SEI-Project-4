# SEI Project 4 Agora
 
![image](https://i.imgur.com/dgub6zR.png)
 
## Project Overview
 
The objective of this project was to create a MERN-stack web application in a group of four in the timeframe of a week. We created marketplace app called Agora, where users can browse,buy and sell products.
 
## Brief
 
- Create a working full-stack, single-page application.
- Incorporate MERN-stack technologies (MongoDB/Mongoose, Express, React, Node)
- Have a well styled interactive front-end
- Communicates with Express backend via AJAX.
- Implement token-based authentication.
- Have a well-scoped feature set.
 
## Deployment Link
 
Visit Agora [with this link.](https://sei66project4agora.herokuapp.com/)
 
## Code Installation
 
Agora runs on Heroku, so there are no code installation requirements. Just sign up as a buyer or a seller and enjoy the site!
 
## Technologies Used
 
- MongoDB/Mongoose
- Express.js
- React.js
- Node.js
- Git/GitHub
- AJAX
- Postman API
- Cloudinary
- Axios
- Heroku
 
## Development Process
 
### Stage 1: Planning
 
I took the role of team leader for this project, which came with its own set of responsibilities in regards to management and development flow. I wanted to generate a supportive working environment where everyone had a clear plan of what tasks they would accomplish and had reassurance that we would collaborate as a unit to solve issues that any team member encountered. We used Slack and Zoom to communicate with eachother through the project.
 
I started by working with team mates to establish a development process:
1. Brainstorming and choosing a project idea
2. Creating wireframes, ERDs and user stories
3. Creating repositories and starting files
4. Breaking the project down into tasks
5. Creating a layout for the app
6. Work on functions and features
7. Testing implemented features
8. Styling and testing the website
9. Adding extras / bonus features
 
Once we had decided on our idea for a marketplace app, I created a [Trello board](https://trello.com/b/ZltaYyqq/agora) which would serve as a task management tool to create, delegate and track tasks for the group. This allowed the group to work together and understand which tasks were being attempted, which tasks had been completed and which tasks were yet to be taken on.
 
We then created wireframes and ERDs on Figma to map out how we wanted our site to look and what our entity relations would be, which ultimately determine the functionality of the app. We decided on users being able to have buyer and seller accounts, as well as incorporating a cart model that stores selected items before purchase alongside transaction handling funcitonality.
![](https://user-images.githubusercontent.com/97313222/201130750-d91a83e7-148c-4c2f-929d-27cc305e85ec.png)
[Here is a link to our Figma wireframes.](https://www.figma.com/file/WHn9BS8skZiKRXrp6qdsOk/Agora?node-id=16%3A2)
 
We then created user stories to give us a clear layout of our site functionality:
- As an unregistered user, I want to sign up to the site
- As a an unregistered user, I want to be able to sign up as a buyer or seller
- As a user of the site, I want to see a list of products
- As a user, I want to see details of products
- As a user, I want to add products to a cart
- As a user, I want to be able to pay for my products
- As a seller, I want to be able to list new products for sale
- As a seller, I want to be able to edit the details of my listed products
- BONUS: As a registered user, I want to leave reviews for products I've purchased
- BONUS: As a user, I want to see my past transactions
 
 
I then created separate Git repositories for the frontend and backend, where we would work in the 'dev' branch until deployment. We split the workload in the group so that two members would focus on the backend and two would focus on the frontend. As it was my first project using React, I was up for the challenge and decided to work on the frontend. It was important for me to stay on top of pull requests so I made sure to merge frequently, ensuring that the backend and frontend were both up to date in order for them to communicate properly.
 
### Stage 2: Building the app
 
Now that we had our plan put in place and our tasks laid out on Trello, it was time to commence the building of the app.
 
File Structure
 
With my frontend partner I started by creating a skeleton React project using npm to install it and start a server that will serve the React application. The next step was creating the component JSX files which offer a more organized approach to integration of separate reusable components rather than creating fewer large files.
 
Signup
 
Once we made a start with our file structure, I started working on the signup form. I created the signup component in Signup.js and rendered it in the App.js nav bar as such:
![](https://i.imgur.com/3bZpUgr.png)
The link to the signup page was on the false side of a ternary operator checking for 'isAuth', meaning that it will only be displayed if the user is not logged in.
As we wanted users to have the option to sign up as a buyer or sign up as a seller, I created two states in Signup.js- showSeller and showBuyer.
![](https://i.imgur.com/JvKiBBv.png)
Upon loading the sign up page, the user is presented with two buttons that determine which form they are shown next:
![](https://i.imgur.com/a6qmDf7.png)
When the buyer button is pressed, an onClick function is called to set the buyer state to true and the seller state to false, and vice versa. Depending on the state that was triggered, either the buyer form or seller form was then displayed.
 
I then wrote functions to handle the form submission and registration of a user.
![](https://i.imgur.com/nxF3Xiw.png)
This captured the contents of the form and submitted it via Axios to the backend as a POST request.
 
Product create
 
I then set about making the form that users would complete in order to upload a product.
This was completed in a component file ProductCreateForm.js, where I initially used React Bootstrap for the form but then opted for JSX as my frontend partner and I found it easier to manipulate in terms of styling. As the form included image upload, I made sure that the encType was multiform.
![](https://i.imgur.com/X6T9lIY.png)
Once the necessary information was supplied by the user, it was sent as a request to the backend which has the seller ID attached to it.
![](https://i.imgur.com/gPZosB6.png)
In the backend, the the product is created in accordance with the Product model schema. A product ID is then attached to the seller in the database, and the information is then passed back to the frontend as a response in JSON.
 
Image upload with Cloudinary
 
Images were one of the most important aspects of this website, considering it is a marketplace where it is essential for users to see pictures of items. I opted to use Cloudinary as a cloud-based image management service rather than upload image files locally, as Heroku is known to delete image files after a certain amount of time.
 
I first needed to configure some settings in Cloudinary, where I added an upload preset which would store the images used in the application. The cloud name, API key and API secret all had to be stated in a dotenv file in the backend, where I also created a cloudinary.js file that would require all of these parameters. Upon uploading a profile image with the sign up form, the user would see a preview of it before submitting the form data. This was written as a function 'previewFile'. A similar function was written so that the same would occur when a seller uploads a product image. I wrote an asynchronous function 'uploadImage' to take care of sending the image to the right places. Base64 encoding is used to convert the binary data of the image into a string which can be more easily transmitted. The fetch API calls the /api/upload API with the user ID attached to it and sends the object containing the base64 data as JSON format to the backend server.
![](https://i.imgur.com/mxydUSG.png)
 
I had to also work in the backend in order to connect Cloudinary to the application. I wrote the APIs for the image upload in server.js:
![](https://i.imgur.com/0kB7RpX.png)
 
In the upload POST API, the upload preset 'agora' is defined as the destination for the image file to be uploaded to. In the images GET API, the images are fetched from the Cloudinary preset so that they can be used in the app and shown to users. Cloudinary image objects have a public ID property which is used to identify specific images.
 
While Postman was used to check the backend APIs throughout the project, I mainly used the Cloudinary website to check that the image upload APIs were working as I could see if the images were appearing in the Cloudinary folder or not:
![](https://i.imgur.com/0DjrrHR.png)
 
### Stage 3: Testing and Styling
Continuously testing our functions through the development process helped us minimise bugs and stay on track for delivering the project. We consulted eachother as a team frequently to gather a variety opinions and test eachother's code to make sure that we had as many eyes and minds available to scope out any issues. We commonly used console.log statements when debugging to see where we were successfully gathering information and where we failed to do so, which pointed us in the right direction when it came to problem solving.
 
We wanted our site to be easy to navigate, have a clean, fresh look and feel smooth for the user. For this reason we wanted to use a theme of white, blue and black which was simple, bright and aesthetically pleasing.
![](https://i.imgur.com/CJtFyh6.png)
We used cards to display products on the home page that could be clicked to expand the product details:
![](https://i.imgur.com/TRLpqB8.png)
The product carousel on the home page was a feature that we added that definitely added an extra stylistic element to the website:
![](https://i.imgur.com/1Hb13er.png)
We used external code for this effect, where a user could scroll through the slider's products by clicking the left and right arrows:
![](https://i.imgur.com/GwVJId6.png)
 
### Stage 4: Deployment
 
I was in charge of deploying the project, which meant having everyone's up-to-date code in the dev branch. I then made pull requests from dev to master in order to have the latest code in the master. As two separate repositories were created for the frontend and backend, I configured build settings in package.json then ran npm build in the terminal to create a production build of the app that combined the frontend and backend files. I then created a Heroku repository and pushed the built app there to deploy it.
 
### Bonus features / stretch goals
Given the size of the task of creating a marketplace app in the timeframe of a week, we did not manage to implement bonus features such as
## Challenges
As group leader, I was responsible for merging code, resolving conflicts and ultimately deploying the project. For most of the project, the teammates worked in separate folders and merge conflicts did not arise often- the frontend pair stayed in the frontend, the backend pair stayed in the backend. Towards the end of the project, this started to change as we had created the structure of our app and had to start venturing into full-stack code implementation for other features, in my case Cloudinary which required me to code both backend and frontend. This caused merge conflicts in some scenarios, which were ultimately resolved upon consultation with my teammates and careful selection of which changes to accept, however it was time consuming.
 
Other than this, I wasn't very confident with my ability in React going into the project, however with enough practice and overcoming frustration it started to make sense to me. It seemed like a completely different approach to building an app compared to working with Django (SEI Project 3) or Express (SEI Project 2), especially considering the group was split into backend and frontend. This put extra importance on communication within the team, as we had to make sure that where we were accurate in how referenced eachother's work when calling server-side APIs in the frontend or sending form data from the client-side to the backend.
 
I must take this opportunity to say that my teammates had excellent work ethic, communicated very well with eachother and created a real support network where we wasted no time in coming to eachother's aid.
 
## Wins
 
Getting a marketplace app with so many React components to work smoothly and be functional was a feat that I am so proud of. The scope of the project was immense and we worked hard and supported eachother to get it done.
 
Getting the image upload to work, especially on the deployed project, was a big win for me. Considering that with the deployment of previous projects Heroku would erase any image files after a certain amount of time, I wanted to make sure that this project wouldn't have the same issues. Given that images are used on practically every page on the site, I'm happy that I got the upload and display functionalities working.
 
 
## Key Learnings
 
My general comprehension of React and its benefits for building user interfaces grew significantly throughout the project and I understand why it is such a popular library in the industry. I've become more comfortable with the concepts of props, states, and components.
 
I've learnt that I can work well not just as a team mate but also as in a leadership role. I gave full cooperation and understood that taking the role of team leader by default meant taking on a lot more responsibility than I had taken before. I performed well in this scenario as I was always in the loop with my group, staying on top of what everyone was doing and any issues that came up. I wasted no time in merging pull requests and resolving conflicts whenever they appeared.
 
 
## Bugs
Images uploaded that have a file size of over 100kB are not displayed.
 
## Future Improvements
I've learnt that the component files could have had been structured and the actual components nested in a more organised way. I would also like to add a review feature for purchased products in the future.
