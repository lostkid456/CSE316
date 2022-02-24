import Model from "./model.js";

// View for Questions Page
class View {
  controller;
  previous;
  constructor() {
    // Meta Tag
    this.head = document.getElementsByTagName("head");
    this.meta = document.createElement("meta");
    this.meta.setAttribute("name", "viewport");
    this.meta.setAttribute("content", "width=device-width");
    this.meta.setAttribute("inital-scale", "1.0");
    this.head[0].appendChild(this.meta);

    // Question Link
    this.question = document.createElement("a");
    this.question.setAttribute("id", "question");
    this.question.style.backgroundColor = "#0281E8";
    this.question.appendChild(document.createTextNode("Questions"));

    // Tags Link
    this.tags = document.createElement("a");
    this.tags.setAttribute("id", "tags");
    this.tags.appendChild(document.createTextNode("Tags"));

    // Banner Header
    this.banner = document.getElementById("banner");
    this.banner_header = document.createElement("h1");
    this.banner_header.appendChild(
      document.createTextNode("Fake Stack Overflow")
    );

    // Searchbar
    this.search = document.createElement("form");
    this.searchbar = document.createElement("input");
    this.searchbar.style.fontSize = "14pt";
    this.searchbar.setAttribute("autocomplete", "off");
    this.searchbar.setAttribute("id", "search");
    this.searchbar.setAttribute("type", "text");
    this.searchbar.setAttribute("placeholder", "Search...");
    this.search.appendChild(this.searchbar);

    // Adding all componenets to the banner header
    this.banner.appendChild(this.question);
    this.banner.appendChild(this.tags);
    this.banner.appendChild(this.banner_header);
    this.banner.appendChild(this.search);

    // Other components
    this.main = document.getElementById("main");
    this.ask_button = document.createElement("input");
    this.submit_button = document.createElement("input");
    this.new_answer_button = document.createElement("input");
    this.submit_answer_button = document.createElement("input");
  }

  setController(c) {
    this.controller = c;
  }

