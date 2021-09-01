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
      width={390}
      height={160}
      keys={[ "deaths", "confirmed", "recovered" ]}
      indexBy="country"
      margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
      padding={0.3}
      valueScale={{ type: 'linear' }}
      indexScale={{ type: 'band', round: true }}
      valueFormat={{ format: '', enabled: false }}
      colors={{ scheme: 'nivo' }}
      defs={[
          {
              id: 'dots',
              type: 'patternDots',
              background: 'inherit',
              color: '#38bcb2',
              size: 4,
              padding: 1,
              stagger: true
          },
          {
              id: 'lines',
              type: 'patternLines',
              background: 'inherit',
              color: '#eed312',
              rotation: -45,
              lineWidth: 6,
              spacing: 10
          }
      ]}
      fill={[
          {
              match: {
                  id: 'fries'
              },
              id: 'dots'
          },
          {
              match: {
                  id: 'sandwich'
              },
              id: 'lines'
          }
      ]}
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
    "country": "AD",
    "deaths": 137,
    "hot dogColor": "hsl(179, 70%, 50%)",
    "confirmed": 49,
    "burgerColor": "hsl(314, 70%, 50%)",
    "recovered": 15,
    "sandwichColor": "hsl(259, 70%, 50%)",
    "kebab": 185,
    "kebabColor": "hsl(112, 70%, 50%)",
    "fries": 77,
    "friesColor": "hsl(238, 70%, 50%)",
    "donut": 127,
    "donutColor": "hsl(340, 70%, 50%)"
  },
  {
    "country": "AE",
    "deaths": 192,
    "hot dogColor": "hsl(212, 70%, 50%)",
    "confirmed": 79,
    "burgerColor": "hsl(256, 70%, 50%)",
    "recovered": 13,
    "sandwichColor": "hsl(185, 70%, 50%)",
    "kebab": 74,
    "kebabColor": "hsl(254, 70%, 50%)",
    "fries": 110,
    "friesColor": "hsl(35, 70%, 50%)",
    "donut": 175,
    "donutColor": "hsl(6, 70%, 50%)"
  },
  {
    "country": "AF",
    "deaths": 140,
    "hot dogColor": "hsl(243, 70%, 50%)",
    "confirmed": 123,
    "burgerColor": "hsl(356, 70%, 50%)",
    "recovered": 141,
    "sandwichColor": "hsl(105, 70%, 50%)",
    "kebab": 110,
    "kebabColor": "hsl(61, 70%, 50%)",
    "fries": 123,
    "friesColor": "hsl(294, 70%, 50%)",
    "donut": 71,
    "donutColor": "hsl(111, 70%, 50%)"
  },
  {
    "country": "AG",
    "deaths": 56,
    "hot dogColor": "hsl(304, 70%, 50%)",
    "confirmed": 200,
    "burgerColor": "hsl(239, 70%, 50%)",
    "recovered": 65,
    "sandwichColor": "hsl(314, 70%, 50%)",
    "kebab": 147,
    "kebabColor": "hsl(336, 70%, 50%)",
    "fries": 185,
    "friesColor": "hsl(248, 70%, 50%)",
    "donut": 25,
    "donutColor": "hsl(52, 70%, 50%)"
  },
  {
    "country": "AI",
    "deaths": 180,
    "hot dogColor": "hsl(197, 70%, 50%)",
    "confirmed": 80,
    "burgerColor": "hsl(124, 70%, 50%)",
    "recovered": 157,
    "sandwichColor": "hsl(4, 70%, 50%)",
    "kebab": 168,
    "kebabColor": "hsl(257, 70%, 50%)",
    "fries": 145,
    "friesColor": "hsl(233, 70%, 50%)",
    "donut": 85,
    "donutColor": "hsl(30, 70%, 50%)"
  },
  {
    "country": "AL",
    "deaths": 128,
    "hot dogColor": "hsl(212, 70%, 50%)",
    "confirmed": 122,
    "burgerColor": "hsl(50, 70%, 50%)",
    "recovered": 136,
    "sandwichColor": "hsl(102, 70%, 50%)",
    "kebab": 38,
    "kebabColor": "hsl(239, 70%, 50%)",
    "fries": 78,
    "friesColor": "hsl(70, 70%, 50%)",
    "donut": 131,
    "donutColor": "hsl(212, 70%, 50%)"
  },
  {
    "country": "AM",
    "deaths": 166,
    "hot dogColor": "hsl(108, 70%, 50%)",
    "confirmed": 26,
    "burgerColor": "hsl(220, 70%, 50%)",
    "recovered": 110,
    "sandwichColor": "hsl(251, 70%, 50%)",
    "kebab": 132,
    "kebabColor": "hsl(215, 70%, 50%)",
    "fries": 183,
    "friesColor": "hsl(122, 70%, 50%)",
    "donut": 165,
    "donutColor": "hsl(312, 70%, 50%)"
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
      <div style={{ height: 160 }}>
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
