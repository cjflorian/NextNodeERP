import Link from 'next/link';
import Head from 'next/head';
import Layout from '../../components/layout'
import { useEffect, useState, useMemo  } from 'react'
import axios from 'axios'
const endPoint = '/api/user'
import Table from "../../components/Table";

export default function Users() {
  
    const [data, setData] = useState([]);

    const columns = useMemo(
      () => [
        {
          // first group - TV Show
          Header: "Users",
          // First group columns
          columns: [
            {
              Header: "Id",
              accessor: "id",
            },
            {
              Header: "Email",
              accessor: "email",
            },
            {
              Header: "User",
              accessor: "name",
            },
          ],
        }
      ],
      []
    );

    useEffect(() => {
      axios.get(endPoint, {}).then((result) => {
        console.log(result.data);
        setData(result.data)
    })
      console.log(data);
    }, [])


  

    if (!data) return <div>loading...</div>;
  return (
    <Layout>
      <Head>
        <title>Users</title>
      </Head>
      <h1>users</h1>
      <Table columns={columns} data={data} />
      </Layout>
  );
}