import React from "react";
import axios from "axios";
import Banner from "./bannernav";
import QuestionsPage from "./questions_page";
import NewQuestionPage from "./new_question";
import SearchPage from "./search_page";
import AnswerPage from "./answer_page";
import NewAnswerPage from "./new_answer";
import Tags from "./tags";
import TagsPage from "./tags_page";
import TagsSearch from "./tag_search";

export default class FakeStackOverflow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: "q",
      questions: [],
      tags: [],
      answer: [],
    };
    this.bannerClick = this.bannerClick.bind(this);
    this.handleSearchQuery = this.handleSearchQuery.bind(this);
    this.handleQuestionLink = this.handleQuestionLink.bind(this);
    this.headerButtonClick = this.headerButtonClick.bind(this);
    this.handleNewQuestion = this.handleNewQuestion.bind(this);
    this.handleQuestionLink = this.handleQuestionLink.bind(this);
    this.newAnswerButton = this.newAnswerButton.bind(this);
    this.handleNewAnswer = this.handleNewAnswer.bind(this);
    this.handleTagClick=this.handleTagClick.bind(this);
  }

  querying(query) {
    const queries = query.split(" ");
    const results = [];
    const logged = new Map();
    for (let i = 0; i < queries.length; i++) {
      if (results.length === this.state.questions.length) {
        break;
      }
      if (queries[i].match(/^\[(.*?)?\]/)) {
        const tag = queries[i].replace("[", "").replace("]", "").toLowerCase();
        for (let j = 0; j < this.state.questions.length; j++) {
          for (let k = 0; k < this.state.questions[j].value.tags.length; k++) {
            if (
              this.state.questions[j].value.tags[k] === tag &&
              !logged.get(j)
            ) {
              results.push(this.state.questions[j]);
              logged.set(j, 1);
            }
          }
        }
      } else {
        for (let j = 0; j < this.state.questions.length; j++) {
          let title = this.state.questions[j].value.title;
          let text = this.state.questions[j].value.text;
          let re = new RegExp(queries[i], "i");
          if (title.match(re) || text.match(re)) {
            if (!logged.get(j)) {
              results.push(this.state.questions[j]);
              logged.set(j, 1);
            }
          }
        }
      }
      return results;
    }
  }

  simple_tag_querying(query){
    let results=[];
    for (let j = 0; j < this.state.questions.length; j++) {
      for (let k = 0; k < this.state.questions[j].value.tags.length; k++) {
        if (this.state.questions[j].value.tags[k] === query 
        ) {
          results.push(this.state.questions[j]);
        }
      }
    }
    return results;
  }

  async bannerClick(page) {
    await axios.get("http://localhost:8000/tags").then((res) => {
      this.setState({ tags: res.data });
    });
    await axios.get("http://localhost:8000/questions").then((res) => {
      this.setState({ page: page, questions: res.data });
    });
  }

  headerButtonClick() {
    this.setState({ page: "n" });
  }

  newAnswerButton() {
    this.setState({ page: "na" });
  }

  async handleSearchQuery(query) {
    await axios.get("http://localhost:8000/questions").then((res) => {
      this.setState({ questions: res.data });
    });
    this.setState({ page: "s", questions: this.querying(query) });
  }

  async handleQuestionLink(question_id) {
    try {
      await axios.post("http://localhost:8000/update_question_views/", {
        id: question_id,
      });
      await axios.get("http://localhost:8000/questions").then((res) => {
        this.setState({ questions: res.data });
      });
      await axios
        .get("http://localhost:8000/answer/" + question_id)
        .then((res) => {
          var q;
          for (let i = 0; i < this.state.questions.length; i++) {
            if (this.state.questions[i].key === parseInt(question_id)) {
              q = this.state.questions[i];
            }
          }
          this.setState({
            page: "a",
            answer: res.data,
            questions: q,
          });
        });
    } catch (err) {
      console.log(err);
    }
  }

  async handleNewQuestion() {
    try {
      let tags = Array.from(
        new Set(
          document
            .getElementById("tag_box")
            .value.trim()
            .toLowerCase()
            .split(" ")
        )
      );
      let tag_database = await axios.get("http://localhost:8000/tags");
      let tag_data = tag_database.data;
      var tag_ids = [];
      for (let i = 0; i < tags.length; i++) {
        var counter = 0;
        for (let j = 0; j < tag_data.length; j++) {
          if (tags[i] === tag_data[j]) {
            counter += 1;
            tag_ids.push(j + 1);
            continue;
          }
        }
        if (counter === 0) {
          let new_tag_data = await axios.post(
            "http://localhost:8000/update_tag",
            { tag_name: tags[i].toLowerCase() }
          );
          tag_ids.push(new_tag_data.data.insertId);
        }
      }
      let new_question = {
        title: document.getElementById("title_box").value,
        text: document.getElementById("text_box").value,
        asked_by:
          document.getElementById("user_box").value.length === 0
            ? "anonymous"
            : document.getElementById("user_box").value,
      };
      let new_question_resp = await axios.post(
        "http://localhost:8000/update_questions",
        new_question
      );
      for (let i = 0; i < tag_ids.length; i++) {
        let new_qt = {
          qstnId: new_question_resp.data.insertId,
          tagId: tag_ids[i],
        };
        await axios.post("http://localhost:8000/update_qt", new_qt);
      }
      await axios.get("http://localhost:8000/tags").then((res) => {
        this.setState({ tags: res.data });
      });
      await axios.get("http://localhost:8000/questions").then((res) => {
        this.setState({ page: "q", questions: res.data });
      });
    } catch (err) {
      console.log(err);
    }
  }

  async handleNewAnswer() {
    try {
      const text = document.getElementById("text_box").value;
      const user = document.getElementById("user_box").value;
      let new_answer = {
        text: text,
        ans_by: user,
      };
      let question_id = parseInt(this.state.questions.key);
      let new_answer_data = await axios.post(
        "http://localhost:8000/update_answers",
        new_answer
      );
      let new_qa = {
        qstnId: question_id,
        ansId: new_answer_data.data.insertId,
      };
      await axios.post("http://localhost:8000/update_qa", new_qa);
      await axios.get("http://localhost:8000/questions").then((res) => {
        this.setState({ questions: res.data });
      });
      await axios
        .get("http://localhost:8000/answer/" + question_id)
        .then((res) => {
          var q;
          for (let i = 0; i < this.state.questions.length; i++) {
            if (this.state.questions[i].key === question_id) {
              q = this.state.questions[i];
            }
          }
          this.setState({
            page: "a",
            answer: res.data,
            questions: q,
          });
        });
    } catch (err) {
      console.log(err);
    }
  }

  async handleTagClick(tag){
    await axios.get("http://localhost:8000/questions").then((res) => {
      this.setState({ questions: res.data });
    });
    this.setState({page:"ts",questions:this.querying("["+tag+"]"),tags:tag});
  }

  async componentDidMount() {
    try {
      await axios.get("http://localhost:8000/questions").then((res) => {
        this.setState({ questions: res.data });
      });
      await axios.get("http://localhost:8000/tags").then((res) => {
        this.setState({ tags: res.data });
      });
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    const page = this.state.page;
    const questions = this.state.questions;
    const tags = this.state.tags;
    const answers = this.state.answer;
    let render;
    if (page === "q") {
      render = (
        <QuestionsPage
          page={page}
          data={questions}
          questionLinkClick={this.handleQuestionLink}
          headerButtonClick={this.headerButtonClick}
        />
      );
    } else if (page === "n") {
      render = (
        <NewQuestionPage page={page} newQuestion={this.handleNewQuestion} />
      );
    } else if (page === "s") {
      render = (
        <SearchPage
          page={page}
          data={questions}
          headerButtonClick={this.headerButtonClick}
          questionLinkClick={this.handleQuestionLink}
        />
      );
    } else if (page === "a") {
      render = (
        <AnswerPage
          page={page}
          data={questions}
          answers={answers}
          headerButtonClick={this.headerButtonClick}
          newAnswerButton={this.newAnswerButton}
        />
      );
    } else if (page === "na") {
      render = (
        <NewAnswerPage newAnswer={this.handleNewAnswer} data={questions} />
      );
    }else if(page==="t"){
      render=(<TagsPage page={page} headerButtonClick={this.headerButtonClick} data={questions} tags={tags} tagClick={this.handleTagClick}/>);
    }else if(page==="ts"){
      render=(<TagsSearch page={page} headerButtonClick={this.headerButtonClick} data={questions} tags={tags} questionLinkClick={this.handleQuestionLink}/>);
    }
    return (
      <div className="fakestackoverflow">
        <Banner
          page={page}
          bannerClick={this.bannerClick}
          query={this.handleSearchQuery}
        />
        <div className="main">{render}</div>
      </div>
    );
  }
}
