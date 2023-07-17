import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser} from '@fortawesome/free-solid-svg-icons'

export default function Home() {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
       
      </Head>
      <section className={utilStyles.headingMd}>
        <p>I'm a software Engineer and full stack developer that loves learn new technologies and make the best solution for any kind of need for me and  anybody in the world</p>
        <br></br>
        <p><FontAwesomeIcon icon={faUser} style={{ height: "20px" }} /> → Look at this demo <a href="/users/users">  Users</a> </p>
        <br></br>
        <p>
          (This is a Demo using Next.js as a framework implemented in AWS cloud, please check my Linkedin Profile{' '}
          <a href="https://www.linkedin.com/in/jos%C3%A9-flori%C3%A1n-n%C3%A1jera-7a142045/">José Florián</a>.)
        </p>
      </section>
    </Layout>
  )
}
