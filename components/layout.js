import styles from './layout.module.css'
import Head from 'next/head';
import Image from 'next/image';
import utilStyles from '../styles/utils.module.css';
import Link from 'next/link';

const name = 'Jose Florian';
export const siteTitle = 'Next.js Sample Website';

export default function Layout({ children, home }) {
    return (
        <div className={styles.container}>
          <Head>
            <link rel="icon" href="/favicon.ico" />
            <meta
              name="description"
              content="Learn how to build a personal website using Next.js"
            />
            <meta
              property="og:image"
              content={`https://og-image.vercel.app/${encodeURI(
                siteTitle,
              )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
            />
            <meta name="og:title" content={siteTitle} />
            <meta name="twitter:card" content="summary_large_image" />
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
            
          </Head>
          <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
              <a class="navbar-brand" href="#">Welcome</a>
              <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
                <li class="nav-item active">
                  <h6>
                  <a class="nav-link" href="/">Home</a>
                  </h6>
                </li>
                <li class="nav-item">
                  <h6>
                  <a class="nav-link" href="/users/users">Users</a>
                  </h6>
                </li>
                <li class="nav-item">
                </li>
              </ul>
             
            </div>
            <ul class="nav navbar-nav navbar-right">
                <li>
                <h6>
                  <a class="nav-link" href="/users/users">Sign Up</a>
                </h6>
                </li>
                <li>
                  <h6>
                  <a class="nav-link" href="/login">Login</a>
                  </h6>
                </li>
              </ul>
          </nav>
       
          <header className={styles.header}>
            {home ? (
              <>
                <Image
                  priority
                  src="/images/MyProfile.jpg"
                  className={utilStyles.borderCircle}
                  height={144}
                  width={144}
                  alt=""
                />
                <h1 className={utilStyles.heading2Xl}>{name}</h1>
              </>
            ) : (
              <>
                
                <h2 className={utilStyles.headingLg}>
                  <Link href="/" className={utilStyles.colorInherit}>
                    Welcome to my demo!!!
                  </Link>
                </h2>
              </>
            )}
          </header>
          <main>{children}</main>
          {!home && (
            <div className={styles.backToHome}>
              <Link href="/">← Back to home</Link>
            </div>
          )}
        </div>
      );
  }