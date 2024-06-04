import { Html, Head, Main, NextScript } from 'next/document'
 
export default function Document({children}) {
  return (
    <Html lang="en">
      <head>
        <script
          src="https://code.jquery.com/jquery-3.2.1.slim.min.js"
          integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN"
          crossOrigin="anonymous"
          defer
          strategy="beforeinteractive"
        ></script>
        <script
          src="https://cdnjs.cloudflare.com/ajax/libs/iframe-resizer/4.2.11/iframeResizer.contentWindow.min.js"
          integrity="sha256-EH+7IdRixWtW5tdBwMkTXL+HvW5tAqV4of/HbAZ7nEc="
          crossOrigin="anonymous"
        ></script>
      </head>
      <body>
        <Main />
      </body>
    </Html>
  )
}