  // Displays Questions Page
  questionsDisplay(model) {
    // Remove previous elements to rerender (if any)
    while (this.main.childNodes.length > 0) {
      this.main.removeChild(this.main.childNodes[0]);
    }
    
    this.question.style.backgroundColor = "#0281E8";
    this.question.addEventListener("mouseout", function (event) {
      event.target.style.backgroundColor = "#0281E8";
    });
    this.tags.style.backgroundColor = "lightgrey";
    this.tags.addEventListener("mouseout", function (event) {
      event.target.style.backgroundColor = "lightgrey";
    });
    this.tags.addEventListener("mouseover", function (event) {
      event.target.style.backgroundColor = "grey";
    });

    // Questions Array from Model
    var questions = model.data.questions;

    // Div for top row header
    const header_div = document.createElement("div");
    header_div.setAttribute("class", "question_header");
    header_div.setAttribute("id", "question_header");

    //Left Header
    const column_left = document.createElement("div");
    column_left.setAttribute("class", "column side");
    const number = document.createElement("h1");
    if (questions.length == 1) {
      number.appendChild(
        document.createTextNode(questions.length + " Question")
      );
    } else {
      number.appendChild(
        document.createTextNode(questions.length + " Questions")
      );
    }
    column_left.appendChild(number);

    //Middle Header
    const column_middle = document.createElement("div");
    column_middle.setAttribute("class", "column middle");
    const all_questions = document.createElement("h1");
    all_questions.appendChild(document.createTextNode("All Questions"));
    column_middle.appendChild(all_questions);

    //Right Header
    const column_right = document.createElement("div");
    column_right.setAttribute("class", "column side");
    const question_button = document.createElement("form");
    column_right.appendChild(question_button);
    this.ask_button.setAttribute("type", "button");
    this.ask_button.setAttribute("value", "Ask a Question");
    this.ask_button.style.backgroundColor = "#165A92";
    this.ask_button.style.color = "white";
    this.ask_button.style.borderRadius = "5px";
    this.ask_button.style.padding = "15px 15px";
    question_button.appendChild(this.ask_button);

    header_div.appendChild(column_left);
    header_div.appendChild(column_middle);
    header_div.appendChild(column_right);

    // Adding the row header to main
    this.main.appendChild(header_div);

    // Set up rows for each question

    // New div for the row display
    const displayDiv = document.createElement("div");
    displayDiv.setAttribute("class", "question_display");
    displayDiv.setAttribute("id", "question_display");

    // Display using a table
    const displayTable = document.createElement("table");
    displayTable.style.width = "100%";
    // Sorts the question data
    questions.sort(function (a, b) {
      let a_string = a.askedOn.replace(",", "").split(" ");
      let b_string = b.askedOn.replace(",", "").split(" ");
      let a_date = new Date(
        a_string[0] + " " + a_string[1] + " " + a_string[2] + " " + a.askedAt
      );
      let b_date = new Date(
        b_string[0] + " " + b_string[1] + " " + b_string[2] + " " + b.askedAt
      );
      if (a_date - b_date > 0) {
        return -1;
      } else if (a_date - b_date < 0) {
        return 1;
      } else {
        return 0;
      }
    });

    // Display the rows
    for (let i = 0; i < questions.length; i++) {
      // First column
      const table_row = document.createElement("tr");
      table_row.style.width = "100%";
      const column_one = document.createElement("td");
      const column_one_text = document.createElement("pre");
      column_one_text.appendChild(
        document.createTextNode(
          questions[i].views +
            " Views\n  " +
            questions[i].answers.length +
            " Answers"
        )
      );
      column_one.appendChild(column_one_text);

      // Second column
      const column_two = document.createElement("td");
      const link_div = document.createElement("div");

      // link.setAttribute("href","");
      const link = document.createElement("a");
      link.appendChild(document.createTextNode(questions[i].title));
      link.style.color = "#0281E8";
      link.addEventListener("mouseout", function () {
        link.style.color = "#0281E8";
      });
      link.addEventListener("mouseover", function () {
        link.style.color = "blue";
      });
      link.setAttribute("id", i);
      var that = this;
      link.addEventListener("click", function () {
        that.setupLink(link);
      });
      link_div.appendChild(link);
      column_two.appendChild(link_div);
      const tags_div = document.createElement("div");
      column_two.appendChild(tags_div);
      const tag_container = document.createElement("div");
      tag_container.setAttribute("class", "tag_container");
      for (let j = 0; j < questions[i].tagIds.length; j++) {
        const new_tag = document.createElement("div");
        const tag_link = document.createElement("a");
        tag_link.style.color = "white";
        tag_link.style.border = "5px solid grey";
        tag_link.style.borderRadius = "10px";
        tag_link.style.backgroundColor = "grey";
        tag_link.appendChild(
          document.createTextNode(model.getNamefromTid(questions[i].tagIds[j]))
        );
        new_tag.appendChild(tag_link);
        tag_container.appendChild(new_tag);
      }
      tags_div.appendChild(tag_container);
      column_two.appendChild(tags_div);

      // Third column
      const column_three = document.createElement("td");
      const column_three_text = document.createElement("pre");
      column_three_text.style.textAlign = "right";
      column_three_text.append(document.createTextNode("Asked by: "));
      const user_span = document.createElement("span");
      user_span.appendChild(document.createTextNode(questions[i].askedBy));
      user_span.style.color = "blue";
      const date_span = document.createElement("span");
      date_span.appendChild(document.createTextNode(questions[i].askedOn));
      date_span.style.color = "green";
      const time_span = document.createElement("span");
      time_span.appendChild(document.createTextNode(questions[i].askedAt));
      time_span.style.color = "green";
      column_three_text.append(user_span);
      column_three_text.append(document.createTextNode("\nOn "));
      column_three_text.append(date_span);
      column_three_text.append(document.createTextNode("\nAt "));
      column_three_text.append(time_span);
      column_three.appendChild(column_three_text);

      // Add first, second, and third column to the row
      table_row.appendChild(column_one);
      table_row.appendChild(column_two);
      table_row.appendChild(column_three);
      displayTable.appendChild(table_row);
    }
    displayDiv.appendChild(displayTable);
    this.main.appendChild(displayDiv);
  }

