CSE 316: Fundamentals of Software Development

Stony Brook University

Programming Assignment #1

Spring 2021

Assignment Due: Feb 25, 2022, 11:59 PM


Learning Outcomes

After completing this homework assignment, you will be able to

Create static web pages using HTML/CSS.
Add dynamic behavior to web pages using JavaScript.
Implement a basic MVC architecture.


Getting Started

Download/clone your personal GitHub repository. The main HTML page for this application is index.html. This is the file, we will use to startup your application in a browser. This file includes a JavaScript module src/index.js that is used to power the dynamic behavior of the application. The file is empty. You should write your code in this file. Also, this file imports src/model.js which defines the data model underlying the application. Any operations to query or update the model should be included in this file.

Note we are following a Model-View-Controller architecture in this homework assignment. The view part of the application is the HTML page index.html. The controller is the JavaScript module src/index.js. The underlying data model is in src/model.js. You can create other JavaScript modules in the src directory. 

You will need to install a local web server for this homework. Once you install the web server as an extension to the Chrome browser, you can start it and share the repository directory with the server. This is required since we are importing JavaScript as modules from the local filesystem. This is not allowed when JavaScript runs in a browser to prevent security threats via CORS. This is fine for our purpose as we are working in a local development environment. In fact, most development teams follow a similar approach in their local development environments. In a production environment, all resources including JavaScript modules are imported over HTTP. Therefore, there is no cross-origin resource sharing due to importing modules from the local filesystem.

Grading

We will clone your repository and test your code in the Chrome web browser. You will get points for each functionality implemented. Make sure you test your code in Chrome. The rubric we will use is shown below:

Banner: 10 pts.
All Questions Page: 13 pts.
Post a New question: 15 pts.
Searching by text: 10 pts.
Searching by tags: 10 pts.
Answers Page: 10 pts.
Post a new answer: 12 pts.
All Tags page: 10 pts.
Questions of a tag: 10 pts. 

Total points: 100 pts.

Introduction

In this assignment, we will create a mock stackoverflow.com web application using HTML, CSS, and JavaScript. All subsequent assignments will be about adding more functionality to what we build here. 

Stack Overflow is a question-and-answer website for programmers. In this version, we will develop a prototype where users will be able to browse questions in the system, ask their own questions, and answer questions asked.


Data Model

The primary data elements we need to store for this application are questions, tags, and answers. To this end, we will use a JavaScript Object to represent the application data in memory. The object has the following attributes:

questions. A list of Question objects.
tags. A list of Tag object.
answers. A list of Answer objects.

The Question object has the following attributes:
qid. A unique string used to uniquely identify this question.
title. A string to hold this question’s title. The max length of the string is 100.
text. A string to hold this question text.
tagIds. A list of strings to hold the tag ids of tags associated with this question.
askedBy. A string to indicate the username associated with this question.
askedOn. A string to indicate the date of this question.
askedAt. A string to indicate the time of this question.
answers. A list of strings to hold the answers ids of answers associated with this question.
views. A number to indicate the no. of times the question has been viewed.

The Tag object has the following attributes:
tid. A unique string used to uniquely identify this tag.
name. A string to hold this tag’s name.

The Answer object has the following attributes:
aid. A unique string used to uniquely identify this answer.
text. A string to hold this answer’s text.
ansBy. A string to indicate the username associated with this answer.
ansOn. A string to indicate the date of this answer.
ansAt. A string to indicate the time of this answer.


See the class definition of this object in src/model.js in the code repository.

Since we are working with a client-side scripting language the data will not be persistent. This means that anytime the application is stopped and restarted, all the data created during that session will be lost and the application will begin with the initial state. This is fine for the purposes of this homework assignment. In later homework assignments, we will see how the application state can be persisted in a backend system using server-side scripting.

Application Behavior and Layout

We will mimic the original stackoverflow.com website as much as possible. Although, we won’t be implementing all of its features. You can visit stackoverflow.com for inspiration. The layout is quite simple. It has two parts – a banner and the main body. The banner should remain constant, that is, it should have the same UI elements throughout and should be displayed at the top of the page. The main body will be displayed below the banner and will render relevant content based on user interactions with the web page. 

