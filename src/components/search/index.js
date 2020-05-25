import React, { useState, useEffect, createRef } from "react"
import {
  InstantSearch,
  Index,
  Hits,
  connectStateResults,
} from "react-instantsearch-dom"
import "twin.macro"
import algoliasearch from "algoliasearch/lite"
import { Root, HitsWrapper } from "./styles"
import { SearchBox } from "react-instantsearch-dom"
// import Input from "./Input"
import * as hitComps from "./hitComps"

// Results informs the user that no matches could be found for a query
// unless the number of hits is positive, i.e. `searchResults.nbHits > 0`.
const Results = connectStateResults(
  ({ searchState: state, searchResults: res, children }) =>
    res && res.nbHits > 0 ? children : `No results for '${state.query}'`
)
const Stats = connectStateResults(
  ({ searchResults: res }) =>
    res && res.nbHits > 0 && `${res.nbHits} result${res.nbHits > 1 ? `s` : ``}`
)
const useClickOutside = (ref, handler, events) => {
  //   if (!events) events = [`mousedown`, `touchstart`]
  //   const detectClickOutside = event =>
  //     !ref.current.contains(event.target) && handler()
  //   useEffect(() => {
  //     for (const event of events)
  //       document.addEventListener(event, detectClickOutside)
  //     return () => {
  //       for (const event of events)
  //         document.removeEventListener(event, detectClickOutside)
  //     }
  //   })
}
export default function Search({ indices, collapse, hitsAsGrid }) {
  const ref = createRef()
  const [query, setQuery] = useState(``)
  const [focus, setFocus] = useState(false)
  const searchClient = algoliasearch(
    "V0X7Z4KE9D",
    "544bec33383dc791bcbca3e1ceaec11b"
  )
  useClickOutside(ref, () => setFocus(false))
  return (
    <InstantSearch
      searchClient={searchClient}
      indexName={indices[0].name}
      onSearchStateChange={({ query }) => setQuery(query)}
      root={{ Root, props: { ref } }}
    >
      <div tw="relative shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline rounded-r-none">
        {/* <Input
        onFocus={() => setFocus(true)}
        {...{ collapse, focus }}
      /> */}
        <SearchBox
          tw="w-full px-8"
          translations={{
            placeholder: "Find analysis tools and linters...",
          }}
          submit={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 18 18"
            >
              <g
                fill="none"
                fillRule="evenodd"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.67"
                transform="translate(1 1)"
              >
                <circle cx="7.11" cy="7.11" r="7.11" />
                <path d="M16 16l-3.87-3.87" />
              </g>
            </svg>
          }
          autoFocus
        />
        {/* <HitsWrapper show={query.length > 0 && focus} asGrid={hitsAsGrid}> */}
        <HitsWrapper
          show={query.length > 0}
          asGrid="false"
          tw="max-h-200 overflow-scroll shadow p-4 bg-white w-full absolute"
        >
          {indices.map(({ name, title, hitComp }) => (
            <Index key={name} indexName={name}>
              <header>
                <h3>{title}</h3>
                <Stats />
              </header>
              <Results>
                <Hits hitComponent={hitComps[hitComp](() => setFocus(false))} />
              </Results>
            </Index>
          ))}
          {/* <PoweredBy /> */}
        </HitsWrapper>
      </div>
    </InstantSearch>
  )
}
