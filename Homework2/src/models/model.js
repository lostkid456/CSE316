export default class Model {
  constructor() {
    this.data = {
      questions: [
        {
          qid: "q1",
          title: "Programmatically navigate using React router",
          text: "the alert shows the proper index for the li clicked, and when I alert the variable within the last function I'm calling, moveToNextImage(stepClicked), the same value shows but the animation isn't happening. This works many other ways, but I'm trying to pass the index value of the list item clicked to use for the math to calculate.",
          tagIds: ["t1", "t2"],
          askedBy: "JoJi John",
          askedOn: "Jan 19, 2022",
          askedAt: "21:25",
          answers: ["a1", "a2"],
          views: 10,
        },
        {
          qid: "q2",
          title:
            "android studio save string shared preference, start activity and load the saved string",
          text: "I am using bottom navigation view but am using custom navigation, so my fragments are not recreated every time i switch to a different view. I just hide/show my fragments depending on the icon selected. The problem i am facing is that whenever a config change happens (dark/light theme), my app crashes. I have 2 fragments in this activity and the below code is what i am using to refrain them from being recreated.",
          tagIds: ["t3", "t4", "t2"],
          askedBy: "saltyPeter",
          askedOn: "Jan 01, 2022",
          askedAt: "01:15",
          answers: ["a3", "a4", "a5"],
          views: 121,
        },
      ],
      tags: [
        {
          tid: "t1",
          name: "react",
        },
        {
          tid: "t2",
          name: "javascript",
        },
        {
          tid: "t3",
          name: "android-studio",
        },
        {
          tid: "t4",
          name: "shared-preferences",
        },
      ],

      answers: [
        {
          aid: "a1",
          text: "React Router is mostly a wrapper around the history library. history handles interaction with the browser's window.history for you with its browser and hash histories. It also provides a memory history which is useful for environments that don't have a global history. This is particularly useful in mobile app development (react-native) and unit testing with Node.",
          ansBy: "hamkalo",
          ansOn: "Feb 02, 2022",
          ansAt: "10:15",
        },
        {
          aid: "a2",
          text: "On my end, I like to have a single history object that I can carry even outside components. I like to have a single history.js file that I import on demand, and just manipulate it. You just have to change BrowserRouter to Router, and specify the history prop. This doesn't change anything for you, except that you have your own history object that you can manipulate as you want. You need to install history, the library used by react-router.",
          ansBy: "azad",
          ansOn: "Jan 31, 2022",
          ansAt: "10:15",
        },
        {
          aid: "a3",
          text: "Consider using apply() instead; commit writes its data to persistent storage immediately, whereas apply will handle it in the background.",
          ansBy: "abaya",
          ansOn: "Jan 21, 2022",
          ansAt: "21:15",
        },
        {
          aid: "a4",
          text: "YourPreference yourPrefrence = YourPreference.getInstance(context); yourPreference.saveData(YOUR_KEY,YOUR_VALUE);",
          ansBy: "alia",
          ansOn: "Feb 05, 2022",
          ansAt: "19:51",
        },
        {
          aid: "a5",
          text: "I just found all the above examples just too confusing, so I wrote my own. ",
          ansBy: "sana",
          ansOn: "Jan 30, 2022",
          ansAt: "09:29",
        },
      ],
    };
  }

  // add relevant methods here.

  // Finds the question data from name
  getDatafromName(name){
    for(let i=0;i<this.data.questions.length;i++){
      if(this.data.questions[i].title===name){
        return this.data.questions[i];
      }
    }
  }

  // Get tid from the name
  getTidfromName(name) {
    for (let i = 0; i < this.data.tags.length; i++) {
      if (this.data.tags[i].name === name) {
        return this.data.tags[i].tid;
      }
    }
    return -1;
  }

  // Get the name from tid
  getNamefromTid(tid) {
    for (let i = 0; i < this.data.tags.length; i++) {
      if (this.data.tags[i].tid === tid) {
        return this.data.tags[i].name;
      }
    }
  }

  getAnswerfromAid(aid){
    for(let i=0;i<this.data.answers.length;i++){
      if(aid===this.data.answers[i].aid){
        return this.data.answers[i];
      }
    }
  }


  // Sorts the Question data
  sort_questions() {
    this.data.questions.sort(function (a, b) {
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
  }

  // Sorts the answers for a specific question
  sortAnswers(question){
    var that=this;
    question.answers.sort(function(a,b){
      let aa=that.getAnswerfromAid(a);
      let ba=that.getAnswerfromAid(b);
      let a_string=that.getAnswerfromAid(a).ansOn.replace(",", "").split(" ");
      let b_string=that.getAnswerfromAid(b).ansOn.replace(",", "").split(" ");
      let a_date = new Date(
        a_string[0] + " " + a_string[1] + " " + a_string[2] + " " + aa.ansAt
      );
      let b_date = new Date(
        b_string[0] + " " + b_string[1] + " " + b_string[2] + " " + ba.ansAt
      );
      if (a_date - b_date > 0) {
        return -1;
      } else if (a_date - b_date < 0) {
        return 1;
      } else {
        return 0;
      }
    });
  }

  // Checks whether the input from the New_Questions page is valid
  checkQuestion() {
    const arr = [];
    const title = document.getElementById("title_box").value;
    const text = document.getElementById("text_box").value;
    const tags = document.getElementById("tag_box").value;
    const user = document.getElementById("user_box").value;

    if (!title.trim() || title.length === 0) {
      arr.push("Title cannot be empty!");
    }
    if (title.length > 100) {
      arr.push("Title cannot be more than 100 characters!");
    }

    if (!text.trim() || text.length === 0) {
      arr.push("Text cannot be empty!");
    }

    if (!tags.trim() || tags.length === 0) {
      arr.push("Tags cannot be empty!");
    }

    if (user.length > 15) {
      arr.push("Username cannot be more than 15 characters!");
    }

    return arr;
  }

  // Adds a new Question to the model
  addQuestion() {
    const title = document.getElementById("title_box").value;
    const text = document.getElementById("text_box").value;
    const tags = document.getElementById("tag_box").value;
    const user = document.getElementById("user_box").value;

    const tag = [];
    const curr_tags = tags.split(" ");
    for (let i = 0; i < curr_tags.length; i++) {
      if (curr_tags[i] === "") {
        continue;
      }
      var tid = this.getTidfromName(curr_tags[i].toLowerCase());
      if (tid !== -1 && !tag.includes(tid)) {
        tag.push(tid);
      }
      if (tid !== -1 && tag.includes(tid)) {
        continue;
      }
      if (tid === -1) {
        this.data.tags.push({
          tid: "t" + (this.data.tags.length + 1),
          name: curr_tags[i],
        });
        tag.push("t" + this.data.tags.length);
      }
    }
    var curr_date = new Date();
    const new_question = {
      qid: "q" + (this.data.questions.length + 1),
      title: title,
      text: text,
      tagIds: tag,
      askedBy: user,
      askedOn:
        curr_date.toLocaleString("en-us", { month: "short" }) +
        " " +
        curr_date.getDate() +
        ", " +
        curr_date.getFullYear(),
      askedAt:
        curr_date.getHours() +
        ":" +
        String(curr_date.getMinutes()).padStart(2, "0"),
      answers: [],
      views: 0,
    };
    this.data.questions.push(new_question);
  }

  // Searches the model for questions that match the query request
  // Addded regex to make my life easier
  search(query) {
    const results = [];
    const args = query.split(" ");
    const logged = new Map();
    let number_of_questions = this.data.questions.length;
    var that = this;
    for (let i = 0; i < args.length; i++) {
      if (results.length === number_of_questions) {
        return results;
      }
      if (args[i].match(/^\[(.*?)?\]/)) {
        const tag = args[i].replace("[", "").replace("]", "").toLowerCase();
        this.data.questions.forEach(function (value) {
          for (let j = 0; j < value.tagIds.length; j++) {
            if (
              that.getNamefromTid(value.tagIds[j]) === tag &&
              !logged.get(value.qid)
            ) {
              results.push(value);
              logged.set(value.qid, 1);
            }
          }
        });
      } else {
        this.data.questions.forEach(function (value) {
          let title = value.title;
          let text = value.text;
          let re = new RegExp(args[i], "i");
          if (title.match(re) || text.match(re)) {
            if (!logged.get(value.qid)) {
              results.push(value);
              logged.set(value.qid, 1);
            }
          }
        });
      }
    }
    return results;
  }

  // Updates view count
  updateView(name){
    for(let i=0;i<this.data.questions.length;i++){
      if(this.data.questions[i].title===name){
        this.data.questions[i].views=this.data.questions[i].views+1;
      }
    }
  }

  checkAnswer(){
    const arr=[];
    const text=document.getElementById("text_box").value;
    const user=document.getElementById("user_box").value;

    if(!text.trim() || text.length===0){
      arr.push("Text cannot be empty!");
    }
    if(user.length>15){
      arr.push("Username cannot be more than 15 characters!");
    }
    return arr;
  }

  addAnswer(prev){
    const text=document.getElementById("text_box").value;
    const user=document.getElementById("user_box").value;
    var curr_date = new Date();
      const new_answer = {
        aid: "a" + (this.data.answers.length + 1),
        text: text,
        ansBy: user,
        ansOn:
          curr_date.toLocaleString("en-us", { month: "short" }) +
          " " +
          curr_date.getDate() +
          ", " +
          curr_date.getFullYear(),
        ansAt: curr_date.getHours() + ":" + curr_date.getMinutes()
      };
      this.data.answers.push(new_answer);
      const question=this.getDatafromName(prev);
      question.views=question.views-1;
      for(let i=0;i<this.data.questions.length;i++){
        if(this.data.questions[i].title===question.title){
          this.data.questions[i].answers.push("a"+(this.data.answers.length));
        }
      }
  }

  findAmountforTag(tid){
    let count=0;
    for(let i=0;i<this.data.questions.length;i++){
      for(let j=0;j<this.data.questions[i].tagIds.length;j++){
        if(this.data.questions[i].tagIds[j]===tid){
          count+=1;
          break;
        }
      }
    }
    if(count===1){
      return count+" question"
    }else{
      return count+" questions"
    }
  }

}
