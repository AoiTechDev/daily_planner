import Provider from "@components/Provider";
import {Login} from '@components/Login'
const RootLayout = ({ children }) => {
  return (
    <html>
      <body>
        <Provider>
          <main className="app">
            <Login/>
            {children}</main>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
