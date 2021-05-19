import React, { Component } from "react";
import SocialShare from "./socialShare";
import ShareCSS from "./css/ShareCSS";


// Refer) https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input

class ShareForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.name,
      url: this.props.url
    };
  }

  handleShareFormSubmit(values) {
    this.setState({
      title: values.title,
      url: values.url,
    });
  }

  render() {
    let { title, url } = this.state;

    /**
     * You don't have to use handleChange, handleBlur
     * and handleSubmit by using Formik and Field.
     */

    return (
      <section>
        <ShareCSS>
          <div style={{ border: "2px solid #efefef" }}>
            <h2
              style={{
                textAlign: "center",
                fontSize: "1.5rem"
              }}
            >
     {title}
            </h2>
            <img
              style={{
                maxWidth: "100%",
                width: "100%",
                height: "6rem"
              }}
              className="thumbnail"
              alt={title}
              src={url}
            />
            <SocialShare title={title} url={this.props.link} />
          </div>
        </ShareCSS>
      </section>
    );
  }
}

export default ShareForm;
