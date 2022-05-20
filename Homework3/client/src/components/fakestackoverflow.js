import React from "react";
import axios from "axios";
import Banner from "./bannernav";
import QuestionsPage from "./questions_page";
import NewQuestionPage from "./new_question";
import SearchPage from "./search_page";
import AnswerPage from "./answer_page";
import NewAnswerPage from "./new_answer";
import TagsPage from "./tags_page";
import TagsSearch from "./tag_search";

export default class FakeStackOverflow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: "q",
      data: [],
      search: [],
      link: [],
      tags: [],
      tag: "",
    };
    this.bannerClick = this.bannerClick.bind(this);
    this.headerButtonClick = this.headerButtonClick.bind(this);
    this.handleNewQuestion = this.handleNewQuestion.bind(this);
    this.handleSearchQuery = this.handleSearchQuery.bind(this);
    this.handleQuestionLink = this.handleQuestionLink.bind(this);
    this.newAnswerButton = this.newAnswerButton.bind(this);
    this.handleNewAnswer = this.handleNewAnswer.bind(this);
    this.handleTagClick=this.handleTagClick.bind(this);
  }

  async bannerClick(page) {
    await axios.get("http://localhost:8000/tags").then((res) => {
      this.setState({ tags: res.data });
    });
    await axios.get("http://localhost:8000/questions").then((res) => {
      this.setState({ page: page, data: res.data });
    });
    console.log(page);
  }

  headerButtonClick() {
    this.setState({ page: "n" });
  }

  newAnswerButton() {
    this.setState({ page: "na" });
  }

  async handleNewAnswer() {
    const text = document.getElementById("text_box").value;
    const user = document.getElementById("user_box").value;
    let new_answer = {
      text: text,
      ans_by: user,
    };
    let new_answer_data = await axios.post(
      "http://localhost:8000/update_answers",
      new_answer
    );
    let new_answer_id = await new_answer_data.data["_id"];
    console.log(this.link);
    await axios.post("http://localhost:8000/update_qanswer/", {
      id: this.state.link["_id"],
      aid: new_answer_id,
    });
    await axios
      .get("http://localhost:8000/question/" + this.state.link["_id"])
      .then((res) => {
        this.setState({ page: "a", link: res.data });
      });
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
      let tag_message = await tag_database.data;
      console.log(tag_message);
      for (let i = 0; i < tags.length; i++) {
        var counter = 0;
        for (let j = 0; j < tag_message.length; j++) {
          if (tags[i] === tag_message[j]["name"]) {
            tags[i] = tag_message[j]["_id"];
            counter += 1;
            continue;
          }
        }
        if (counter === 0) {
          let new_tag = await (
            await axios.post("http://localhost:8000/update_tag", {
              tag_name: tags[i].toLowerCase(),
            })
          ).data;
          tags[i] = new_tag;
        }
      }
      console.log(tags);
      let new_question = {
        title: document.getElementById("title_box").value,
        text: document.getElementById("text_box").value,
        tags: tags,
        answers: [],
        asked_by:
          document.getElementById("user_box").value.length === 0
            ? "Anonymous"
            : document.getElementById("user_box").value,
      };
      console.log(new_question);
      await axios.post("http://localhost:8000/update_questions", new_question);
      await axios.get("http://localhost:8000/questions").then((res) => {
        this.setState({ page: "q", data: res.data });
      });
    } catch (err) {
      console.log("Something went wrong");
    }
  }

  querying(query) {
    const queries = query.split(" ");
    const results = [];
    const logged = new Map();
    for (let i = 0; i < queries.length; i++) {
      if (results.length === this.state.data.length) {
        break;
      }
      if (queries[i].match(/^\[(.*?)?\]/)) {
        const tag = queries[i].replace("[", "").replace("]", "").toLowerCase();
        for (let j = 0; j < this.state.data.length; j++) {
          for (let k = 0; k < this.state.data[j]["tags"].length; k++) {
            if (
              this.state.data[j]["tags"][k]["name"] === tag &&
              !logged.get(this.state.data[j]["_id"])
            ) {
              results.push(this.state.data[j]);
              logged.set(this.state.data[j]["_id"], 1);
            }
          }
        }
      } else {
        for (let j = 0; j < this.state.data.length; j++) {
          let title = this.state.data[j]["title"];
          let text = this.state.data[j]["text"];
          let re = new RegExp(queries[i], "i");
          if (title.match(re) || text.match(re)) {
            if (!logged.get(this.state.data[j]["_id"])) {
              results.push(this.state.data[j]);
              logged.set(this.state.data[j]["_id"], 1);
            }
          }
        }
      }
    }
    return results;
  }

  simple_tag_querying(query){
    let results=[];
    for (let j = 0; j < this.state.data.length; j++) {
      for (let k = 0; k < this.state.data[j]["tags"].length; k++) {
        if (
          this.state.data[j]["tags"][k]["name"] === query 
        ) {
          results.push(this.state.data[j]);
          
        }
      }
    }
    return results;
  }

  handleSearchQuery(query) {
    let results = this.querying(query);
    this.setState({ page: "s", search: results });
  }

  handleTagClick(query) {
    let results = this.simple_tag_querying(query);
    this.setState({ page: "ts", search: results, tag: query });
  }

  async handleQuestionLink(question_id) {
    try {
      await axios.post("http://localhost:8000/questionlink/", {
        id: question_id,
      });
      await axios
        .get("http://localhost:8000/question/" + question_id)
        .then((res) => {
          console.log(res);
          this.setState({ page: "a", link: res.data });
        });
    } catch (err) {}
  }

  async componentDidMount() {
    try {
      let data = await axios.get("http://localhost:8000/questions");
      let message = await data.data;
      console.log(message);
      console.log(message.length);
      this.setState({ data: message });
    } catch (err) {
      console.log("Something went wrong");
    }
  }

  render() {
    const page = this.state.page;
    const data = this.state.data;
    const result = this.state.search;
    const linkdata = this.state.link;
    const tags = this.state.tags;
    let render;
    if (page === "q") {
      render = (
        <QuestionsPage
          page={page}
          data={data}
          headerButtonClick={this.headerButtonClick}
          questionLinkClick={this.handleQuestionLink}
        />
      );
    } else if (page === "n") {
      render = <NewQuestionPage newQuestion={this.handleNewQuestion} />;
    } else if (page === "s") {
      render = (
        <SearchPage
          page={page}
          result={result}
          headerButtonClick={this.headerButtonClick}
        />
      );
    } else if (page === "a") {
      render = (
        <AnswerPage
          page={page}
          linkdata={linkdata}
          headerButtonClick={this.headerButtonClick}
          newAnswerButton={this.newAnswerButton}
        />
      );
    } else if (page === "na") {
      render = (
        <NewAnswerPage newAnswer={this.handleNewAnswer} linkdata={linkdata} />
      );
    } else if (page === "t") {
      render = (
        <TagsPage
          page={page}
          headerButtonClick={this.headerButtonClick}
          data={data}
          tags={tags}
          tagClick={this.handleTagClick}
        />
      );
    } else if (page === "ts") {
      render = (
        <TagsSearch
          result={result}
          page={page}
          headerButtonClick={this.headerButtonClick}
          questionLinkClick={this.handleQuestionLink}
          tag={this.state.tag}
        />
      );
    } else {
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
