import styled, { css } from 'styled-components';
import React, { useState } from 'react';

const RModal = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0,0,0,0.4);
`;

const RModalContent = styled.div`
  background-color: #fefefe;
  margin: auto;
  padding: 20px;
  border: 1px solid black;
  width: 50%;
`;

const ModalButton = styled.button`
  background-color: #fefefe;
  margin: auto;
  padding: 20px;
  border: 1px solid black;
  width: 50%;
`;

const ModalForm = styled.form`
  overflow: auto;
`;

const ModalTitles = styled.div`
  font-weight: bold;
  margin-top: 5px;
  margin-bottom: 5px;
`;

export default function NewReviewModal({ showAddReview, setShowAddReview, product, productData }) {
  const [userReview, setUserReview] = useState('');
  const [reccomend, setReccomend] = useState(false);
  const [nickname, setNickname] = useState('');
  const [summary, setSummary] = useState('');
  const [email, setEmail] = useState('');
  const [photos, setPhotos] = useState([]);

  const postReviewHandler = (userReview, reccomend, nickname, email, photos, summary) => {
    axios.post('/reviews', {
      product_id: product,
      reccomend: reccomend,
      summary: summary,
      name: nickname,
      email: email,
      body: userReview,
    })
    .then((response) => {
      console.log(response)
    })
    .catch((err) => {
      console.log('Error posting review', err)
    });
  };

  if (showAddReview) {
    return (
      <RModal>
        <RModalContent>
          <h2>Write Your Review</h2>
          <h4>About the {productData.name}</h4>
          <ModalForm onSubmit={() => {
            postReviewHandler(userReview, reccomend, nickname, email, photos, summary);
            setShowAddReview(false);
          }}>
            <label>
            <ModalTitles>Overall Rating</ModalTitles>
            </label>

            <label>
              <ModalTitles>Would You Reccomend This Product?</ModalTitles>
              <ModalButton>
                <input required type="radio" name="yesNo" value="yes" onClick={() => setReccomend(true)}/>Yes
              </ModalButton>
              <ModalButton>
                <input required type="radio" name="yesNo" value="no" onClick={() => setReccomend(false)}/>No
              </ModalButton>
            </label>

            <label>
              <ModalTitles>Summary</ModalTitles>
              <input onChange={e => setSummary(e.target.value)} type="text" required maxLength="60" size="50" placeholder="Example: Best Purchase Ever!"/>
            </label>

            <label>
              <ModalTitles>Body</ModalTitles>
              <input type="text" size="200" maxLength="1000" style={{height: '100px', width: '90%'}} placeholder="Why did you like the product or not?" onChange={e => setUserReview(e.target.value)} required/>
              {userReview.length < 50 ? (
                <p id="review-counter" style={{fontSize: '12px'}}>Minimum required characters left: {50-userReview.length}</p>
              ) : (
                <p id="review-counter" style={{fontSize: '12px'}}>Minimum reached</p>
              ) }
            </label>

            <label>
              <ModalTitles>Upload Your Photos</ModalTitles>
              <input type="file" name="images" multiple/>
            </label>

            <label>
              <ModalTitles>Your Nickname</ModalTitles>
              <input type="text" maxLength="60" placeholder="Example: jackson11!" onChange={e => setNickname(e.target.value)} required/>
              <p style={{fontSize: '12px'}}>For privacy reasons, do not use your full name or email address</p>
            </label>

            <label>
              <ModalTitles>Your E-mail</ModalTitles>
              <input type="email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,63}$" maxLength="60" placeholder="Example: jackson11@email.com" onChange={e => setEmail(e.target.value)} required/>
              <p style={{fontSize: '12px'}}>For authentication reasons, you will not be emailed</p>
            </label>

          <ModalButton type="submit" onSubmit={() => setShowAddReview(!showAddReview)}>Submit Review</ModalButton>
          <ModalButton type="submit" onClick={() => setShowAddReview(!showAddReview)}>Cancel Review</ModalButton>
          </ModalForm>
         </RModalContent>
      </RModal>
    )
  } else {
    return (
      <>
      </>
    )
  }
};