  // Displays the page for New Question
  createNew() {
    // Clears the page except for the top bar
    while (this.main.childNodes.length > 0) {
      this.main.removeChild(this.main.childNodes[0]);
    }

    // Fixes mouse hover on Questions tab
    this.question.style.backgroundColor = "lightgrey";
    this.question.addEventListener("mouseout", function (event) {
      event.target.style.backgroundColor = "lightgrey";
    });
    this.question.addEventListener("mouseover", function (event) {
      event.target.style.backgroundColor = "grey";
    });
    this.tags.style.backgroundColor = "lightgrey";
    this.tags.addEventListener("mouseout", function (event) {
      event.target.style.backgroundColor = "lightgrey";
    });
    this.tags.addEventListener("mouseover", function (event) {
      event.target.style.backgroundColor = "grey";
    });

    // Container holding the New Question Page
    const new_question_container = document.createElement("div");
    new_question_container.setAttribute("class", "new_question");

    const error_space = document.createElement("div");
    error_space.setAttribute("id", "error");
    new_question_container.appendChild(error_space);

    // Creates a form because the New Question Page is a form
    const question_form = document.createElement("form");
    new_question_container.appendChild(question_form);

    // Title of the question
    const question_title = document.createElement("div");
    const title_header = document.createElement("h1");
    title_header.appendChild(document.createTextNode("Question Title"));
    const title_note = document.createElement("h2");
    title_note.style.fontSize = "medium";
    title_note.appendChild(
      document.createTextNode("Title should not be more than 100 Characers")
    );
    const title_box = document.createElement("textarea");
    title_box.setAttribute("id", "title_box");
    title_box.setAttribute("rows", "2");
    title_box.setAttribute("cols", "100");
    title_box.style.fontSize = "14pt";
    question_title.appendChild(title_header);
    question_title.appendChild(title_note);
    question_title.appendChild(title_box);
    question_form.appendChild(question_title);

    // Text of question
    const question_text = document.createElement("div");
    const text_title = document.createElement("h1");
    text_title.appendChild(document.createTextNode("Question Text"));
    question_text.appendChild(text_title);
    const text_note = document.createElement("h2");
    text_note.style.fontSize = "medium";
    text_note.appendChild(document.createTextNode("Add details"));
    question_text.appendChild(text_note);
    const text_box = document.createElement("textarea");
    text_box.setAttribute("id", "text_box");
    text_box.setAttribute("rows", "5");
    text_box.setAttribute("cols", "100");
    text_box.style.fontSize = "14pt";
    question_text.appendChild(text_box);
    question_form.appendChild(question_text);

    // Tag of question
    const question_tags = document.createElement("div");
    const tag_title = document.createElement("h1");
    tag_title.appendChild(document.createTextNode("Tags"));
    question_tags.appendChild(tag_title);
    const tag_note = document.createElement("h2");
    tag_note.appendChild(
      document.createTextNode("Add keywords seperated by whitespace")
    );
    tag_note.style.fontSize = "medium";
    question_tags.appendChild(tag_note);
    const tag_box = document.createElement("textarea");
    tag_box.setAttribute("id", "tag_box");
    tag_box.setAttribute("rows", "2");
    tag_box.setAttribute("cols", "100");
    tag_box.style.fontSize = "14pt";
    question_tags.appendChild(tag_box);
    question_form.appendChild(question_tags);

    // User name of person asking
    const user_name = document.createElement("div");
    const user_title = document.createElement("h1");
    user_title.appendChild(document.createTextNode("Username"));
    user_name.appendChild(user_title);
    const user_note = document.createElement("h2");
    user_note.appendChild(
      document.createTextNode("Should not be more than 15 characters")
    );
    user_note.style.fontSize = "medium";
    user_name.appendChild(user_note);
    const user_box = document.createElement("textarea");
    user_box.setAttribute("id", "user_box");
    user_box.setAttribute("rows", "1");
    user_box.setAttribute("cols", "100");
    user_box.style.fontSize = "14pt";
    user_name.appendChild(user_box);
    question_form.appendChild(user_name);

    // For post button
    const post = document.createElement("div");
    this.submit_button.setAttribute("type", "button");
    this.submit_button.setAttribute("value", "Post Question");
    this.submit_button.style.backgroundColor = "#165A92";
    this.submit_button.style.color = "white";
    this.submit_button.style.fontSize = "large";
    this.submit_button.style.borderRadius = "5px";
    this.submit_button.style.height = "50px";
    post.appendChild(this.submit_button);
    post.style.paddingTop = "50px";
    question_form.appendChild(post);

    // Adding all elements to the main div
    this.main.appendChild(new_question_container);
  }

  // Sets up the button from the New Questions page when it is clicked so
  // that the controller can handle the input
  setUpAddQuestion(handle) {
    this.submit_button.addEventListener("click", handle);
  }

