import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000",
  withCredentials: true,
});

export const check_email_exists = (email) => api.get(`/check_email/${email}`);
export const create_new_user = (user) => api.post("/create_user", user);

export const user_login = (user) => api.post("/login_user", user);
export const guest_login = () => api.post("/guest_login");

export const get_user_login = () => api.get("/validate_user");

export const get_user_data = () => api.get(`/user/`);
export const get_user_question = () => api.get(`/user_question/`);
export const get_user_answer = () => api.get(`/user_answer/`);
export const get_user_tag = () => api.get(`/user_tag/`);

export const get_question_data = () => api.get("/questions");
export const get_tag_data = () => api.get("/tags");

export const get_question = (id) => api.get(`/question/${id}`);
export const get_answers = (id) => api.get(`/get_answers/${id}`);
export const get_answer_comments = (id) =>
  api.get(`/get_answer_comments/${id}`);

export const add_question = (question) => api.post("/new_question", question);
export const add_tag = (tag) => api.post("/new_tag", tag);

export const add_answer = (answer) => api.post("/new_answer", answer);

export const add_question_comment = (comment) =>
  api.post("/new_question_comment", comment);

export const update_upvote = (id) => api.post("/upvote", id);
export const update_downvote = (id) => api.post("/downvote", id);

export const user_rep_increase = (id) => api.post("/increase_rep", id);
export const user_rep_decrease = (id) => api.post("/decrease_rep", id);

export const update_view = (id) => api.post("/update_view", id);

export const update_qt = (qt) => api.post("/update_qt", qt);
export const update_tu = (tu) => api.post("/update_tu", tu);
export const update_qu = (qu) => api.post("/update_qu", qu);

export const update_au = (au) => api.post("/update_au", au);
export const update_qa = (qa) => api.post("/update_qa", qa);

export const update_qc = (qc) => api.post("/update_qc", qc);
export const update_ac = (ac) => api.post("/update_ac", ac);

export const editQuestion = (question) => api.post("/editQuestion", question);
export const deleteQuestion = (id) => api.post("/deleteQuestion", id);

export const editAnswer = (answer) => api.post("/editAnswer", answer);
export const deleteAnswer = (id) => api.post("/deleteAnswer", id);

export const editTag = (tag) => api.post("/editTag", tag);
export const deleteTag = (id) => api.post("/deleteTag", id);

export const remove_user = () => api.post("/remove_user");

const apis = {
  check_email_exists,
  create_new_user,
  user_login,
  guest_login,
  get_user_login,
  get_user_data,
  get_user_question,
  get_user_answer,
  get_user_tag,
  get_question_data,
  get_tag_data,
  get_question,
  get_answers,
  get_answer_comments,
  add_question,
  add_tag,
  add_answer,
  add_question_comment,
  update_upvote,
  update_downvote,
  user_rep_increase,
  user_rep_decrease,
  update_view,
  update_qt,
  update_tu,
  update_qu,
  update_au,
  update_qa,
  update_qc,
  update_ac,
  editQuestion,
  deleteQuestion,
  editAnswer,
  deleteAnswer,
  editTag,
  deleteTag,
  remove_user,
};

export default apis;
