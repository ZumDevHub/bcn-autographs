type YearsProps = {
  years: number[];
  checkedYears: number[];
  toggleYear: (year:number) => void;
}

export default function Years({years, checkedYears, toggleYear}:YearsProps) {
    return (
      <div>
        <div className="flex items-center w-2/3 pl-1 pt-2 pb-1 text-sm font-medium text-white bg-gray-900 rounded-t-sm">
        {/* <div className="flex items-center w-2/3 pl-1 pt-2 pb-1 text-sm font-thin text-gray-800 bg-gray-200"> */}
          By year
        </div>

        <div className="grid grid-flow-col gap-x-4 grid-rows-10 h-auto w-2/3 pl-1 pt-2 pb-1 text-sm font-light text-gray-700 bg-white">
          {years.map((year, i) => {
            return(
              <label key={year} className="cursor-pointer hover:bg-gray-100">
                <input
                  type="checkbox"
                  name={year.toString()}
                  value={year}
                  checked={checkedYears.includes(year)}
                  onChange={() => toggleYear(year)}
                  className="ml-1 mr-1 cursor-pointer"
                />
                {year}
              </label>
            )
          })}

        </div>
      </div>
    )
}