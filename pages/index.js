import fetch from "node-fetch";
import Link from "next/link";
import Head from 'next/head';
import "bootstrap/dist/css/bootstrap.css";

const api = "https://pomber.github.io/covid19/";
const DATA = api + "timeseries.json";

export async function getStaticProps() {
  const response = await fetch(DATA);
  const data = await response.json();
  const countries = Object.keys(data);
  const aCountry = data[countries[0]];
  const { date } = aCountry[aCountry.length - 1];
  const rows = countries
    .map((country) => {
      const { deaths } = data[country].find((r) => r.date === date);
      return { country, deaths };
    })
    .filter((r) => r.deaths > 8);
  return {
    props: { date, rows },
  };
}

function Node(props) {
  const { country } = props.data;
  return (
    <li class="list-group-item">
      <Link href="/country/[name]" as={`/country/${country}`}>
        <a>{country}</a>
      </Link>
    </li>
  );
}

export default function HomePage({ date, rows }) {
  return (
    <>
      <Head>
        <title>Covid-19 Charts</title>
        <link rel="icon" href="/public/favicon.ico" />
      </Head>
      <h3>Country List</h3>
      <ul className="list-group">
        {rows.map((row, index) => <Node key={index} data={row}></Node>)}
      </ul>
    </>
  );
}
