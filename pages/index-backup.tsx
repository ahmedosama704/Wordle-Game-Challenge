import type { NextPage } from 'next'
import {useEffect} from 'react'

const WORD_LIST_API_URL = '/api/words/'

const Home: NextPage = () => {
  // todo write your code here.
  // this is an example template with the class usage.
  
  return <div className="board">
      <div className="line">
        <div className="tile incorrect">H</div>
        <div className="tile correct">E</div>
        <div className="tile incorrect">L</div>
        <div className="tile close">L</div>
        <div className="tile incorrect">L</div>
      </div>
      <div className="line">
        <div className="tile"></div>
        <div className="tile"></div>
        <div className="tile"></div>
        <div className="tile"></div>
        <div className="tile"></div>
      </div>
      <div className="line">
        <div className="tile"></div>
        <div className="tile"></div>
        <div className="tile"></div>
        <div className="tile"></div>
        <div className="tile"></div>
      </div>
      <div className="line">
        <div className="tile"></div>
        <div className="tile"></div>
        <div className="tile"></div>
        <div className="tile"></div>
        <div className="tile"></div>
      </div>
      <div className="line">
        <div className="tile"></div>
        <div className="tile"></div>
        <div className="tile"></div>
        <div className="tile"></div>
        <div className="tile"></div>
      </div>
    </div>
}

export default Home
