import styled from "styled-components";

const DateBox = styled.input.attrs({ type: "date" })`
  padding: 12px;
  margin: 12px;
  border-top: none;
  border-left: none;
  border-bottom: 3px solid #a96e3b;
  border-right: 3px solid #a96e3b;
  border-radius: 20px;
  font-size: 16px;
  background-color: #f9f4ee;
  display: inline-block;
  text-align: center;
`;
const TimeBox = styled.input.attrs({ type: "time" })`
  padding: 12px;
  margin: 12px;
  border-top: none;
  border-left: none;
  border-bottom: 3px solid #a96e3b;
  border-right: 3px solid #a96e3b;
  border-radius: 20px;
  font-size: 16px;
  background-color: #f9f4ee;
  display: inline-block;
  text-align: center;
`;

export {DateBox, TimeBox};
