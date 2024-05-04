import React, { useState } from "react";
import { Board, Cell, GameStatus, GameStatusType } from "@/lib/gol/game"


export const GridRow : React.FC<{ row: Cell [], status: GameStatusType}> = ({ row, status }) => {
    return(<div className="flex flex-row w-full" >
            {
                row.map((cell, index) => (<GridCell cell={cell} status={status} key={index} />))
            }
        </div>)
}

export const GridCell : React.FC<{ cell: Cell, status: GameStatusType }> = ({ cell, status }) => {
    const [alive, setAlive] = useState(cell.alive)

    return(<div onClick={() => {if (status === GameStatus.EDITED) {setAlive(!alive); cell.alive = !alive}}}
    className={`w-full h-full aspect-square flex justify-center items-center border ${
      cell.alive ? 'bg-gray-800' : 'bg-gray-200'
    } border-gray-400`}
  ></div>)
}

export const BoardGrid: React.FC<{board: Board, status: GameStatusType}> = ({board, status}) => {
    return(<div className={`w-full max-w-lg aspect-square border border-black`}>
      {board.matrix.map((row, rowIndex) =>
        <GridRow key={rowIndex} row={row} status={status} />
      )}
    </div>)
}