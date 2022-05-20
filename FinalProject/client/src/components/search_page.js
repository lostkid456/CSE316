import React from "react";
import Header from "./header";
import Table from "./table";

const SearchPage = (props) => {
  const page = props.page;
  const data = props.data;
  const NewQuestion = () => {
    props.changePage("nq");
  };
  const questionLink = (id) => {
    props.handleLink(id);
  };
  return (
    <div>
      <Header
        page={page}
        data={data}
        user={props.user}
        newQuestion={NewQuestion}
      />
      <Table page={page} data={data} handleLink={questionLink} />
    </div>
  );
};

export default SearchPage;
