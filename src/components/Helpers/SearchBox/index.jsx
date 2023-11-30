export default function SearchBox({ className }) {
  return (
    <>
      <div
        className={`w-full h-full flex items-center  border border-qgray-border bg-white ${
          className || ""
        }`}
      >
        <div className="flex-1 bg-red-500 h-full">
          <form action="#" className="h-full">
            <input
              type="text"
              className="search-input"
              placeholder="Search..."
            />
          </form>
        </div>
        <button
          className="search-btn w-[93px] h-full text-sm font-600 text-white"
          type="button"
        >
          Search
        </button>
      </div>
    </>
  );
}