  // Renders the page for search result
  renderSearch(model,arr) {
    // From the query result, we get the corresponding data from the model
    const questions = [];

    arr.forEach(map);

    function map(value) {
      questions.push(model.getDatafromName(value));
    }

    // Remove previous elements to rerender (if any)
    while (this.main.childNodes.length > 0) {
      this.main.removeChild(this.main.childNodes[0]);
    }

    // Fixes mouse hover on Questions and Tags tab
    this.question.style.backgroundColor = "lightgrey";
    this.question.addEventListener("mouseout", function (event) {
      event.target.style.backgroundColor = "lightgrey";
    });
    this.question.addEventListener("mouseover", function (event) {
      event.target.style.backgroundColor = "grey";
    });
    this.tags.style.backgroundColor = "lightgrey";
    this.tags.addEventListener("mouseout", function (event) {
      event.target.style.backgroundColor = "lightgrey";
    });
    this.tags.addEventListener("mouseover", function (event) {
      event.target.style.backgroundColor = "grey";
    });

    // Div for top row header
    const header_div = document.createElement("div");
    header_div.setAttribute("class", "question_header");
    header_div.setAttribute("id", "question_header");

    //Left Header
    const column_left = document.createElement("div");
    column_left.setAttribute("class", "column side");
    const number = document.createElement("h1");
    if (arr.length == 1) {
      number.appendChild(document.createTextNode(arr.length + " Question"));
    } else {
      number.appendChild(document.createTextNode(arr.length + " Questions"));
    }
    column_left.appendChild(number);

    //Middle Header
    const column_middle = document.createElement("div");
    column_middle.setAttribute("class", "column middle");
    const all_questions = document.createElement("h1");
    all_questions.appendChild(document.createTextNode("Search Results"));
    column_middle.appendChild(all_questions);

    //Right Header
    const column_right = document.createElement("div");
    column_right.setAttribute("class", "column side");
    const question_button = document.createElement("form");
    column_right.appendChild(question_button);
    this.ask_button.setAttribute("type", "button");
    this.ask_button.setAttribute("value", "Ask a Question");
    this.ask_button.style.backgroundColor = "#165A92";
    this.ask_button.style.color = "white";
    this.ask_button.style.borderRadius = "5px";
    this.ask_button.style.padding = "15px 15px";
    question_button.appendChild(this.ask_button);

    header_div.appendChild(column_left);
    header_div.appendChild(column_middle);
    header_div.appendChild(column_right);

    // Adding the row header to main
    this.main.appendChild(header_div);

    // New div for the row display
    const displayDiv = document.createElement("div");
    displayDiv.setAttribute("class", "question_display");
    displayDiv.setAttribute("id", "question_display");

    // Display using a table
    const displayTable = document.createElement("table");
    displayTable.style.width = "100%";

    // Display the rows
    for (let i = 0; i < questions.length; i++) {
      // First column
      const table_row = document.createElement("tr");
      table_row.style.width = "100%";
      const column_one = document.createElement("td");
      const column_one_text = document.createElement("pre");
      column_one_text.appendChild(
        document.createTextNode(
          questions[i].views +
            " Views\n  " +
            questions[i].answers.length +
            " Answers"
        )
      );
      column_one.appendChild(column_one_text);

      // Second column
      const column_two = document.createElement("td");
      const link_div = document.createElement("div");
      const link = document.createElement("a");
      // link.setAttribute("href","");
      link.appendChild(document.createTextNode(questions[i].title));
      link.style.color = "#0281E8";
      link.addEventListener("mouseout", function () {
        link.style.color = "#0281E8";
      });
      link.addEventListener("mouseover", function () {
        link.style.color = "blue";
      });
      link.setAttribute("id", i);
      var that = this;
      link.addEventListener("click", function () {
        that.setupLink(link);
      });
      link_div.appendChild(link);
      column_two.appendChild(link_div);
      const tags_div = document.createElement("div");
      column_two.appendChild(tags_div);
      const tag_container = document.createElement("div");
      tag_container.setAttribute("class", "tag_container");
      for (let j = 0; j < questions[i].tagIds.length; j++) {
        const new_tag = document.createElement("div");
        const tag_link = document.createElement("a");
        tag_link.style.color = "white";
        tag_link.style.border = "5px solid grey";
        tag_link.style.borderRadius = "10px";
        tag_link.style.backgroundColor = "grey";
        tag_link.appendChild(
          document.createTextNode(model.getNamefromTid(questions[i].tagIds[j]))
        );
        new_tag.appendChild(tag_link);
        tag_container.appendChild(new_tag);
      }
      tags_div.appendChild(tag_container);
      column_two.appendChild(tags_div);

      // Third column
      const column_three = document.createElement("td");
      const column_three_text = document.createElement("pre");
      column_three_text.style.textAlign = "right";
      column_three_text.append(document.createTextNode("Asked by: "));
      const user_span = document.createElement("span");
      user_span.appendChild(document.createTextNode(questions[i].askedBy));
      user_span.style.color = "blue";
      const date_span = document.createElement("span");
      date_span.appendChild(document.createTextNode(questions[i].askedOn));
      date_span.style.color = "green";
      const time_span = document.createElement("span");
      time_span.appendChild(document.createTextNode(questions[i].askedAt));
      time_span.style.color = "green";
      column_three_text.append(user_span);
      column_three_text.append(document.createTextNode("\nOn "));
      column_three_text.append(date_span);
      column_three_text.append(document.createTextNode("\nAt "));
      column_three_text.append(time_span);
      column_three.appendChild(column_three_text);

      // Add first, second, and third column to the row
      table_row.appendChild(column_one);
      table_row.appendChild(column_two);
      table_row.appendChild(column_three);
      displayTable.appendChild(table_row);
    }

    displayDiv.appendChild(displayTable);
    this.main.appendChild(displayDiv);
  }

