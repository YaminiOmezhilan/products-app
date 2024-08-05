import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  CircularProgress,
  List,
  ListItem,
  Typography,
  Box,
  Rating,
  Avatar,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";

interface Review {
  id: number;
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
}

interface ReviewModalProps {
  open: boolean;
  onClose: () => void;
  productId: number | null;
}

const ReviewModal: React.FC<ReviewModalProps> = ({
  open,
  onClose,
  productId,
}) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(false);
  const [averageRating, setAverageRating] = useState(0);
  const [reviewCount, setReviewCount] = useState(0);

  useEffect(() => {
    if (productId) {
      const fetchReviews = async () => {
        setLoading(true);
        try {
          const response = await axios.get(
            `https://dummyjson.com/products/${productId}`
          );
          const reviewsData: Review[] = response.data.reviews;
          setReviews(reviewsData);
          setReviewCount(reviewsData.length);
          setAverageRating(
            reviewsData.reduce(
              (acc: number, review: Review) => acc + review.rating,
              0
            ) / reviewsData.length
          );
        } catch (error) {
          console.error("Failed to fetch reviews", error);
        } finally {
          setLoading(false);
        }
      };

      fetchReviews();
    }
  }, [productId]);

  const timeAgo = (date: string) => {
    const now = new Date();
    const reviewDate = new Date(date);
    const diffTime = Math.abs(now.getTime() - reviewDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays < 30) {
      return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
    } else if (diffDays < 365) {
      const diffMonths = Math.floor(diffDays / 30);
      return `${diffMonths} month${diffMonths > 1 ? "s" : ""} ago`;
    } else {
      const diffYears = Math.floor(diffDays / 365);
      return `${diffYears} year${diffYears > 1 ? "s" : ""} ago`;
    }
  };

  return (
    <Dialog
      open={open}
      onClose={(event, reason) => {
        if (reason !== "backdropClick") {
          onClose();
        }
      }}
      maxWidth="md"
      fullWidth
      sx={{ margin: "auto", maxHeight: "80vh", maxWidth: "60vw" }}
    >
      {loading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{ height: "100%", padding: 2 }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <>
          <DialogTitle>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="h6" fontWeight="bold">
                Reviews
              </Typography>
              <IconButton
                aria-label="close"
                onClick={onClose}
                sx={{
                  position: "absolute",
                  right: 8,
                  top: 8,
                  color: (theme) => theme.palette.grey[500],
                }}
              >
                <CloseIcon />
              </IconButton>
            </Box>
            <Box display="flex" alignItems="center">
              <Typography variant="h6" fontSize="16px">
                {averageRating.toFixed(1)}
              </Typography>
              <Rating
                value={averageRating}
                precision={0.1}
                readOnly
                sx={{ ml: 1 }}
              />
              <Typography variant="body2" color="textSecondary" sx={{ ml: 1 }}>
                Over {reviewCount} Reviews
              </Typography>
            </Box>
          </DialogTitle>
          <DialogContent
            dividers={true}
            sx={{ maxHeight: "60vh", overflow: "hidden" }}
          >
            <Box sx={{ maxHeight: "40vh", overflowY: "auto" }}>
              <List>
                {reviews.map((review) => (
                  <Box
                    key={review.id}
                    mb={1}
                    sx={{
                      backgroundColor: "#f9f9f9",
                      borderRadius: "8px",
                      padding: "8px",
                    }}
                  >
                    <ListItem alignItems="flex-start" sx={{ padding: 0 }}>
                      <Avatar sx={{ mr: 2, bgcolor: "grey", color: "white" }}>
                        {review.reviewerName[0]}
                      </Avatar>
                      <Box>
                        <Typography variant="subtitle1" fontWeight="bold">
                          {review.reviewerName}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          sx={{ fontSize: "13px" }}
                        >
                          {timeAgo(review.date)}
                        </Typography>
                        <Rating
                          value={review.rating}
                          precision={0.5}
                          readOnly
                          sx={{ mt: 1 }}
                        />
                        <Typography
                          variant="body1"
                          sx={{ fontSize: "14px", ml: 0.5 }}
                        >
                          {review.comment}
                        </Typography>
                      </Box>
                    </ListItem>
                  </Box>
                ))}
              </List>
            </Box>
          </DialogContent>
        </>
      )}
    </Dialog>
  );
};

export default ReviewModal;
