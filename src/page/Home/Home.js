import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  Stack,
  Pagination,
  Box,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from "@mui/material";

const Home = () => {
  const [spaceData, setSpaceData] = useState([]);
  const [recordCount, setRecordCount] = useState(5);
  const [paginationCount, setPaginationCount] = useState(0);
  const [newSpaceData, setNewSpaceData] = useState([]);
  const [selectedPage, setSelectedPage] = useState(1);

  useEffect(() => {
    fetch("https://api.spaceflightnewsapi.net/v3/articles")
      .then((res) => res.json())
      .then((data) => {
        setSpaceData(data);
        setNewSpaceData(data.slice(0, 5));
      });
  }, []);

  useEffect(() => {
    setNewSpaceData(spaceData.slice(0, recordCount));
    let pageCount = Math.ceil(spaceData.length / recordCount);
    setPaginationCount(pageCount);
    let page = selectedPage - 1
    let start = recordCount * page;
    console.log(start);
    let end = start + recordCount;
    setNewSpaceData(spaceData.slice(start, end));
  }, [recordCount, selectedPage, spaceData]);
  return (
    <div className="container">
      <div className="my-4 d-flex justify-content-end">
        <Box sx={{ maxWidth: 100, flex: 1 }}>
          <FormControl fullWidth variant="standard">
            <InputLabel>Records Per</InputLabel>
            <Select
              label="Records Per"
              value={recordCount}
              onChange={(e) => setRecordCount(e.target.value)}
            >
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={15}>15</MenuItem>
              <MenuItem value={20}>20</MenuItem>
              <MenuItem value={25}>25</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </div>
      <div className="d-flex flex-wrap justify-content-evenly">
        {newSpaceData.map((article) => (
          <Card sx={{ maxWidth: 345 }} className="m-3" key={article.id}>
            <CardMedia
              component="img"
              height="140"
              image={article.imageUrl}
              alt="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h6" component="div">
                {article.title}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">
                <Link to={`/article/${article.id}`}>See More</Link>
              </Button>
            </CardActions>
          </Card>
        ))}
      </div>
      <div className="d-flex justify-content-center my-5">
        <Stack spacing={2}>
          <Pagination
            count={paginationCount}
            onChange={(e, value) => setSelectedPage(value)}
          />
        </Stack>
      </div>
    </div>
  );
};

export default Home;
