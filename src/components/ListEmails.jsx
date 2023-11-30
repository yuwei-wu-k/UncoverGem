import { css } from "@emotion/react";
import styled from "@emotion/styled";
import Axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useInView } from 'react-intersection-observer';
import { getPrefix, getSessionToken } from "../lib/Bandung";

const EmailListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
`;

const EmailContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  margin: 10px;
  border: 1px solid #ddd;
  border-radius: 15px;
  width: 100%;
`;

const Loader = styled.div`
  border: 5px solid #f3f3f3;
  border-top: 5px solid #3498db;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 2s linear infinite;
  margin: 20px auto;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const Title = styled.h2`
  text-align: center;
  margin-top: 20px;
`;

const UserEmailList = () => {
  const [emails, setEmails] = useState([]);
  const [visibleCount, setVisibleCount] = useState(8); // Number of emails to show initially
  const { ref: loaderRef, inView: loaderInView } = useInView({ threshold: 0 });
  const lastEmailRef = useRef(null);
  const [lastEmailInView, setLastEmailInView] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await Axios.get(`${getPrefix()}/app/session/listuseremail?sessionToken=${getSessionToken()}`);
      const sortedEmails = response.data.sort((a, b) => new Date(a.createDate) - new Date(b.createDate));
      setEmails(sortedEmails);
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Create a new object to detect when an element intersects with the viewport
    // The threshold is set to 0, meaning that as soon as even one pixel is visible, the callback will be executed

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Through this callback we're updating the state variable using the value of entry.isIntersecting
        setLastEmailInView(entry.isIntersecting);
      },
      { threshold: 0 }
    );

    if (lastEmailRef.current) {
      // If the reference is valid, then observe the target element
      observer.observe(lastEmailRef.current);
    }

    const currentRef = lastEmailRef.current;

    return () => {
      // cleanup function
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [emails, visibleCount]); // Effect will re-run if the emails or visibleCount change

  useEffect(() => {

    // If either loaderInView or lastEmailInView is true, and the visibleCount is less than
    // the total number of emails, this means that more emails can be loaded
    if ((loaderInView || lastEmailInView) && visibleCount < emails.length) {
      setLoading(true);
      setTimeout(() => {

        // Represents displaying the next 5 emails
        setVisibleCount(visibleCount + 5);
        setLoading(false);
      }, 2000);
    }
  }, [loaderInView, lastEmailInView]);

  return (
    <div
      css={css`
        max-height: 80vh;
        overflow-y: auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
      `}
    >
      <Title>Your connected Email IDs</Title>
      <EmailListContainer>
        {emails.slice(0, visibleCount).map((emailObject, index, arr) => (
          <EmailContainer key={index} ref={index === arr.length - 1 ? lastEmailRef : null}>
            <span>{emailObject.email}</span>
            <span>Created On: {emailObject.createDate}</span>
          </EmailContainer>
        ))}
      </EmailListContainer>
      {loading && <Loader ref={loaderRef}></Loader>}
    </div>
  );
};

export default UserEmailList;