  renderAnswer(value, model) {
    const data = model.getDatafromName(value.innerHTML);

    this.previous = value;

    const answers = [];

    data.answers.forEach(getAnswer);

    function getAnswer(value) {
      for (let i = 0; i < model.data.answers.length; i++) {
        if (model.data.answers[i].aid == value) {
          answers.push(model.data.answers[i]);
        }
      }
    }

    // Remove previous elements to rerender (if any)
    while (this.main.childNodes.length > 0) {
      this.main.removeChild(this.main.childNodes[0]);
    }

    // Fixes mouse hover on Questions and Tags tab
    this.question.style.backgroundColor = "lightgrey";
    this.question.addEventListener("mouseout", function (event) {
      event.target.style.backgroundColor = "lightgrey";
    });
    this.question.addEventListener("mouseover", function (event) {
      event.target.style.backgroundColor = "grey";
    });
    this.tags.style.backgroundColor = "lightgrey";
    this.tags.addEventListener("mouseout", function (event) {
      event.target.style.backgroundColor = "lightgrey";
    });
    this.tags.addEventListener("mouseover", function (event) {
      event.target.style.backgroundColor = "grey";
    });

    // Div for top row header
    const header_div = document.createElement("div");
    header_div.setAttribute("class", "answer_header");
    header_div.setAttribute("id", "answer_header");

    //Left Header
    const column_left = document.createElement("div");
    column_left.setAttribute("class", "column side");
    const number = document.createElement("h1");
    if (data.answers.length == 1) {
      number.appendChild(
        document.createTextNode(data.answers.length + " Answer")
      );
    } else {
      number.appendChild(
        document.createTextNode(data.answers.length + " Answers")
      );
    }
    column_left.appendChild(number);

    //Middle Header
    const column_middle = document.createElement("div");
    column_middle.setAttribute("class", "column middle");
    const all_questions = document.createElement("h1");
    all_questions.appendChild(document.createTextNode(value.innerHTML));
    column_middle.appendChild(all_questions);

    //Right Header
    const column_right = document.createElement("div");
    column_right.setAttribute("class", "column side");
    const question_button = document.createElement("form");
    column_right.appendChild(question_button);
    this.ask_button.setAttribute("type", "button");
    this.ask_button.setAttribute("value", "Ask a Question");
    this.ask_button.style.backgroundColor = "#165A92";
    this.ask_button.style.color = "white";
    this.ask_button.style.borderRadius = "5px";
    this.ask_button.style.padding = "15px 15px";
    question_button.appendChild(this.ask_button);

    header_div.appendChild(column_left);
    header_div.appendChild(column_middle);
    header_div.appendChild(column_right);

    // Adding the row header to main
    this.main.appendChild(header_div);

    // Div for displaying the rest of the Answers page
    const answer_div = document.createElement("div");
    answer_div.setAttribute("class", "answer_div");
    this.main.appendChild(answer_div);

    // Use a table to display the rest of the Answers page
    const answer_table = document.createElement("table");
    answer_table.setAttribute("class", "answer_table");
    answer_div.appendChild(answer_table);

    // Sorts the answers data
    answers.sort(function (a, b) {
      let a_string = a.ansOn.replace(",", "").split(" ");
      let b_string = b.ansOn.replace(",", "").split(" ");
      let a_date = new Date(
        a_string[0] + " " + a_string[1] + " " + a_string[2] + " " + a.ansAt
      );
      let b_date = new Date(
        b_string[0] + " " + b_string[1] + " " + b_string[2] + " " + b.ansAt
      );
      if (a_date - b_date > 0) {
        return -1;
      } else if (a_date - b_date < 0) {
        return 1;
      } else {
        return 0;
      }
    });

    // First row of table
    const first_row = document.createElement("tr");
    first_row.setAttribute("class", "first_row");

    //Left
    const left_header = document.createElement("th");
    left_header.appendChild(document.createTextNode(data.views + " Views"));

    //Middle
    const middle_header = document.createElement("th");
    middle_header.appendChild(document.createTextNode(data.text));

    //Right
    const right_header = document.createElement("th");
    const right_header_text = document.createElement("pre");
    right_header_text.style.textAlign = "right";
    right_header_text.append(document.createTextNode("Asked by: "));
    const user_span = document.createElement("span");
    user_span.appendChild(document.createTextNode(data.askedBy));
    user_span.style.color = "blue";
    const date_span = document.createElement("span");
    date_span.appendChild(document.createTextNode(data.askedOn));
    date_span.style.color = "green";
    const time_span = document.createElement("span");
    time_span.appendChild(document.createTextNode(data.askedAt));
    time_span.style.color = "green";
    right_header_text.append(user_span);
    right_header_text.append(document.createTextNode("\nOn "));
    right_header_text.append(date_span);
    right_header_text.append(document.createTextNode("\nAt "));
    right_header_text.append(time_span);
    right_header.appendChild(right_header_text);

    first_row.appendChild(left_header);
    first_row.appendChild(middle_header);
    first_row.appendChild(right_header);
    answer_table.append(first_row);

    for (let i = 0; i < answers.length; i++) {
      const other_rows = document.createElement("tr");
      other_rows.style.width = "100%";
      const first_col = document.createElement("td");
      first_col.appendChild(document.createTextNode(answers[i].text));
      const second_col = document.createElement("td");
      const second_text = document.createElement("pre");
      second_text.style.textAlign = "right";
      second_text.append(document.createTextNode("Ans by "));
      const user_span = document.createElement("span");
      user_span.appendChild(document.createTextNode(answers[i].ansBy));
      user_span.style.color = "blue";
      const date_span = document.createElement("span");
      date_span.appendChild(document.createTextNode(answers[i].ansOn));
      date_span.style.color = "green";
      const time_span = document.createElement("span");
      time_span.appendChild(document.createTextNode(answers[i].ansAt));
      time_span.style.color = "green";
      second_text.append(user_span);
      second_text.append(document.createTextNode("\nOn "));
      second_text.append(date_span);
      second_text.append(document.createTextNode("\nAt "));
      second_text.append(time_span);
      second_col.append(second_text);

      const empty_col = document.createElement("td");

      other_rows.append(first_col);
      other_rows.appendChild(empty_col);
      other_rows.append(second_col);

      answer_table.appendChild(other_rows);
    }

    // Button to answer a question
    const button_div = document.createElement("div");
    this.new_answer_button.setAttribute("type", "button");
    this.new_answer_button.setAttribute("value", "Answer Question");
    this.new_answer_button.style.backgroundColor = "#165A92";
    this.new_answer_button.style.color = "white";
    this.new_answer_button.style.fontSize = "large";
    this.new_answer_button.style.borderRadius = "5px";
    this.new_answer_button.style.height = "50px";
    button_div.style.paddingTop = "50px";
    button_div.style.paddingLeft = "600px";
    button_div.appendChild(this.new_answer_button);

    this.main.appendChild(button_div);
  }