Banner

The banner should have the following UI elements arranged horizontally:

A link with the name Questions.
A link with the name Tags.
The name of the application (Fake Stack Overflow).
A search box where users can do a text search. 


Below is an example of how the banner should look:



Notice that the banner has a light grey background. The links are styled as blocks with no borders. Hovering over a link with the mouse highlights them. For example, hovering on Tags should look as follows:



Similarly, hovering on Questions should look as follows:



The font sizes shown in the figures above and in all subsequent images are relative to this document. You should select font sizes so that your content is clearly visible and scales accurately when rendered in a full-sized browser window.

All Questions Page

When a user loads the application in the browser for the first time, the banner should be displayed at the top of the page.  The Questions Link should be highlighted with the color #0281E8 to indicate that the user is currently viewing all questions. The main body of the page should render all the questions that have been asked in a tabular format as follows:
 
A header row with 3 columns. The first column should display the text N Questions, where N is the total no. of questions that have been asked. The second column should display a title with the text All Questions to indicate that all questions that have been asked are being displayed. The third column should display a button with the label Ask A Question. The button should have the color code #165A92. The contents in the columns have no other style constraints. However, make sure that they are clearly visible.
The second column must occupy the maximum width. The first and the third columns should be of the same width but lesser than the second column.
A row for each question. A row should have 3 columns. 
The first column should display the text N1 answers first and then N2 views in separate lines, N1 is the no. of answers for the question and N2 is the no. of times the question has been viewed. 
The second column should display the question’s title as a link followed by a list of tags in a new line. Hovering over the title’s link should highlight the link with a deeper shade of the existing text color. The list of tags should have rounded borders and should be displayed beside each other. There should be 4 tags per line. For example, if the question has 7 tags, they should be displayed in two lines with the first line showing 4 tags and the next 3 tags.  
The third column should display three lines. The first line should display the text asked by <user>, where <user> is the username of the person that asked the question. The second line should display the text on <Month Day, Year> and the third line should display the time as at <hh: min>.
The questions should be displayed in ascending order of the day and time they were asked. In other words, the most recently asked questions should be displayed first.
Make sure that all fonts and content are clearly legible.
After each question row, a horizontal divider should be drawn. You can choose the style of this divider.
There should be no other borders surrounding the questions being displayed.
If the total no. of questions does not fit on the page, then the main body must be made scrollable. Note the banner must remain fixed to the top of the page.

Below is an example of how the page should look.








New Question Page

When a user clicks on the Ask A Question button, the main body section of the page should display a form with the following inputs fields:
A text box for question title. The title should not be more than 100 characters and should not be empty.
A text box for question text. Should not be empty.
A text box for a list of tags that should be associated with the question. This is a space-separated list.
A text box for the username of the user asking the question. The username should not be more than 15 characters.
There should be a button with the label Post Question and hex code #165A92 as the background color. Each field in the form should have an appropriate hint to help the user enter the appropriate data. An example of such a page is shown below:



When the Post Question button is pressed, the question should be added to the data object in model.js. If the question is added successfully then the main body section of the page should display all the questions including the question currently added in sorted order of the time they were posted. Further, the page should also display the total no. of questions, which should have incremented by 1. For example, in the page shown below, the first question displayed was most recently asked by the user jumanji using the inputs on the previous page.




An error will occur if unexpected data is entered in any of the input fields or a runtime error occurs when updating the data object. If an error occurs, the main body of the page should still display the form with appropriate error messages at the top of the form. The error messages’ font color should be red. For example, in the figure shown below, the user did not add any tags to the question and entered a username that is more than 15 characters.




Searching

A user can search for certain questions based on words occurring in the question text or title. On pressing the ENTER key, The search should return all questions for which their title or text contains at least one word in the search string. For example, in the example shown below, there is only one question in our data model that matches the search string.   



Further, if a user surrounds individual words with [] then all questions corresponding to each tagname in [] should be displayed. The search results should be displayed when the user presses the ENTER key. See the example in the figure below.

 
Note the searching is case-insensitive. A search string can contain a combination of [tagnames] and non-tag words. When this happens, all questions tagged with each [tagname] and all questions with text or title containing at least one of the non-tag words should be displayed.

