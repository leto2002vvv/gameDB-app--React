import { useState, useRef, useEffect } from 'react'
import { useGetGamesQuery } from '../../services/apiSlice'
import { getGames } from '../../slices/gameSlice'
import { useDispatch } from 'react-redux'
import './InputSearch.css'

const InputSearch = () => {
    const [inputValue, setInputValue] = useState('')
    const [searchValue, setSearchValue] = useState('')
    const inputRef = useRef(null)
    const dispatch = useDispatch()

    const { data } = useGetGamesQuery(searchValue, {
        skip: !searchValue
    })

    useEffect(() => {
        if (data) {
            dispatch(getGames(data))
        }
    }, [data])

    const handleSetSearchValue = () => {
        setSearchValue(inputValue)
    }

    const activateInputByClickOnLabel = () => { // activate input by clicking on label
        inputRef.current.focus()
    }

    const sendFetchByEnter = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault()
            setSearchValue(inputValue)
        }
    }

    // ================= 
    console.log(inputValue)
    console.log(searchValue)
    console.log(data)

    return (
        <>
            <div className="flex w-1/2 max-h-14 p-2"
                data-aos="zoom-in">
                <div className="relative w-full">
                    <input
                        ref={inputRef}
                        type="text"
                        placeholder=''
                        id="search"
                        value={inputValue} // передаем в app value input'a 
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={sendFetchByEnter}
                        className="w-full py-2 px-4 border rounded-s-xl border-white hover:border-purple-500 focus:outline-none text-sm font-medium text-white-700 bg-transparent active:opacity-10 transition-all  transform   duration-500 ease-in-out border-r-0 hover:blur-[1px] transition-100    input" />
                    <label
                        className='absolute inset-7 top-[11px] text-white cursor-text text-xs  label'
                        onClick={activateInputByClickOnLabel}
                    >
                        Write here...
                    </label>
                </div>
                <button
                    className="py-2 w-40 px-4 bg-none text-right border rounded-e-xl border-white hover:border-purple-500 hover:blur-[1px] transition-100 border-l-0 text-sm font-medium text-white active:opacity-10   transition-all  transform hover:translate-x-1  duration-500 ease-in-out"
                    onClick={handleSetSearchValue}
                >search</button>
            </div>
        </>
    )
}

export default InputSearch