  newAnswer() {
    // Remove previous elements to rerender (if any)
    while (this.main.childNodes.length > 0) {
      this.main.removeChild(this.main.childNodes[0]);
    }

    const answer_div = document.createElement("div");
    this.main.appendChild(answer_div);

    const error_space = document.createElement("div");
    error_space.setAttribute("id", "error");
    answer_div.appendChild(error_space);

    // Creates a form because the New Question Page is a form
    const answer_form = document.createElement("form");
    answer_div.appendChild(answer_form);

    // Text of the Answer
    const answer_text = document.createElement("div");
    answer_text.setAttribute("class", "answer_text");
    const text_header = document.createElement("h1");
    text_header.appendChild(document.createTextNode("Answer Text"));
    const text_box = document.createElement("textarea");
    text_box.setAttribute("id", "text_box");
    text_box.setAttribute("rows", "10");
    text_box.setAttribute("cols", "100");
    text_box.style.fontSize = "14pt";

    answer_text.appendChild(text_header);
    answer_text.appendChild(text_box);
    answer_form.appendChild(answer_text);

    // User
    const answer_user = document.createElement("div");
    answer_user.setAttribute("class", "answer_user");
    const user_header = document.createElement("h1");
    user_header.appendChild(document.createTextNode("Username"));
    const user_hint = document.createElement("h2");
    user_hint.appendChild(
      document.createTextNode("Should not be more than 15 characters.")
    );
    user_hint.style.fontSize = "medium";
    const user_box = document.createElement("textarea");
    user_box.setAttribute("id", "user_box");
    user_box.setAttribute("rows", "2");
    user_box.setAttribute("cols", "100");
    user_box.style.fontSize = "14pt";

    answer_user.appendChild(user_header);
    answer_user.appendChild(user_hint);
    answer_user.appendChild(user_box);
    answer_form.appendChild(answer_user);

    // Button
    const post = document.createElement("div");
    this.submit_answer_button.setAttribute("type", "button");
    this.submit_answer_button.setAttribute("value", "Post Answer");
    this.submit_answer_button.style.backgroundColor = "#165A92";
    this.submit_answer_button.style.color = "white";
    this.submit_answer_button.style.fontSize = "large";
    this.submit_answer_button.style.borderRadius = "5px";
    this.submit_answer_button.style.height = "50px";
    post.appendChild(this.submit_answer_button);
    post.style.paddingTop = "50px";
    post.style.paddingLeft = "20px";
    answer_form.appendChild(post);
  }

