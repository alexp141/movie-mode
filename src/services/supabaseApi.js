import { createRef } from "react";
import { supabase } from "./supabase";

export async function submitReview({
  title,
  poster,
  imdbID,
  rating,
  review,
  would_recommend,
}) {
  console.log("imdb_id", imdbID);
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data, error } = await supabase
    .from("watchlist")
    .insert([
      {
        rating,
        review,
        poster,
        would_recommend,
        user_id: user.id,
        title,
        imdb_id: imdbID,
      },
    ])
    .select();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getReview(title) {
  if (!title || title === "") return null;

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data, error } = await supabase
    .from("watchlist")
    .select("*")
    .eq("user_id", user.id)
    .eq("title", title);

  console.log("review data", data);
  if (error) {
    console.error("review error", error);
    throw new Error(error.message);
  }
  console.log("review data", data);
  return data.length !== 0 ? true : false;
}

export async function getWatchList() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data, error } = await supabase
    .from("watchlist")
    .select("*")
    .eq("user_id", user.id);

  if (error) {
    console.error("review error", error);
    throw new Error(error.message);
  }
  console.log("watch list", data);
  return data;
}

export async function getReviews({ filterValue, pageNumber }) {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  console.log("filter", filterValue);

  let query = supabase
    .from("watchlist")
    .select(
      "id,created_at,title,rating,review,would_recommend,profiles!watchlist_user_id_fkey(username),imdb_id,poster",
      { count: "estimated" }
    );
  //.neq("user_id", user.id);
  console.log("filter value", filterValue);
  //FILTERING
  if (filterValue !== "all") {
    query = query.eq("would_recommend", filterValue);
  }

  //PAGINATION
  const to = pageNumber * 10 - 1;
  const from = to - 9;
  query.range(from, to);

  const { data, error, count } = await query;

  console.log("GET REVIEWS DATA", data);

  if (error) {
    console.error("review error", error);
    throw new Error(error.message);
  }
  return { data, count };
}

export async function deleteReview(imdbID) {
  if (!imdbID || imdbID === "") return null;

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { error } = await supabase
    .from("watchlist")
    .delete()
    .eq("imdb_id", imdbID)
    .eq("user_id", user.id);

  if (error) {
    console.error("review error", error);
    throw new Error(error.message);
  }

  return imdbID;
}

export async function likeReview({ review_post_id, isLiked }) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (isLiked) {
    const { error } = await supabase
      .from("review_likes")
      .delete()
      .eq("user_id", user.id)
      .eq("review_post_id", review_post_id);

    if (error) {
      throw new Error(error.message);
    }

    return review_post_id;
  }

  // LIKE THE REVIEW
  const { data, error } = await supabase
    .from("review_likes")
    .insert([
      {
        review_post_id,
        user_id: user.id,
      },
    ])
    .select();

  if (error) {
    throw new Error(error.message);
  }

  //REMOVE DISLIKE FROM DISLIKE TABLE IF IT EXISTS
  const removeDislikeError = await removeDislike({
    user_id: user.id,
    review_post_id,
  });
  if (removeDislikeError) {
    console.error("dislike error", removeDislikeError);
    throw new Error(removeDislikeError.message);
  }

  return data[0].review_post_id;
}

export async function dislikeReview({ review_post_id, isDisliked }) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (isDisliked) {
    const { error } = await supabase
      .from("review_dislikes")
      .delete()
      .eq("user_id", user.id)
      .eq("review_post_id", review_post_id);

    if (error) {
      throw new Error(error.message);
    }

    return review_post_id;
  }

  // LIKE THE REVIEW
  const { data, error } = await supabase
    .from("review_dislikes")
    .insert([
      {
        review_post_id,
        user_id: user.id,
      },
    ])
    .select();

  if (error) {
    throw new Error(error.message);
  }

  //REMOVE DISLIKE FROM DISLIKE TABLE IF IT EXISTS
  const removeLikeError = await removeLike({
    user_id: user.id,
    review_post_id,
  });
  if (removeLikeError) {
    console.error("dislike error", removeLikeError);
    throw new Error(removeLikeError.message);
  }

  return data[0].review_post_id;
}

export async function checkIfLiked({ post_id }) {
  if (!post_id) return null;

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data, error } = await supabase
    .from("review_likes")
    .select("*")
    .eq("user_id", user.id)
    .eq("review_post_id", post_id);

  console.log("check if liked", data);
  if (error) {
    console.error("check if liked error", error);
    throw new Error(error.message);
  }

  return data.length ? true : false;
}

export async function checkIfDisikedReview({ post_id }) {
  if (!post_id) return null;

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data, error } = await supabase
    .from("review_dislikes")
    .select("*")
    .eq("user_id", user.id)
    .eq("review_post_id", post_id);

  console.log("check if disliked", data);
  if (error) {
    console.error("check if liked error", error);
    throw new Error(error.message);
  }

  return data.length ? true : false;
}

export async function removeDislike({ user_id, review_post_id }) {
  const { error: removeDislikeError } = await supabase
    .from("review_dislikes")
    .delete()
    .eq("user_id", user_id)
    .eq("review_post_id", review_post_id);

  if (removeDislikeError) {
    console.error("dislike error", removeDislikeError);
    throw new Error(removeDislikeError.message);
  }

  return removeDislikeError || "";
}

export async function removeLike({ user_id, review_post_id }) {
  const { error: removeLikeError } = await supabase
    .from("review_likes")
    .delete()
    .eq("user_id", user_id)
    .eq("review_post_id", review_post_id);

  if (removeLikeError) {
    console.error("dislike error", removeLikeError);
    throw new Error(removeLikeError.message);
  }

  return removeLikeError || "";
}

export async function getNumLikesForReviewPost({ review_post_id }) {
  const { count, error } = await supabase
    .from("review_likes")
    .select("*", { count: "estimated", head: true })
    .eq("review_post_id", review_post_id);

  if (error) {
    console.error("get number of likes error", error);
    throw new Error(error.message);
  }
  console.log("like data", count);
  return count;
}

export async function getNumDislikesForReviewPost({ review_post_id }) {
  const { count, error } = await supabase
    .from("review_dislikes")
    .select("*", { count: "estimated", head: true })
    .eq("review_post_id", review_post_id);

  if (error) {
    console.error("get number of dislikes error", error);
    throw new Error(error.message);
  }
  console.log("dislikes data", count);
  return count;
}
