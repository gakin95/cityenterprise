import React, { Component } from "react";
import { Paper, Hidden } from "@material-ui/core";
import { Colors } from "../constants";
import { makeStyles } from "@material-ui/core/styles";
// import "../add_cause.module.css";

const styles = {
  item: {
    width: "250px",
    height: "160px",
    display: "inline-flex",
    flexDirection: "column",
    borderRadius: "10px",
    cursor: "pointer",
    marginRight: "20px",
    marginBottom: "20px",
  },
  img: {
    height: "60px",
    display: "block",
    marginLeft: "auto",
    marginTop: "30px",
    marginRight: "auto",
  },
  image: {
    height: 160,
    width: "100%",
    marginTop: 0,
  },
  "item:hover": {
    //   boxShadow: "0px 0px 10px 15px rgba(255, 0, 0, .9) !important",
    backgroundColor: Colors.appRed,
  },

  "item:hover p": {
    color: "white",
  },
  title: {
    fontSize: "10px",
    textAlign: "center",
    marginTop: "0px",
    color: Colors.appRed,
  },
  text: {
    fontSize: "10px",
    textAlign: "center",
    marginTop: "0px",
  },
};

class AddImage extends Component {
  constructor(props) {
    super(props);
    this.Ref = React.createRef();
    this.handleClick = this.handleClick.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.state = {
      backgroundImage: "",
    };
  }

  handleClick() {
    this.Ref.current.click();
  }

  handleOnChange(event) {
    const TheFile = event.target.files[0];
    this.props.setImage(TheFile);

    if (TheFile) {
      var reader = new FileReader();

      reader.onload = () => {
        this.setState({
          backgroundImage: reader.result,
        });
      };

      reader.readAsDataURL(event.target.files[0]);
    }
  }

  render() {
    const { item, title, text, img, image } = styles;
    return (
      <Paper style={item} onClick={this.handleClick}>
        <div
          style={{
            width: "100%",
            height: "100%",
            backgroundImage: this.state.backgroundImage,
            backgoundSize: "cover",
            backgroundRepeat: "no-repeat",
            //overflow: "hidden",
          }}
        >
          <div>
            {this.state.backgroundImage ? (
              <div>
                {this.props.accept === "image/*" ? (
                  <img src={this.state.backgroundImage} style={image} alt="" />
                ) : (
                  <div style={{ 
                    color:'#AA4E27',
                    marginLeft: "auto",
                    marginTop: "50px",
                    marginRight: "auto",
                    textAlign:'center'
                     }}>
                  <p>{this.props.doc}</p>
                  </div>
                )}
              </div>
            ) : (
              <div>
                <img style={img} src={this.props.image} alt="" />
                <p style={title}>{this.props.title}</p>
                <p style={text}>{this.props.text}</p>
              </div>
            )}
          </div>
          <input
            type="file"
            accept={this.props.accept}
            name={this.props.filename}
            style={{ display: "none" }}
            ref={this.Ref}
            onChange={this.handleOnChange}
          />
        </div>
      </Paper>
    );
  }
}

export default AddImage;
