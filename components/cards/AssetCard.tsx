'use client'

import { useActions } from "@/hooks/actions";
import { useAppSelector } from "@/hooks/redux";
import { IInstrumentShort } from "@/lib/models/api.model";
import { usePostOrder } from "@/lib/react-query/queriesAndMutations";
import { useState } from "react";


export function AssetCard({ asset }: { asset: IInstrumentShort }) {
  const { addFavourite, removeFavourite } = useActions()
  const { favourites } = useAppSelector(state => state.trackfolio)

  const [isFav, setIsFav] = useState(favourites.includes(asset.figi))

  const addToFavourite = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    addFavourite(asset.figi)
    setIsFav(true)
  }

  const removeFromFavourite = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    removeFavourite(asset.figi)
    setIsFav(false)
  }

  const buyAsset = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  // hook to post order with react-query
  const { mutateAsync: postOrder, isPending } = usePostOrder()

  return (
    <a href={asset.figi} target="_blank">
      <div className="justify-start border py-3 px-5 rounded cursor-pointer mb-2 hover:bg-gray-600 transition-all">
        <h2 className="text-lg font-bold">{asset.name}</h2>
        <p className="text-sm">
          Ticker: <span className="font-bold mr-2">{asset.ticker}</span>
          Type: <span className="font-bold">{asset.instrument_type}</span>
        </p>
        <p className="text-sm font-thin">{asset?.class_code}</p>

        {!isFav && <button
          className="mt-2 py-2 px-4 bg-yellow-700 rounded hover:shadow-md transition-all" onClick={addToFavourite}>
          Add
        </button>}

        {isFav && <button
          className="mt-2 py-2 px-4 bg-red-700 rounded hover:shadow-md transition-all" onClick={removeFromFavourite}>
          Remove
        </button>}
        <button
          className="mt-2 py-2 px-4 mx-2 bg-green-700 rounded hover:shadow-md transition-all"
          onClick={buyAsset}
        >
          Buy
        </button>

      </div>
    </a>
  )
}
