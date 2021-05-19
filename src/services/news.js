import { Routes } from "../../constants";
import axios from "axios";

export const newsAggregator = async () => {
    return await axios
      .get(Routes.news)
      .then((res) => {
        return {
             status:'ok',
             message:'Listing all items',
             data:res.data.articles
            };
      })
      .catch((err) => {
        return {
            status:'failed',
            message:'no data available',
            data:[]
           };
      });
  };