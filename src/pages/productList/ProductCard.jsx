import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

export default function ProductCard({ data, handleDelete }) {
  return (
    <>
      {data?.map((item, idx) => {
        return (
          <Card sx={{ maxWidth: "100%" }} className="product-card" key={idx}>
            <CardMedia
              component="img"
              alt="green iguana"
              height="140"
              image={item.product_pic}
            />
            <CardContent>
              <Typography
                sx={{ fontSize: "20px", fontWeight: "500" }}
                gutterBottom
                variant="h5"
                component="div"
              >
                {item?.name}
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
                {item.status}
              </Typography>
              <div className="product-card-flex">
                <Typography
                  variant="body2"
                  sx={{ fontSize: "14px", color: "text.secondary" }}
                >
                  Stock : {item.stock}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ fontSize: "14px", color: "text.secondary" }}
                >
                  {item.price}
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
