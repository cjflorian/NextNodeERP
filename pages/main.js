import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import Button from 'react-bootstrap/Button';

export default function Main() {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
       
      </Head>
      <section className={utilStyles.headingMd}>
        <p>Welcome!!!</p>
        <br></br>
        <p>→ Look at this demo <a href="/users/users"> Users</a> </p>
        <br></br>
        <p>
          (This is a Demo using Next.js as a framework implemented in AWS cloud, please check my Linkedin Profile{' '}
          <a href="https://www.linkedin.com/in/jos%C3%A9-flori%C3%A1n-n%C3%A1jera-7a142045/">José Florián</a>.)
        </p>
      </section>
    </Layout>
  )
}