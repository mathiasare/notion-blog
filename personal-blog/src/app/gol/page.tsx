import { GameOfLife } from "@/components/gol/game-of-life";
import * as React from 'react'

export default function Page() {
    return (
        <>
        <div className="h-full w-auto">
            <GameOfLife></GameOfLife>
        </div>
        </>
      )
}