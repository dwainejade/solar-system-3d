export const metadata = {
  title: 'Solar System Explorer',
  description: 'Interactive Solar System Simulator',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script
          key='jquery'
          src='https://code.jquery.com/jquery-3.2.1.slim.min.js'
          integrity='sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN'
          crossOrigin='anonymous'
          defer
        />
        <script
          key='iframe-resizer'
          src='https://cdnjs.cloudflare.com/ajax/libs/iframe-resizer/4.2.11/iframeResizer.contentWindow.min.js'
          integrity='sha256-EH+7IdRixWtW5tdBwMkTXL+HvW5tAqV4of/HbAZ7nEc='
          crossOrigin='anonymous'
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}