If the search string does not match any question or tag names then display the No Questions Found. The total number of questions displayed should be 0 and the page title and the button should remain.



Answers Page

Clicking on a question link should increment by 1 the no. of views associated with the question and load the answers for that question in the main body of the page. Note the banner should still remain at the top of the page. The answers should be displayed in a tabular format as follows:

A header row with 3 columns. The first column should display the text N answers, where N is the total no. of answers given for the question. The second column should display the title of the question in bold. The third column should display a button with the label Ask A Question. You are free to add other style constraints to the elements other than what has already been mentioned. However, make sure that they are clearly visible.
The second column must occupy the maximum width followed by the first column and then the third column.
The second row should display 3 columns. 
The first column should display the text N views indicating the no. of times the question has been viewed (including this one). 
The second column should display the question text. 
The third column should display three lines. The first line should display the text asked by <user>, where <user> is the username of the person that asked the question. The second line should display the text on <Month Day, Year> and the third line should display the time as at <hh: min>.
The answers to the questions should be displayed in subsequent rows. An answer row should have 2 columns. 
The first column should display the answer. 
The second column should display three lines. The first line should display the text Ans by <user>, where <user> is the username of the person that asked the question. The second line should display the text on <Month Day, Year> and the third line should display the time as at <hh: min>.
If no. of answers do not fit on the page, then add a scroll bar.
The answers should be displayed in ascending order of the day and time they were posted. In other words, display the answers that were posted most recently first.
At the end of all the answers, you should display a button with the label Answer Question. This button should be centered relative to the page. It should have rounded borders on all four sides. It should have hex code #165A92 as the background color. Make sure that the button and the label are clearly visible.
After each answer row, a horizontal divider should be drawn. You can choose the style of this divider.
There should be no other borders surrounding the answers being displayed.


Shown below is an example of the ‘answers’ page for a question.




Pressing the Ask A Question button on this page will render elements as described in the New Question Page section.

New Answer Page

Pressing the Answer Question button will display a page with input elements to enter the new answer text and username. Note the banner should remain at the top of the page. The figure below shows an example of the same.




Pressing the Post Answer button, should capture the answer text and the username and update the data model. If the data entered satisfies all the necessary constraints and no runtime error occurs, then all the answers are displayed as shown on the Answers Page. As an example see the figure below.

 

Note how there are now 3 answers for this question since a new answer was posted.

If the answer text or username is empty and the username is more than 15 characters or a runtime error occurs, then display error messages in red on the same page similar to the new question page. 


Tags Page

Clicking on the Tags link in the banner should display the list of all tags in the system. Additionally, the Tags link in the banner should be highlighted with hex code #0281E8. The page should render the following elements in a tabular format:

A header row with 3 columns. The first column should display the text N Tags in the first column, N is the no. of tags in the system. The second column should display the text All Tags. The third column should display the button with the label Ask A Question. This is the same button that was described in the Questions and Answers pages.
The following rows should display the tags in groups of 3, that is, each row should have at most 3 tags. Each tag should be displayed in a block with black-colored borders. The block should display the tag name as a link and the no. of questions associated with the tag in a new line in the same block. 
The figure below shows an example of the page.



Upon clicking a tag link, the questions associated with the tag should be displayed. For example, if the javascript tag is clicked then the page shown below is displayed. All questions associated with the javascript tag are rendered.



Submitting Code

You can submit code to your GitHub repository as many times as you want till the deadline. After the deadline, any code you submit will be rejected. To submit a file to the remote repository, you first need to add it to the local git repository in your system, that is, the directory where you cloned the remote repository initially. Use the following commands from your terminal:
$ cd /path/to/cse316-hw1-<username> (skip if you are already in this directory)
$ git add <filename-you-want-to-add>
To submit your work to the remote GitHub repository, you will need to commit the file (with a message) and push the file to the repository. Use the following commands:
$ git commit -m "<your-custom-message>"
$ git push
Finally, submit your GitHub username to the listing created in Blackboard for this homework. This will help us locate your repository easily. 
 
