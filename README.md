# Tech-Blog

## Description

The task is to build a CMS-style blog site similar to a Wordpress site, where developers can publish their blog posts and comment on other developers’ posts as well.

## Demo

<a href="https://deployed-tech-blog-8625437294f2.herokuapp.com/">Deployed Link</a>

<a href="https://drive.google.com/file/d/13U3wn3WQFRhTGX04b23MIu4ER9luMZMk/view?usp=drive_link">Tech Blog Demo Vid</a>

## Installation

Copy repo and enter `npm install` in your code editor's terminal to install any necessary dependencies. Run the command `npm start` to start the application locally. You must have mysql, sequelize, express-handlebars, express, bcrypt, express-session, and connect-session-sequelize for this application to run properly.

## Usage

Once navigating to the localhost, you will be met by the homepage where you can see all the posts on the website. If you try to leave a comment or navigated to the dashboard, you will be prompted to either login or signup. Once you log in or an account is created you will be redirected to the dashboard. There you can create a new post. After it is created you can either edit or delete the post. Navigate to the homepage and you will be met with your posts as well as posts made by other users. You can comment on their posts (be nice!).

## Credits

I authored this with help of Wash U in Saint Louis Coding Bootcamp coursework, Stack Overflow, and W3Schools. This was my first time using ajax so I had to refer to their documentation for proper implementation.

## User Story

As a developer who writes about tech, I want a CMS-style blog site so that I can publish articles, blog posts, my thoughts, and opinions.

## Acceptance Criteria

GIVEN a CMS-style blog site

WHEN I visit the site for the first time

THEN I am presented with the homepage, which includes existing blog posts if any have been posted; navigation links for the homepage and the dashboard; and the option to log in

WHEN I click on the homepage option

THEN I am taken to the homepage

WHEN I click on any other links in the navigation

THEN I am prompted to either sign up or sign in

WHEN I choose to sign up

THEN I am prompted to create a username and password

WHEN I click on the sign-up button

THEN my user credentials are saved and I am logged into the site

WHEN I revisit the site at a later time and choose to sign in

THEN I am prompted to enter my username and password

WHEN I am signed in to the site

THEN I see navigation links for the homepage, the dashboard, and the option to log out

WHEN I click on the homepage option in the navigation

THEN I am taken to the homepage and presented with existing blog posts that include the post title and the date created

WHEN I click on an existing blog post

THEN I am presented with the post title, contents, post creator’s username, and date created for that post and have the option to leave a comment

WHEN I enter a comment and click on the submit button while signed in

THEN the comment is saved and the post is updated to display the comment, the comment creator’s username, and the date created

WHEN I click on the dashboard option in the navigation

THEN I am taken to the dashboard and presented with any blog posts I have already created and the option to add a new blog post

WHEN I click on the button to add a new blog post

THEN I am prompted to enter both a title and contents for my blog post

WHEN I click on the button to create a new blog post

THEN the title and contents of my post are saved and I am taken back to an updated dashboard with my new blog post

WHEN I click on one of my existing posts in the dashboard

THEN I am able to delete or update my post and taken back to an updated dashboard

WHEN I click on the logout option in the navigation

THEN I am signed out of the site

WHEN I am idle on the site for more than a set time

THEN I am able to view posts and comments but I am prompted to log in again before I can add, update, or delete posts

## Contact Me

Email: [devinjl665@gmail.com](mailto:devinjl665@gmail.com?subject=[GitHub]%20Source%20Han%20Sans)