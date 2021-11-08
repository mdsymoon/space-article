import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Box, CircularProgress} from "@mui/material";

const SelectedArticle = () => {
  const { id } = useParams();
  const [selectedArticle, setSelectedArticle] = useState({});
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    fetch(`https://api.spaceflightnewsapi.net/v3/articles/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setSelectedArticle(data);
        setDataLoaded(true);
      });
  }, [id]);

  return (
    <div className="container my-5">
      <Link to="/">Go Home</Link>
      <img
        src={selectedArticle.imageUrl}
        alt={selectedArticle.title}
        className="w-100 mt-4"
      />
      <div className="d-flex justify-content-end">
        <h6 className="me-3">
          Published At -{" " + new Date(selectedArticle.publishedAt).getDate()}/
          {new Date(selectedArticle.publishedAt).getMonth()}/
          {new Date(selectedArticle.publishedAt).getFullYear()}
        </h6>
        <h6>
          Updated At -{" " + new Date(selectedArticle.updatedAt).getDate()}/
          {new Date(selectedArticle.updatedAt).getMonth()}/
          {new Date(selectedArticle.updatedAt).getFullYear()}
        </h6>
      </div>
      <h1 className="my-3">{selectedArticle.title}</h1>
      <div className="d-flex justify-content-between mb-5">
        <h4>Published By: {selectedArticle.newsSite}</h4>
      </div>
      <p>{selectedArticle.summary}</p>
      <Button variant="outlined" href={selectedArticle.url} target="_blank">
        Read Full Article
      </Button>
      {!dataLoaded && (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </Box>
      )}
    </div>
  );
};

export default SelectedArticle;
