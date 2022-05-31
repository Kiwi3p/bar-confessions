import { FC, ReactNode } from "react";
import Head from "next/head";

type IProps = {
  children?: ReactNode;
  title?: string;
};

const GTM_ID = "G-XLK0T6BT6D";

const AppWrapper: FC<IProps> = ({
  children
}) => {
  return (
    <>
      <Head>
        <title>Hero Galaxy</title>
        <meta name="description" content="Hero Galaxy" />
        <link rel="icon" href="/favicon.ico" />
        <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
              page_path: window.location.pathname,
            });
          `,
            }}
          />
      </Head>
      {children}
    </>
  );
};

export default AppWrapper;
