import React from "react";

export default class NewAnswerPage extends React.Component{
    constructor(props){
        super(props);
        this.state = { error: false, errors: [] };
        this.click=this.click.bind(this);
    }

    click(e){
        const arr=this.props.model.checkAnswer();
        if(arr.length===0){
            this.props.model.addAnswer(this.props.val);
            this.props.newChange(this.props.val,"a");
        }else{
            this.setState({ error: "true", errors: arr });
        }
    }

    render(){
        const error = this.state.error;
        let error_state;
        if (error) {
            error_state = (
            <div className="error_space">
                {this.state.errors.map((error, index) => {
                return (
                    <div key={error}>
                    <span style={{ color: "red" }}>{error}</span>
                    </div>
                );
                })}
            </div>
            );
        }
        return (
            <div className="new_answer">
              {error_state}
              <div className="answer_text">
                <h1>Question Text</h1>
                <h2 style={{ fontSize: "medium" }}>Add details</h2>
                <textarea id="text_box" rows={"5"} cols={"100"}></textarea>
              </div>
              <div className="user">
                <h1>User</h1>
                <h2 style={{ fontSize: "medium" }}>
                  Should not be more than 15 characters
                </h2>
                <textarea id="user_box" rows={"2"} cols={"100"}></textarea>
              </div>
              <div>
                <button
                  style={{
                    height: "50px",
                    borderRadius: "10px",
                    marginTop: "10px",
                    backgroundColor: "#165A92",
                    color: "white",
                    fontSize: "medium",
                  }}
                  onClick={this.click}
                >
                  Post Answer
                </button>
              </div>
            </div>
          );
    }
}