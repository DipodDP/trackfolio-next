'use client'

import { AssetCard } from "@/components/cards/AssetCard";
import { useAppSelector } from "@/hooks/redux";
import { useDebounce } from "@/hooks/use-debounce";
import { useSearchAssetsQuery } from "@/store/api/trackfolio.api";
import { useEffect, useState } from "react";

function Page() {

  const [search, setSearch] = useState('')
  const [dropdown, setDropdown] = useState(false)
  const debounced = useDebounce(search)

  const {isLoading, isError, data: assets} = useSearchAssetsQuery(debounced, {  // renaming data to assets
    skip: debounced.length < 3,
    refetchOnFocus: true
  })

  useEffect(() => {
    console.log(debounced)
    setDropdown(debounced.length >= 3 && assets?.length! > 0)
  }, [debounced, assets])

  console.log('Assets: ', assets)

  // for dropdown implementation
  // const [fetchAsset, { isLoading: areAssetLoading, data: assetData}] = useLazyGetassetAssetsQuery()

  // const clickHandler = (figi: string) => {
  //   // fetchAsset(figi)
  //   setDropdown(false)
  // }

  const { favourites } = useAppSelector(state => state.trackfolio)

  return (
    <>
      <h1 className='head-text'>Search Form</h1>
      <div className="flex-col justify-start pt-10 mx-auto">
        { isError && <p className="relative text-center text-red-600">
          Something went wrong
        </p> }

        <div className="relative w-[560px]">
          <input
            type="text"
            className="leftsidebar_link border py-2 px-4 w-full h-[42px] mb-2 bg-dark-4 text-gray-300"
            placeholder="Search for asset..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />

          { favourites && <div
              className="pt-5">
              <ul className="list-none text-gray-300">
                { favourites.map(f => (
                  <li key={f}>
                    <a href={`${process.env.NEXT_PUBLIC_API_BASE_URL}/portfolio/${f}`} target="_blank">{f}</a>
                  </li>
                ))}
              </ul>
            </div>
          }

          {/* dropdown search implementation*/}
          {/* { dropdown && <ul className="list-none absolute top-[42px] left-2 right-2 max-h-[200px] shadow-md bg-light-3 text-gray-100 overflow-y-scroll custom-scrollbar"> */}
          {/*   { isLoading && <p className="center">Loading...</p> } */}
          {/*   { assets?.map(asset => ( */}
          {/*     <li  */}
          {/*       key={ asset.figi } */}
          {/*       className="px-4 py-2 hover:bg-gray-700 hover:text-gray-300 transit cursor-pointer" */}
          {/*       onClick={() => clickHandler(asset.figi)}> */}
          {/*       { asset.name } */}
          {/*     </li> */}
          {/*   )) } */}
          {/*   </ul> } */}

        </div>
        <div className="mt-5 text-gray-300">
        {/*   { areAssetsLoading && <p className="center">Loading assets...</p>} */}
          { assets?.map(asset => <AssetCard asset={asset} key={asset.figi}/>)}
        </div>
      </div>
    </>
  );
}

export default Page;
