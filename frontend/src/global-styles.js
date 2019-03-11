import reset from "styled-reset";
import { createGlobalStyle } from "styled-components";

// tslint:disable-next-line
const GlobalStyle = createGlobalStyle`
 @import url('https://fonts.googleapis.com/css?family=Roboto:400,500,700');
  ${reset}
  html, body, #root{
    width:100%;
    height:100%;
    font-family: -apple-system,system-ui,BlinkMacSystemFont,"Segoe UI","Roboto","Helvetica Neue",Arial,sans-serif;
  }
  * {
    box-sizing: border-box;
  }
  *:focus{
    outline:none;
  }
  a{
    color:inherit;
    text-decoration:none;
  }
  h1,h2,h3,h4,h5,h6{
    font-family: -apple-system,system-ui,BlinkMacSystemFont,"Segoe UI","Roboto","Helvetica Neue",Arial,sans-serif;
  }

  input, textarea, select, button{
    font-family: -apple-system,"Roboto",Arial,system-ui,BlinkMacSystemFont,"Segoe UI","Helvetica Neue",Arial,sans-serif;
  }

  input,
  button{
    &.focus,
    &.active{outline:none}
  }
  .loaderFullWidth{
    display:flex;
    width:100%;
    height:calc(100vh - 100px);
    justify-content:center;
    align-items:center;
  }
`;
export default GlobalStyle;
