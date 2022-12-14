import React, { useState } from 'react';
import StarRatings from 'react-star-ratings';

const Stars = ({rating, selectable, setReviewRating }) => {
  const [selectedRating, setSelectedRating] = useState(0);

  const onChangeHandler = (newRating) => {
    setReviewRating(newRating);
    setSelectedRating(newRating);
  }

  if (selectable) {
    return (
      <StarRatings
        rating={rating}
        numOfStars={5}
        starRatedColor={'rgb(54, 54, 54)'}
        starEmptyColor={'rgb(203, 211, 227)'}
        starDimension={'15px'}
        starSpacing={'4px'}
        starHoverColor={'rgb(54, 54, 54)'}
        changeRating={onChangeHandler}
    />
    )
  } else {
    return (
      <StarRatings
        rating={rating}
        numOfStars={5}
        starRatedColor={'rgb(54, 54, 54)'}
        starEmptyColor={'rgb(203, 211, 227)'}
        starDimension={'15px'}
        starSpacing={'4px'}
        starHoverColor={'rgb(54, 54, 54)'}
      />
    )
  }
};

export default Stars;
