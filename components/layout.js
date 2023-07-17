import styles from './layout.module.css'
import Head from 'next/head';
import Image from 'next/image';
import utilStyles from '../styles/utils.module.css';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faUsers, faCoffee, faSignIn} from '@fortawesome/free-solid-svg-icons'

const name = 'José Florián';
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
           
          </Head>
          <nav className="navbar navbar-expand-lg navbar-light">
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
              <a className="navbar-brand" href="#">Welcome</a>
              <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                <li className="nav-item active">
                  <h6>
                  <a className="nav-link" href="/"><FontAwesomeIcon icon={ faHome} style={{ height: "20px" }} /> Home</a>
                  </h6>
                </li>
                <li className="nav-item">
                  <h6>
                  <a className="nav-link" href="/users/users"> <FontAwesomeIcon icon={faUsers} style={{ height: "20px" }} /> Users</a>
                  </h6>
                </li>
                <li className="nav-item">
                </li>
              </ul>
             
            </div>
            <ul className="nav navbar-nav navbar-right">
                <li>
                <h6>
                  <a className="nav-link" href="/users/users"> <FontAwesomeIcon icon={faCoffee} style={{ height: "20px" }} /> Sign Up</a>
                </h6>
                </li>
                <li>
                  <h6>
                  <a className="nav-link" href="/login"><FontAwesomeIcon icon={ faSignIn} style={{ height: "20px" }} /> Login</a>
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