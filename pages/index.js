import fetch from "node-fetch"
import Link from "next/link"

const api = "https://pomber.github.io/covid19/"
const DATA = api + "timeseries.json"

export async function getStaticProps() {
  const response = await fetch(DATA)
  const data = await response.json()
  const countries = Object.keys(data)
  const aCountry = data[countries[0]]
  const { date } = aCountry[aCountry.length - 1]
  const rows = countries
    .map(country => {
      const { deaths } = data[country].find(
        r => r.date === date
      )
      return { country, deaths }
    })
    .filter(r => r.deaths > 8)
  return {
    props: { date, rows },
  }
}

function Node(props) {
  const { country } = props.data
  return (
    <Link
      href="/country/[name]"
      as={`/country/${country}`}
    >
      <a>
        {country}
      </a>
    </Link>
  )
}

export default function HomePage({ date, rows }) {
  console.log(rows)
  return (
    rows.map((row, index) => <Node key={index} data={row}></Node>)
  )
}