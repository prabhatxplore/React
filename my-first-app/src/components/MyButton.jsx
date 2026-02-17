export default function MyButton({ count, setCount }) {
  function handleClick() {
    setCount(count + 1);
  }
  return (
    <button
      onClick={handleClick}
      className="outline-1 text-pink-500 font-bold outline-black"
    >
      Click {count} times
    </button>
  );
}
