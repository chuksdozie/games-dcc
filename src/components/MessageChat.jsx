import colors from "@/constants/colors";
import fontSizes from "@/constants/fontsizes";
import moment from "moment";
import React from "react";
import styled from "styled-components";

const MessageChat = ({ data, onDelete, admin }) => {
  return (
    <Wrapper>
      <p className="date">{moment(data?.date).format("LT")}</p>
      <p>{data?.message}</p>
      <div>
        <button onClick={onDelete}>Delete</button>
        {data?.flagged && admin && (
          <p className="tip">This message was deleted</p>
        )}
      </div>
    </Wrapper>
  );
};

export default MessageChat;

const Wrapper = styled.div`
  border: 1px solid ${colors.gray300};
  margin: 1rem 0.5rem;
  padding: 1rem;
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  background-color: rgba(255, 255, 255, 0.6);
  p {
    font-size: 1.5rem;
    color: ${colors.gray700};
    font-weight: 600;
  }
  div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;
  }
  button {
    /* background-color: ${colors.error800}; */
    background-color: transparent;
    color: ${colors.error800};
    border: 0;
    width: max-content;
    /* padding: 0.5rem 1rem; */
    /* font-size: 1.5rem;
    padding: 1rem;
    border-radius: 50px; */
    border-radius: 5px;
    /* color: ${colors.white}; */
  }
  .tip {
    color: ${colors.warning700};
    font-size: ${fontSizes.xs};
    border: 1px solid ${colors.warning700};
    border-radius: 5px;
    padding: 0.2rem 0.5rem;
  }
  .date {
    /* color: ${colors.warning700}; */
    font-size: ${fontSizes.xs};
    /* border: 1px solid ${colors.warning700}; */
    border-radius: 5px;
    font-weight: 400;
    /* padding: 0.2rem 0.5rem; */
    text-align: right;
  }
`;
