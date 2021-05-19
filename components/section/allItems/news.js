import React from "react";
import Grid from "@material-ui/core/Grid";

import { News } from "../singleItem";

const Allnews = ({ data, message }) => {
  return (
    <Grid container spacing={3}>
      {data.map((news) => (
        <Grid item xs={12} sm={6} md={4} key={news.id}>
          <News
            image={news.image}
            title={
              news.title.length > 150
                ? `${news.title.substring(0, 150)} ...`
                : `${news.title.substring(0, 150)}`
            }
            source={news.source}
            content={news.content && news.content.substring(0,200)}
            date={news.date}
            click={news.url}
          />
        </Grid>
      ))}
      <Grid item xs={12}>
        <h3>{message}</h3>
      </Grid>
    </Grid>
  );
};

export default Allnews;