  handleTagsButton(model){
    // Remove previous elements to rerender (if any)
    while (this.main.childNodes.length > 0) {
      this.main.removeChild(this.main.childNodes[0]);
    }

    // Fixes mouse hover on Questions tab
    this.question.style.backgroundColor = "lightgrey";
    this.question.addEventListener("mouseout", function (event) {
      event.target.style.backgroundColor = "lightgrey";
    });
    this.question.addEventListener("mouseover", function (event) {
      event.target.style.backgroundColor = "grey";
    });

    this.tags.style.backgroundColor="#0281E8";
    this.tags.addEventListener("mouseout", function (event) {
      event.target.style.backgroundColor = "#0281E8";
    });

    const tags_map=new Map();
    model.data.questions.forEach(mapTags);

    function mapTags(value){
      for(let i=0;i<value.tagIds.length;i++){
        var name=model.getNamefromTid(value.tagIds[i]);
        if(tags_map.has(name)){
          tags_map.set(name,tags_map.get(name)+1);
        }else{
          tags_map.set(name,1);
        }
      }
    }

    // Div for top row header
    const header_div = document.createElement("div");
    header_div.setAttribute("class", "answer_header");
    header_div.setAttribute("id", "answer_header");

    //Left Header
    const column_left = document.createElement("div");
    column_left.setAttribute("class", "column side");
    const number = document.createElement("h1");
    number.appendChild(document.createTextNode(model.data.tags.length+" Tags"));
    column_left.appendChild(number);

    //Middle Header
    const column_middle = document.createElement("div");
    column_middle.setAttribute("class", "column middle");
    const all_tags = document.createElement("h1");
    all_tags.appendChild(document.createTextNode("All Tags"));
    column_middle.appendChild(all_tags);

    //Right Header
    const column_right = document.createElement("div");
    column_right.setAttribute("class", "column side");
    const question_button = document.createElement("form");
    column_right.appendChild(question_button);
    this.ask_button.setAttribute("type", "button");
    this.ask_button.setAttribute("value", "Ask a Question");
    this.ask_button.style.backgroundColor = "#165A92";
    this.ask_button.style.color = "white";
    this.ask_button.style.borderRadius = "5px";
    this.ask_button.style.padding = "15px 15px";
    question_button.appendChild(this.ask_button);
   
    header_div.appendChild(column_left);
    header_div.appendChild(column_middle);
    header_div.appendChild(column_right);

    this.main.append(header_div);

    const tag_container=document.createElement("div");
    tag_container.setAttribute("class", "tags_link_container");
    var that = this;    
    tags_map.forEach(traverseMap);

    function traverseMap(value,key){
      const linkdiv=document.createElement("div");
      linkdiv.setAttribute("class","linkdiv");
      const link=document.createElement("a");
      link.appendChild(document.createTextNode(key));
      link.style.color = "#0281E8";
      link.addEventListener("mouseout", function () {
        link.style.color = "#0281E8";
      });
      link.addEventListener("mouseover", function () {
        link.style.color = "blue";
      });
      link.addEventListener("click",function(){
        that.setUpTagsClick(link);
      });
      const count=document.createElement("h2");
      count.appendChild(document.createTextNode(value+" Questions"));
      linkdiv.appendChild(link);
      linkdiv.appendChild(count);
      tag_container.append(linkdiv);
    }
    this.main.append(tag_container);
  }

