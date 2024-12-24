import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

export default function UserCard({ data, handleDelete }) {
  return (
    <>
      {data?.map((item, idx) => {
        return (
          <Card sx={{ maxWidth: "100%" }} className="user-card" key={idx}>
            <CardMedia
              component="img"
              alt="green iguana"
              height="140"
              image={item.profile_pic}
            />
            <CardContent>
              <Typography
                sx={{ fontSize: "20px", fontWeight: "500" }}
                gutterBottom
                variant="h5"
                component="div"
              >
                {item?.username}
              </Typography>
              <Typography
                sx={{
                  fontSize: "14px",
                  color: "text.secondary",
                }}
                gutterBottom
                variant="h5"
                component="div"
              >
                {item.email}
              </Typography>
              <div className="user-card-flex">
                <Typography
                  variant="body2"
                  sx={{ fontSize: "14px", color: "text.secondary" }}
                >
                  {item.status}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ fontSize: "14px", color: "text.secondary" }}
                >
                  {item.transaction}
                </Typography>
              </div>
            </CardContent>
            <CardActions sx={{ padding: "0 0 16px 0" }}>
              <Button size="small">Edit</Button>
              <Button
                size="small"
                color="error"
                onClick={() => handleDelete(item.id)}
              >
                Delete
              </Button>
            </CardActions>
          </Card>
        );
      })}
    </>
  );
}
