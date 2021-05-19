import React, { Component } from "react";
import { Colors } from "../constants";


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
    cursor: "pointer",
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
  profileAvatar: {
    width: "95%",
    height: "100%",
    marginLeft:15,
    border:'2px dashed red',
    // position: "absolute",
    zIndex: 200,
  },
  profileAvatarMobile: {
    width: "100%",
    height: "100%",
    display: "block",
    margin: "auto",
    textAlign: "center",
    marginBottom: "80px",
  },
};

class AddProfileImage extends Component {
  constructor(props) {
    super(props);
    this.Ref = React.createRef();
    this.handleClick = this.handleClick.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.state = {
      image: props.image,
    };
  }

  handleClick() {
    this.Ref.current.click();
  }

  handleOnChange(event) {
    const TheFile = event.target.files[0];
    this.props.setImage(TheFile);
    // this.props.file = TheFile;

    if (TheFile) {
      var reader = new FileReader();

      reader.onload = () => {
        this.setState({
          image: reader.result,
        });
      };

      reader.readAsDataURL(event.target.files[0]);
    }
  }

  render() {
    const { item, title, text, img } = styles;
    return (
      <div
        style={{
          width: "100%",
          height: "336px",
          backgroundImage: this.state.backgroundImage,
          backgoundSize: "cover",
          backgroundRepeat: "no-repeat",
          overflow: "hidden",
          position: "relative",
        }}
        onClick={this.handleClick}
      >
        <img
          src={this.state.image}
          alt=""
          style={
               styles.profileAvatar
              
          }
        />

        {(this.state.image === "/upload.png" ||
          this.state.image === undefined) && (
          <div
            style={{
              position: "absolute",
              left: "0px",
              top: "45%",
              width: "100%",
              color: "#787878",
              textAlign: "center",
              fontWeight: "bold",
              display:'flex',
              alignItems:'center',
              justifyContent:'center'
            }}
          >
            <img src='/images/upload.png' />
          </div>
        )}
        <input
          type="file"
          name={this.props.filename}
          style={{ display: "none" }}
          ref={this.Ref}
          onChange={this.handleOnChange}
        />
      </div>
    );
  }
}

export default AddProfileImage;