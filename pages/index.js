import fetch from "node-fetch";
import Link from "next/link";
import Head from 'next/head';
import { ResponsiveBar } from '@nivo/bar'
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
    <li className="list-group-item">
      <Link href="/country/[name]" as={`/country/${country}`}>
        <a>{country}</a>
      </Link>
    </li>
  );
}

const MyResponsiveBar = ({ data /* see data tab */ }) => (
  <ResponsiveBar
      data={data}
      keys={[ "deaths", "confirmed", "recovered" ]}
      indexBy="country"
      margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
      padding={0.3}
      valueScale={{ type: 'linear' }}
      indexScale={{ type: 'band', round: true }}
      valueFormat={{ format: '', enabled: false }}
      colors={{ scheme: 'nivo' }}
      borderColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'country',
          legendPosition: 'middle',
          legendOffset: 32
      }}
      axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'cases',
          legendPosition: 'middle',
          legendOffset: -40
      }}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
      legends={[
          {
              dataFrom: 'keys',
              anchor: 'bottom-right',
              direction: 'column',
              justify: false,
              translateX: 120,
              translateY: 0,
              itemsSpacing: 2,
              itemWidth: 100,
              itemHeight: 20,
              itemDirection: 'left-to-right',
              itemOpacity: 0.85,
              symbolSize: 20,
              effects: [
                  {
                      on: 'hover',
                      style: {
                          itemOpacity: 1
                      }
                  }
              ]
          }
      ]}
  />
)

const data = [
  {
    "country": "AF",
    "deaths": 7118,
    "deathsColor": "hsl(255, 100%, 50%)",
    "confirmed": 153220,
    "burgerColor": "hsl(314, 70%, 50%)",
    "recovered": 6804,
    "sandwichColor": "hsl(259, 70%, 50%)",
  },
  {
    "country": "BR",
    "deaths": 580413,
    "deathsColor": "hsl(255, 100%, 50%)",
    "confirmed": 20776870,
    "confirmedColor": "hsl(256, 100%, 50%)",
    "recovered": 17771228
  },
  {
    "country": "IN",
    "deaths": 435757,
    "hot dogColor": "hsl(243, 70%, 50%)",
    "confirmed": 31769132,
    "burgerColor": "hsl(356, 70%, 50%)",
    "recovered": 30933022,
    "sandwichColor": "hsl(105, 70%, 50%)"
  },
  {
    "country": "AR",
    "deaths": 111812,
    "hot dogColor": "hsl(304, 70%, 50%)",
    "confirmed": 5185620,
    "burgerColor": "hsl(239, 70%, 50%)",
    "recovered": 4606026
  }
]


export default function HomePage({ date, rows }) {
  return (
    <>
      <Head>
        <title>Covid-19 Charts</title>
        <link rel="icon" href="/public/favicon.ico" />
      </Head>
      <div className="p-3">
        <h1>COVID-19 CHARTS</h1>
      </div>
      <div style={{ height: 500 }}>
        <MyResponsiveBar data={data} />
      </div>
      <h3>Country List</h3>
      <ul className="list-group">
        {rows.map((row, index) => (
          <Node key={index} data={row}></Node>
        ))}
      </ul>
    </>
  );
}