  // Sets up the Ask a Question button from the Questions page when it is clicked so
  // that the controller can handle the input
  setUpNew(handle) {
    this.ask_button.addEventListener("click", handle);
  }

  // Sets up the Question link
  setUpBack(handle) {
    this.question.addEventListener("click", handle);
  }

  // Sets up the searchbar when something is searched
  setUpSearch(handle) {
    this.searchbar.addEventListener("keypress", function (event) {
      if (event.key === "Enter") {
        event.preventDefault();
        handle();
      }
    });
  }

  // Sets up if a link is clicked
  setupLink(elem) {
    this.controller.handleLink(elem);
  }

  //Sets up if the Answer button is clicked
  setUpAnswer(handle) {
    this.new_answer_button.addEventListener("click", handle);
  }

  // Sets up if the Submit Answer button is clicked
  setupNewAnswer(handle) {
    this.submit_answer_button.addEventListener("click", handle);
  }

  // Sets up if Tags link is clicked
  setUpTags(handle){
    this.tags.addEventListener("click",handle);
  }

  //Sets up if a Tag is clicked
  setUpTagsClick(elem){
    this.controller.handleTagsLink(elem);
  }

}

class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    this.view.setController(this);
    this.view.setUpBack(this.handleBack);
    this.view.setUpNew(this.handleNew);
    this.view.setUpAddQuestion(this.handleAddQuestions);
    this.view.setUpSearch(this.handleSearch);
    this.view.setUpAnswer(this.handleNewAnswer);
    this.view.setupNewAnswer(this.handleNewAnswerButton);
    this.view.setUpTags(this.handleTagsButton);

    this.getupdatedQuestions(this.model);
  }

  handleBack = () => {
    this.view.questionsDisplay(this.model);
  };

  getupdatedQuestions(model) {
    this.view.questionsDisplay(model);
  }

  handleNew = () => {
    this.view.createNew();
  };

  handleAddQuestions = () => {
    // arr is return value of update fuction
    const arr = this.model.updateQuestions();
    // If arr is empty, then there are no errors
    if (arr.length == 0) {
      this.view.questionsDisplay(this.model);
    } else {
      // There are errors so we render the error messages
      while (document.getElementById("error").childNodes.length > 0) {
        document
          .getElementById("error")
          .removeChild(document.getElementById("error").childNodes[0]);
      }
      const error_message = document.createElement("pre");
      var str = "";
      for (let i = 0; i < arr.length; i++) {
        str += arr[i] + "\n";
      }
      error_message.appendChild(document.createTextNode(str));
      error_message.style.color = "red";
      error_message.style.textAlign = "center";
      document.getElementById("error").appendChild(error_message);
    }
  };

  handleSearch = () => {
    this.view.renderSearch(this.model,this.model.queryQuestion(this.view.searchbar.value));
    this.view.searchbar.value="";
  };

  handleLink = (val) => {
    this.model.updateView(val.innerHTML);
    this.view.renderAnswer(val, this.model);
  };

  handleNewAnswer = () => {
    this.view.newAnswer();
  };

  handleNewAnswerButton = () => {
    const arr = this.model.updateAnswers(this.view.previous);
    if (arr.length == 0) {
      this.view.renderAnswer(this.view.previous, this.model);
    } else {
      while (document.getElementById("error").childNodes.length > 0) {
        document
          .getElementById("error")
          .removeChild(document.getElementById("error").childNodes[0]);
      }
      const error_message = document.createElement("pre");
      var str = "";
      for (let i = 0; i < arr.length; i++) {
        str += arr[i] + "\n";
      }
      error_message.appendChild(document.createTextNode(str));
      error_message.style.color = "red";
      error_message.style.textAlign = "center";
      document.getElementById("error").appendChild(error_message);
    }
  };

  handleTagsButton=()=>{
    this.view.handleTagsButton(this.model);
  }

  handleTagsLink=(val)=>{
    this.view.renderSearch(this.model,this.model.queryQuestion("["+val.innerHTML+"]"));
    const div=document.getElementsByClassName("column middle")[0];
    while(div.childNodes[0]){
      div.removeChild(div.childNodes[0]);
    }
    const h1=document.createElement("h1");
    h1.appendChild(document.createTextNode("Questions tagged ["+val.innerHTML+"]"));
    div.appendChild(h1);
  }

}

window.onload = function () {
  const controller = new Controller(new Model(), new View());
  controller.view.setController(controller);
};
