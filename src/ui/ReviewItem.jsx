import styled from "styled-components";
import { FaStar, FaSmile, FaFrown } from "react-icons/fa";
import { FaFaceMeh } from "react-icons/fa6";
import { FaThumbsUp as LikeFill } from "react-icons/fa";
import { FaThumbsDown as DislikeFill } from "react-icons/fa";
import { FaRegThumbsUp as LikeHollow } from "react-icons/fa";
import { FaRegThumbsDown as DislikeHollow } from "react-icons/fa";
import useLikeChecker from "../services/useLikeChecker";
import useLikeReview from "../services/useLikeReview";
import useDislikeReview from "../services/useDislikeReview";
import useDislikeChecker from "../services/useDislikeChecker";
import useReviewLikesCount from "../services/useReviewLikesCount";
import useReviewDislikesCount from "../services/useReviewDislikesCount";

const Review = styled.div`
  width: 90%;
  min-height: 10rem;
  white-space: pre-wrap;

  border-top: 1px solid var(--color-purple-light-50);
  padding-top: 1rem;
  word-break: break-all;
  margin-top: 1rem;
`;

const ProfilePic = styled.img`
  width: 12rem;
  height: 16rem;
  border-radius: 2px;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
`;

const Layout = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  width: 60%;
  margin: 0 auto;
  min-height: 15rem;
  background-color: var(--color-purple-dark-30);
  padding: 1rem;
  column-gap: 2rem;
  border: 2px solid var(--color-stroke);
  border-radius: var(--border-radius-sm);
`;

const Main = styled.section`
  width: 100%;
  height: 100%;
`;
const RatingInfo = styled.div`
  display: flex;
  margin-top: 2rem;
`;

const Date = styled.p`
  color: inherit;
`;

const RecommendedInfo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => {
    switch (props.recommended) {
      case "Yes":
        return "green";
      case "No":
        return "red";
      case "Mixed Feelings":
        return "grey";
      default:
        throw new Error("Error in Recommended Info");
    }
  }};
  gap: 1rem;
  padding: 0.4rem 0.6rem;
  border-radius: var(--border-radius-sm);

  & svg {
  }

  & p {
  }
`;

const InteractionBar = styled.div`
  display: flex;
  gap: 0.7rem;
`;

const Button = styled.button`
  background-color: var(--color-purple-light-50);
  padding: 0.8rem 1.2rem;
  color: var(--color-purple-dark-50);
  border: 1px solid var(--color-purple-light-50);
  border-radius: 3px;
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-purple-light-90);
    border: 1px solid var(--color-purple-light-90);
  }
`;

function recommendedStr(would_recommend) {
  switch (would_recommend) {
    case "Yes":
      return "Recommended";
    case "No":
      return "Not Recommended";
    case "Mixed Feelings":
      return would_recommend;
    default:
      throw new Error("Error in recommendedStr");
  }
}

export default function ReviewItem({
  review: {
    id: review_post_id,
    poster,
    rating,
    would_recommend,
    review,
    title,
    created_at,
    profiles: { username },
  },
}) {
  const { likeReviewPost, isPending, error } = useLikeReview();
  const {
    dislikeReviewPost,
    isPending: isPendingDislike,
    error: dislikeError,
  } = useDislikeReview();
  const {
    isLiked,
    fetchStatus,
    error: likeCheckerError,
  } = useLikeChecker(review_post_id);

  const { isDisliked } = useDislikeChecker(review_post_id);
  const { likeCount } = useReviewLikesCount(review_post_id);
  const { dislikeCount } = useReviewDislikesCount(review_post_id);
  const date = created_at.split("T")[0];

  //   if (isPending) {
  //     return <p>loading</p>;
  //   }

  function handleLikeButton() {
    console.log("isLiked", isLiked);
    likeReviewPost({ review_post_id, isLiked });
  }

  function handleDislikeButton() {
    console.log("isDisliked", null);
    dislikeReviewPost({ review_post_id, isDisliked });
  }

  return (
    <Layout>
      <ProfilePic src={poster} alt="p" />
      <Main>
        <Header>
          <h2>{title}</h2>

          <Date>{date}</Date>
        </Header>
        <p>{`Reviewed by: ${username}`}</p>
        <RatingInfo>
          <RecommendedInfo recommended={would_recommend}>
            {would_recommend === "Yes" && <FaSmile />}
            {would_recommend === "No" && <FaFrown />}
            {would_recommend === "Mixed Feelings" && <FaFaceMeh />}
            <p>{recommendedStr(would_recommend)}</p>
          </RecommendedInfo>
        </RatingInfo>
        <Review>
          <p>{review}</p>
        </Review>
        <InteractionBar>
          <Button onClick={handleLikeButton}>
            {!isLiked && <LikeHollow />}
            {isLiked && <LikeFill />}
          </Button>
          <p>{likeCount}</p>
          <Button onClick={handleDislikeButton}>
            {!isDisliked && <DislikeHollow />}
            {isDisliked && <DislikeFill />}
          </Button>
          <p>{dislikeCount}</p>
        </InteractionBar>
      </Main>
    </Layout>
  );
}
